---
title: 5 - 高阶凸优化
date: 2026-09-15 18:00:17
permalink: 2026/09/15/Mathematical-Modeling-05-Advanced-Convex-Optimization-zh/
categories: Mathematical Modeling
tags:
  - 凸分析
  - 对偶
  - 近端算法
mathjax: true
cover: "/images/mathematical-modeling-nyc.webp"
study_time: 170
lesson_number: 5
lesson_level: 3
review_lock: false
translation_of: /blog/2026/09/15/Mathematical-Modeling-05-Advanced-Convex-Optimization/
lang: zh-CN
hidden: true
excerpt: "从凸性证明、共轭对偶与近端算法出发，推导大规模方法和 CVaR 风险模型，并审查真实国赛案例。"
---

先别急着看那张漂亮的求解器结果表。想象有人把它推到你面前，只问一句：“你怎么知道这是全局最优？”这一篇博客要做的，就是不用含糊的措辞回答这个问题。

线性、二次和锥规划已经给了我们一套表达决策的语言。现在我们追问得更深一点：**为什么有些看起来非线性的巨大问题仍能可靠求解，而有些表面简单的问题却会掉进很差的局部解？** 关键不在求解器的名字，而在凸结构。

这一篇会认真证明凸性，推导对偶，而不是只记结论；也会解释每种算法究竟利用了什么几何结构。最后回到 2024 年国赛 C 题，把确定性种植规划扩展成场景与条件风险价值（CVaR）模型。我们真正想回答的不是“模型是否高级”，而是“当输入数据不准确时，这个决策是否仍然可以接受”。

<div class="mm-key-box"><span class="mm-callout-label">高阶凸优化的思考顺序</span><p>不要先问“应该写哪一种算法”。先问：<strong>我的函数和集合是什么？能够证明怎样的曲率？用什么证书判断算法真的结束了？</strong> 回答完这些问题，再选择算法。</p></div>

## 1. 凸集、凸函数与上图集

若集合 $C\subseteq\mathbb R^n$ 中任意两点之间的线段都在集合内，即

$$\theta x+(1-\theta)y\in C,\quad\forall x,y\in C,\ \theta\in[0,1],$$

则 $C$ 是凸集。半空间、仿射集合、范数球、半正定锥以及凸集的交集都是凸的；凸集的并通常不是凸的。

函数 $f:C\to\mathbb R$ 凸，当且仅当

$$f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y).$$

几何上，图像上两点的弦位于函数图像上方。定义上图集

$$\operatorname{epi}f=\{(x,t):f(x)\le t\},$$

则 $f$ 凸当且仅当 $\operatorname{epi}f$ 是凸集。最小化 $f(x)$ 等价于最小化 $t$ 并要求 $(x,t)$ 落在上图集中。

若 $f$ 可微，凸性等价于全局一阶下界

$$f(y)\ge f(x)+\nabla f(x)^T(y-x).$$

若二阶可微，则在开凸域上 $f$ 凸当且仅当 $\nabla^2f(x)\succeq0$。

例如 log-sum-exp

$$f(x)=\log\sum_{i=1}^m e^{a_i^Tx+b_i}.$$

令 $p_i=e^{a_i^Tx+b_i}/\sum_j e^{a_j^Tx+b_j}$，有

$$\nabla^2f=\sum_i p_i(a_i-\bar a)(a_i-\bar a)^T\succeq0,$$

其中 $\bar a=\sum_i p_i a_i$。Hessian 本质上是一个协方差矩阵，所以半正定。

对 $X\succ0$ 上的 $f(X)=-\log\det X$，方向二阶导数为

$$D^2f(X)[H,H]=\operatorname{tr}(X^{-1}HX^{-1}H)\ge0,$$

因此它也是凸函数，并成为半定规划和内点法中重要的障碍函数。

## 2. 强凸性、光滑性与条件数

可微函数是 $\mu$-强凸的，如果

$$f(y)\ge f(x)+\nabla f(x)^T(y-x)+\frac\mu2\|y-x\|_2^2.$$

若梯度满足

$$\|\nabla f(x)-\nabla f(y)\|_2\le L\|x-y\|_2,$$

则称 $f$ 为 $L$-光滑。二阶可微时，$\mu I\preceq\nabla^2f(x)\preceq LI$ 同时给出这两种性质。$\kappa=L/\mu$ 是条件数。狭长的等高线对应较大的条件数，梯度下降会在陡峭方向来回摆动，却在平缓方向前进很慢。

由光滑性可得下降引理

$$f(y)\le f(x)+\nabla f(x)^T(y-x)+\frac L2\|y-x\|^2.$$

取 $y=x-\nabla f(x)/L$，有

$$f\left(x-\frac1L\nabla f(x)\right)\le f(x)-\frac1{2L}\|\nabla f(x)\|^2.$$

这说明步长 $1/L$ 为什么合理。对一般光滑凸函数，梯度下降目标误差为 $O(1/k)$；若函数强凸，则距离线性收敛：

$$\|x_k-x^*\|^2\le\left(1-\frac\mu L\right)^k\|x_0-x^*\|^2.$$

预条件和变量缩放的目的，就是降低有效条件数。

## 3. 次梯度与不可微模型

凸函数在尖点处可能没有普通梯度，但仍然存在支撑超平面。若

$$f(y)\ge f(x)+g^T(y-x)\quad\forall y,$$

则 $g$ 是 $f$ 在 $x$ 的次梯度，所有次梯度构成 $\partial f(x)$。对绝对值函数，

$$
\partial|x|=\begin{cases}{-1\},&x<0,\\[-2pt]
[-1,1],&x=0,\\[-2pt]
\{1\},&x>0.
\end{cases}
$$

闭的正常凸函数满足：$x^*$ 最优当且仅当 $0\in\partial f(x^*)$。若还要求 $x\in C$，则条件变为

$$0\in\partial f(x^*)+N_C(x^*),$$

$N_C$ 是法锥。这个包含关系统一了梯度为零、边界最优与 KKT 驻点条件。

次梯度法 $x_{k+1}=x_k-\alpha_kg_k$ 的单步目标值不一定下降。适当递减步长下，典型速度约为 $O(1/\sqrt{k})$。正因为它较慢，当不可微项结构明确时，我们更愿意使用近端方法。

## 4. 共轭函数与系统化对偶推导

Fenchel 共轭定义为

$$f^*(y)=\sup_x\{y^Tx-f(x)\}.$$

它记录 $f$ 的所有仿射下界。立刻可以得到 Fenchel–Young 不等式

$$f(x)+f^*(y)\ge x^Ty,$$

且等号成立当且仅当 $y\in\partial f(x)$。

若 $f(x)=\tfrac12\|x\|_2^2$，则 $f^*(y)=\tfrac12\|y\|_2^2$。若 $f(x)=\lambda\|x\|_1$，则当 $\|y\|_\infty\le\lambda$ 时 $f^*(y)=0$，否则为 $+\infty$。

考虑

$$\min_x f(x)+g(Ax).$$

引入 $z=Ax$ 和乘子 $y$：

$$L=f(x)+g(z)+y^T(Ax-z).$$

分别对 $x,z$ 取下确界，得到

$$\max_y -f^*(-A^Ty)-g^*(y).$$

这一套推导可以统一生成稀疏回归、网络流、熵模型和许多可分解问题的对偶。强对偶仍需要约束资格条件。Slater 条件要求存在严格满足凸不等式且满足仿射等式的点，是最常用的充分条件。

## 5. 近端算子与加速方法

对闭凸函数 $g$，近端算子定义为

$$\operatorname{prox}_{\lambda g}(v)=\arg\min_x\left\{g(x)+\frac1{2\lambda}\|x-v\|_2^2\right\}.$$

二次项要求 $x$ 不要离 $v$ 太远，$g$ 则施加我们希望的结构。若 $g$ 是集合 $C$ 的示性函数，近端算子就是到 $C$ 的欧氏投影。若 $g(x)=\tau\|x\|_1$，近端算子是软阈值

$$[\operatorname{prox}_{\lambda\tau\|\cdot\|_1}(v)]_i
=\operatorname{sign}(v_i)\max(|v_i|-\lambda\tau,0).$$

对复合目标 $F(x)=f(x)+g(x)$，其中 $f$ 光滑、$g$ 可近端，迭代为

$$x_{k+1}=\operatorname{prox}_{\alpha g}(x_k-\alpha\nabla f(x_k)).$$

基本近端梯度法达到 $O(1/k)$；FISTA 等 Nesterov 加速方法在标准条件下达到 $O(1/k^2)$。

LASSO 的更新尤其直观：

$$\beta_{k+1}=S_{\alpha\lambda}[\beta_k-\alpha X^T(X\beta_k-y)].$$

梯度步骤改善拟合，软阈值步骤决定哪些系数保留。

## 6. 分裂方法与 ADMM

若 $f$ 和 $g$ 分别容易处理，但放在一起很难，可写成

$$\min_{x,z}f(x)+g(z)\quad\text{s.t.}\quad Ax+Bz=c.$$

ADMM 的迭代为

$$
\begin{aligned}
x^{k+1}&=\arg\min_x f(x)+\frac\rho2\|Ax+Bz^k-c+u^k\|^2,\\
z^{k+1}&=\arg\min_z g(z)+\frac\rho2\|Ax^{k+1}+Bz-c+u^k\|^2,\\
u^{k+1}&=u^k+Ax^{k+1}+Bz^{k+1}-c.
\end{aligned}
$$

原始残差为 $r^k=Ax^k+Bz^k-c$；常见 $x=z$ 形式下，对偶残差是 $s^k=\rho(z^k-z^{k-1})$。停止条件必须同时检查两者。

当变量可按数据块、地区、场景或正则项拆分时，ADMM 很有价值。它并不天然快于成熟的锥求解器；优势来自并行、隐私或子问题规模大幅缩小。参数 $\rho$ 不改变精确解，却明显影响收敛速度。

## 7. 随机、一坐标与大规模方法

若 $f(x)=N^{-1}\sum_i f_i(x)$，完整梯度需要遍历全部样本。随机梯度使用无偏估计 $g_k=\nabla f_{i_k}(x_k)$：

$$x_{k+1}=x_k-\alpha_kg_k.$$

噪声让早期进展便宜，却使常步长迭代只能在最优点附近波动。小批量在方差与计算量之间折中；方差缩减方法借助周期性的完整梯度或控制变量加速有限和问题。

坐标下降一次更新一个变量或块。对光滑损失加可分 $\ell_1$ 正则，子问题往往有软阈值闭式解。投影梯度

$$x_{k+1}=\Pi_C(x_k-\alpha\nabla f(x_k))$$

适合容易投影的集合：盒约束只需截断，概率单纯形可排序后求阈值，仿射集合则对应最小二乘。投影本身也是一个优化问题，复杂度取决于集合 $C$。

## 8. 将风险写成凸优化：VaR 与 CVaR

令 $L(x,\xi)$ 为决策 $x$ 在不确定场景 $\xi$ 下的损失。$\alpha$ 置信水平的 VaR 是损失分位数：

$$\operatorname{VaR}_\alpha(L)=\inf\{t:\Pr(L\le t)\ge\alpha\}.$$

VaR 只告诉我们门槛，却不描述门槛之外有多糟。CVaR 衡量尾部平均损失。Rockafellar–Uryasev 表示为

$$\operatorname{CVaR}_\alpha(L)=\min_\eta\left[\eta+\frac1{1-\alpha}\mathbb E(L-\eta)_+\right].$$

对离散场景 $s=1,\ldots,S$，概率为 $\pi_s$，引入 $u_s\ge0$：

$$
\begin{aligned}
\min_{x,\eta,u}\quad &\eta+\frac1{1-\alpha}\sum_s\pi_su_s\\
\text{s.t.}\quad &u_s\ge L_s(x)-\eta,quad u_s\ge0.
\end{aligned}
$$

若场景损失是凸的，CVaR 模型仍然凸；若损失为仿射函数，它就是 LP。原本看似复杂的尾部统计量被辅助变量和线性不等式表达出来。

## 9. 获奖论文案例：带尾部风险的种植规划

2024 国赛种植规划优秀论文把需求、亩产量、价格和成本视为不确定量，并引入 CVaR。令 $x$ 为上一篇博客中的种植方案，场景 $s$ 下利润为 $P_s(x)$，损失 $L_s(x)=-P_s(x)$。一个透明的风险目标是

$$
\max_{x,\zeta,u}\quad
\sum_s\pi_sP_s(x)-\lambda\left(\zeta+\frac1{1-\alpha}\sum_s\pi_su_s\right)
$$

满足

$$u_s\ge-P_s(x)-\zeta,\qquad u_s\ge0,$$

以及每个场景下的土地、轮作、销售等约束。$\zeta$ 估计 VaR，$u_s$ 记录超过该门槛的尾部损失。

题目只给波动范围而没有概率分布时，不应假装它们精确服从正态分布。可以建立名义场景、需求高低场景、低产高成本压力场景，以及带相关冲击的场景。独立扰动每一种作物会破坏真实相关性：干旱通常同时降低多种作物产量。

不同 $\lambda,\alpha$ 下，应报告期望利润、CVaR、最坏利润、轮作可行性和面积变化。若期望利润只下降 1%，尾部损失却下降 30%，风险厌恶方案可能很有价值。风险参数代表利益相关者选择，不存在脱离背景的“标准答案”，因此最好给出收益—风险前沿。

原优秀论文使用 DEGA 启发式算法求解扩展模型。由于场景 CVaR 部分在引入离散种植选择后仍有大量线性结构，可以用缩小后的 MILP 提供基准和最优性界，再与启发式结果比较。

## 10. 最优性证书、失败模式与报告

可信计算至少要跟踪：原始可行性、驻点或对偶可行性、互补松弛、原始—对偶间隙、目标和变量变化、条件数，以及样本外场景表现。

对复合问题，近端梯度映射

$$G_\alpha(x)=\frac1\alpha\left[x-\operatorname{prox}_{\alpha g}(x-\alpha\nabla f(x))\right]$$

推广了普通梯度。$G_\alpha(x)=0$ 是最优性条件，所以 $\|G_\alpha(x_k)\|$ 比“跑了多少次迭代”更有意义。

常见错误包括：仅凭图像像碗就声称凸；忽略定义域使用 Hessian 检验；把非凸问题的 KKT 点当作全局最优；报告对偶变量却不说明单位；用同一批场景调风险参数又宣称样本外稳健；目标不再变化就停止，却没有检查约束残差。

### 参考资料

- [全国大学生数学建模竞赛官网](https://www.mcm.edu.cn/)与[优秀论文展示](https://dxs.moe.gov.cn/zx/hd/sxjm/sxjmlw/)。
- Boyd 与 Vandenberghe，[《Convex Optimization》](https://web.stanford.edu/~boyd/cvxbook/)。
- Parikh 与 Boyd，[《Proximal Algorithms》](https://web.stanford.edu/~boyd/papers/prox_algs.html)。
- Boyd 等，[ADMM 综述](https://web.stanford.edu/~boyd/papers/admm_distr_stats.html)。
- Rockafellar 与 Uryasev，[CVaR 优化论文](https://doi.org/10.1023/A:1007670815245)。

凸优化的力量并不是让建模变得自动，而是把几何、算法和最优性证书连接起来。当你能够证明曲率、推导对偶并测量最优性时，求解器给出的答案才从神秘数字变成可审查的论证。

如果你读到了这里，留一道隐藏题给你：先不要展开平方，直接推导 $f(x)=\tfrac12(x-a)^2$ 的共轭函数。最后得到的那个线性项，会在后面的鲁棒优化和分布式优化里悄悄再次出现。
