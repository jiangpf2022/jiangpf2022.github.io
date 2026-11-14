(() => {
  "use strict";

  const QUIZ_PREFIX = "comse6998-quiz";
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const quizDefinitions = {
    1: {
      question: "A linear regression model between sales of a product (Y) and advertising budget (X) reports R² = 0.6 and TSS = 0.9. Select all statements that are true.",
      options: [
        "The amount of variability inherent in the sales data before regression is 0.45.",
        "The proportion of variability in Y explained by X is 0.54.",
        "The amount of variability explained by the regression is 0.36.",
        "The amount of variability in sales not explained by the model is 0.36.",
      ],
      answer: ["D"],
    },
    2: {
      question: "Choose the correct order of the machine-learning lifecycle steps: Model training, Monitoring, Model deployment, Retraining, Data preprocessing.",
      options: [
        "Data preprocessing → Model training → Model deployment → Monitoring → Retraining",
        "Model training → Data preprocessing → Monitoring → Model deployment → Retraining",
        "Data preprocessing → Model deployment → Model training → Retraining → Monitoring",
        "Monitoring → Data preprocessing → Model training → Retraining → Model deployment",
      ],
      answer: ["A"],
    },
    3: {
      question: "A contamination test has TP = 100, FP = 300, FN = 250, and TN = 350 across 1,000 water samples. Which bundle correctly gives: correctly classified samples; P(contaminated | predicted negative); precision; and F₁ score?",
      figure: "/blog/images/llm-quiz-1/q03-confusion-matrix.png",
      figureAlt: "Confusion matrix for the drinking-water contamination test",
      options: [
        "450; 41.67%; 25%; 0.27",
        "450; 25%; 41.67%; 0.33",
        "550; 41.67%; 28.57%; 0.27",
        "700; 58.33%; 75%; 0.73",
      ],
      answer: ["A"],
    },
    4: {
      question: "Study the cloud-training benchmark table and select every observation conformant with the data.",
      figure: "/blog/images/llm-quiz-1/q04-cloud-training-cost.png",
      figureAlt: "Training time and cost across GPU and cloud configurations",
      multiple: true,
      options: [
        "Training using K80 and V100 GPUs is costlier on AWS EC2 than on GCP.",
        "Training using K80 and V100 GPUs is less costly on AWS EC2 than on GCP.",
        "Wall-clock time differs across cloud platforms for the same GPU configuration.",
        "For training time below 25 seconds, K80 on GCP is the most cost-effective option.",
      ],
      answer: ["A", "C"],
    },
    5: {
      question: "Select all statements that are true about bias and variance in machine learning.",
      multiple: true,
      options: [
        "Training a complex model with a large amount of representative data should help reduce variance.",
        "When variance is high, increasing model capacity alone will reduce variance.",
        "When a model has high bias, training with more data necessarily lowers it.",
        "Bias is error caused by overly simplistic assumptions in the model.",
      ],
      answer: ["A", "D"],
    },
    6: {
      question: "With 1 < K < P, choose the increasing-training-time order for synchronous SGD variants over the same number of epochs.",
      options: [
        "K-batch sync → K-sync → Fully-sync",
        "K-sync → K-batch sync → Fully-sync",
        "Fully-sync → K-sync → K-batch sync",
        "K-batch sync → Fully-sync → K-sync",
      ],
      answer: ["A"],
    },
    7: {
      question: "With 1 < K < P, choose the increasing-training-time order for asynchronous SGD variants over the same number of epochs.",
      options: [
        "Async → K-batch async → K-async",
        "K-batch async → Async → K-async",
        "K-async → K-batch async → Async",
        "Async → K-async → K-batch async",
      ],
      answer: ["A"],
    },
    8: {
      question: "For the five boundary-case statements in the explanation below, choose the correct True/False sequence in order.",
      options: [
        "True, True, False, True, False",
        "False, True, False, False, True",
        "False, False, True, True, True",
        "False, False, False, True, False",
      ],
      answer: ["D"],
    },
    9: {
      question: "The server starts at W₁₀₀. Six arriving gradients were computed at versions 98, 99, 97, 100, 102, and 101 and are applied one by one. Which answer gives the six staleness values followed by max, min, and mean?",
      figure: "/blog/images/llm-quiz-1/q09-asynchronous-sgd.png",
      figureAlt: "Asynchronous SGD with four workers and a parameter server",
      options: [
        "2, 2, 5, 3, 2, 4; max 5, min 2, mean 3",
        "2, 1, 5, 3, 2, 4; max 5, min 1, mean 2.83",
        "2, 2, 3, 3, 2, 4; max 4, min 2, mean 2.67",
        "2, 3, 5, 4, 4, 5; max 5, min 2, mean 3.83",
      ],
      answer: ["A"],
    },
    10: {
      question: "A synchronous data-parallel experiment uses 131,072 images. Which bundle correctly reports the 256-GPU and 1,024-GPU throughput and the two scaling-efficiency claims?",
      figure: "/blog/images/llm-quiz-1/q10-scaling-efficiency.png",
      figureAlt: "Per-iteration time and scaling efficiency across GPU counts",
      options: [
        "44,281.08 and 159,843.90 images/s; above 85% through 256 GPUs: False; below 75% at 1,024 GPUs: True",
        "44,281.08 and 159,843.90 images/s; above 85% through 256 GPUs: True; below 75% at 1,024 GPUs: False",
        "2.96 and 0.82 images/s; above 85% through 256 GPUs: False; below 75% at 1,024 GPUs: True",
        "42,281.08 and 156,843.90 images/s; above 85% through 256 GPUs: True; below 75% at 1,024 GPUs: True",
      ],
      answer: ["A"],
    },
    11: {
      question: "A distributed setup alternates between a single-reducer parameter server and ring all-reduce. Select every correct communication-cost statement.",
      multiple: true,
      options: [
        "Average communication cost is proportional to N(P−1)(1+1/P).",
        "Communication becomes practically independent of the number of learners for very large P.",
        "Using ring all-reduce every round can scale better than alternating with a parameter server.",
        "Aggregate communication cost remains linear in P even though ring all-reduce is used on alternate rounds.",
      ],
      answer: ["A", "C", "D"],
    },
    12: {
      question: "The four large-minibatch ResNet curves A–D correspond to 8, 64, 128, and 256 servers. Choose the correct mapping.",
      figure: "/blog/images/llm-quiz-1/q12-large-minibatch.png",
      figureAlt: "Large-minibatch distributed training curves A through D",
      options: [
        "A = 8, B = 128, C = 64, D = 256",
        "A = 8, B = 64, C = 128, D = 256",
        "A = 256, B = 128, C = 64, D = 8",
        "A = 64, B = 8, C = 256, D = 128",
      ],
      answer: ["A"],
    },
    13: {
      question: "Select all statements that are true about sequence-to-sequence models without attention.",
      multiple: true,
      options: [
        "Both the encoder and decoder maintain hidden states.",
        "The context passed from encoder to decoder is the encoder's last hidden state.",
        "The decoder gives different scores to different encoder hidden states.",
        "The context vector is a bottleneck because it is computationally expensive to compute.",
      ],
      answer: ["A", "B"],
    },
    14: {
      question: "Which statements about Transformers are true? Select all that apply.",
      multiple: true,
      options: [
        "Transformers consist of a single encoder and decoder network.",
        "Residual connections are applied around attention layers and help gradient flow.",
        "Unlike RNNs, Transformers can process all input positions in parallel within a layer during training.",
        "Different encoder layers normally share their weights.",
      ],
      answer: ["B", "C"],
    },
    15: {
      question: "In self-attention, how are neighboring word values used to compute the context for a given word?",
      options: [
        "Select the lowest neighboring value.",
        "Take a simple average of neighboring values.",
        "Take a learned weighted sum of the value vectors.",
        "Select the highest neighboring value.",
      ],
      answer: ["C"],
    },
    16: {
      question: "Select all statements that are true about attention mechanisms in the original encoder–decoder Transformer.",
      multiple: true,
      options: [
        "Both self-attention and encoder–decoder attention are used in the decoder.",
        "Encoder–decoder attention is used only in the decoder.",
        "Self-attention is used only in the encoder.",
        "Both self-attention and encoder–decoder attention are used in the encoder.",
      ],
      answer: ["A", "B"],
    },
    17: {
      question: "BERT uses both self-attention layers and encoder–decoder attention. True or False?",
      options: ["True", "False"],
      answer: ["B"],
    },
    18: {
      question: "OpenAI GPT uses masked self-attention layers and no encoder–decoder attention. True or False?",
      options: ["True", "False"],
      answer: ["A"],
    },
    19: {
      question: "ELMo combines jointly trained left-to-right and right-to-left LSTMs to generate contextualized embeddings. True or False?",
      options: ["True", "False"],
      answer: ["A"],
    },
    20: {
      question: "Why is positional encoding necessary in Transformer architectures?",
      options: [
        "Attention weights are not normalized.",
        "Tokens vary in embedding dimension.",
        "Token order is otherwise lost.",
        "Transformers do not use activation functions.",
      ],
      answer: ["C"],
    },
    21: {
      question: "Layer normalization computes normalization statistics over which dimension?",
      options: [
        "Across all tokens in the batch",
        "Over the components of a single token embedding",
        "Across the full dataset",
        "Over the vocabulary space",
      ],
      answer: ["B"],
    },
    22: {
      question: "What is a primary architectural benefit of mixture-of-experts (MoE) over dense feed-forward layers?",
      options: [
        "Sparse activation reduces computation relative to activating every expert.",
        "MoE cannot be used with attention mechanisms.",
        "Every expert is activated for every input.",
        "MoE has lower expressive capacity.",
      ],
      answer: ["A"],
    },
    23: {
      question: "In an MoE Transformer layer, how are experts typically selected during inference?",
      options: [
        "By applying batch normalization",
        "By uniform random choice",
        "By a learned router mechanism",
        "By sorting parameters by magnitude",
      ],
      answer: ["C"],
    },
    24: {
      question: "How are token and position embeddings normally combined at a Transformer input?",
      options: [
        "Concatenation only",
        "Multiplication",
        "Element-wise addition",
        "Subtraction",
      ],
      answer: ["C"],
    },
    25: {
      question: "Where is layer normalization applied in a standard pre-norm Transformer block?",
      options: [
        "It is replaced entirely by dropout.",
        "Only after the final output layer",
        "Before every attention and feed-forward sublayer",
        "Between token and position embedding addition",
      ],
      answer: ["C"],
    },
  };

  const quiz3Definitions = {
    1: {
      question: "What does prompt engineering primarily involve?",
      options: [
        "Designing hardware for AI models",
        "Creating visualizations for AI data",
        "Building databases for storing AI outputs",
        "Developing and refining prompts to guide LLM behavior",
      ],
      answer: ["D"],
    },
    2: {
      question: "Which of the following are components of the Kubernetes architecture? Select all that apply.",
      multiple: true,
      options: ["Docker Engine", "Scheduler", "kubelet", "API Server"],
      answer: ["B", "C", "D"],
    },
    3: {
      question: "What is a common challenge when using LLMs for real-world applications such as SWE-bench?",
      options: [
        "Limited language support",
        "Large model sizes",
        "Difficulty in performing complex reasoning",
        "High computational cost",
      ],
      answer: ["C"],
    },
    4: {
      question: "How can a chatbot appear to have memory even though the language model is stateless between independent calls?",
      options: [
        "By providing the conversation history as context in each new transaction",
        "By assuming that the model permanently stores every previous interaction",
        "By relying on the context-window size without resending prior messages",
        "By continuously retraining the model on each user's messages",
      ],
      answer: ["A"],
    },
    5: {
      question: "Which are benefits of using containers? Select all that apply.",
      multiple: true,
      options: [
        "A consistent environment across systems",
        "Version-controlled application and environment specifications",
        "Resource limits through control groups (cgroups)",
        "Process and filesystem isolation",
      ],
      answer: ["A", "B", "C", "D"],
    },
    6: {
      question: "Why can deep-learning workloads need a specialized platform in addition to Kubernetes?",
      options: [
        "Kubernetes cannot expose GPU resources",
        "Deep learning needs scheduling policies for utilization and fairness that Kubernetes does not natively provide",
        "Kubernetes is always more expensive than bare metal",
        "Deep learning works only on bare-metal servers",
      ],
      answer: ["B"],
    },
    7: {
      question: "How does retrieval-augmented generation (RAG) differ from traditional semantic search?",
      options: [
        "RAG performs document retrieval only",
        "RAG combines retrieval with generation to produce a context-grounded response",
        "Semantic search necessarily uses more advanced algorithms than RAG",
        "Semantic search is always faster than RAG",
      ],
      answer: ["B"],
    },
    8: {
      question: "Which algorithm is commonly used for keyword search in traditional search engines?",
      options: ["HNSW", "BM25", "KNN", "VectorDB"],
      answer: ["B"],
    },
    9: {
      question: "What is a key advantage of vector databases in AI applications?",
      options: [
        "They always require less total storage",
        "They are always cheaper than relational databases",
        "They require no indexing configuration",
        "They optimize similarity-search operations over high-dimensional data",
      ],
      answer: ["D"],
    },
    10: {
      question: "In a Dockerfile, which instruction specifies the base image?",
      options: ["ENTRYPOINT", "CMD", "FROM", "RUN"],
      answer: ["C"],
    },
    11: {
      question: "Which method is commonly used to improve the ordering of dense-retrieval candidates?",
      options: ["HNSW", "Reranking", "ANN", "KNN"],
      answer: ["B"],
    },
    12: {
      question: "In agent development, what is an agent loop?",
      options: [
        "A process in which an agent selects a tool or action, observes the result, and repeats until a stopping condition is met",
        "An optimization trick that only reduces model latency",
        "A sequence that repeatedly retrieves documents without choosing actions",
        "A loop that intentionally has no stopping condition",
      ],
      answer: ["A"],
    },
    13: {
      question: "Which tool primarily belongs to the orchestration layer of the GenAI cloud stack?",
      options: ["Kubernetes", "Hugging Face", "LangChain", "MLflow"],
      answer: ["A"],
    },
    14: {
      question: "Which model architecture uses masked language modeling (MLM) as its characteristic pretraining objective?",
      options: ["Generative decoder-only models", "Sequence-to-sequence models", "Autoencoding encoder models", "Autoregressive models"],
      answer: ["C"],
    },
    15: {
      question: "What is the characteristic pretraining objective of an autoregressive language model?",
      options: ["Span corruption", "Masked language modeling", "Causal language modeling", "Bidirectional context reconstruction"],
      answer: ["C"],
    },
    16: {
      question: "BERT and RoBERTa are examples of which architecture family?",
      options: ["Autoregressive", "Hybrid", "Autoencoding", "Sequence-to-sequence"],
      answer: ["C"],
    },
    17: {
      question: "Which architecture is naturally suited to conditional generation tasks such as translation?",
      options: ["Sequence-to-sequence", "Transformer-only", "Autoregressive only", "Autoencoding only"],
      answer: ["A"],
    },
    18: {
      question: "Approximately how much GPU memory is needed to store one billion parameters in FP32?",
      options: ["2 GB", "4 GB", "8 GB", "1 GB"],
      answer: ["B"],
    },
    19: {
      question: "For FP32 training with Adam, excluding the parameter copy itself, approximately how many additional bytes per parameter may be needed for optimizer states, gradients, activations, and temporary memory under the course heuristic?",
      options: ["8 bytes", "20 bytes", "12 bytes", "16 bytes"],
      answer: ["B"],
    },
    20: {
      question: "Which 16-bit format keeps the same exponent width as FP32 while using fewer fraction bits?",
      options: ["FP16", "INT8", "FP64", "BF16"],
      answer: ["D"],
    },
    21: {
      question: "What is the main purpose of quantization in LLM training and inference workflows?",
      options: ["Guarantee faster training", "Increase model accuracy", "Reduce required memory", "Enable multi-GPU training"],
      answer: ["C"],
    },
    22: {
      question: "In Distributed Data Parallel (DDP) training, what is synchronized across GPUs during the backward pass?",
      options: ["Both gradients and model parameters", "Only the gradients", "Only the model parameters", "Neither gradients nor parameters"],
      answer: ["B"],
    },
    23: {
      question: "What is the main capacity advantage of Fully Sharded Data Parallel (FSDP) over ordinary DDP?",
      options: ["Better model accuracy", "Reduced memory usage per GPU", "Guaranteed faster training", "A simpler implementation"],
      answer: ["B"],
    },
  };

  const quiz4Definitions = {
    1: {
      question: "The Chinchilla paper primarily discusses the relationship between:",
      options: [
        "Model size and training speed",
        "Training time and model performance",
        "Model size, dataset size, and compute budget",
        "Dataset size and model accuracy",
      ],
      answer: ["C"],
    },
    2: {
      question: "According to the lecture, what is one petaflop/s-day equivalent to?",
      options: [
        "One million model parameters",
        "Computing chips running at one quadrillion (10¹⁵) floating-point operations per second for 24 hours",
        "One GPU running for 24 hours",
        "One trillion floating-point operations",
      ],
      answer: ["B"],
    },
    3: {
      question: "BloombergGPT's training data consisted of approximately:",
      options: ["100% financial data", "51% financial data", "75% financial data", "25% financial data"],
      answer: ["B"],
    },
    4: {
      question: "Which of the following is NOT a stage in ZeRO (Zero Redundancy Optimizer)?",
      options: ["Optimizer-state sharding", "Gradient sharding", "Parameter sharding", "Data sharding"],
      answer: ["D"],
    },
    5: {
      question: "For FP32-precision training, what total GPU RAM is typically budgeted per billion parameters when training overhead and the Adam optimizer are included?",
      options: ["4 GB", "24 GB", "48 GB", "12 GB"],
      answer: ["B"],
    },
    6: {
      question: "Which statements about catastrophic forgetting are true? Select all that apply.",
      multiple: true,
      options: [
        "It occurs when a model forgets previously learned information as it learns new information.",
        "Regularization can mitigate it by limiting changes to important model weights during training.",
        "It is a common problem in machine learning, especially in deep-learning models.",
        "It occurs only in supervised learning and is not a problem in unsupervised learning.",
      ],
      answer: ["A", "B", "C"],
    },
    7: {
      question: "What is the purpose of fine-tuning with prompt datasets?",
      options: [
        "To increase the computational resources required for training",
        "To decrease a pretrained model's accuracy by introducing new prompts",
        "To improve a pretrained model's performance and adaptability for specific tasks",
        "To eliminate the need for instructions and prompts",
      ],
      answer: ["C"],
    },
    8: {
      question: "Which full-fine-tuning challenges do parameter-efficient fine-tuning (PEFT) methods attempt to address? Select all that apply.",
      multiple: true,
      options: ["Model performance", "Computational constraints", "Catastrophic forgetting", "Storage requirements"],
      answer: ["A", "B", "C", "D"],
    },
    9: {
      question: "_______ uses many prompt-completion examples as labeled training data and updates model weights. This differs from _______, where examples are supplied during inference.",
      options: [
        "Pretraining; instruction fine-tuning",
        "Instruction fine-tuning; in-context learning",
        "In-context learning; instruction fine-tuning",
        "Prompt engineering; pretraining",
      ],
      answer: ["B"],
    },
    10: {
      question: "Fine-tuning on one task may improve that task while degrading performance on other tasks. What is this phenomenon called?",
      options: ["Catastrophic loss", "Catastrophic forgetting", "Instruction bias", "Model toxicity"],
      answer: ["B"],
    },
    11: {
      question: "Which statements about multi-task fine-tuning are correct? Select all that apply.",
      multiple: true,
      options: [
        "FLAN-T5 was trained with multi-task fine-tuning.",
        "Multi-task fine-tuning requires a separate model for every task.",
        "Multi-task fine-tuning necessarily produces slower inference.",
        "Multi-task fine-tuning can help prevent catastrophic forgetting.",
      ],
      answer: ["A", "D"],
    },
    12: {
      question: "Which are families of parameter-efficient fine-tuning methods? Select all that apply.",
      multiple: true,
      options: ["Subtractive", "Additive", "Reparameterization", "Selective"],
      answer: ["B", "C", "D"],
    },
    13: {
      question: "Which statement best describes how LoRA works?",
      options: [
        "It freezes all weights in the original model layers and introduces new components which are trained on new data.",
        "It continues the original pretraining objective and updates every original weight.",
        "It distills the pretrained LLM into a smaller model.",
        "It represents a weight update with two smaller low-rank matrices and trains those instead of all full model weights.",
      ],
      answer: ["D"],
    },
    14: {
      question: "What is a soft prompt in the context of LLMs?",
      options: [
        "A strict input sentence that constrains generation",
        "A method that controls behavior only by changing the learning rate",
        "A decoding rule that limits creativity",
        "A set of trainable prompt vectors whose values are learned for a task",
      ],
      answer: ["D"],
    },
    15: {
      question: "What makes LLM serving surprisingly slow even on powerful hardware?",
      options: [
        "Sequential dependency between output tokens",
        "GPU hardware limitations alone",
        "Model parameter size alone",
        "Network bandwidth constraints alone",
      ],
      answer: ["A"],
    },
    16: {
      question: "Which batching technique keeps the GPU utilized by inserting new sequences as other sequences finish?",
      options: ["Static batching", "Continuous batching", "Parallel batching", "Dynamic batching"],
      answer: ["B"],
    },
    17: {
      question: "Approximately how much GPU memory is required per KV-cache token for the 13B-parameter model discussed in the lecture?",
      options: ["500 KB", "100 KB", "1 MB", "5 MB"],
      answer: ["C"],
    },
    18: {
      question: "Which statements about PagedAttention are true? Select all that apply.",
      multiple: true,
      options: [
        "It enables sharing prompt blocks across samples.",
        "The reported implementation typically works best with a block size of 16.",
        "It divides KV-cache space into fixed-size blocks.",
        "It eliminates every form of internal fragmentation.",
      ],
      answer: ["A", "B", "C"],
    },
    19: {
      question: "What happens when a PagedAttention serving system runs out of KV-block memory?",
      options: [
        "It switches every computation to the CPU.",
        "It performs request preemption and later recovery.",
        "It automatically expands physical GPU memory.",
        "It immediately drops the request.",
      ],
      answer: ["B"],
    },
    20: {
      question: "What is the primary difference described between vLLM and S-LoRA when handling LoRA adapters?",
      options: [
        "S-LoRA always requires more GPU memory than vLLM.",
        "vLLM merges adapters into the base model, whereas S-LoRA keeps many adapters in main memory and pages active ones into GPU memory.",
        "vLLM uses only CPU memory, whereas S-LoRA uses only GPU memory.",
        "S-LoRA handles only a few adapters, whereas vLLM handles thousands.",
      ],
      answer: ["B"],
    },
    21: {
      question: "Let s contain four sentence embeddings: (0.4,0.5,0.2,0.1), (0.4,0.5,0.1,0.2), (0.1,0.5,0.2,0.4), and (0.1,0.2,0.5,0.4). For e(h)=(0.1,−0.1,0.2,−0.2), compute ROSCOE reasoning alignment r-align(h→s) to three decimal places.",
      inputs: [{ label: "r-align(h→s)", answer: 0.523, tolerance: 0.0005, placeholder: "0.000" }],
    },
    22: {
      question: "For a four-step hypothesis, the pairwise contradiction probabilities are 0.1, 0.3, 0.4, 0.01, 0.02, and 0.7. Compute the ROSCOE self-consistency score to one decimal place.",
      inputs: [{ label: "Self-consistency", answer: 0.3, tolerance: 0.05, placeholder: "0.0" }],
    },
    23: {
      question: "For two hypothesis sentences and four source sentences, the contradiction probabilities are {0.1,0.3,0.4,0.01} and {0.02,0.2,0.25,0.3}. Compute ROSCOE source-consistency to one decimal place.",
      inputs: [{ label: "Source-consistency", answer: 0.6, tolerance: 0.05, placeholder: "0.0" }],
    },
    24: {
      question: "Context: Sheila drives 5 miles a day to work from her home while her manager Tyler walks 3 miles a day to work from his home. Whose home is closer to work? Model explanation: Sheila's home is 3 miles from work. Tyler's home is 5 miles from work. So the answer is Sheila. Which ROSCOE error type appears?",
      options: ["Redundancy", "Repetition", "Grammar", "Factuality"],
      answer: ["D"],
    },
    25: {
      question: "Context: A class has 14 lectures in a semester, each lasting 2 hours. Rehan must miss 2 lectures for job interviews. Model explanation: Each lecture is 2 hours for 2×14=28 hours. Rehan misses 2 lectures for 2×2=4 hours. Rehan will miss 4 hours due to interviews. Rehan attends 28−4=24 hours. Which ROSCOE error type appears?",
      options: ["Grammar", "Redundancy", "Repetition", "Factuality"],
      answer: ["C"],
    },
    26: {
      question: "Reference: 'I like green eggs and ham'. Generated: 'I like green ham and egg'. Compute ROUGE-1 F1, ROUGE-2 F1, and ROUGE-L F1 to three decimal places.",
      inputs: [
        { label: "ROUGE-1 F1", answer: 0.833, tolerance: 0.0005, placeholder: "0.000" },
        { label: "ROUGE-2 F1", answer: 0.4, tolerance: 0.0005, placeholder: "0.000" },
        { label: "ROUGE-L F1", answer: 0.667, tolerance: 0.0005, placeholder: "0.000" },
      ],
    },
  };

  const quizSets = {
    1: quizDefinitions,
    3: quiz3Definitions,
    4: quiz4Definitions,
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const getQuestionNumber = (card) => {
    const label = card.querySelector(".llm-quiz-practice__label")?.textContent || "";
    return Number(label.match(/Q\s*(\d+)/i)?.[1] || 0);
  };

  const getQuizSet = (card) => Number(card.dataset.quizSet || 1);

  const getDefinition = (card) => quizSets[getQuizSet(card)]?.[getQuestionNumber(card)];

  const selectedValues = (card) =>
    [...card.querySelectorAll(".llm-quiz-option input:checked")]
      .map((input) => input.value)
      .sort();

  const numericValues = (card) =>
    [...card.querySelectorAll(".llm-quiz-numeric-input")].map((input) => Number(input.value));

  const arraysMatch = (left, right) =>
    left.length === right.length && left.every((value, index) => value === right[index]);

  const setResult = (card, kind, message) => {
    const result = card.querySelector(".llm-quiz-result");
    if (!result) return;
    result.className = `llm-quiz-result is-${kind}`;
    result.textContent = message;
  };

  const markCompleted = (card) => {
    card.classList.add("is-completed");
    let badge = card.querySelector(".llm-quiz-completed-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "llm-quiz-completed-badge";
      badge.textContent = "Completed · +1 EXP";
      card.querySelector("summary")?.appendChild(badge);
    }
  };

  const rewardCorrectAnswer = async (card) => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    if (!session || !client) {
      setResult(card, "correct", "Correct. Sign in with GitHub to earn 1 EXP for your first correct solve.");
      return;
    }

    const button = card.querySelector(".llm-quiz-check");
    if (button) button.disabled = true;
    setResult(card, "checking", "Correct — saving your result…");
    const { data, error } = await client.rpc("complete_quiz_question", {
      p_quiz_id: card.dataset.quizId,
    });
    if (error) {
      if (button) button.disabled = false;
      setResult(card, "error", "Correct, but EXP could not be synced. Please try again in a moment.");
      return;
    }

    const outcome = Array.isArray(data) ? data[0] : data;
    markCompleted(card);
    setResult(
      card,
      "correct",
      outcome?.awarded ? "Correct — first correct solve, +1 EXP!" : "Correct — this question has already awarded its EXP.",
    );
    await api.loadExperience?.();
  };

  const checkAnswer = async (card) => {
    const definition = getDefinition(card);
    if (!definition) return;
    if (definition.inputs) {
      const inputs = [...card.querySelectorAll(".llm-quiz-numeric-input")];
      if (inputs.some((input) => input.value.trim() === "")) {
        setResult(card, "error", "Enter every numerical answer first.");
        return;
      }
      const values = numericValues(card);
      const correct = values.every((value, index) => {
        const expected = definition.inputs[index];
        return Number.isFinite(value) && Math.abs(value - expected.answer) <= expected.tolerance;
      });
      const explanation = card.querySelector(".llm-quiz-answer");
      explanation?.removeAttribute("hidden");
      if (!correct) {
        card.classList.remove("is-correct");
        card.classList.add("is-incorrect");
        setResult(card, "incorrect", "Not quite. Check the definition and intermediate calculation, then try again.");
        return;
      }
      card.classList.remove("is-incorrect");
      card.classList.add("is-correct");
      await rewardCorrectAnswer(card);
      return;
    }
    const selected = selectedValues(card);
    if (!selected.length) {
      setResult(card, "error", definition.multiple ? "Select one or more answers first." : "Select an answer first.");
      return;
    }

    const answer = [...definition.answer].sort();
    const explanation = card.querySelector(".llm-quiz-answer");
    explanation?.removeAttribute("hidden");
    if (!arraysMatch(selected, answer)) {
      card.classList.remove("is-correct");
      card.classList.add("is-incorrect");
      setResult(card, "incorrect", "Not quite. Read the explanation, adjust your choice, and try again.");
      return;
    }

    card.classList.remove("is-incorrect");
    card.classList.add("is-correct");
    await rewardCorrectAnswer(card);
  };

  const renderCard = (card) => {
    if (card.dataset.quizReady === "true") return;
    const number = getQuestionNumber(card);
    const quizSet = getQuizSet(card);
    const definition = quizSets[quizSet]?.[number];
    const body = card.querySelector(".llm-quiz-practice__body");
    const question = body?.querySelector(":scope > p");
    const explanation = body?.querySelector(".llm-quiz-answer");
    if (!definition || !body || !question || !explanation) return;

    card.dataset.quizReady = "true";
    card.dataset.quizId = `${QUIZ_PREFIX}${quizSet}-q${number}`;
    question.innerHTML = `<strong>Question.</strong> ${escapeHtml(definition.question)}`;
    explanation.hidden = true;
    const answerTitle = explanation.querySelector("strong");
    if (answerTitle) answerTitle.textContent = "Explanation.";

    if (definition.figure) {
      const figure = document.createElement("figure");
      figure.className = "llm-quiz-figure";
      figure.innerHTML = `<img src="${escapeHtml(definition.figure)}" alt="${escapeHtml(definition.figureAlt || "Quiz reference figure")}" loading="lazy">`;
      question.insertAdjacentElement("afterend", figure);
    }

    const fieldset = document.createElement("fieldset");
    fieldset.className = "llm-quiz-options";
    if (definition.inputs) {
      fieldset.classList.add("llm-quiz-options--numeric");
      fieldset.innerHTML = `
        <legend>Enter the numerical answer${definition.inputs.length > 1 ? "s" : ""}</legend>
        ${definition.inputs
          .map(
            (input, index) =>
              `<label class="llm-quiz-numeric"><span>${escapeHtml(input.label)}</span><input class="llm-quiz-numeric-input" type="number" inputmode="decimal" step="any" name="quiz-${quizSet}-${number}-${index}" placeholder="${escapeHtml(input.placeholder || "")}"></label>`,
          )
          .join("")}
      `;
    } else {
      const inputType = definition.multiple ? "checkbox" : "radio";
      fieldset.innerHTML = `
        <legend>${definition.multiple ? "Select all that apply" : "Select one answer"}</legend>
        ${definition.options
          .map((option, index) => {
            const letter = LETTERS[index];
            return `<label class="llm-quiz-option"><input type="${inputType}" name="quiz-${quizSet}-${number}" value="${letter}"><span class="llm-quiz-option__letter">${letter}</span><span>${escapeHtml(option)}</span></label>`;
          })
          .join("")}
      `;
    }

    const actions = document.createElement("div");
    actions.className = "llm-quiz-actions";
    actions.innerHTML = '<button class="llm-quiz-check" type="button">Check answer</button><span class="llm-quiz-result" aria-live="polite"></span>';
    explanation.insertAdjacentElement("beforebegin", fieldset);
    explanation.insertAdjacentElement("beforebegin", actions);
  };

  const loadCompletedQuestions = async () => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    const cards = [...document.querySelectorAll('.llm-quiz-practice[data-quiz-id]')];
    if (!session || !client || !cards.length) return;
    const ids = cards.map((card) => card.dataset.quizId);
    const { data, error } = await client.from("quiz_completions").select("quiz_id").in("quiz_id", ids);
    if (error) return;
    const completed = new Set((data || []).map((row) => row.quiz_id));
    cards.forEach((card) => {
      if (completed.has(card.dataset.quizId)) markCompleted(card);
    });
  };

  const hydrate = () => {
    document.querySelectorAll(".llm-quiz-practice").forEach(renderCard);
    loadCompletedQuestions();
  };

  if (!window.__llmQuizPracticeInitialized) {
    window.__llmQuizPracticeInitialized = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".llm-quiz-check");
      if (!button) return;
      const card = button.closest(".llm-quiz-practice");
      if (card) checkAnswer(card);
    });
    document.addEventListener("change", (event) => {
      const input = event.target.closest(".llm-quiz-option input, .llm-quiz-numeric-input");
      if (!input) return;
      const card = input.closest(".llm-quiz-practice");
      if (!card || card.classList.contains("is-correct")) return;
      card.classList.remove("is-incorrect");
      const explanation = card.querySelector(".llm-quiz-answer");
      if (explanation) explanation.hidden = true;
      setResult(card, "idle", "");
    });
    document.addEventListener("blog-reader:state", (event) => {
      if (event.detail?.signedIn) loadCompletedQuestions();
    });
  }

  window.__llmQuizPractice = { hydrate };
  hydrate();
})();
