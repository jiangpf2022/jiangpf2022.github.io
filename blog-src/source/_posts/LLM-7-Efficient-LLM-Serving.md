---
title: LLM 7 - Efficient LLM Serving
date: 2026-10-23 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - LLM Serving
  - Continuous Batching
  - FlashAttention
  - PagedAttention
  - vLLM
  - SGLang
  - S-LoRA
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "A systems-level guide to continuous batching, FlashAttention, KV-cache paging, vLLM, SGLang, S-LoRA, and safe GPU sharing for production LLM inference."
lesson_number: 7
lesson_level: 1
study_time: 125
---

Welcome back. In [LLM 6](/blog/2026/10/16/LLM-6-Instruction-Fine-Tuning-and-PEFT/) we learned how to adapt one pretrained model into many useful behaviors. That immediately creates a systems problem. A model may be accurate, but can it answer hundreds of users without making each one wait? Can several adapters share one base model? Can a long request coexist with short requests without wasting most of the GPU memory?

Serving a language model is not simply “put the model on a GPU and call `generate`.” Autoregressive decoding repeatedly reads a large model, appends one token, grows a key-value cache, and makes scheduling decisions while requests arrive and depart at different times. The arithmetic is familiar from the Transformer; the difficulty comes from **movement, memory, and coordination**.

This blog follows one central question: **where does useful GPU work disappear?** Static batches leave empty slots. Ordinary attention moves too much intermediate data. Contiguous KV-cache allocation reserves memory that a request may never use. Independent programs repeat common prefixes. Per-user adapters fragment memory and batching. GPU sharing can create interference unless the isolation mechanism matches the workload. Each serving system in this blog recovers one of those losses.

## 1. The Serving Workload

### Prefill and Decode Are Different Phases

An LLM request has two computational phases. During **prefill**, the model processes the prompt tokens, constructs their hidden states, and fills the initial KV cache. The prompt is already known, so its token positions can be processed in parallel inside each layer. Prefill therefore resembles a large matrix-multiplication workload and can use GPU compute efficiently.

During **decode**, the model produces one new token at a time. Token $t+1$ depends on the sampled or selected token $t$, so generation is sequential across time. Within one decoding step, the model still runs large matrix operations, but each active request contributes only one new query position. The weights must be read again for every step, and the KV cache must be consulted and extended.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-007.webp" alt="Prefill and autoregressive decoding phases of an LLM request" loading="lazy" decoding="async"><figcaption>Prefill consumes the known prompt in parallel; decode repeatedly appends one token. Their compute and memory profiles are different. Course slide 7.</figcaption></figure>

For many decode workloads, memory traffic rather than raw floating-point capacity becomes the bottleneck. A rough 13-billion-parameter example in the course material uses about 26 GB for half-precision weights. Even before the KV cache and temporary buffers, one decoding step must stream a large fraction of those weights through the device. The precise throughput depends on hardware, kernels, quantization, tensor parallelism, sequence length, and batch size; the important point is that **a small decode batch may not create enough arithmetic per byte moved**.

The serving objective is therefore multi-dimensional:

- **time to first token (TTFT):** queueing plus prefill time;
- **inter-token latency (ITL):** delay between successive output tokens;
- **end-to-end latency:** time until the complete response arrives;
- **throughput:** completed requests or generated tokens per unit time;
- **goodput:** useful throughput that still satisfies latency targets;
- **cost:** GPU time and infrastructure cost per successful request.

Optimizing one number can damage another. Waiting to form a larger batch may improve throughput but increase TTFT. Giving every request an enormous reserved cache may avoid reallocation but reduce the number of concurrent users. A production scheduler needs a service-level objective, not merely the largest tokens-per-second number.

### Why Ordinary Static Batching Wastes Work

Suppose four requests begin together but require 20, 50, 80, and 100 output tokens. A static batch keeps its original shape until the longest sequence finishes. After the first request completes, its slot performs padding work or remains idle while the other requests continue. Near the end, one real sequence may occupy a batch designed for four.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm7-serving/llm7-slide-009.webp" alt="Static batching compared with dynamic request admission" loading="lazy" decoding="async"><figcaption>Static batching ties the lifetime of the batch to its longest request. Dynamic admission can reuse completed slots. Course slide 9.</figcaption></figure>

**Dynamic batching** collects requests that arrive within a short window, runs them together, and forms a new batch after completion. This is effective for one-shot models, but autoregressive sequences still finish at different times inside a generation batch.

**Continuous batching**, introduced prominently in systems such as Orca, schedules at the iteration level. When one sequence finishes, the scheduler removes it and admits another request at the next decoding iteration. The active batch changes while generation is in progress.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-010.webp" alt="Iteration-level continuous batching for autoregressive decoding" loading="lazy" decoding="async"><figcaption>Continuous batching replaces finished sequences between decoding iterations instead of waiting for the entire batch to drain. Course slide 10.</figcaption></figure>

Consider active set $A_t$ at decoding iteration $t$. A simplified scheduler performs

$$
A_{t+1}=\bigl(A_t\setminus F_t\bigr)\cup N_t,
$$

where $F_t$ is the set that finished during the iteration and $N_t$ is a set of admitted requests that fit the available memory. The difficult word is **fit**. Continuous batching can keep compute busy only if the cache allocator can place each request without reserving large unused regions. That brings us to attention and memory movement.

## 2. FlashAttention

### Attention Is Simple Algebra with Expensive Data Movement

For queries $Q$, keys $K$, and values $V$, scaled dot-product attention is

$$
O=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

A straightforward implementation computes the score matrix $S=QK^\top/\sqrt{d_k}$, writes $S$ to high-bandwidth memory (HBM), reads it for softmax, writes the probability matrix $P$, then reads $P$ again to multiply by $V$. The score and probability matrices contain $O(n^2)$ entries for sequence length $n$. The GPU may perform the necessary FLOPs quickly while repeatedly moving those intermediates between HBM and on-chip SRAM.

The hierarchy matters. On the hardware example used in the course, SRAM is much smaller but roughly an order of magnitude faster than HBM. Exact numbers vary by accelerator generation. The stable principle is that **a kernel can become faster without reducing the mathematical FLOP count if it reduces slow memory reads and writes**.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-019.webp" alt="GPU memory hierarchy motivating IO-aware attention" loading="lazy" decoding="async"><figcaption>Fast on-chip memory is scarce; HBM is larger but slower. FlashAttention is designed around this hierarchy. Course slide 19.</figcaption></figure>

FlashAttention tiles $Q$, $K$, and $V$ into blocks that fit in SRAM. A query block is combined with one key/value block at a time, and the output is updated without materializing the complete $n\times n$ attention matrix in HBM. This is **exact attention** up to ordinary floating-point effects—not sparse attention and not a low-rank approximation.

### Online Softmax Makes Tiling Possible

Softmax appears to require the maximum and normalizer over an entire row:

$$
p_i=\frac{e^{x_i-m}}{\ell},\qquad
m=\max_j x_j,\qquad
\ell=\sum_j e^{x_j-m}.
$$

The subtraction by $m$ prevents overflow. If a row is split into blocks, we do not initially know its global maximum. Online softmax carries enough summary state to combine blocks exactly.

For block 1, let maximum $m_1$, normalizer $\ell_1$, and normalized weighted output $o_1$ be known. Define $m_2,\ell_2,o_2$ for block 2. The combined maximum is

$$
m=\max(m_1,m_2),
$$

and the combined normalizer is

$$
\ell=e^{m_1-m}\ell_1+e^{m_2-m}\ell_2.
$$

The output summaries combine as

$$
o=\frac{e^{m_1-m}\ell_1o_1+e^{m_2-m}\ell_2o_2}{\ell}.
$$

The rescaling terms are the key. If the second block contains a larger logit, the first block's previous exponentials are corrected into the new coordinate system rather than recomputed from scratch.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-025.webp" alt="Blockwise tiled attention with online softmax statistics" loading="lazy" decoding="async"><figcaption>Tiled attention carries a running maximum and normalizer so complete attention rows need not live in HBM. Course slide 25.</figcaption></figure>

During backpropagation, FlashAttention saves compact row statistics and recomputes some intermediates instead of storing the full probability matrix. This is a deliberate compute-for-memory trade: extra arithmetic can be cheaper than HBM traffic. The technique also extends to causal masks and block-sparse patterns.

The original results reported several-fold attention speedups and large memory reductions in specific training configurations. Those figures should not be treated as universal constants; sequence length, head dimension, GPU, precision, and kernel version all matter. The durable lesson is stronger: **asymptotic arithmetic complexity alone does not predict wall-clock performance**. FlashAttention keeps $O(n^2)$ attention arithmetic but changes the I/O complexity and therefore the realized speed.

## 3. KV Cache and PagedAttention

### What the Cache Stores

At decode step $t$, self-attention needs keys and values for tokens $1,\ldots,t$. Recomputing them from the full prefix at every step would repeat almost all previous work. The KV cache stores each layer's past key and value tensors; the new query attends to this cache, then the new token's key and value are appended.

For a model with $L$ layers, $H_{kv}$ key/value heads, head dimension $d_h$, sequence length $T$, and $b$ bytes per element, a useful estimate is

$$
M_{KV}\approx 2LTH_{kv}d_hb.
$$

The factor 2 represents keys and values. For ordinary multi-head attention, $H_{kv}=H_q$ and $H_{kv}d_h$ is the model width. Multi-query attention and grouped-query attention reduce $H_{kv}$, often cutting cache memory substantially.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-040.webp" alt="KV cache growth through autoregressive decoding" loading="lazy" decoding="async"><figcaption>The KV cache avoids recomputing earlier tokens, but grows with sequence length for every layer and active request. Course slide 40.</figcaption></figure>

Now imagine reserving one contiguous region sized for each request's maximum possible sequence length. A request that stops early leaves most of its reservation unused—**internal fragmentation**. As requests of different sizes arrive and finish, enough total free memory may exist but not as one sufficiently large contiguous segment—**external fragmentation**. The course cites observations in which ordinary contiguous allocation used only a minority of reserved cache capacity for real tokens.

### Paging the Cache

PagedAttention borrows the virtual-memory idea. Each sequence's logical KV cache is divided into fixed-size blocks. A block table maps logical blocks to non-contiguous physical blocks in GPU memory. Attention kernels follow that mapping while reading keys and values.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-048.webp" alt="Logical KV-cache blocks mapped to noncontiguous physical GPU blocks" loading="lazy" decoding="async"><figcaption>PagedAttention separates a request's logical token order from physical cache placement. Course slide 48.</figcaption></figure>

Only the final block of a sequence can be partially filled, so internal waste is bounded by fewer than one block per sequence. Physical blocks can be allocated wherever space exists, removing the need for one contiguous range. A small block reduces waste but increases block-table entries and addressing overhead; a large block simplifies mapping but wastes more capacity at sequence tails. The vLLM study found a block size around 16 tokens effective across its tested workloads, but this is a system parameter rather than a law.

Indirection adds kernel overhead—the course reports roughly 10–15% in one comparison—but capacity can improve much more. If paging allows twice as many useful tokens to remain resident, continuous batching has more requests available to amortize weight reads.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-052.webp" alt="PagedAttention reducing internal and external fragmentation" loading="lazy" decoding="async"><figcaption>Paging confines unused space to the final block and lets physical blocks be reused immediately. Course slide 52.</figcaption></figure>

### Sharing and Preemption

Block-based storage enables more than compact allocation. Several sequences can initially point to the same physical prefix blocks. Parallel samples, beam search, and prompts with a shared system message can reuse those cache entries. When one sequence diverges, copy-on-write gives it a private block only for the changed suffix.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-059.webp" alt="Copy-on-write sharing of prefix KV-cache blocks" loading="lazy" decoding="async"><figcaption>Shared prefix blocks avoid duplicating identical KV states; copy-on-write preserves independent continuations. Course slide 59.</figcaption></figure>

If the GPU still runs out of cache blocks, the scheduler must preempt work. Two options are common:

- **swap:** copy KV blocks to CPU memory and later restore them;
- **recompute:** discard the cache and rebuild it from the token prefix when the request resumes.

Recompute is often attractive when PCIe transfer would be slower than another prefill, but the trade depends on prefix length and hardware. A first-come-first-served scheduler can preempt the most recently admitted request, preserving progress for older requests. Fairness, latency SLOs, and priority classes may require more sophisticated policies.

## 4. vLLM

vLLM turns PagedAttention into a complete serving engine. A front-end receives requests; a scheduler decides which sequences run in the next iteration; a block manager allocates logical and physical KV blocks; workers execute model shards; and cache engines move or address blocks on each device. Tensor parallelism can distribute one model across GPUs while each worker maintains its portion of the cache.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-066.webp" alt="vLLM architecture with scheduler block manager workers and cache engines" loading="lazy" decoding="async"><figcaption>vLLM couples an iteration-level scheduler with a block manager and PagedAttention-aware workers. Course slide 66.</figcaption></figure>

The scheduler must estimate not just batch size but required cache growth. At each step, every decoding sequence needs room for another token. A newly admitted prompt may require several blocks during prefill. If the engine admits too much work, it immediately preempts; if it is too conservative, GPU capacity remains idle.

The vLLM evaluation used instruction-like and conversation-like request distributions, and compared against systems with different batching and cache policies. Reported throughput gains were especially strong for beam search and parallel sampling because prefix sharing eliminates duplicate cache storage. Exact multiples depend on model and workload, but the causal chain is clear:

$$
\text{less fragmentation}
\Rightarrow \text{more resident tokens}
\Rightarrow \text{larger useful batches}
\Rightarrow \text{better weight amortization}.
$$

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-068.webp" alt="vLLM throughput comparison across serving systems" loading="lazy" decoding="async"><figcaption>The published comparison attributes much of vLLM's gain to efficient cache capacity rather than a different language model. Course slide 68.</figcaption></figure>

That distinction matters when benchmarking. If two servers use different quantization, maximum sequence length, sampling parameters, tokenizer, or latency target, a raw throughput ratio may not isolate the serving system. A fair experiment fixes model outputs and request traces, warms up kernels, reports percentiles, and records both latency and throughput.

## 5. SGLang and RadixAttention

### LLM Applications Are Programs

A modern LLM application rarely makes one independent call. It may construct a system prompt, ask several questions about the same document, branch into parallel candidates, enforce JSON syntax, call a tool, and then synthesize the results. A serving API that sees only unrelated strings cannot exploit this program structure.

SGLang separates a structured front-end language from an optimized runtime. The program can append text to a prompt state, generate with a regular-expression constraint, choose from candidates, fork states for parallel work, and join results. The runtime sees which calls share a prefix and which output format is constrained.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-076.webp" alt="An SGLang program containing generation selection and prompt-state operations" loading="lazy" decoding="async"><figcaption>SGLang exposes multi-call structure instead of forcing every step into an opaque independent request. Course slide 76.</figcaption></figure>

Common applications repeatedly reuse prefixes:

- few-shot examples shared by many questions;
- system instructions shared across a conversation;
- a document shared across several extraction prompts;
- a tree-search root shared across candidate branches;
- retrieved context reused while testing several answers.

### RadixAttention

RadixAttention stores cached prefixes in a radix tree. Each edge represents a token subsequence and each node refers to paged KV-cache blocks. A new request walks the tree to find its longest cached prefix. Only the unmatched suffix needs prefill.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-082.webp" alt="Radix tree organizing reusable prompt prefixes" loading="lazy" decoding="async"><figcaption>A radix tree compactly represents many shared prefixes and connects them to paged GPU KV memory. Course slide 82.</figcaption></figure>

When memory is full, SGLang can evict least-recently-used leaf nodes. A leaf is safe to remove because no longer cached sequence depends on it as an internal prefix. Cache-aware scheduling prefers requests with the longest currently cached prefix; for offline workloads, this tends toward depth-first traversal, completing a subtree before evicting its shared ancestors. Under stated cache assumptions, the paper shows an optimality result for its longest-prefix-first ordering.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-087.webp" alt="Cache-aware scheduling over a radix tree" loading="lazy" decoding="async"><figcaption>Scheduling requests with shared prefixes together converts application structure into less prefill work. Course slide 87.</figcaption></figure>

This optimization has limits. A long conversation with almost no reusable prefix across users may gain little. A greedy prefix scheduler can also starve requests with no cache match; online services need fairness or aging. Prefix identity is token-level: two semantically equivalent prompts with different token sequences do not share their cached computation.

### Constrained Decoding and Jump-Forward

If the output must satisfy a regular expression or grammar, a finite-state machine can determine which tokens are legal at each step. The decoder masks illegal logits before sampling. A naive system still calls the model for every punctuation mark and fixed keyword. SGLang compresses deterministic stretches of the state machine and **jumps forward** through forced strings, then retokenizes the combined text to preserve tokenizer consistency.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-092.webp" alt="Finite-state-machine constrained decoding and compressed transitions" loading="lazy" decoding="async"><figcaption>Constrained decoding uses grammar state to mask invalid tokens; deterministic spans can sometimes be skipped as a unit. Course slide 92.</figcaption></figure>

The optimization must be applied carefully when tokenization boundaries or probabilistic choices interact with the forced string. The point is broader than one implementation: the runtime becomes more efficient when it understands the application's control and output constraints.

Across the evaluated workloads, the SGLang study reported gains up to several-fold over contemporary baselines, with the largest gains on programs containing substantial prefix reuse or constrained output. The right interpretation is not “SGLang is always $6.4\times$ faster.” It is “explicit program structure creates optimization opportunities that a flat completion API cannot see.”

## 6. Serving Thousands of LoRA Adapters

### The Multi-Tenant Adapter Problem

LoRA represents a task-specific update through low-rank matrices. With one common convention,

$$
h=xW+xAB,
$$

where $W\in\mathbb{R}^{d_{in}\times d_{out}}$ is frozen, $A\in\mathbb{R}^{d_{in}\times r}$, and $B\in\mathbb{R}^{r\times d_{out}}$. Other libraries write the factors in the reverse order; dimensions, not letter names, determine the operation.

One adapter is small, but a service may host thousands. Keeping every adapter on the GPU wastes scarce memory. Loading an adapter from CPU for every request introduces delay. Grouping requests by adapter improves locality but may leave users waiting and shrink batches.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-109.webp" alt="One shared base LLM serving many personalized LoRA adapters" loading="lazy" decoding="async"><figcaption>Personalized adapters turn one-model serving into a many-adapter memory and batching problem. Course slide 109.</figcaption></figure>

S-LoRA shares one base model and fetches only active adapters. It combines three system ideas:

1. **Unified paging:** GPU memory is dynamically shared between KV-cache blocks and adapter tensors rather than split into fixed pools.
2. **Heterogeneous batching:** requests using different adapters and even different ranks can remain in one batch.
3. **Custom kernels:** the base matrix multiplication is performed for the batch, while small adapter products are gathered and applied efficiently by adapter identity.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-114.webp" alt="S-LoRA architecture with CPU adapter storage unified paging and heterogeneous batches" loading="lazy" decoding="async"><figcaption>S-LoRA moves active adapters between CPU and GPU, co-manages adapter and KV memory, and preserves cross-adapter batching. Course slide 114.</figcaption></figure>

For a batch whose examples use adapters $a_i$, row $i$ of the conceptual computation is

$$
h_i=x_iW+x_iA_{a_i}B_{a_i},\qquad i=1,\ldots,B.
$$

Running $B$ independent tiny matrix multiplications would launch inefficient kernels. S-LoRA extends segmented-gather operations so rows are grouped by adapter and rank inside a custom kernel. In tensor parallelism, communication for the small LoRA outputs can be fused with the base model's collective operations.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-129.webp" alt="Segmented matrix operations for heterogeneous LoRA adapters" loading="lazy" decoding="async"><figcaption>Adapter-aware kernels apply many small low-rank updates without splitting the main request batch. Course slide 129.</figcaption></figure>

The S-LoRA evaluation reported serving orders of magnitude more adapters than simpler baselines and throughput improvements up to several-fold in its tested settings, while adding small per-token overhead. Capacity depends on adapter rank, base model, CPU memory, transfer bandwidth, popularity distribution, and request length. A production cache should keep hot adapters resident and prefetch when routing makes the next adapter predictable.

vLLM and S-LoRA solve overlapping but differently emphasized problems. vLLM's core contribution is efficient KV-cache management for general request serving. S-LoRA specializes the memory manager and kernels for very large adapter populations. Modern systems may incorporate ideas from both rather than force an exclusive choice.

## 7. Sharing GPUs Safely

### Space and Time Partitioning

Underutilized models tempt us to place several services on one GPU. There are two fundamental strategies.

**Space partitioning** gives each client a subset of GPU resources concurrently. It avoids full context switches and can provide predictable isolation, but each job sees only part of the device and the number of partitions is limited.

**Time partitioning** gives the full GPU to one client for a time slice, then switches. It can support many clients and lets each one use the full device, but context switching and queueing create latency variation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-143.webp" alt="Comparison of vLLM S-LoRA and GPU resource-sharing concerns" loading="lazy" decoding="async"><figcaption>Serving efficiency includes model memory, per-request cache, adapter population, and the isolation policy of the underlying GPU. Course slide 143.</figcaption></figure>

NVIDIA Multi-Instance GPU (MIG) is a hardware-backed space-partitioning mechanism. On supported devices, it creates fixed profiles with dedicated compute and memory resources and stronger fault and bandwidth isolation. NVIDIA Multi-Process Service (MPS) is a software mechanism that allows CUDA processes to share execution resources more flexibly, but provides weaker memory-bandwidth and fault isolation.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-146.webp" alt="MIG and MPS approaches to sharing a GPU" loading="lazy" decoding="async"><figcaption>MIG favors stronger hardware isolation with fixed profiles; MPS favors flexible sharing with weaker isolation. Course slide 146.</figcaption></figure>

This makes the security boundary important. MPS may be reasonable for trusted services belonging to one team. Stronger physical partitioning is preferable when tenants are mutually untrusted or when predictable memory bandwidth is part of the SLO.

### Partition Size Is a Queueing Decision

A small model under light concurrency may meet its latency target on a small MIG slice, freeing the rest of the GPU. As concurrency rises, the same slice creates a queue and loses throughput. Course measurements for FLAN-T5-XL and Mistral-7B illustrate the pattern: smaller profiles can be economical under light load, while larger profiles become necessary beyond particular concurrency ranges. Those thresholds are workload-specific.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-153.webp" alt="Latency and throughput trade-offs across GPU partition sizes" loading="lazy" decoding="async"><figcaption>A smaller slice can be cost-effective at low load, but queueing and reduced throughput dominate as concurrency rises. Course slide 153.</figcaption></figure>

A robust autoscaling policy should observe arrival rate, token lengths, TTFT percentiles, ITL percentiles, cache pressure, and preemption—not only GPU utilization. High utilization can mean efficient batching or an overloaded queue. Low utilization can mean overprovisioning or a decode workload starved by insufficient batch size.

## 8. Benchmarking a Serving System

Serving comparisons are easy to distort accidentally. Before interpreting a throughput graph, check:

1. **Same model and precision:** quantization or a different architecture changes both memory and speed.
2. **Same input/output distribution:** fixed 128-token outputs and real chat traffic stress different components.
3. **Same decoding policy:** beam search, sampling, speculative decoding, and constrained decoding do different work.
4. **Same latency constraint:** unlimited batching can inflate throughput while making interactive users wait.
5. **Warm-up and steady state:** compilation, cache population, and initial transfers should be reported separately.
6. **Percentiles, not only means:** p95 or p99 exposes queueing tails hidden by averages.
7. **Correctness parity:** a fast system that truncates, changes sampling, or violates constraints is not equivalent.

Little's Law provides a useful consistency check. If average throughput is $\lambda$ requests per second and mean time in the system is $W$ seconds, the mean number of concurrent requests is

$$
L=\lambda W.
$$

If a report claims high throughput and low latency under a fixed concurrency but these quantities are inconsistent, inspect what is being counted: tokens rather than requests, successful rather than submitted jobs, or server time rather than queueing plus server time.

For streaming generation, approximate end-to-end latency as

$$
T_{e2e}\approx T_{queue}+T_{prefill}+(N_{out}-1)T_{ITL},
$$

where $N_{out}$ is output length. ITL may itself change over time as the active batch and cache layout change, so distributions are more informative than one scalar.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm7-serving/llm7-slide-160.webp" alt="Serving measurements across partition and concurrency configurations" loading="lazy" decoding="async"><figcaption>Serving decisions should be based on the tested workload and latency target, not on one universal partition or batch size. Course slide 160.</figcaption></figure>

## 9. Design Checklist

The methods in this blog form one connected stack:

- **continuous batching** reuses finished batch slots;
- **FlashAttention** reduces attention's slow-memory traffic;
- **KV caching** prevents repeated prefix computation during decode;
- **PagedAttention** removes most cache fragmentation and enables sharing;
- **vLLM** integrates paging with scheduling and distributed workers;
- **SGLang** exposes program structure, prefix reuse, and output constraints;
- **S-LoRA** serves many adapters without breaking batching;
- **MIG/MPS/time sharing** decide how several services share the physical accelerator.

When designing a deployment, begin with the workload rather than the framework name. Measure prompt and output lengths, concurrency, prefix reuse, adapter popularity, latency objectives, and trust boundaries. Then decide which loss is actually dominant.

> **The central systems lesson:** LLM inference is often limited less by the number of arithmetic operations than by when data moves, where state lives, and whether unrelated requests can share useful work without violating isolation.

### References

- Yu et al., [Orca: A Distributed Serving System for Transformer-Based Generative Models](https://www.usenix.org/conference/osdi22/presentation/yu).
- Dao et al., [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135).
- Kwon et al., [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180).
- Zheng et al., [SGLang: Efficient Execution of Structured Language Model Programs](https://arxiv.org/abs/2312.07104).
- Sheng et al., [S-LoRA: Serving Thousands of Concurrent LoRA Adapters](https://arxiv.org/abs/2311.03285).
- NVIDIA, [Multi-Instance GPU User Guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/).
