---
title: Deep Neural Networks - UC Berkeley
date: 2025-04-18 13:45:14
tags:
categories: ShanghaiTech University
mathjax: True
cover: "/images/2025-4-21-1.png"
---
<!-- ## Scope of Final Exam
$\textbf{Basics}$:  
$\textbf{Initialization}$:  
$\textbf{SGD}$:    
$\textbf{Optimizer}$:  
$\textbf{Convolutional Neural Nets}$:  
$\textbf{ResNets}$:  
$\textbf{Graph Neural Nets}$:  
$\textbf{Recurrent Neural Nets}$:  
RNN Introduction, Kalman Filter Example, RNN, Increasing Expressiveness, Dealing with Exploding Gradients, Dealing with Dying Gradients, Dealing with Multi-Scale Data(Not Finished Yet)  
$\textbf{Seq-to-Seq Problems}$: 
Machine Translation Example(Challenges), Encoder-Decoder Architecture, Teacher Forcing, Auto-Regression, Cross-Entropy Loss for Language Problems
$\textbf{State-Space Model}$:  
$\textbf{Attention Mechanism}$:  
Queries,Keys,Values,Cross-Attention,Self-Attention    
$\textbf{Self-supervision}$:  
$\textbf{Transformer}$:  
$\textbf{Fine-tuning}$:  
$\textbf{Embedding}$:  
$\textbf{Prompting}$:  
$\textbf{Low Rank Approximation}$:  
$\textbf{Meta Learning}$:  
$\textbf{Generative Models}$:  
$\textbf{Transfer Learning}$:  
$\textbf{Diffusion Models}$:   -->
## Basics
### Contents
### Homeworks
### Discussions
## Initialization:
### Contents
### Homeworks
### Discussions
## SGD
### Contents
### Homeworks
### Discussions
## Optimizer
### Contents
### Homeworks
### Discussions
## CNN
### Contents
### Homeworks
### Discussions
## GNN
### Contents
### Homeworks
### Discussions
## RNN
### Contents
#### RNN Introduction
RNN are designed for sequential data. In conv-net, we had filters defined by finite convolutions, i.e. FIR filters. In RNN, we had filters defined by internal state and weights, i.e. IIR filters.  
$\textbf{FIR( Finite Impulse Response):} \sum_i h[t-1]u[i]$  
$\textbf{IIR( Infinite Imyolse Response):} y_{t+1}=\beta_1 y_t+\beta_2 u_t$  
#### Kalman Filter Example
You have linear evolution of a true system with a description as
$$\vec{h_{t+1}}=A_{true} \vec{h_t} +B \vec{w_t} $$  
where $\vec{h}\_t$ are the underlying (hidden) states of the system, $\{\vec{\omega}\_{t}\}$ are some driving terms (e.g. white noise), and $A_{\text{true}}$ and $B$ are some coefficient matrices.  
A noisy observation is   
$$\vec{x_t}=C\vec{h_t}+V_t$$
#### RNN
writing the RNN as a block matrix multiplication
$$
A_0 \hat{h}_t + B_0 \vec{x}_t = 
\begin{bmatrix}
A_0 ,\; B_0
\end{bmatrix}
\begin{bmatrix}
\hat{h}_t \\
\vec{x}_t
\end{bmatrix}
\tag{4}
$$

and replace it by MLPs. Now, a box in the network becomes

$$
\vec{h}\_{t+1} = \text{MLP}\_W(\vec{h}\_t, \vec{x}\_t)
$$
Recall the structure of an RNN layer that takes in the input of the given time step and the hidden state:

$$
\vec{\hat{h}}\_t = \sigma\left(W\_h \vec{\hat{h}}\_{t-1} + W\_x \vec{x}\_{t-1} + \vec{b} \right),
$$

$$
\vec{\hat{h}}\_0 = \vec{0}, \quad \vec{\hat{h}} \in \mathbb{R}^{d\_h}
$$
![111](/images/2025-4-18-1.png)  
The back  propagation in RNN follows the same rule as any other neural networks,
$$
\frac{\partial L}{\partial W_i}
= \sum_j \frac{\partial L}{\partial h_{i,j}} \cdot \frac{\partial h_{i}}{\partial W_i}
$$

Remark: Downsampling is not applicable in RNNs, because sequential inputs, unlike images or graphs, are not strongly connected at all regardless of the scenario.
#### Increasing Expressiveness in RNN
We can modify the transformation $W$, by either appending an MLP before returning each hidden state, or if $W$ were an MLP by adding the number of the dimensions in the output.
![222](/images/2025-4-18-2.png)  
A more widely implemented method today is to compose the hidden states into more RNNs, thus providing both a better way of processing data as well as giving out a more intuitive explanation for weights. Namely, we can add horizontal layer.
![222](/images/2025-4-18-3.png)  
#### Dealing with Exploding Gradients
The most common way to deal with exploding gradients is to use saturating activation functions, which have a small gradient when the input is large. In other words, we are replacing ReLU with a function such as tanh or sigmoid.
![222](/images/2025-4-18-4.png)  
Gradient clipping is a standard technique to deal with exploding gradients in any kind of neural network.This requires simply clipping the gradients if they get above a certain value.  
In the case of RNNs, this will stop the gradient from exploding, but it may have unintended consequences because it will distort the “shape” on which gradient descent moves. Therefore, historically, people use tanh/sigmoid for RNNs, and gradient clipping can be seen as a last resort.  
Similar to CNN, we can also place a normalization layer between layers of an RNN, which helps deal with exploding gradients.
![222](/images/2025-4-18-5.png)  
However, there is an issue because without the entire sequence available, normalization is impossible, since we don't know all the values over which we want to normalize. One way to deal with this is to substitute the predicted effects of all other inputs we haven;t seen yet at test time to perform the normalization.  
Another way to deal with this is mini layer norm,
![222](/images/2025-4-18-6.png)  
Mini vertical norm is the same as mini layer norm, except instead of normalizing a hidden state’s path to the next layer, it normalizes its path to the next sequence step.
![222](/images/2025-4-18-7.png)  
And please note that this vertical norm is not done in practice. Because there is no issue with computation, it is just not practical or desired to mix the effect of different learned filters.
![222](/images/2025-4-18-8.png)  
And for batch norm, this is possibe, but not usually done. Because it is more difficult to implement than other forms of normalization because sequences from different samples could have different lengths.
#### Dealing with Dying Gradients
We can apply the same thing like residual blocks into RNNs as well. The picture below shows vertical skips
![222](/images/2025-4-18-9.png) 
The picture below shows horizontal skips. It is true mathematically and helps with dying gradients, but it may change the inductive bias of the RNN.  
![222](/images/2025-4-18-10.png) 
With RNNs, we typically want the learned weights to act primarily locally (in other words, learn mostly based on the input they directly receive at that sequence step). However, horizontal skips weaken this locality by bringing in an input from earlier in the sequence that will be less “dead” than the gradient coming from the sequence step directly previous. Put concisely, horizontal skips mean less favoring of local information (inputs nearby in sequence position).  
Is this a bad thing? It depends on the application. If it relies heavily on local data (short-term dependence), we would need a lot more data to force the RNN to look locally instead of using gradients from the past. If it requires more long-term dependence, then we are okay.
#### Dealing with multi-scale Information(LSTM) Optional
Information can be gleaned at different levels of precision(e.g. sentence level, phrase level.) This presents some challenges:1. Context in the data is long-lived (e.g. a full sentence), but can shift suddenly (e.g. that sentence ends and a new one starts). 2. Details that the RNN is looking for evolve and mix at different points in the sequence.
### Homeworks
#### Backprop through a Simple RNN
Considering the following 1D RNN with no nonlinearities. The formula is given by:
![222](/images/2025-4-19-1.png) 
![222](/images/2025-4-19-2.png) 
Ans:
$$(a) t=u\_{3}+s=u\_3+w \cdot r = u\_3 + w \cdot (u\_2 + w \cdot u\_1)=u\_3 + w \cdot u\_2 + w^2 \cdot u\_1$$
$$y=w \cdot t= w \cdot (u\_3 + w \cdot u\_2 + w^2 \cdot u\_1)= w \cdot u\_3 + w^2 \cdot u\_2 + w^3 \cdot u\_1$$
$$(b)\frac{\partial y}{\partial w}=u\_3 + 2w \cdot u\_2 + 3w^2 \cdot u\_1$$
$$(c)\frac{\partial y}{\partial p}=\frac{\partial y}{\partial q}\frac{\partial q}{\partial p}=\frac{\partial y}{\partial s} \cdot w \cdot \frac{\partial q}{\partial p}=w^3$$
$$(d) \frac{\partial y}{\partial w}=t+r \cdot \frac{\partial y}{\partial s}+ p \cdot \frac{\partial y}{\partial q}=(u\_3+w \cdot u\_2 + w^2 \cdot u\_1)+r \cdot w + p \cdot w^2$$
$$=(u\_3+w \cdot u\_2 + w^2 \cdot u\_1)+ (u\_2 + w \cdot u\_1) \cdot w + w \cdot u\_1 \cdot w=3w^2 \cdot u\_1 + 2w \cdot u\_2 + u\_3$$

### Discussion
## Seq-to-Seq Problems
### Contents
The goal is to map an input sequence of data to an output sequence.(e.g. predicting, generating a sequence). It's natural to consider RNN for seq-to-seq problems because RNNs are known to be useful using RNNs for seq-to-seq problems.
#### Machine Translation Example(Challenges)
There are potential challenges in RNN when utilizing it into machine translation tasks: 1. sequential processing process sequences one element at a time, which can result in slow computation for long sentences. 2. RNNs have a limited context window, which makes it difficult to capture relationships between words and phrases in longer sentences. 3. the order of the words in the source and target might be different, making it challenging for RNNs to learn correct alignment.
#### Encoder-Decoder Architecture
Each word is inputted into the encoder blocls sequentially and each block outputs a hidden state. Each block shares the same weight.
![222](/images/2025-4-19-3.png) 
Decoder takes the input representation and generates the output sequence one element at a time.  This allows the RNN decoder to capture dependencies and relationships between elements in the output sequence.
![222](/images/2025-4-19-4.png) 
#### Teacher Forcing
While training decoders, in order to avoid accumulative errors, we use the ground-truth tokens as input for the next time step.
![222](/images/2025-4-19-5.png) 
#### Auto-Regression
Autoregression is a technique that instead of using ground-truth tokens as input to the decoder at each time stamp, its tokens are generated by the decoder itself. Using noisy inputs helps the robustness of the model, which have a result ithat when received an imperfect token, the after parts can still stay stable. What's more, instead of over relying on clean data inputs, it helps better predictions when dealing with small errors.
![222](/images/2025-4-19-6.png) 
#### Cross-Entropy Loss for Language Problems
For sequence-to-sequence language generation tasks, the output data is discrete (e.g., words or characters), so cross-entropy loss is a very suitable choice. At each time step, the model produces a probability distribution over all possible tokens. We then use the one-hot representation of the ground-truth token to compute the loss:

$$
\mathcal{L} = -\sum\_{t=1}^{T} \log P(y\_t^{\text{true}} \mid \text{context})
$$

During inference, if we use autoregression, we can no longer feed the full probability distribution as input to the next time step — instead, we must convert the distribution into a specific token. Common methods include:

1. Greedy decoding: Select the token with the highest probability    
2. Sampling: Sample a token from the probability distribution    
3. Beam search: Keep a small number of top candidate sequences and explore them in parallel  
### Homeworks
### Discussions
## Attention Mechanism
### Contents
In language processing ,different languages have varying word orders, making the routing of information context-dependent. To address this issue, the goal is to add a "memory" to the existing Encoder-Decoder architecture that allows the input information to be stored and retrieved at the decoder. This allows the decoder has access to the right piece of information for every position, and facilitating the generation of high-quality output.
#### Queries-Keys-Values
![222](/images/2025-4-19-7.png)
Unlike the traditional hash table, our query may not always match to keys in the hash table, so we need to design a differentiable hash table which not only can get an appropriate forward value, but also backpropagate to make it work while training.
#### Great Ideas in Attention
**Idead(-1):look for an exact match for query and key and return a value**  
This doesn't works since we always fail to get the return value because we don't have the exact matching keys and queries. Additionally, we are unable to calculate the gradient using back-propagations since we won't get any matches.  
**Idea(0): scan for the closest match for query to key in the hash table and return the value**  
we can search for a value now. But we are using the similarity between query and key, which means small changes to the query or the key will result in the same output, and the gradient will be 0 as well.  
**Idea(1):Scan for the closest matches of query to the keys. Then return a weighted average of the values.**  
In this way, attention can be thought of as "queryable pooling", because keys and query values are also learnable parameters, but there are no learnable weights in the attention mechanism itself.  
Picture below shows the attention mechanism in RNNs.
![222](/images/2025-4-19-8.png)
In this way, we have
$$\vec{k}=W\_k \vec{x},\vec{q}=W\_q \vec{x},\vec{v}=W\_v \vec{x}$$
$$\text{Weighted Average}=\sum\_{i=1}^{n} Sim (\vec{q},\vec{k}\_i) \vec{v}\_i$$  
Here, the similarity function can be softmax or some kernel-based methods. In attention, we will use the normalized inner product,
$$e\_i =\frac{q^T k\_i}{\sqrt{d}}$$
where d is the dimensions of q and k.(Here according to the central limit theorem, the product has a standard deviation that is proportional to the square root of the number of variables being added together. So normalizing by dividing the root of the dimension keeps the score within a reasonable range).  
After that, we use softmax to compute the weights:
$$\alpha\_i = \frac{exp(e\_i)}{\sum\_j exp(e\_j)}$$  
To get the answer, we can simply say
$$\text{answer}=\sum\_i \alpha\_i v\_i$$
![222](/images/2025-4-19-9.png)
#### Cross-Attention and Self-Attention
If keys and values are obtained from the encoder, we call the attention layer Cross Attention. The key
and the value can use the same information as the input (like layer output / input etc.), but be generated
through different attention layers, so that they can focus on different parts of the info. If the key and the
value are from the decoder, we call it Self Attention. The benefit of this includes creating more routes to
prevent the gradient from dying. Note that in this way the key and the value must be causal, which means
they can only depend on the previous or current timestep. If time is current, only layers below can be seen
as the input. In a word, only the input side of the decoder can be used here.  
In Cross Attention, there are two ways for the gradients to go backwards: One through the hidden states
through the RNN encoder, and the other through the attention mechanism and the key / value to the
encoder. The hidden-state route can keep track of the time info (e.g. what’s the last word input?), while the
attention is normally unordered across input subscript i. However, we can also add time to the attention
input directly, which is called positional encoding.
### Homeworks
#### Kernelized Linear Attention(Part II)
![222](/images/2025-4-21-2.png)  
![222](/images/2025-4-21-3.png)  
Ans:  
{% raw %}
$$(a)i. sim_{softmax}(q,k)=exp(\frac{q^Tk}{\sqrt{D}})=exp(\frac{\frac{1}{2}({\|q\|_{2}}^2+{\|k\|_{2}}^2-{\|q-k\|_{2}}^2)}{\sqrt{D}})$$

$$=exp(\frac{{\|q\|_{2}}^2}{2\sqrt{D}})exp(\frac{{\|k\|_{2}}^2}{2\sqrt{D}})exp(\frac{{\|q-k\|_{2}}^2}{2\sqrt{D}})=exp(\frac{{\|q\|_{2}}^2}{2\sigma^2})exp(\frac{{\|k\|_{2}}^2}{2\sigma^2})K_{Gauss}(q,k)$$

$$ii.sim_{softmax}(q,k)=exp(\frac{{\|q\|_{2}}^2}{2\sigma^2})exp(\frac{{\|k\|_{2}}^2}{2\sigma^2})K_{Gauss}(q,k)$$
$$=exp(\frac{{\|q\|_{2}}^2}{2\sigma^2})exp(\frac{{\|k\|_{2}}^2}{2\sigma^2}) \phi_{random}(q) \cdot \phi_{random}(k)$$
$$\text{The computation cost is:}O(N(M+D)D_{random})$$
$$(b) \text{In (1), we have } V_i'=\frac{\sum_{j=1}^i sim(Q_i,K_j) V_j}{\sum_{j=1}^i sim(Q_i,K_j)}$$
$$\text{In (2), we have } V_i'=\frac{\phi(Q_i)^T \sum_{j=1}^i \phi(K_j) V_j^T}{\phi(Q_i)^T \sum_{j=1}^i \phi(K_j)}=\frac{\phi(Q_i)^T S_i}{\phi(Q_i)^T Z_i}$$
{% endraw %}
Note that $S\_i$ and $Z\_i$ can be computed by $S\_{i-1}, Z\_{i-1}$ in constant time hence making the computational complexity of linear transformers with causal masking linear with respect to the sequence length.
### Discussions
## Self-supervision
### Contents
### Homeworks
### Discussions
## Transformer
### Contents
#### Positional Encoding
Positional Encoding solves the problem that how to add time to the input vector.  
$\textbf{Idea -1}:$ Just increment a counter. Like mark the first place 1, the second place 2, etc. However, the number will becomes super large like 1000 fir the 1000th place. And it will cause an unbalanced encoding as the later places would be shining in the model.  
$\textbf{Idea 0}:$ Normalized counter. We set the largest step as 1 and the smallest number as 0. In this way, like for 1000, the difference between each step would be very tiny: just 0.001.  
$\textbf{Idea 1a:}$ Use circular time. We have  
$$e^{jwt}=cos(wt)+ isin(wt)$$
In this way, the norm of the positional encoding is always 1. However, the difference between two steps would still be very tiny when w goes. However, if $w$ is super small, the difference between two steps are still tiny, which means positional codes between two steps almost overlap and lost the ability for small-scale clarification.   
$\textbf{Idea 1b:}$ Use an ordered list to store the key and the value instead of using unordered dictionar.

### Homeworks
### Discussions
## Fine-tuning
### Contents
#### Fine-tuning
Transformer and its training are very hungry for training data, as they have fewer assumption to data structures like CNN and RNN, so they have a much weaker inductive bias. One way to solve this is take advantage of unlabeled data like self-supervision. Another way is amortization across tasks. In practice, the transformer is pre-trained on some tasks and possibly by self-supervision, then do the adjustment(fine-tuning) for the task we specifically care about. The basic method is adding a new head as follows. We remove the old head, add a new head with random initialization and then train new head on rask-specific data, while freezing the rest of the net.
![222](/images/2025-4-25-1.png)  
One way to think about this is that the last linear layer is the embedding of the learned features. We can choose anywhere along the newral network as the end of the embedding and remove the following structure as the old head.
#### Linear-Probing
![222](/images/2025-5-5-1.png)  
Classic way is to treat the pre-trained model as a feature extractor. We just train the head, freezing all the weight outside of those in the task-specific head.  
Ways of generating features:1. generate features from the output of the penultimate layer; 2. use outputs from previous layers; 3. average the outputs of various layers together.
#### Full Fine-Tuning
Treat the pre-trained model as a good starting point as initialization. However, even if we train everything together, we still need to initialize the head. Here are several ways:  
Approach #1: random initialization of the task specific head and begin the fine-tuning process. But it may send bad gradients through to the pre=trained model, potentially causing harmful changes to the pre-trained weights.  
Approach #2: first random initialization and only train head, then train all the remaining and do full fine-tuning.  
Classic method is faster and have lower requirement to the memory needed, while full fine-tuning have a higher accuracy but requires larger memory.
#### Updating A Subset of Weights
We can improve the pre-trained model itself by increasing the size of the network, using more data, using better and cleaner data or more proxy tasks, meta-learning, etc.  
More than that, we can do something between full fine-tuning and classic approaches. (like just update a subset of weights in the pre-trained model). There are possible ways to determine which subset to update:  
1. Update a different set of weights as you go.(Similar to SGD, only update part of the informations.)  
2. Selectively unfreezing the model top-down, like fine-tune top k layers. However, recent paper shows that unfreezing the bottom layers may also work when the training data and the actual data have different distributions.  
3. Selectively unfreeze Attention. When we use transformer, if we have different context-dependence compared to original training task, we can choose to unfreeze the attention components.
#### LoRA
When we are doing fine-tuning, we are most likely be moving in a subset of directions, which will approximate a low-rank update anyways by moving the important parameters a lot and moving the less important parameters very little. In order to perform LoRA, we introduce factorizations to our parameters,
{% raw %}
$$
W=W_0+LowRank_{Update}
$$
{% endraw %}  
where $W$ is a $n \times m$ matrix, $W_0$ is frozen, and $LowRank_{Update}$ is $k(n+m)$ parameters.  
LoRA can be generalized to what people call adaptors. These are other small structures put inside the pre-trained model to be tuned, and keeping everything else frozen. One way to think about it is:  
{% raw %}
$$
W=\sum _{i=1}^{min(n,m)} \sigma_i u_i v_i^T
$$
{% endraw %}  
SVD is a sum of rank 1 updates, starting with the most important updates.
#### Quantized Model
It's a method used for compression. In compression, there are 2 things happening:1. transform the domain;2. use quantization to give appropriate precision to the places where there is action and nothing to places where there is no action. These models can be thought of as a glorified PCA. When using weight decay, the model will learn to favor specific directions. When performing full fine-tuning, we are locally working with a linearized version of the model around the neighborhood of the initialized weights. If a model has billions of parameters, it is most likely not having an equal amount of motion along all the different weight directions. There are likely some
directions that are more important than others.
### Homeworks
### Discussions
## Embedding
### Contents

#### GPT-Style Embedding
GPT-style is the self-supervise or auto-complete by next word/token prediction like the system-id style.  
For language problems, we wish to get vectors from the text, which is called the problem of tokenizaiton and token embedding. This is done by parsing the input string into segments of tokens and followed by a look-up table that could be tuned/learned.
![222](/images/2025-4-25-2.png)    
GPT-style embedding starts with \<START\>  and outputs with a loss(cross entropy) between the first prediction and $Y_1$, then the network has $Y_1$ as input and predict the next. One benefit is that all the text could be used as the training data to do the next token prediction. The underlying lower dimensional structure or the embedding of language is presumably learned after training. The attributes of language are distilled from the autocomplete (next token prediction). One comment is that way more features than the training data may be obtained after this but that should be okay in our context. We may assume
the regularization works.
#### BERT-Style Embedding
![222](/images/2025-4-25-3.png)   
BERT Style does the data augmentation, such as the noisy and masked auto-endoding we have learned. Some fractions of the input are masked and the task is to reconstruct the embedding.(like $X_5$ here), the input like $X_5$ could be replaced with the mask which is a real vector.
#### Tokenization
Tokenization is necessary because textual information is given as sequence of strings from a discrete alphabet. There are 2 steps:1. parse the strings to a sequence of tokens. 2. map those tokens into vectors.  
![222](/images/2025-4-25-4.png)
A natural way is to use letters of the alphabet as tokens, but the single letter is not a meaningful token. If we could have each token represent a meaningful unit instead, we effectively do this work for the model.We do that via a lookup table, where each of the m possible inputs is mapped to an index. And we want to ensure prefix freeness(i.e. no string is the prefix of another, so that there will be no ambiguity between "a" and "an".)
![222](/images/2025-4-25-5.png)
The we have the token as an index, we map those tokens to vectors.  
Mapping vectors is easy, but the look-up table here in not a linear map, like the left column is discrete strings and cannot be calculated by gradient passing. One way to contruct such a linear map Byte Pair Encoding, which is similar to huffman encoding. The intuition is that occur commonly together do so because they represent a semantically meaningful unit.    
Note that tokenization is done before training our model. Usually we just use the current tokenizers like OpenAI's tiktoken.
![222](/images/2025-4-25-6.png)
#### Word2Vec
We achieve this in the following way:  
1. Randomly initialize two vectors $\mathbf{u}\_i$ and $\mathbf{v}\_i$ for each word.
2. Use $\mathbf{u}\_o^\top \mathbf{v}\_c$ to measure a score for $o$ as a likely neighbor for $c$.
3. Train using “logistic loss style” loss, i.e.
$$
\log\Bigl(\frac{1}{1 + \exp(\pm\text{score})}\Bigr)
$$
with randomly selected word $c$. We compare $c$ with positive examples that are its neighbors and random negative examples. We need to train with both positive and negative examples in order for the vectors to not all be $\mathbf{0}$, which would minimize the inner product between all vectors.   

4. Use the average of $\mathbf{u}\_i$ and $\mathbf{v}\_i$ as the final embedding.
#### BERT
![222](/images/2025-4-25-7.png)
BERT is an encoder-style transformer, which means self-attention is not causal. Text input is first transformed into a vector(with learnable parameters) and concatenated to a positional embedding(without learnable parameters). The core model is composed of a stack of attention blocks with serial (or parallel) interconnections to NLP. At the end is a task-specific MLP that maps the embedding to scores for each token.  
BERT is originally pre-trained on 2 tasks: one is masked denoising(predict the masked words), and one is changing the sentence order(predict if the order of two sentence is changed or not).   
Two ways we utilizing BERT might be feature extraction and fine-tuning. Feature extractors. Treat the embeddings of the language model as a feature extractor and use any combination of the activations as an input to a separate model. While you could just use the penultimate layer, you could also use the last N layers and concatenate or average them. Selecting a subset of features becomes its own hyperparameter search.  
Fine-tuning. Use BERT as a building block. Replace the task head (in this context, the head refers to the MLP fine-tuned to a specific task) with a new MLP. Fine-tuning can apply to just the final layer or to the entire model, but fine-tuning the entire model can actually degrade performance. This is because if the final layer’s weights are poor, the backpropagated weight updates may also be noisy and suboptimal. The present best practice is to freeze the pre-trained model first, and then train
everything.
![222](/images/2025-4-25-8.png)
### Homeworks
### Discussions
## Prompting
### Contents
#### GPT-Style Models
GPT-style moels are trained on the task of auto-complete(next token prediction).  
Zero-shot learning is an attempt to learn a task from no previous examples.(eg: prompt: the capital of france is. model returns: paris). In this example. the sentence generated from the following template
![222](/images/2025-5-6-1.png)  
The entire pipeline with a blackbox GPT model can be seen below:
![222](/images/2025-5-6-2.png)
The area of generating prompts to solve specific tasks is generally known as prompt engineering.  
#### Few-shot Learning
Few-shot Learning is an idea that provide the model some, but not much training data for the task through the prompt itself. The hope is that additional context will direct the model to provide better answers. Ex:
![222](/images/2025-5-6-3.png)
While the performance of few-shot learning is better than that of zero-shot learning, the
performance is still not great. This may be driven by two issues.  
First issue is that the tranining data is greater than the context length of the model, which results in the training data won't fit in the prompt. We can split the data into k batches, then feed one batch at a time and treat output as a combination.(We treat the GPT as black-box, without any updating in the inner weights).  
The second issue is that we provide prompts in human-speech through tokens, but the natural language of computers is vectors. To address this issue, we choose to allow the prompts themselves to learn via GD, which is called $\textbf{Soft Prompting}$.
![222](/images/2025-5-6-4.png)
With soft-prompting:1. performance dramatically increases;2. only requires us to store a small number of parameters;3. memory usage is higher.
### Homeworks
### Discussions
## Catastrophic Forgetting
### Contents
#### What is CF?
When a model learns something new, it can forget something it already knows. This phenomenon can be viewed as both a feature and a bug, and here we treated it as catastrophic forgetting as a bug.(like we trained on recognizing handwritten 1, but when we then train on 2s, then both of the loss of 1 and 2 will increase).  
Approaches for training on multiple tasks:1.freezing the model;2.linear probing strategy;3.soft prompt before pre-trained model;4.low-rank adapter.  

### Homeworks
### Discussions
## Knowledge Distillation
### Contents
### Homeworks
### Discussions
## Meta Learning
### Contents
#### Idea of Meta-Learning
In meta-learning, fine-tuning is central (“on a task you can see”) as meta-learning means to learn how to learn. In practice, this means “we want to be trained so that we are good at being fine-tunable”.  
Note: this is a distinction from “post-train” fine-tuning where the aim is to modify parameters after the main training is done. Now, the fine-tuning happens as we train since we know we are going to fine-tune anyways. This saves time and will in most cases produce better models.  
The distinction here is that latter perspective treats fine-tuning simply as an interesting emergent property, while the meta-learning perspective considers optimizing fine-tuning as we train the model. So, this leads to the question of how to do this in practice.  
When fine‑tuning with very little data, the model’s updates concentrate along a handful of dominant directions—the top singular vectors of its locally linearized input–Jacobian. If two tasks share these principal directions, gradient steps for the new task will overwrite the weights needed for the old task, causing catastrophic forgetting. Conversely, if each task’s dominant directions are orthogonal, fine‑tuning on one task induces negligible perturbation along the other task’s directions and thus preserves prior knowledge.
#### MAML
1. $\textbf{Meta‑Training Task Set}$   

   Assume we have $m$ tasks (Task $\_1$, Task $\_2$, …, Task $_m$), each with its own training and validation data $(x\_{ij}, y\_{ij})$, where $i$ indexes the task and $j$ the sample.

2. $\textbf{Inner Loop (Fast Adaptation)}$  
   For each task $i$, starting from the shared initialization $\theta$, perform $k$ steps of gradient descent on the task’s training loss to obtain task‑specific parameters $\theta\_i'$:  
   {% raw %}
   $$
   \theta_i' = \theta - \alpha \nabla_{\theta}\,\mathcal{L}_{\mathrm{train}}^{(i)}(\theta)
   $$
   {% endraw %}

3. $\textbf{Outer Loop (Meta‑Update)}$  
   Evaluate each $\theta\_i'$ on its validation set, sum the validation losses, and update the initialization $\theta$ via gradient descent:  
   {% raw %}
   $$
   \theta \leftarrow \theta - \beta \nabla_{\theta}\sum_{i=1}^{m}\mathcal{L}_{\mathrm{val}}^{(i)}\bigl(\theta_i'(\theta)\bigr)
   $$
   {% endraw %}

4. $\textbf{Model Agnostic}$  
   MAML uses only standard gradient updates, making it compatible with any differentiable model—be it CNNs, RNNs, Transformers, or reinforcement‑learning policies.
![222](/images/2025-5-6-5.png)
![222](/images/2025-5-6-6.png)
#### Semi-Frozen
In the semi‑frozen approach, we begin by unfreezing the shared, pre‑trained backbone during multi‑task training so that it can accumulate updates across all tasks and converge to an optimal initialization. Once this “best” checkpoint is reached, we freeze the backbone again at test time: for each new task, we restore the checkpoint, fine‑tune only the task‑specific components (or head), and leave the shared layers untouched. Whenever another task arrives, we simply reload the same checkpoint and repeat the local fine‑tuning. By combining an initial phase of full adaptability with a later phase of targeted, frozen‑backbone tuning, this method strikes a balance between the stability of self‑supervised pre‑training and the flexibility of task‑specific adaptation.
#### Subset Strategy
In the subset strategy, when a task’s full training set is too large to traverse in only K inner‐loop steps, we randomly sample a smaller subset of examples (e.g. 100 out of 1,000) and perform our SGD‐based fine‑tuning on just that mini‑batch. This lets us respect memory and compute limits while still giving the model a representative glimpse of the task. However, because we never see the task in its entirety during those K steps, we can’t fully measure how the initial initialization would behave on all data, and our “exploratory” updates become only a rough approximation of full fine‑tuning—making the algorithm practically resemble standard SGD more than true meta‑learning.  
#### Reptile Strategy
![222](/images/2025-5-6-7.png)
In the Reptile strategy, instead of computing the full meta‑gradient {% raw %}$-\frac{\partial L_{\mathrm{test}}}{\partial \theta_0}${% endraw %}, we simply take the difference between the fine‑tuned weights and the initialization ({% raw %}$\theta_K - \theta_0${% endraw %}) as a proxy for the update direction. After running K inner‑loop SGD steps on a sampled task to reach {% raw %}$\theta_K${% endraw %}, we move the shared parameters slightly toward {% raw %}$\theta_K${% endraw %} using this vector. By repeating this across many tasks—and optionally unrolling {% raw %}$T \gg K${% endraw %} steps—we approximate the effect of second‑order gradients without ever forming or inverting a Hessian, thereby avoiding exploding gradients and greatly simplifying implementation.
#### Closed Form Strategy 
![222](/images/2025-5-6-8.png)
In the closed‑form strategy, we treat the frozen shared backbone as a fixed feature extractor and train only lightweight, task‑specific heads (e.g. linear regression) by directly applying the closed‑form solution of a convex problem, such as least squares: {% raw %}$$\hat w = (\Phi^T\Phi + \lambda I)^{-1}\,\Phi^T y$${% endraw %}. Because this analytic formula is differentiable, we can still backpropagate to compute gradients with respect to the initialization {% raw %}$\theta_0${% endraw %}, all without performing iterative SGD steps. This both removes exploding‑gradient risk and drastically reduces computation and memory overhead, yielding a concise and reliable fine‑tuning mechanism tailored to each task.
### Homeworks
#### Meta-Learning For Learning 1D Functions
![222](/images/2025-5-6-9.png)
![222](/images/2025-5-6-10.png)
![222](/images/2025-5-6-11.png)
![222](/images/2025-5-6-12.png)
![222](/images/2025-5-6-13.png)
Ans:
{% raw %}
$$
(a)y=\beta_0 c_0 \phi_0(x)+\beta_1 c_1 \phi_1(x)$$
$$  
\because \phi_a(x)=\phi_2(x)=\phi_1(x)
$$
$$  
\therefore y=\beta_0 c_0 \phi(x)+\beta_1 c_1 \phi(x)=[c_0\phi(x)\quad c_1\phi(x)][\beta_0 \quad  \beta_1 ]^T=A \beta
$$
$$  
\therefore \hat{\beta}=A^T {(AA^T)}^{-1} y=[c_0\phi(x)\quad c_1\phi(x)]^T ([c_0\phi(x)\quad c_1\phi(x)][c_0\phi(x)\quad c_1\phi(x)]^T)^{-1}y
$$
$$  
=\phi(x) [c_0 \quad c_1]^T [\phi(x)^2 (c_0^2+c_1^2)]^{-1}\phi_t(x)
$$
$$  
=\frac{1}{c_0^2+c_1^2}[c_0 \quad c_1]^T
$$
$$
(b)\frac{d}{dc}(E_{x_{test},y_{test}}[\frac{1}{2} \|y-\hat{\beta}_0c_0\phi_t(x)-\hat{\beta}_1c_1\phi_a(x)\|])
$$
$$  
=\frac{d}{dc}(E_{x_{test},y_{test}}[\frac{1}{2} \|\phi_t(x)-\frac{c_0^2}{c_0^2+c_1^2}\phi_t(x)-\frac{c_1^2}{c_0^2+c_1^2}\phi_a(x)\|_2^2])$$
$$
=\frac{d}{dc}(\frac{1}{2}(1-\frac{c_0^2}{c_0^2+c_1^2})^2+\frac{1}{2}(\frac{c_1^2}{c_0^2+c_1^2})^2)
$$
$$
=\frac{d}{dc}(\frac{1}{2}(\frac{c_1^2}{c_0^2+c_1^2})^2+\frac{1}{2}(\frac{c_1^2}{c_0^2+c_1^2})^2)
$$
$$
=\frac{d}{dc}((\frac{c_1^2}{c_0^2+c_1^2})^2)
$$
$$
\therefore \frac{d}{dc_0}=2 \cdot \frac{c_1^2}{c_0^2+c_1^2} \cdot \frac{-2c_1^2c_0}{(c_0^2+c_1^2)^2}=\frac{-4c_0c_1^4}{(c_0^2+c_1^2)^3}
$$
$$
\frac{d}{dc_1}=2 \cdot \frac{c_1^2}{c_0^2+c_1^2} \cdot \frac{2c_1(c_0^2+c_1^2)-c_1^2\cdot 2c_1}{(c_0^2+c_1^2)^2}=\frac{4c_0^2c_1^3}{(c_0^2+c_1^2)^3}
$$
$$
(c)
$$
{% endraw %}
![222](/images/2025-5-6-14.png)
### Discussions
## Transfer Learning
### Contents
### Homeworks
### Discussions
## Generative Models
### Contents
### Homeworks
### Discussions
## Diffusion Models
### Contents
### Homeworks
### Discussions
