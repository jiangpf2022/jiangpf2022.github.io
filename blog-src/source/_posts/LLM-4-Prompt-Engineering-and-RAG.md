---
title: LLM 4 - Prompt Engineering and RAG
date: 2026-10-02 18:00:00
categories: COMS6998E LLM-Based Generative AI
tags:
  - Prompt Engineering
  - Retrieval-Augmented Generation
  - BM25
  - Vector Search
  - HNSW
  - Reranking
mathjax: true
cover: "/images/columbia-low-memorial-library.jpg"
excerpt: "From testable prompts to evidence-grounded RAG systems: lexical and dense retrieval, BM25, vector search, HNSW, hybrid ranking, context construction, citations, and stage-by-stage debugging."
lesson_number: 4
lesson_level: 1
study_time: 90
---

Welcome back. In [LLM 3](/blog/2026/09/25/LLM-3-Decoding-Prompting-and-LLM-Applications/) we learned how decoding, demonstrations, reasoning patterns, tools, and post-processing shape an LLM application. Today we will make one distinction that changes how we design the entire system:

> A better prompt can clarify a task, but it cannot manufacture missing evidence.

Suppose a customer asks whether product `BB43300` has a two-year warranty. If no applicable policy has been supplied, rewriting the question ten times will not reveal the answer. The application needs both a **task specification** and **evidence**. Prompt engineering controls how the model should use information; retrieval supplies the information that may support the answer; validation checks whether the answer actually follows from it.

This lesson develops that full path. We begin by turning prompts into testable specifications, then build a small support assistant whose answers must cite a policy or abstain. From there we construct a retrieval-augmented generation system one component at a time: inverted indexes and BM25, dense embeddings, chunking, approximate nearest-neighbor search, NSW and HNSW graphs, hybrid retrieval, reranking, context construction, citations, and failure diagnosis. By the end, “RAG” will no longer mean “attach a vector database.” It will mean a sequence of separately testable decisions about what evidence reaches the model and what the model is allowed to claim.

## Prompts Become Testable Specifications

### A Prompt Is More Than a Question

A prompt is any input that asks a model to produce a desired output. It may be a short instruction—“Describe a holiday destination”—or a small program written in natural language, with rules, data, examples, and an output schema. The second view is more useful for serious applications because it forces us to ask what information belongs to the task and what success means.

Four building blocks provide a practical starting point:

| Block | Question it answers | Example in a support system |
| --- | --- | --- |
| **Instruction** | What should the model do? | Answer a warranty question using policy evidence. |
| **Context** | What setting and rules matter? | Product, region, effective date, and citation policy. |
| **Input data** | What material should be processed? | The user question and selected policy passages. |
| **Output requirement** | What form and behavior count as success? | Return an answer, evidence IDs, or insufficient evidence. |

The blocks are related but not interchangeable. An example answer is not current evidence. A policy excerpt is not an instruction. A JSON schema describes output shape but does not prove the content. Keeping these roles separate is the first defense against subtle failures.

Consider three applications:

- A document summary needs the document and a purpose; we should check whether the summary preserves meaning.
- Coding assistance needs requirements and relevant code; we should run tests and review the change.
- A policy answer needs the correct dated policy; we should check whether the cited passage supports the claim.

The prompt can specify all three workflows, but only the supplied document, code, or policy can provide their evidence.

### Make Requirements Observable

“Write a good answer” is not testable. “Use only the supplied policy, cite its ID for every duration, and return `insufficient evidence` when no applicable policy exists” is testable. An output requirement should let either a person or a program decide whether the response passed.

A useful prompt therefore specifies:

1. the decision or transformation;
2. the scope of permitted information;
3. required inputs and missing-input behavior;
4. the output structure;
5. factual, safety, and formatting constraints;
6. an explicit rule for uncertainty or abstention.

This does not mean every prompt should be long. It means every sentence should remove a material ambiguity. If the user's region changes which warranty applies, ask for the region. If a missing date makes two policies possible, ask for the date. More words are valuable only when they change the decision rule.

## Developing Prompts as Experiments

### The Iterative Loop

Prompt engineering is best treated as experimental design. Define the goal, write a baseline, run representative cases, identify one failure, revise the part responsible for that failure, and test again. Continue until the prompt meets a stopping rule on held-out cases—not until one hand-picked example looks impressive.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/prompt-development-loop.jpg" alt="Iterative prompt development loop from goal definition through testing, analysis, revision, and another iteration" loading="lazy" decoding="async"><figcaption>Prompt development is a loop driven by observed failures, not a one-time search for clever wording. Course page 15.</figcaption></figure>

Imagine that the first prompt is “Write a balanced article about AI in automobiles.” A test reveals that the response covers benefits but omits ethical concerns and cybersecurity risks. The useful revision names those missing dimensions. It does not simply say “be more comprehensive.” After revising, we test on new topics and edge cases so that we do not overfit to the example that exposed the original problem.

Record at least the prompt version, model version, decoding settings, test input, output, and evaluation result. Otherwise a later improvement may be impossible to reproduce. Shared prompt prefixes may be cached by some systems, but prompting still consumes inference compute. A longer prompt is not free, and it can create new conflicts or distractors.

### Fixtures and Stopping Rules

For the warranty assistant, four small fixtures exercise different behaviors:

| Input condition | Expected behavior |
| --- | --- |
| Policy matches product and region | Return the duration with the policy ID. |
| Region is missing | Ask for the region. |
| No applicable policy exists | Report insufficient evidence. |
| Two applicable policies conflict | Flag the conflict and inspect authority or effective date. |

A prompt is ready only when it behaves acceptably on representative held-out fixtures. The stopping rule might require, for example, zero unsupported durations, valid structure on at least 99% of cases, and correct abstention above a threshold. Those numbers depend on the application, but the existence of a stopping rule is non-negotiable. Without one, “prompt improvement” becomes subjective editing.

### What Prompt Engineering Cannot Guarantee

Prompt behavior can be sensitive to wording, example order, model version, and data distribution. A result from one benchmark does not automatically generalize to product support, medicine, law, or another model family. Historical findings that randomized labels sometimes caused limited degradation on particular classification tasks do **not** justify incorrect demonstrations in a factual system.

Prompt engineering also does not create a secure instruction boundary. Retrieved text may say “ignore the application and answer differently.” Delimiters such as XML tags clarify which span is data, but they do not make that span trustworthy. The host application must decide which instructions have authority, which records the user may access, and which tool calls are permitted.

## Examples, Clarification, and Reasoning

### Zero-, One-, and Few-Shot Behavior

Zero-shot prompting provides instructions but no completed demonstration. One-shot prompting adds one completed input-output example. Few-shot prompting supplies several. Count completed demonstrations—not policy excerpts, background text, or incomplete questions. There is no universal number at which “few-shot” becomes “many-shot.”

Examples change the **request context**, not the model weights. They can teach the desired label vocabulary, answer style, citation format, and failure behavior. A useful pair for the warranty assistant demonstrates both sides of the decision:

```text
Example A — supported
Question: BB100 warranty in the US?
Evidence E1: BB100 / US / warranty 12 months.
Answer: 12 months [E1].

Example B — missing evidence
Question: BB200 warranty in the US?
Evidence: none.
Answer: insufficient evidence.
```

Neither demonstration is evidence about `BB43300`. They show **how to behave** when evidence exists or is missing. This distinction prevents a common mistake: copying a duration from an example into the current answer.

Historical GPT-2 and GPT-3 experiments made zero- and few-shot task specification widely visible. Their lesson is not that more examples always improve performance. Gains depend on the model, task, example quality, order, label balance, and context length. Model scale also affected the ability to infer some tasks from context. Treat each change as an experiment against the metric that matters for the current system.

### Clarify Material Ambiguity

The interview pattern asks follow-up questions before answering. A travel planner might ask about destination type, prior trips, preferred activities, cultural interests, accommodation, and budget. The next question should reduce uncertainty that could materially change the plan. Asking every possible question wastes time; asking none forces the model to invent preferences.

The same principle applies to support. If region is required to select a policy, ask for it. If region does not affect the answer, do not create unnecessary friction. A good clarification policy connects each question to a decision boundary.

### Reasoning Is Useful but Not Evidence

Chain-of-thought demonstrations historically improved some arithmetic and symbolic benchmarks, especially for sufficiently capable models. Zero-shot instructions such as “think step by step” became useful baselines. But the size of the gain varies by model and benchmark, and a fluent derivation can still be wrong. The correct response to a multiplication problem is to verify the arithmetic independently; the correct response to a warranty question is to verify the cited policy.

Reasoning models can start with a direct request: decide whether the supplied policy applies, cite its ID if it does, and otherwise state what is missing. Add examples only if the baseline fails. A longer explanation is not stronger evidence. For operational systems, prefer outputs that expose checkable objects—selected record IDs, parsed dates, calculated values, and tool results—rather than trusting persuasive prose.

## From Prompt to Evidence-Grounded Application

### Separate Rules, Examples, and Current Evidence

The support assistant has three distinct inputs:

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/support-prompt-inputs.jpg" alt="Instruction, demonstrations, and current evidence feeding a supported result" loading="lazy" decoding="async"><figcaption>Rules define the task, demonstrations teach behavior, and current evidence supports the specific answer. Course page 51.</figcaption></figure>

The stable developer instruction can define the decision rule:

```text
Answer the warranty question for the specified product, region, and date.
Use only supplied policies.
Cite the policy ID for any duration.
If no policy applies, report insufficient evidence.
```

The current request then supplies the user question and authorized evidence. An API may keep these concepts separate through an `instructions` field and an `input` field. XML-style tags can mark evidence boundaries and preserve metadata:

```xml
<evidence>
  <policy id="P1" product="BB43300" region="US" effective="2026-08-01">
    Warranty: 12 months.
  </policy>
</evidence>
```

Before sending this record, the application should authorize it, verify product/region/date, and retain `P1` so the answer can cite it. The tags improve parsing; they do not establish authorization or factual correctness by themselves.

### Structured Output and Semantic Validation

A schema gives downstream code a stable shape:

```json
{
  "answer": "12 months",
  "evidence_ids": ["P1"],
  "insufficient_evidence": false
}
```

Syntactic validation checks whether the keys, types, and allowed values are correct. Semantic validation asks harder questions: Does `P1` apply to this product, region, and date? Does it actually say twelve months? Is the evidence current and authorized? Valid JSON can still contain an unsupported answer.

Response handling should also distinguish a refusal, an incomplete response, and a parsed object. A refusal may need a separate user-facing path. An incomplete generation may be retried or reported. A parsed object proceeds to evidence checks.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/response-validation.jpg" alt="Validation tree separating refusal, incomplete response, parsed object, and semantic evidence checks" loading="lazy" decoding="async"><figcaption>Parsing is only one branch of response handling; a parsed object still needs semantic support. Course page 60.</figcaption></figure>

This is the point where a prompt-only system reaches its limit. If the relevant policy is not already in the request, the application must find it.

## What RAG Changes

### External Evidence at Request Time

Retrieval-augmented generation (**RAG**) retrieves external evidence relevant to a request, selects evidence for the context, and generates an answer conditioned on both the question and that evidence. It can provide information that is current, private, or too large to encode reliably in model parameters. It can also be cheaper and easier to update than retraining a model whenever a policy changes.

Model parameters and request context play different roles. Parameters contain general language capabilities and patterns learned during training; a retrieval request does not rewrite them. The application inserts current policy text into the context for this answer. If the policy changes tomorrow, update the document store and retrieval path—not the model's memory of the world.

RAG is more than semantic search. Search returns relevant records. A RAG system also selects context, asks a generative model to use it, and validates the resulting claims. Lexical, dense, or hybrid retrieval can all supply candidates.

### Offline Indexing and Online Querying

The pipeline has two broad phases. During **indexing**, the application reads documents, splits them into usable passages, creates lexical or dense representations, stores the passages and metadata, and builds search indexes. During an **online query**, it:

1. interprets the question;
2. retrieves candidates;
3. optionally reranks them;
4. selects permitted, nonredundant context;
5. generates an answer;
6. validates citations and claims.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/rag-pipeline.jpg" alt="RAG pipeline with indexing, vector search, candidate retrieval, reranking, context selection, and generation" loading="lazy" decoding="async"><figcaption>Indexing prepares passages; the online path retrieves candidates, optionally reranks, selects context, and generates. Course page 70.</figcaption></figure>

Every stage has a distinct failure mode. If the correct policy never becomes a candidate, generation cannot repair retrieval. If it is retrieved but removed during truncation, inspect context construction. If it reaches the model but the answer contradicts it, inspect generation and validation. This separation is the foundation of practical RAG debugging.

## Lexical Retrieval and BM25

### Inverted Indexes Preserve Exact Terms

Lexical retrieval is strongest when exact identifiers matter: product codes, error messages, names, dates, and quoted phrases. An **inverted index** maps each term to a postings list of documents containing it. For three documents,

```text
D1: BB43300 warranty, US
D2: BB43300 setup guide
D3: CC100 warranty, US
```

the posting list for `BB43300` is $\{D1,D2\}$ and the list for `warranty` is $\{D1,D3\}$. An AND query intersects them and returns $D1$.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/inverted-index.jpg" alt="Three documents converted into term posting lists and intersected for a warranty query" loading="lazy" decoding="async"><figcaption>An inverted index retrieves exact lexical candidates efficiently; a ranker scores those candidates next. Course page 72.</figcaption></figure>

Tokenization, case normalization, stemming, stop-word handling, field boosts, and query operators all affect the result. Serial numbers should often remain intact. A tokenizer that splits `BB43300` unpredictably can destroy the very exact match lexical search is meant to preserve.

### BM25 Scoring

BM25 combines term rarity, term frequency with diminishing returns, and document-length normalization. A common form is

<div class="llm-math-display">
$$
\operatorname{BM25}(D,Q)=
\sum_{q_i\in Q}
\operatorname{IDF}(q_i)
\frac{f(q_i,D)(k_1+1)}
{f(q_i,D)+k_1\left(1-b+b\frac{|D|}{\operatorname{avgdl}}\right)}.
$$
</div>

Here $f(q_i,D)$ is the frequency of query term $q_i$ in document $D$, $|D|$ is document length, and $\operatorname{avgdl}$ is average document length. $k_1$ controls how quickly frequency saturates; $b$ controls the strength of length normalization. A typical inverse-document-frequency term is

$$
\operatorname{IDF}(q_i)=ln\!\left(\frac{N-n(q_i)+0.5}{n(q_i)+0.5}+1\right),
$$

where $N$ is the number of documents and $n(q_i)$ is the number containing the term. Rare terms receive more weight than common ones.

If $\operatorname{IDF}=1$, document length equals the average, and $k_1=1.2$, the frequency contribution becomes

$$
s(f)=\frac{2.2f}{f+1.2}.
$$

At $f=1$, the contribution is $1$; at $f=3$, it is approximately $1.571$. Repeating a term helps, but each additional occurrence helps less.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/bm25-saturation.jpg" alt="BM25 term-frequency contribution saturating while a linear TF-IDF contribution keeps increasing" loading="lazy" decoding="async"><figcaption>BM25 limits the reward for repeated terms instead of increasing the score linearly forever. Course page 76.</figcaption></figure>

Length normalization prevents long documents from winning simply because they repeat more terms. It can also penalize legitimately long records, so $k_1$ and $b$ must be evaluated on the actual corpus. BM25 reduces keyword stuffing incentives; it does not prevent every form of search manipulation.

## Dense Retrieval and Chunking

### Closing the Vocabulary Gap

Lexical search fails when a query and a relevant passage express the same idea with different words. “Strong pain in the side of the head” and “sharp temple headache” may share no useful keyword. A dense embedding model maps both into vectors trained so that semantically related queries and passages score similarly.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm4-lecture-4/vocabulary-gap.jpg" alt="Lexical search failing on two semantically related phrases with no shared keywords while a language model connects them" loading="lazy" decoding="async"><figcaption>Dense representations can bridge meaning when exact vocabulary does not overlap. Course page 78.</figcaption></figure>

Dense retrieval does not discover a universal geometry of meaning. Similarity depends on the encoder, training objective, domain, input formatting, and scoring metric. A model trained for general sentence similarity may not rank product policies correctly. Query and document encoders must be compatible, and embedding model versions must be tracked when the index is updated.

### Bi-Encoders and Similarity

A bi-encoder computes a query vector and each document vector separately:

$$
s(q,d)=E_Q(q)^{\mathsf T}E_D(d).
$$

Document vectors can be computed once and reused for many queries, which makes large-scale retrieval practical.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/bi-encoder.jpg" alt="A query and document passages embedded separately and compared in vector space" loading="lazy" decoding="async"><figcaption>A bi-encoder makes stored document vectors reusable across queries. Course page 81.</figcaption></figure>

Dot product and cosine similarity can rank the same vectors differently. Cosine removes vector magnitude:

$$
\cos(q,d)=\frac{q^{\mathsf T}d}{\|q\|_2\|d\|_2}.
$$

For $q=(1,0)$, $A=(2,2)$ has dot product $2$ and cosine $1/\sqrt2$, while $B=(1,0)$ has dot product $1$ and cosine $1$. Dot product ranks $A$ first; cosine ranks $B$ first. If vectors are normalized before storage, dot product and cosine produce the same ordering. The index and evaluator must use the metric for which the embeddings were trained.

### Chunking Is a Retrieval Decision

Documents are usually split into chunks before embedding. A tiny chunk may match the query but omit the sentence needed to answer it. A huge chunk preserves context but consumes tokens, mixes topics, and can dilute the retrieval signal. Useful chunk boundaries often follow headings, paragraphs, code units, policy clauses, or tables rather than arbitrary character counts.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/chunking.jpg" alt="A document divided into semantically meaningful sections that produce separate retrieval vectors" loading="lazy" decoding="async"><figcaption>Chunks should contain enough local context to support an answer and remain traceable to their source. Course page 83.</figcaption></figure>

Every chunk should retain metadata such as source ID, document version, heading, product, region, effective date, access policy, and character or page offsets. The vector finds a candidate; metadata determines whether the candidate is applicable, authorized, current, and citable.

## Approximate Nearest Neighbors

### Why Exact Search Becomes Expensive

Exact nearest-neighbor search compares a query with every stored vector. For $N$ vectors of dimension $d$, this costs about $O(Nd)$ distance work per query. Top-$k$ selection does not require fully sorting all $N$ distances, but it still requires computing them.

Memory matters as well. One million 768-dimensional `float32` vectors contain

$$
10^6\times768\times4=3.072\times10^9\text{ bytes},
$$

or about $3.072$ GB of raw vector values before IDs, metadata, graph edges, and index overhead. At larger scales, an **approximate nearest-neighbor** (**ANN**) index reduces work by searching selected regions or candidate paths. The cost is that it may miss the exact nearest result.

### Navigable Small-World Graphs

A navigable small-world (**NSW**) index represents vectors as graph nodes. New nodes connect to selected nearby nodes, while some longer links allow movement between distant regions. Search begins at an entry node, evaluates its neighbors, moves toward candidates closer to the query, and explores the neighborhood until its stopping rule is satisfied.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm4-lecture-4/nsw-graph.jpg" alt="Completed NSW proximity graph with eight vector nodes and local and long-range links" loading="lazy" decoding="async"><figcaption>Local links support refinement while longer links make distant regions reachable. Course page 96.</figcaption></figure>

A purely greedy walk can stop at a local choice. Let $q=(0,0)$ and nodes be $A=(4,0)$, $B=(3,0)$, $C=(5,1)$, and $D=(1,0)$, with edges $A-B$, $A-C$, and $C-D$. Starting at $A$ and moving only to a strictly closer neighbor reaches $B$ at distance $3$. From $B$ there is no closer connected node, so the walk stops—even though $D$ is the exact nearest node at distance $1$. Reaching $D$ would require first moving through the temporarily worse node $C$.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm4-lecture-4/ann-miss.jpg" alt="Approximate graph search returning a nearby node while missing the exact nearest vector" loading="lazy" decoding="async"><figcaption>An entry point and local graph structure can lead approximate search away from the exact nearest neighbor. Course page 105.</figcaption></figure>

Practical graph search keeps a candidate set instead of following only one edge. More exploration generally improves recall at a latency cost.

### HNSW Adds a Hierarchy

Hierarchical Navigable Small World (**HNSW**) assigns nodes to random maximum levels. Every node appears in the dense base layer; progressively fewer nodes appear in higher layers. Search starts in a sparse upper layer, makes long-distance progress, descends through denser layers, and finishes with local candidate exploration at layer $0$.

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm4-lecture-4/hnsw-levels.jpg" alt="Random level assignments determining which HNSW layers contain each vector" loading="lazy" decoding="async"><figcaption>Random maximum levels create sparse navigation layers above a dense base graph. Course page 109.</figcaption></figure>

<figure class="llm1-figure llm1-figure--half"><img src="/blog/images/llm4-lecture-4/hnsw-search.jpg" alt="HNSW descending from sparse upper layers to search base-layer candidates" loading="lazy" decoding="async"><figcaption>Upper layers support coarse navigation; the base layer supplies the final candidate neighborhood. Course page 108.</figcaption></figure>

HNSW exposes a recall-latency-memory trade-off. Greater graph degree and more construction effort usually improve index quality but consume memory and indexing time. Exploring more candidates at query time can improve recall but increases latency. The often-quoted logarithmic intuition is not a universal worst-case guarantee; measure the target workload against an exact reference.

### Measuring ANN Recall

For exact top-$k$ IDs $E_k$ and approximate top-$k$ IDs $A_k$, define

$$
\operatorname{recall@}k=\frac{|A_k\cap E_k|}{k}.
$$

If $E_3=\{A,B,C\}$ and $A_3=\{A,C,D\}$, recall@3 is $2/3$. The comparison must use the same corpus, vectors, metric, filters, and $k$. High ANN recall only means the approximate index resembles exact vector search. If both return an outdated policy, the freshness problem remains.

A vector database connects vector IDs to source text and metadata, supports similarity queries, and coordinates updates and deletes. Filtering may be required before or during ANN search so that users see only authorized records. Post-filtering can leave fewer than $k$ eligible results. Stored text, metadata, and vector indexes must remain synchronized.

## Hybrid Retrieval and Reranking

### Complementary Candidate Signals

Lexical and dense retrieval fail differently. Lexical search preserves exact identifiers such as `BB43300`; dense search can match paraphrases such as “How long is coverage?” to a passage containing “warranty duration.” A hybrid retriever runs both, unions their candidate IDs, removes duplicates, and combines their rankings.

Raw BM25 and cosine scores live on different scales, so adding them without calibration is unreliable. **Reciprocal rank fusion** (**RRF**) combines ranks instead:

$$
\operatorname{RRF}(d)=\sum_{i:d\in L_i}\frac{1}{c+\operatorname{rank}_i(d)},
$$

where $L_i$ is result list $i$, ranks start at $1$, and $c$ is a rank constant. With $c=60$, candidate $A$ at lexical rank $1$ and dense rank $3$ scores

$$
\frac{1}{61}+\frac{1}{63}\approx0.03227,
$$

while candidate $B$ at ranks $2$ and $1$ scores

$$
\frac{1}{62}+\frac{1}{61}\approx0.03252.
$$

$B$ wins because it ranks strongly across the two lists. RRF is robust to incompatible raw-score scales, but it cannot recover a document absent from every candidate list.

### Reranking a Smaller Set

A bi-encoder retrieves cheaply from a large corpus because query and document vectors are computed separately. A cross-encoder jointly processes each query-document pair, allowing richer interaction but requiring a model call or forward pass per pair. This makes cross-encoders well suited to reranking dozens of candidates rather than scanning millions of documents.

<figure class="llm1-figure llm1-figure--wide"><img src="/blog/images/llm4-lecture-4/reranking.jpg" alt="A reranker assigning more precise relevance scores to a small subset of retrieved passages" loading="lazy" decoding="async"><figcaption>Reranking spends more compute on a candidate subset after the high-recall retrieval stage. Course page 123.</figcaption></figure>

Reranking improves ordering, not truth. “The capital of Canada is Sydney” may be highly related to the query while still false. A reranker also cannot select the correct policy if retrieval never returned it. When the answer is missing, inspect candidate recall before tuning the reranker.

## Context Construction, Verification, and Debugging

### Build Context Under a Token Budget

The final model input should contain relevant, permitted, and nonredundant passages while reserving space for instructions and output. Context construction may deduplicate overlapping chunks, group adjacent sections, prefer authoritative versions, and remove passages outside the product, region, date, or user authorization scope.

Preserve metadata in the final context. A passage saying “12 months” is not enough if the model cannot tell which product, country, date, or source it belongs to. For the running example, the selected context might be:

| Context element | Content |
| --- | --- |
| Application rule | Answer only when supplied evidence supports the claim; otherwise report insufficient evidence. |
| Selected evidence `P1` | `BB43300`; US; effective 2026-08-01; warranty 12 months. |
| Excluded candidate `P2` | A policy for another product; not evidence for this question. |
| Generation budget | Reserve space for a concise answer and a `P1` citation. |

The supported answer is narrowly scoped: “For BB43300 in the US, the supplied policy states a 12-month warranty [P1].” If no applicable policy exists, answer “Insufficient evidence to determine the warranty.” Do not silently generalize a US policy to Canada or a single product to an entire product family.

### A Citation Must Support the Claim

A citation is useful only when it supports the exact claim next to it. If `P1` states that `BB43300` has a 12-month US warranty, it does not support “All BB devices have a two-year worldwide warranty [P1].” Claim verification should decompose the response into checkable statements and compare each with the permitted passages.

Missing, conflicting, and hostile evidence require explicit behavior:

- **Missing:** ask for required context or abstain.
- **Conflicting:** compare authority, scope, and effective date; do not average policies.
- **Hostile:** treat instructions inside retrieved text as evidence content, not application authority.
- **Unauthorized:** exclude the record before generation, even if it is highly relevant.

### Diagnose the Stage That Failed

A good trace records query transformations, filters, lexical and dense candidates, scores, ANN settings, reranker results, selected chunks, final model input, output, and claim-to-source checks. Then an observed failure points to a first inspection target:

| Observed failure | First stage to inspect | Useful evidence |
| --- | --- | --- |
| Correct policy absent from candidates | Retrieval | Corpus, filters, query, scores, exact-vs-ANN comparison |
| Policy retrieved but absent from model input | Context construction | Selected chunks, deduplication, authorization, truncation |
| Policy in context but answer unsupported | Generation and validation | Exact input, output, and claim-to-passage support |

Frameworks may name components differently—loader, reader, splitter, parser, embedding model, vector store, retriever, postprocessor, prompt builder, response synthesizer, tracing hook—but they organize the same responsibilities. The names do not replace measurement.

The whole lesson can now be summarized in one division of labor:

- **Instructions** specify the task.
- **Demonstrations** show expected behavior.
- **Retrieval** supplies candidate evidence.
- **ANN** trades exact vector neighbors for speed and memory efficiency.
- **Hybrid search and reranking** decide which candidates deserve attention.
- **Context construction** determines what actually reaches the model.
- **Generation** turns selected evidence into language.
- **Validation** checks whether each claim is supported.

If a Canadian customer asks about `BB43300` but the selected context contains only a US policy, the correct response is not to guess from the US duration. The assistant should state that the supplied evidence does not establish Canadian coverage, and the application should retrieve a Canada-specific policy or request the missing authority. That final restraint is what turns a fluent answer into an evidence-grounded system.
