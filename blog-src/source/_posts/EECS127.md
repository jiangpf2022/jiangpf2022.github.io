---
title: EECS127
date: 2025-01-21 12:43:19
tags:
mathjax: True
published: false
---
## Lecture 1 
### Optimization Models in Engineering  
{% notel red "Optimization" %}    
finding "best" solution to some problem with constraints.  
{% endnotel %}   
Standard form:
$$p^*=min_{x \in R^{n}} f_0(x) \\ \text{subject to: } f_i(x) \leq 0 \quad i=1,2,\ldots m \\ f_0: R^n \rightarrow R \text{ objective function} \\ f_i:R^n \rightarrow R \text{ constriants}$$  
This course: convex optimization problems $\Leftrightarrow f_i$ s are convex   
Art: Taking a real problem recognizing it as a tractable optimization problem and solving.  
Basic structure of course: Linear Algebra + Convexity  

### Least Squares  
$$min_{x\in R^n} ||Ax-b||_2^2=\sum_i (a_i^{T}x-b_i)^2 \quad A \in R^{m \times n}, b \in R^{n}$$  
Analytical Solution:
$$x^{*} =(A^{T} A)^{-1} A^{T} b$$
when $A$ has full column rank  
Ex: $$min_{x \in R^{n}} \sum_{i=1}^m \lambda_i (a_i^{T} x-b_i)^2+ \lambda_o ||x-c||_2^2$$
$$=||\begin{bmatrix}
\lambda^{??} A  \\
\lambda^{??} I 
\end{bmatrix}x-\begin{bmatrix}
\lambda^{??} b  \\
\lambda^{??} c 
\end{bmatrix}||$$
### Linear Programs  
Standard form:
$$min_{x \in R^{n}} c^{T} x \\ s.t. \quad a_i^{T} \leq b_i(i=1,2,\ldots m) \quad i.e. \quad  Ax \leq b$$
$(A,b,c):A,b$ are constraints, $c$ are given cost.  
Unlike Least Squares, no analytical solution.  
Solve by Computer:$$x^{*}=linprog(A,b,c)$$
Linear Programmings not always easy to recognize  
Example: Support Vector Machine(SVM), given data points $$Z^{(i)} \in R^{n}, i=1,2,\ldots,m \\ \text{labels } y_i \in \{-1,+1\}, i= 1,2,\ldots m \\ \text{goals: Find linear classifier}$$  
One objective:  
$$min_{x\in R^{n}, b\in R} \sum_{i=1}^m max(0,1-(y_i(x^{T} z^{(i)}+b))) \\ \text{Foundation of LP: } minimize_{x,b,r} \sum_{i=1}^{m} r_i \\ s.t. \quad r_i \geq 0, i=1,2,\ldots,m \\ r_i \geq 1-i_i(x^Tz^{(i)}+b)$$
### Lots of tricks for problem reduction:  
Equality constraints:
$$f_i(x)=0 \Leftrightarrow f_i(x) \leq 0, -f_i(x) \le 0$$  
Set constraint:
$$min_{x\in X} f_o(x) \Leftrightarrow min_{x} f_o (x), s.t. f_i(x) \leq 0 \\f_i(x)=0 \text{ if } x \in X \\f_i(x)=+\infty, \text{otherwise}$$
### Feasibility Problem:
Feasible Set: $X=\{x:f_i(x) \leq 0,i=1,2,\ldots,m\}$  
Feasibility problem:determine whether $X=\emptyset ?$  
Optimization problem is feasible if Feasible set nonempty  
Convention: Set $p^{*}=+\infty$  
Say $p^{*}$ is attained if problem feasible, and $\exists $ opt. variable $x^{*} \quad s.t.f_o(x^{*})=p^{*}$
Optimal vale not always attained,  
Ex: $$min_{x \geq 0} \frac{1}{x+1} \\ p^{*}=0$$, but not attained  
Set of optimal points=set of optimal $x^{*}$ that optimize $p^{*}$  
Tractable: cam be solved with computer(eg. poly-time always exists)  
Intractable: can't be solved in a reasonable amount of time.

## Lecture 2
### Vectors and Functions
Vector space $X$ over real Filed $R$ is a set that is closed under multiplication and vector addition.
$$x,y \in X, \alpha, \beta \in R \Rightarrow \alpha x + \beta y \in X$$
$x,y$ are vectors(think of as lists of real numbers)  
Ex:$$X=R^n, x \in X, x=\begin{bmatrix} x_1 \\ . \\. \\. \\ x_n\end{bmatrix}$$  
Ex:$$X=C_b(R)=\{f:R \rightarrow R:f \text{is bounded and continuous}\} \\ x \in X, x:t \in R \mapsto x(t)$$  
Ex:$$X=P_n(R)=\text{polynomials on } R \text{ of degree} \leq n\\ p \in P_n, p(t)=p_o+p_1t+ \cdots +p_nt^n$$  
Vectors have 3 useful interpretations:  
1. points in space  
2. directions  
3. functions(esp. Linear functions)  

### Points in space(Vector=data point)  
For a collection $x^{(1)},x^{(2)} \cdots$ of vectors, a linear combination is sum of following form:
$$\sum_{i=1}^k \alpha_i x^{(i)}, \text{for some } \alpha_i \in R, i=1 \ldots k$$  
A subspace $V \subset X$ is a "vector space within $X$". i.e. if $u,v \in V, \alpha,\beta \in R \Rightarrow \alpha u + \beta v \in V$   
For a collection of vectors, $S=\{x^{(1)},\ldots,x^{(k)}\}$, the span of $S$ is all linear combinations of vector in $S$. i.e. $span(S)=\{\sum_{i=1}^k \alpha_i x^{(i)}: \alpha_1  \ldots \alpha_k \in R\}$   
$Span(S)$ is a subspace of $X$  
Sums of subspaces: if $U,V \subset X$ are subspaces, then so is $U+V=\{u+v:u \in U, v \in V\}$  
$$\alpha(u_1+v_1)+\beta(u_2+v_2)=(\alpha u_1+\beta u_2)+(\alpha v_1+\beta v_1) \in U+V $$  
if $U \cap V =\{0\}$, then direct sum is denoted $U \oplus V=U+V$  
If $x \in U \oplus V$, then x uniquely written as $x=u+v$ for $u \in U, v \in V$, suppose $x=u+v=u'+v' \Rightarrow u-u'=v'-v=0$  
{% notel red "Linear Independence" %}    
Vector $x^{(1)} , \cdots x^{(k)}$ are linearly independent if $\sum_{i=1}^k \alpha_i x^{(i)}=0 \Rightarrow \alpha_i=0 \forall i$  
{% endnotel %}   
If $V is a subspace with $Span(\{x^{(1)}\cdots x^{(k)}\})$ and $x^{(i)}, i=1 \cdots k$ are linearly independent, then $x^{(1)},x^{(2)},\ldots, x^{(k)}$ is called a basis for $V$.  
Claim: If $\{x^{(1)},\ldots x^{(k)}\}$ and $\{y^{(1)} \cdots y^{(k)}\}$ are basis for $V$, then $k=d$ called the dimension of $V$.  
If $\{x^{(1)}, \cdots x^{(k)}\}$ is a basis for $V$, any $x \in V$ has unique representation $x=\sum \alpha_i x^{(i)}$  
$V=Span(x^{(1)}) \oplus Span(x^{(2)}) \oplus \cdots \oplus Span(x^{(k)}$  
Important Consequences: Any n-dim vector space $X$ can be equivalently represented as $R^n$  
Ex: $\{1,t^1 , t^2, \ldots t^n\}$ is a basis for $P_n(R), P(t)=p_0+p_1 t+ \cdots p_nt^n \leftrightarrow \begin{bmatrix} p_0 \\. \\. \\. \\p_n\end{bmatrix} \in R^{n+1}$  
For vectors, "length" is generally measured by "norm".  
{% notel red "norm" %}    
A norm $||\cdot ||: x \rightarrow R$ is a function satisfying:  
1. $||x||>0 \forall x \in X$ with equality $\Leftrightarrow x=0$(positive definitions)  
2. $||x+y|| \leq ||x||+||y||, \forall x,y \in X$ (triangle inequality)  
3. $|\alpha x|=|\alpha| ||x|| \forall x \in X, \alpha \in R$(positive homogenity) 
{% endnotel %}    
Ex:$l^p$ norms:$||x||_p:=(\sum_{i=1}^n |x_i|^p)^{\frac{1}{p}}, x \in R^n, p \geq 1$, when $p=+\infty, ||x||_{\infty}=max_{i=1 \cdots n} |x_i|$  
Special cases: $p=2$= Euclidean norm  
$p=1, ||x||_1=\sum_{i=1}^n |x_i|=$"manhattan norm"  
{% notel red "inner product space" %}    
A (real) inner product space $X$ is a vector space equipped with inner product $<\cdot, \cdot>:x \times x \rightarrow R$, satisfy:  
1.$<x,x> \geq 0$ with equality iff x=0.  
2.$<\alpha x+\beta y,z>=\alpha<x,z>+\beta<y,z> \forall \alpha, \beta \in R, x,y,z\in X$      
3. $<x,y>=<y,x> \forall x,y \in X$  
{% endnotel %} 
Inner products define a (Hilbert) norm: $||x||=\sqrt{<x,x>}$  
Ex: If $<x,y>:=x^T y$, then $||\cdot|| =$ Euclidean norm.  
$$x^T y=||x||_2 ||y||_2cos(\theta)$$  
Important case: $\theta=+90^{\circ} or -90^{\circ} \Rightarrow x^Ty=0$  
More generally, if $X is a LPS, we say $x,y$ are orthogonal  
If $<x,y>=0$, and we write $x\perp y$  
Remark: If $\frac{1}{p}+\frac{1}{q}=1, p \geq 1$, then $x^Ty \leq ||x||_p ||y||_q$(Holder's Inequality)  
### Vector as Linear functions  
A Function $f:X \rightarrow R$ is linear if $f(\alpha x + \beta y)=\alpha f(x)+\beta f(y)$  
$X^{*}=\{f:X \Rightarrow R;f \text{f is linear}\}$= dual space of $X$, this is a vector space. $X^{*} \equiv R^n$, $f(x)=f(\sum x_ie_i)=\sum x_if(e_i)$  
When $||\cdot ||$ is a norm on $X$, can define "operator norm" on $X^{*}$ via $||f||_{op}=max_{x:||x|| \leq 1} |f(x)|$  
Fact: $||\cdot ||_p^{*}=|| \cdot ||_q, \frac{1}{p}+\frac{1}{q}=1$


