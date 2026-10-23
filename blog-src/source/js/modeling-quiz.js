(() => {
  "use strict";

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const lesson1Questions = [
    {
      target: 90,
      exp: 1,
      answer: ["B"],
      en: {
        question: "A client says, \"Build the best model for our campus bus system.\" What should you do first?",
        options: [
          "Choose the most advanced algorithm you know.",
          "Clarify the decision, the outcome that matters, and what success means.",
          "Download every available dataset before asking questions.",
          "Draw a polished dashboard for the final report.",
        ],
        explanation: "A model begins with a purpose. Until the decision and success criterion are clear, neither data nor algorithms have a well-defined job.",
      },
      zh: {
        question: "委托方说：\"请为校园班车建立最好的模型。\"第一步应该做什么？",
        options: ["选择自己会的最高级算法。", "明确要做的决策、真正关心的结果，以及什么叫成功。", "先下载所有能找到的数据。", "先为最终报告画一张精美看板。"],
        explanation: "模型首先要有目的。在决策和成功标准还没说清时，数据和算法都还没有明确的任务。",
      },
    },
    {
      target: 82,
      exp: 1,
      answer: ["B"],
      en: {
        question: "What does a system boundary specify?",
        options: ["Every fact that exists in the real world.", "Which objects, time scales, and interactions are included or deliberately excluded.", "Only the final numerical answer.", "The programming language used to solve the model."],
        explanation: "A boundary makes the smaller modeled world explicit. It tells readers what the model covers and where its claims should stop.",
      },
      zh: {
        question: "系统边界要说明什么？",
        options: ["现实世界中的每一个事实。", "哪些对象、时间尺度和相互作用被纳入，哪些被有意排除。", "只说明最后的数值答案。", "说明用什么编程语言求解。"],
        explanation: "边界把我们为推理而搭建的“小世界”说清楚，也告诉读者模型结论应当在哪里停下。",
      },
    },
    {
      target: 74,
      exp: 2,
      multiple: true,
      answer: ["A", "B", "C"],
      en: {
        question: "Which properties make an assumption useful in a modeling report? Select all that apply.",
        options: ["It is stated explicitly.", "It can be challenged by evidence or sensitivity analysis.", "It preserves the mechanism needed for the current decision.", "It must be permanently true in every possible setting."],
        explanation: "Assumptions are controlled approximations, not eternal truths. Good ones are visible, testable, and appropriate to the purpose of the model.",
      },
      zh: {
        question: "一条假设要在建模报告中真正有用，应具备哪些特征？请选出所有正确项。",
        options: ["被明确写出。", "能被证据或灵敏度分析挑战。", "保留当前决策所需的核心机制。", "必须在任何场景中永远为真。"],
        explanation: "假设是受控的近似，不是永恒真理。好假设应当看得见、能检验，并且与模型的目的相匹配。",
      },
    },
    {
      target: 65,
      exp: 2,
      answer: ["B"],
      en: {
        question: "Why construct a simple baseline before adding a more elaborate model?",
        options: ["A baseline guarantees the final answer is correct.", "It provides a hand-checkable comparison and reveals which added complexity actually changes the decision.", "It removes the need for validation.", "It always produces a larger objective value."],
        explanation: "A baseline anchors interpretation. Complexity earns its place only when it improves evidence, prediction, feasibility, or the decision itself.",
      },
      zh: {
        question: "为什么在加入更复杂的模型前，要先建立一个简单基线？",
        options: ["基线能保证最终答案正确。", "它提供一个可手算核对的比较对象，并帮我们看出新增复杂性是否真正改变了决策。", "它可以取代验证。", "它一定会得到更大的目标值。"],
        explanation: "基线为结果解读提供锚点。只有当复杂性改善了证据、预测、可行性或决策时，它才值得被加入。",
      },
    },
    {
      target: 56,
      exp: 3,
      multiple: true,
      answer: ["A", "B", "C", "E"],
      en: {
        question: "Which pairs correctly match a validation level with its question? Select all that apply.",
        options: ["Implementation — does the code reproduce a hand-computed case?", "Internal — do units, conservation rules, and logical constraints agree?", "Empirical — do predictions agree with observations not used to fit the model?", "Decision — is every variable measured in meters?", "Comparative — does the proposed method improve on a meaningful baseline under the same conditions?"],
        explanation: "Validation is layered. Code, internal logic, observations, baselines, and the final decision each require a different kind of check; units alone do not validate a decision.",
      },
      zh: {
        question: "下列哪些“验证层次—检查问题”的搭配是正确的？请选出所有正确项。",
        options: ["实现验证——代码能否复现一个手算案例？", "内部验证——单位、守恒规律和逻辑约束是否一致？", "经验验证——预测是否与没有用于拟合的观测一致？", "决策验证——是否所有变量都用米作单位？", "比较验证——在相同条件下，新方法是否优于有意义的基线？"],
        explanation: "验证有多个层次。代码、内部逻辑、观测证据、基线比较与最终决策各需要不同的检查；单位正确并不等于决策有效。",
      },
    },
    {
      target: 46,
      exp: 4,
      answer: ["B"],
      en: {
        question: "In the thermal-box threshold model, the estimated vial capacity is proportional to the cold reservoir heat capacity. If that heat capacity is halved while all temperatures and vial properties stay fixed, what happens to the unrounded capacity estimate?",
        options: ["It doubles.", "It halves.", "It is unchanged.", "It becomes zero regardless of the initial temperature."],
        explanation: "The closed-form threshold estimate is linear in the reservoir heat capacity. This is a structural sensitivity result, not a numerical coincidence.",
      },
      zh: {
        question: "在保温箱的阈值模型中，估计的样本管容量与低温储能体的热容成正比。如果热容减半，其他温度与样本管性质都不变，未取整的容量估计会怎样变化？",
        options: ["变为两倍。", "变为一半。", "保持不变。", "无论初始温度如何都变为零。"],
        explanation: "阈值的闭式估计对储能体热容是线性的。这是由模型结构得到的灵敏度结论，不是数值巧合。",
      },
    },
    {
      target: 36,
      exp: 5,
      multiple: true,
      answer: ["A", "B", "D"],
      en: {
        question: "A ski-resort owner considers slowing the lift because this can increase the ratio between admitted guests and instantaneous trail occupancy. Which conclusions are defensible? Select all that apply.",
        options: ["Under that narrow occupancy metric, a slower uphill cycle can appear beneficial.", "Lift queues, customer satisfaction, safety, return visits, and profit may change the preferred speed.", "Therefore the slowest physically possible lift is always globally optimal.", "The answer depends on the objective and boundary, not on speed alone."],
        explanation: "The example exposes objective design. A narrow capacity ratio can reward a slow lift, while a broader business model introduces queues, behavior, safety, and long-run demand.",
      },
      zh: {
        question: "某滑雪场老板考虑降低缆车速度，因为这可能提高“允许入场人数与雪道瞬时人数之比”。哪些结论站得住？请选出所有正确项。",
        options: ["在这一狭窄的占用指标下，上山周期更慢可能显得更有利。", "排队、顾客满意度、安全、复购与利润都可能改变最佳速度。", "因此，物理上能达到的最慢速度一定是全局最优。", "答案取决于目标和边界，而不是单独取决于速度。"],
        explanation: "这个例子提醒我们审视目标函数。狭窄的容量比值会奖励慢缆车，但更完整的经营模型还包含排队、行为、安全和长期需求。",
      },
    },
    {
      target: 27,
      exp: 6,
      answer: ["C"],
      en: {
        question: "A commuter normally meets a car at 6:00 p.m. One day they arrive early, walk toward home, meet the car en route, and reach home 10 minutes earlier than usual. Assuming the car follows its normal route and speed, how long did the commuter walk before 6:00 p.m.?",
        options: ["5 minutes", "10 minutes", "25 minutes", "50 minutes"],
        explanation: "Arriving home 10 minutes early means the car saved 5 minutes outward and 5 minutes returning. It therefore met the commuter at 5:55 p.m.; if the commuter began at 5:30 p.m., the walk lasted 25 minutes.",
      },
      zh: {
        question: "通勤者平时晚上 6:00 与开车来接的人会合。某天他早到后步行往家走，途中遇到车，最后比平时早 10 分钟到家。假设汽车的常规路线和速度不变，通勤者在 6:00 之前步行了多久？",
        options: ["5 分钟", "10 分钟", "25 分钟", "50 分钟"],
        explanation: "早 10 分钟到家，意味着车往外少开 5 分钟，回程也少开 5 分钟。因此会合时刻是 5:55；若通勤者 5:30 开始走，他共步行 25 分钟。",
      },
    },
    {
      target: 18,
      exp: 8,
      multiple: true,
      answer: ["A", "B", "C"],
      en: {
        question: "Which elements belong in a defensible validation plan for the library study-room proposal? Select all that apply.",
        options: ["Compare the current and proposed schedules on the same historical days.", "Report both turn-aways and unused room-hours.", "Stress-test the recommendation under higher exam-week arrivals.", "Evaluate the proposal only on the one day on which it performs best."],
        explanation: "Fair comparison requires shared conditions, complementary metrics, and stress scenarios. Selecting only a favorable day is evidence cherry-picking.",
      },
      zh: {
        question: "图书馆自习室方案的可辩护验证计划应包含哪些内容？请选出所有正确项。",
        options: ["在相同的历史日期上比较现行方案与新方案。", "同时报告被拒人数与空置房间小时数。", "在考试周到客量更高的情景下做压力测试。", "只用方案表现最好的那一天评估。"],
        explanation: "公平比较需要相同条件、互补指标和压力情景。只挑最好的一天，是在选择性地展示证据。",
      },
    },
    {
      target: 10,
      exp: 10,
      multiple: true,
      answer: ["A", "C", "D", "E"],
      en: {
        question: "A dining hall must choose next week's staffing under a hard labor budget. Demand is uncertain, long waits may cause students to leave, and extending hours may change when students arrive. Which components belong in a coherent modeling architecture? Select all that apply.",
        options: ["Forecast demand using only information available when the staffing decision is made.", "Optimize only for mean demand, then present the result as valid for every week.", "Start with a transparent capacity baseline, then add a queue or simulation only where the baseline fails.", "Test high-demand and behavior-response scenarios and report sensitivity of the recommendation.", "Compare policies under the same conditions and monitor actual behavior after deployment.", "Select the most sophisticated algorithm before defining the objective."],
        explanation: "A coherent architecture respects decision-time information, preserves a checkable baseline, represents congestion and behavioral feedback when necessary, and validates policies fairly under uncertainty. Complexity and a point forecast alone cannot supply those guarantees.",
      },
      zh: {
        question: "食堂必须在严格的人工预算下决定下周排班。需求存在不确定性，等待过长会让学生离开，而延长营业时间又可能改变学生到达的时刻。下列哪些部件应进入一套连贯的建模架构？请选出所有正确项。",
        options: ["只用做排班决策当时已经可获得的信息预测需求。", "只对平均需求优化，然后宣称该结果对每一周都有效。", "先建立透明的容量基线，只在基线失效的环节加入排队模型或仿真。", "测试高需求与行为反应情景，并报告建议的灵敏度。", "在相同条件下比较政策，并在实施后监测真实行为。", "在定义目标之前，先选最复杂的算法。"],
        explanation: "连贯的架构要尊重决策时点的信息边界，保留可核对的基线，在必要时表达拥堵与行为反馈，并在不确定性下公平验证政策。单靠复杂算法或点预测无法做到这些。",
      },
    },
  ];

  const q = (target, exp, answer, en, zh, multiple = false) => ({
    target, exp, answer, multiple,
    en: { question: en[0], options: en[1], explanation: en[2] },
    zh: { question: zh[0], options: zh[1], explanation: zh[2] },
  });

  lesson1Questions.splice(0, 10,
    q(90, 1, ["C"],
      ["A shuttle completes one loop every 24 minutes and carries at most 18 passengers per loop. Ignoring loading losses, what is its hourly service capacity?", ["18 passengers/hour", "36 passengers/hour", "45 passengers/hour", "72 passengers/hour"], "One hour contains 60/24=2.5 loops, so capacity is 18×2.5=45 passengers per hour."],
      ["一辆接驳车每 24 分钟完成一个循环，每次最多载 18 人。忽略上下客损失，其每小时服务能力是多少？", ["18 人/小时", "36 人/小时", "45 人/小时", "72 人/小时"], "每小时完成 60/24=2.5 个循环，因此运力为 18×2.5=45 人/小时。"]),
    q(82, 1, ["B"],
      ["Inventory obeys I(t+1)=I(t)+q(t)-d(t)-w(t). If I(t)=35, q(t)=18, d(t)=40, and w(t)=3, what is I(t+1)?", ["4", "10", "16", "22"], "Apply the balance with signs intact: 35+18-40-3=10."],
      ["库存满足 I(t+1)=I(t)+q(t)-d(t)-w(t)。若 I(t)=35、q(t)=18、d(t)=40、w(t)=3，则 I(t+1) 是多少？", ["4", "10", "16", "22"], "按照守恒式保留正负号：35+18-40-3=10。"]),
    q(74, 2, ["A", "C", "D"],
      ["A model uses distance x in kilometers and travel time t in hours. Which expressions are dimensionally valid? Select all that apply.", ["v=x/t, with v in km/hour", "x+t", "exp(-kt) when k has unit 1/hour", "x-vt"], "Only like units may be added or subtracted, and an exponential argument must be dimensionless."],
      ["模型中距离 x 以千米计，时间 t 以小时计。哪些表达式量纲正确？请选出所有正确项。", ["v=x/t，v 的单位为千米/小时", "x+t", "当 k 的单位为 1/小时时，exp(-kt)", "x-vt"], "只有单位相同的量才能相加减，指数函数的自变量必须无量纲。"], true),
    q(65, 2, ["C"],
      ["A thermal box follows C dT/dt=hA(Ta-T). The initial gap |T(0)-Ta| is 20°C. With hA/C=0.25 per hour, when is the gap first 5°C?", ["2 ln 2 hours", "4 hours", "4 ln 4 hours", "8 ln 4 hours"], "The gap is 20 exp(-0.25t). Setting it to 5 gives exp(-0.25t)=1/4, hence t=4 ln 4=8 ln 2 hours. Option C states the direct form."],
      ["保温箱满足 C dT/dt=hA(Ta-T)，初始温差绝对值为 20°C，hA/C=0.25/小时。温差首次降到 5°C 需要多久？", ["2 ln 2 小时", "4 小时", "4 ln 4 小时", "8 ln 4 小时"], "温差为 20 exp(-0.25t)。令其等于 5，得 exp(-0.25t)=1/4，所以 t=4 ln 4 小时。"]),
    q(56, 3, ["A", "B", "D"],
      ["A ski lift has service rate μ(v)=120v guests/hour, trail residence time τ=1.5 hours, and safe expected trail occupancy K=540. Which statements follow from a steady-flow model? Select all that apply.", ["Admissions must satisfy λ≤360 guests/hour.", "Queue stability additionally requires λ<120v.", "At v=2, an admission rate of 300 is feasible.", "At v=4, the trail cap rather than lift service is the tighter upper bound."], "Little's law gives λτ≤K, hence λ≤360. Stability gives λ<120v. At v=2, service is below 300; at v=4, service capacity 480 exceeds the trail cap 360."],
      ["缆车服务率为 μ(v)=120v 人/小时，游客平均在雪道停留 τ=1.5 小时，安全期望人数上限 K=540。在稳态流模型下，哪些结论成立？", ["入场率必须满足 λ≤360 人/小时。", "队列稳定还要求 λ<120v。", "v=2 时，入场率 300 可行。", "v=4 时，雪道容量比缆车运力更紧。"], "Little 定律给出 λτ≤K，即 λ≤360；稳定性要求 λ<120v。v=2 时运力不足 300；v=4 时运力 480 大于雪道上限 360。"], true),
    q(46, 4, ["B"],
      ["Two continuous paths satisfy x1(0)=0, x1(1)=10, x2(0)=10, x2(1)=0. Let g(t)=x1(t)-x2(t). Which statement is mathematically guaranteed?", ["They meet at t=0.5.", "There is at least one t in (0,1) with g(t)=0.", "They meet exactly once.", "Their speeds are equal when they meet."], "Continuity and opposite endpoint signs guarantee at least one zero by the intermediate value theorem; neither its time nor uniqueness follows."],
      ["两条连续路径满足 x1(0)=0、x1(1)=10、x2(0)=10、x2(1)=0。令 g(t)=x1(t)-x2(t)。哪个结论在数学上必然成立？", ["它们在 t=0.5 相遇。", "至少存在一个 t∈(0,1) 使 g(t)=0。", "它们恰好相遇一次。", "相遇时速度相同。"], "连续性与端点异号只能通过介值定理保证至少一个零点，不能确定时刻、唯一性或速度。"]),
    q(36, 5, ["B"],
      ["Demand is d=80 with probability 0.25 and d=120 with probability 0.75. Each room serves 4 people; opening a room costs 9, and unmet demand costs 5 per person. Which integer room count minimizes 9x+5 E[max(0,d-4x)] among x=20,25,30?", ["20", "25", "30", "All three tie"], "Costs are: x=20: 180+5(0.75×40)=330; x=25: 225+5(0.75×20)=300; x=30:270. Thus x=30 is best."],
      ["需求 d=80 的概率为 0.25，d=120 的概率为 0.75。每个房间服务 4 人，开一间成本为 9，每个未满足需求惩罚为 5。在 x=20,25,30 中，谁使 9x+5E[max(0,d-4x)] 最小？", ["20", "25", "30", "三者相同"], "三个期望成本分别为 330、300 和 270，因此 x=30 最优。"]),
    q(27, 6, ["A", "C", "D"],
      ["A model y=a exp(-kt) is fitted from exact observations y(0)=12 and y(2)=3. Which statements are correct? Select all that apply.", ["a=12", "k=ln(2)/2", "k=ln(2)", "The half-life is 1 time unit", "The model predicts y(4)=1.5"], "a=12 and 3/12=exp(-2k)=1/4, so k=ln 2 and the half-life is 1. Then y(4)=12/16=0.75."],
      ["模型 y=a exp(-kt) 精确经过 y(0)=12 与 y(2)=3。哪些结论正确？", ["a=12", "k=ln(2)/2", "k=ln(2)", "半衰期为 1 个时间单位", "模型预测 y(4)=1.5"], "a=12，且 3/12=exp(-2k)=1/4，所以 k=ln 2，半衰期为 1，y(4)=12/16=0.75。"], true),
    q(18, 8, ["C"],
      ["A robust plan chooses integer x before d is known. It must satisfy 4x≥d for every d in [80,120], while x≤28 because of staffing. What is the correct conclusion?", ["x=25 is optimal", "x=28 is robust", "The robust model is infeasible", "Use d=100 and choose x=25"], "Robust coverage requires x≥30, but staffing requires x≤28. The intersection is empty."],
      ["鲁棒方案在 d 未知前选整数 x，要求对所有 d∈[80,120] 都有 4x≥d，但人员约束要求 x≤28。正确结论是什么？", ["x=25 最优", "x=28 是鲁棒解", "鲁棒模型不可行", "用 d=100 并选 x=25"], "鲁棒覆盖要求 x≥30，人员却要求 x≤28，两个集合没有交集。"]),
    q(10, 10, ["A", "C", "D", "F"],
      ["A dining hall chooses staffing x before observing demand D, then may call reserve staff y(D). Capacity is 12[x+y(D)], reserve calls cost 30 each, and shortage s(D) is allowed with 12[x+y(D)]+s(D)≥D. Which modeling statements are correct? Select all that apply.", ["x is a here-and-now decision and cannot depend on D.", "y must be identical in every demand scenario.", "Nonanticipativity is violated if x is scenario-specific before demand is observed.", "A complete objective can include first-stage staffing plus expected reserve and shortage costs.", "Setting s(D)<0 is a valid way to represent excess capacity.", "A deterministic average-demand model can miss expensive tail shortages."], "The information timeline distinguishes first-stage x from scenario-dependent recourse y and nonnegative shortage s. Expected cost may combine both stages, and a mean-only model can conceal tail risk."],
      ["食堂在观察需求 D 前决定基础人员 x，之后可调用备班 y(D)。产能为 12[x+y(D)]，每名备班成本 30，并允许缺口 s(D)，满足 12[x+y(D)]+s(D)≥D。哪些建模结论正确？", ["x 是事前决策，不能依赖 D。", "y 在所有需求情景中必须相同。", "若需求未观察时就让 x 随情景改变，就违反了非预见性。", "完整目标可包含事前排班成本，以及期望备班与缺口成本。", "令 s(D)<0 可以合法表示过剩产能。", "只用平均需求的确定性模型可能忽略尾部情景的高额缺口。"], "信息时序把事前 x 与情景相关的补救 y、非负缺口 s 分开。目标可合并两阶段成本，而只看均值会掩盖尾部风险。"], true)
  );

  const lesson9Questions = [
    q(90, 1, ["B"], ["If V is measured in liters, what unit must dV/dt have?", ["Liters", "Liters per minute", "Minutes per liter", "Dimensionless"], "A derivative divides the state unit by the independent-variable unit."], ["若 V 的单位是升，dV/dt 的单位应是什么？", ["升", "升/分钟", "分钟/升", "无量纲"], "导数的单位是状态单位除以自变量单位。"]),
    q(82, 1, ["C"], ["What is a sufficient state for an ideal pendulum?", ["Angle only", "Angular velocity only", "Angle and angular velocity", "Mass and length only"], "The same angle can be crossed in two directions, so both angle and angular velocity are required."], ["理想单摆的充分状态是什么？", ["只有角度", "只有角速度", "角度与角速度", "只有质量与长度"], "同一角度可能沿两个方向经过，因此需要角度和角速度。"]),
    q(74, 2, ["B"], ["A second-order scalar ODE normally needs how many independent conditions for a unique solution?", ["One", "Two", "Three", "It never needs conditions"], "Its first-order state representation has two components."], ["二阶标量 ODE 通常需要几个独立条件才能选出唯一解？", ["一个", "两个", "三个", "完全不需要"], "改写为一阶状态系统后有两个状态分量。"]),
    q(65, 2, ["C"], ["An ideal small-angle pendulum's length is multiplied by 4. Its period is multiplied by:", ["1", "2√2", "2", "4"], "P is proportional to the square root of length."], ["小角度理想单摆长度变为 4 倍，周期变为多少倍？", ["1", "2√2", "2", "4"], "周期与长度的平方根成正比。"]),
    q(56, 3, ["D"], ["For a draining hemisphere, tf is proportional to R^(5/2)/a. If R doubles and hole area a doubles, the time factor is:", ["√2", "2", "4", "2√2"], "The factor is 2^(5/2)/2=2^(3/2)=2√2."], ["半球排水时间 tf∝R^(5/2)/a。若 R 和孔面积 a 都加倍，时间变为多少倍？", ["√2", "2", "4", "2√2"], "比例为 2^(5/2)/2=2^(3/2)=2√2。"]),
    q(46, 4, ["A", "C"], ["For the steady cooling-rod boundary problem, which statements are correct?", ["Two endpoint temperatures provide two boundary conditions.", "The steady model predicts warm-up time.", "The parameter αBL²/(λA) is dimensionless.", "Removing time always improves physical accuracy."], "The second-order spatial ODE needs two boundaries, and nondimensionalization produces αBL²/(λA). Steady state cannot predict transients."], ["关于稳态散热杆边值问题，哪些说法正确？", ["两个端点温度提供两个边界条件。", "稳态模型能预测升温时间。", "参数 αBL²/(λA) 无量纲。", "去掉时间一定提升物理精度。"], "二阶空间方程需要两个边界，无量纲化得到 αBL²/(λA)；稳态模型无法预测瞬态。"], true),
    q(36, 5, ["B"], ["In logistic growth dN/dt=rN(1−N/K), the absolute growth rate is maximal at:", ["N=0", "N=K/2", "N=K", "N=2K"], "Differentiate the quadratic growth term with respect to N."], ["Logistic 模型 dN/dt=rN(1−N/K) 的绝对增长率何时最大？", ["N=0", "N=K/2", "N=K", "N=2K"], "对关于 N 的二次增长项求导即可。"]),
    q(27, 6, ["C"], ["Forward Euler solves x′=−kx with step Δt. Which condition makes the discrete magnitude shrink without sign alternation?", ["kΔt>2", "1<kΔt<2", "0<kΔt<1", "kΔt=3"], "The multiplier 1−kΔt must lie between 0 and 1."], ["前向 Euler 求解 x′=−kx。离散解幅值衰减且不变号的条件是什么？", ["kΔt>2", "1<kΔt<2", "0<kΔt<1", "kΔt=3"], "乘子 1−kΔt 必须位于 0 与 1 之间。"]),
    q(18, 8, ["A", "B", "D"], ["For the HIV system T′=s−dT−βVT, I′=βVT−δI, V′=pI−cV, which claims are correct?", ["The infection-transfer term cancels in T′+I′.", "Treatment efficacy can be modeled by reducing β or p.", "One viral-load curve always identifies all six parameters uniquely.", "Held-out prediction is stronger evidence than fitting the same points."], "Internal infection transfer cancels; treatment can act on infection or production; sparse single-output data generally do not identify every parameter."], ["对 HIV 系统 T′=s−dT−βVT，I′=βVT−δI，V′=pI−cV，哪些结论正确？", ["感染转移项在 T′+I′ 中抵消。", "治疗作用可通过降低 β 或 p 表达。", "一条病毒载量曲线一定能唯一识别六个参数。", "留出预测比在同一数据上拟合更有证据力。"], "内部感染转移抵消；治疗可作用于感染或产生；单输出稀疏数据通常无法识别全部参数。"], true),
    q(10, 10, ["A", "C", "D", "E"], ["Two parameter sets fit early logistic data equally well. Which actions can genuinely improve identification?", ["Collect observations near and beyond the inflection region.", "Report more decimal places from the optimizer.", "Measure or bound carrying capacity independently.", "Design a perturbation that separates candidate trajectories.", "Profile parameters and inspect flat loss directions."], "Identification improves through informative data or defensible constraints, not numerical formatting."], ["两组参数同样拟合 Logistic 早期数据。哪些措施能真正改善识别？", ["收集拐点附近及之后的数据。", "让优化器输出更多小数。", "独立测量或约束环境容量。", "设计能使候选轨迹分离的扰动。", "做参数 profile 并检查平坦损失方向。"], "识别能力来自有信息量的数据或可信约束，不来自数字格式。"], true),
  ];

  const lesson2Questions = [
    q(90, 1, ["B"], ["What is the strongest first criterion when choosing among competition problems?", ["The problem contains the newest algorithm name", "The team can build and validate an end-to-end evidence chain", "The problem statement is the shortest", "A teammate has already drawn a cover figure"], "Problem selection should be based on a feasible evidence path from interpretation to validation and recommendation."], ["竞赛选题时，最重要的首要标准是什么？", ["题目包含最新的算法名称", "团队能建立并验证从解读到建议的完整证据链", "题干最短", "队友已经画好封面图"], "选题应看是否存在从解读、建模到验证和建议的可行证据路径。"]),
    q(82, 1, ["C"], ["What must an early baseline do?", ["Use every supplied variable", "Outperform all later models", "Run end to end and answer part of the decision transparently", "Contain a neural network"], "A baseline anchors the workflow. It must be interpretable, reproducible, and relevant to the requested decision."], ["早期基线模型必须做到什么？", ["使用所有提供的变量", "超过后续所有模型", "能端到端运行，并透明地回答一部分决策问题", "必须包含神经网络"], "基线是工作流的锚点，必须可解释、可复现并且与决策相关。"]),
    q(74, 2, ["A", "C", "D"], ["Which items belong in a competition risk register? Select all that apply.", ["A missing variable that could block validation", "A list of favorite color palettes", "A fragile data merge with unmatched identifiers", "A model extension whose runtime may exceed the budget"], "The register tracks risks that can break the evidence path, together with owners, early tests, and fallback actions."], ["哪些内容应放进竞赛风险登记表？请选出所有正确项。", ["可能阻断验证的缺失变量", "最喜欢的配色列表", "含有未匹配标识符的脆弱数据合并", "运行时间可能超出预算的模型扩展"], "风险登记表跟踪可能破坏证据路径的问题，并记录负责人、早期测试和备选方案。"], true),
    q(65, 2, ["B"], ["A time-series team randomly splits daily observations into training and test rows. Why is this dangerous?", ["Random splitting always uses too little memory", "Future patterns may leak into evaluation of earlier predictions", "It prevents normalization", "It makes all models linear"], "Forecast evaluation must preserve information order, usually through rolling or forward splits."], ["时序团队随机划分每日观测到训练集和测试集。为什么这很危险？", ["随机划分总是使用太少内存", "未来模式可能泄漏到对较早预测的评估中", "它会阻止归一化", "它会使所有模型线性化"], "预测评估必须保持信息时序，通常使用滚动或向前划分。"]),
    q(56, 3, ["A", "B", "D"], ["When is adding a more complex model justified? Select all that apply.", ["It fixes a named failure of the baseline", "It improves held-out evidence or changes a consequential decision", "Its name sounds more advanced", "The team can verify it within the remaining time"], "Complexity must earn its place through evidence and remain within the team's verification budget."], ["什么时候加入更复杂的模型才合理？请选出所有正确项。", ["它修复了基线的一个明确缺陷", "它改善了留出证据，或改变了重要决策", "它的名称听起来更高级", "团队能在剩余时间内验证它"], "复杂性必须通过证据证明价值，同时不得超出团队的验证预算。"], true),
    q(46, 4, ["C"], ["A crop optimizer earns revenue from all production although sales are capped by demand. Which modeling repair is most direct?", ["Increase the solver tolerance", "Add more random seeds", "Introduce sold quantity bounded by both production and demand", "Replace the objective with runtime"], "Separating production from sold quantity prevents the model from receiving revenue for unsold output."], ["农作物优化模型按全部产量计算收入，但销售量受需求上限约束。最直接的修复是什么？", ["增大求解器容差", "增加随机种子", "引入销售量变量，同时受产量和需求上界约束", "把目标改成运行时间"], "将产量与销售量分开，可防止模型对无法售出的产品计算收入。"]),
    q(36, 5, ["B"], ["A facility-location model minimizes average travel time and leaves a small remote high-need community unserved. What is the best interpretation?", ["The solver is necessarily wrong", "The objective omits or underweights a fairness requirement", "Average travel time cannot be computed", "The remote community must be deleted from the data"], "Optimization faithfully follows the stated objective. An unacceptable solution often reveals a missing value judgment or constraint."], ["设施选址模型最小化平均行程时间，却让一个偏远且需求高的小社区得不到服务。最合理的解释是什么？", ["求解器必然出错", "目标函数遗漏或低估了公平性要求", "平均行程时间无法计算", "应从数据中删除该社区"], "优化器会忠实执行所写的目标。不可接受的方案往往暴露了未写出的价值判断或约束。"]),
    q(27, 6, ["A", "C", "D"], ["Which uses of ChatGPT create inspectable competition artifacts? Select all that apply.", ["Generate counterexamples to one stated constraint", "Invent missing parameter values and present them as measured", "Draft unit tests for a small pure function", "Review a claim ledger for unsupported causal language"], "AI is most useful when its output can be checked against definitions, tests, evidence, or sources."], ["哪些 ChatGPT 用法能产生可检查的竞赛产物？请选出所有正确项。", ["为一条已写明的约束生成反例", "虚构缺失参数并当作实测值", "为小型纯函数起草单元测试", "检查主张台账中无证据的因果语言"], "AI 在输出能与定义、测试、证据或来源对照时最有价值。"], true),
    q(18, 8, ["C"], ["An exact mixed-integer solver proves a 12% gap after the time limit. A heuristic finds a feasible plan with value 1,020, while the solver's valid lower bound is 930 for minimization. What can be claimed?", ["The heuristic is globally optimal", "The heuristic is exactly 12% from optimum", "The heuristic's certified gap relative to the lower bound is at most about 9.7%, but its true gap may be smaller", "No quantitative statement is possible"], "(1020-930)/930 is about 9.7%. A valid bound certifies a worst-case gap; it does not prove the actual optimum equals the bound."], ["最小化问题中，启发式方案的目标值为 1020，精确求解器给出有效下界 930。可以声称什么？", ["启发式得到全局最优", "启发式恰好偏离最优 12%", "相对该下界的可证最坏差距约为 9.7%，真实差距可能更小", "无法作任何定量陈述"], "(1020-930)/930 约为 9.7%。有效界能证明最坏差距，但不证明真实最优值等于该界。"]),
    q(10, 10, ["A", "B", "D", "F"], ["Twelve hours before submission, a new model improves in-sample fit by 3% but has no held-out test, changes three figures, and produces the same recommendation. Which actions are defensible? Select all that apply.", ["Keep the validated model as the main result", "Record the new idea for future work", "Replace everything because lower training error is decisive", "Check whether the 3% gain survives the existing validation protocol before considering inclusion", "Hide the baseline to save space", "Freeze unless a verified error makes the current result invalid"], "Late complexity with no decision value and no validation is verification debt. Preserve the auditable chain unless evidence reveals an actual flaw."], ["距截止还有 12 小时，一个新模型将样本内拟合改善 3%，但没有留出测试，要更改三张图，且建议不变。哪些行动可辩护？请选出所有正确项。", ["继续以已验证模型为主结果", "把新想法记入后续工作", "因训练误差更低而全部替换", "先检查 3% 改善是否能通过现有验证流程，再考虑纳入", "为节省篇幅隐藏基线", "除非发现使现有结果无效的已验证错误，否则冻结结构"], "没有决策价值且缺乏验证的晚期复杂性只会创造验证债务。除非证据揭示真实错误，应保留可审计的证据链。"], true),
  ];

  const lesson3Questions = [
    q(90, 1, ["B"], ["Before choosing a chart type, what should you write first?", ["A list of available colors", "The claim the reader should believe and the comparison that supports it", "The software used to export the image", "The figure number"], "Visual design begins with an evidence claim. The chart form follows the comparison the reader must inspect."], ["选择图表类型之前，首先应该写什么？", ["可用颜色清单", "读者应相信的结论，以及支撑它的比较", "导出图片的软件", "图号"], "可视化设计始于证据主张，图形应服务于读者需要检查的比较。"]),
    q(82, 1, ["C"], ["Which encoding usually supports the most precise quantitative comparison?", ["Area", "Color hue", "Position on a common scale", "Three-dimensional volume"], "Aligned position is read more accurately than area, hue, or volume."], ["哪种视觉编码通常最适合精确的定量比较？", ["面积", "颜色色相", "共同尺度上的位置", "三维体积"], "人对共同尺度上的对齐位置判读通常比面积、色相或体积更准确。"]),
    q(74, 2, ["A", "C", "D"], ["Which details are normally required to interpret a time-series forecast responsibly? Select all that apply.", ["A visible boundary between observations and forecasts", "A decorative gradient behind the curve", "An uncertainty interval", "The time unit and sampling frequency"], "A forecast must separate evidence from extrapolation and reveal both temporal scale and uncertainty."], ["要负责任地解读时序预测，通常需要哪些信息？请选出所有正确项。", ["观测区间与预测区间的明确边界", "曲线后面的装饰渐变", "不确定性区间", "时间单位与采样频率"], "预测必须区分证据与外推，同时说明时间尺度和不确定性。"], true),
    q(65, 2, ["B"], ["Two policy panels invite comparison, but each uses an automatically chosen vertical scale. What is the main risk?", ["The file size may be too small", "The panels can make different magnitudes look equally variable", "The legend will always disappear", "The data become categorical"], "Panels that invite comparison need a shared or explicitly justified scale; otherwise visual amplitude is misleading."], ["两个政策面板请读者比较，但纵轴都是自动缩放的。主要风险是什么？", ["文件体积可能太小", "不同幅度可能看起来同样波动", "图例一定消失", "数据会变成类别型"], "用于比较的面板应使用共同或经充分说明的尺度，否则视觉幅度会误导。"]),
    q(56, 3, ["A", "B", "D"], ["A sensitivity figure varies one parameter by ±20%. Which questions must be answered before it supports robustness?", ["Why is ±20% a plausible range?", "Were coupled parameters varied consistently?", "Was the brightest color palette used?", "Does any variation cross a feasibility or decision threshold?"], "Robustness depends on meaningful perturbations and their decision consequences, not on the visual polish of the curve."], ["一张灵敏度图将某参数改变 ±20%。它要支持稳健性结论，必须回答哪些问题？", ["为什么 ±20% 是合理范围？", "耦合参数是否一致变化？", "是否使用了最鲜艳的配色？", "变化是否跨过可行性或决策阈值？"], "稳健性取决于有意义的扰动及其决策后果，不取决于曲线外观。"], true),
    q(46, 4, ["C"], ["A map colors every county by predicted risk, although observations exist at only six sites. What is the most important correction?", ["Use more saturated colors", "Remove all geographic boundaries", "Show observation locations and communicate interpolation or prediction uncertainty", "Replace the map with a pie chart"], "A continuous surface can imply knowledge where none was observed. Sampling support and spatial uncertainty must be visible."], ["观测只来自 6 个站点，地图却给每个县填上了预测风险。最重要的修正是什么？", ["使用更鲜艳的颜色", "去掉所有地理边界", "显示观测位置，并说明插值或预测的不确定性", "改用饼图"], "连续表面会暗示我们在未观测位置也掌握了信息，因此必须显示采样支持与空间不确定性。"]),
    q(36, 5, ["A", "C", "D"], ["Which statements describe a defensible network figure? Select all that apply.", ["The caption defines nodes and edges.", "Every recorded edge must be drawn at equal strength.", "Direction and width have stable meanings.", "Filtering uses an explicit analytical rule."], "A network plot needs a data dictionary and a justified reduction rule. Drawing everything equally usually produces an unreadable hairball."], ["哪些说法描述了可辩护的网络图？请选出所有正确项。", ["图注定义节点和边。", "每条记录到的边都必须以相同强度绘制。", "方向和线宽有稳定含义。", "过滤使用明确的分析规则。"], "网络图需要数据字典和合理的简化规则；无差别画出一切通常只会产生难以阅读的“毛线团”。"], true),
    q(27, 6, ["B"], ["A model has lower RMSE than a baseline but its residual plot shows long runs of positive and negative errors. What should the paper conclude?", ["The lower RMSE proves the model is adequate.", "The model improves average error but leaves temporal structure unexplained.", "Residual order is irrelevant once RMSE is reported.", "The residual plot should be removed."], "Patterned residuals indicate missing dependence or mechanism even when the aggregate score improves."], ["某模型的 RMSE 低于基线，但残差图中正误差和负误差长时间成段出现。论文应得出什么结论？", ["RMSE 更低就证明模型足够好。", "模型改善了平均误差，但仍未解释时间结构。", "报告 RMSE 后残差顺序就无关紧要。", "应删除残差图。"], "即使聚合指标改善，有结构的残差仍表明存在未建模的依赖或机制。"]),
    q(18, 8, ["A", "B", "D"], ["You adapt a figure from an award paper as inspiration for your own competition report. Which practices are appropriate?", ["Rebuild it from your own data", "Cite the source of the design inspiration", "Reuse the original values but change the colors", "Explain how the encoding supports your own claim"], "Responsible adaptation preserves the design lesson while replacing the original evidence and conclusion with your own traceable analysis."], ["你参考一篇获奖论文的图形设计来制作自己的竞赛报告。哪些做法合适？", ["用自己的数据重建图形", "标注设计灵感的来源", "保留原文数值只换颜色", "说明该编码如何支持自己的结论"], "负责任的借鉴保留设计经验，但用自己可追溯的分析替代原文的数据和结论。"], true),
    q(10, 10, ["A", "C", "D", "F"], ["A report claims Plan A is robust because it has the lowest mean cost in 1,000 simulations. What additional visual evidence is needed for a strong decision claim? Select all that apply.", ["The cost distribution or tail-risk metric for every plan", "A 3D rendering of the simulation", "The frequency and magnitude of constraint violations", "Paired scenario-wise differences when plans face the same simulations", "A larger title font", "A marked decision threshold and sensitivity to uncertain inputs"], "Mean cost alone cannot establish robustness. Tail behavior, feasibility, paired comparisons, thresholds, and input sensitivity connect simulation output to the decision."], ["报告称 A 方案在 1,000 次模拟中的平均成本最低，因此最稳健。要支持强决策结论，还需要哪些可视化证据？请选出所有正确项。", ["每个方案的成本分布或尾部风险指标", "模拟过程的三维渲染", "约束违反的频率与幅度", "各方案在相同模拟场景下的配对差异", "更大的标题字号", "明示决策阈值以及对不确定输入的灵敏度"], "平均成本不能单独证明稳健性。尾部行为、可行性、配对比较、阈值和输入灵敏度才能把模拟结果连接到决策。"], true),
  ];

  const lesson4Questions = [
    q(90, 1, ["D"], ["Solve max 5x+4y subject to 2x+y≤8, x+2y≤8, x,y≥0. What is the optimal value?", ["16", "20", "64/3", "24"], "The two active lines intersect at x=y=8/3, giving value 24; the axis vertices give 20 and 16."], ["求 max 5x+4y，约束 2x+y≤8、x+2y≤8、x,y≥0。最优值是多少？", ["16", "20", "64/3", "24"], "两条活动直线交于 x=y=8/3，目标值为 24；两个坐标轴顶点分别给出 20 和 16。"]),
    q(82, 1, ["B"], ["For that LP, the dual is min 8u+8v subject to 2u+v≥5, u+2v≥4, u,v≥0. Which dual optimum certifies the primal answer?", ["(u,v)=(1,1)", "(u,v)=(2,1)", "(u,v)=(5/2,0)", "(u,v)=(0,4)"], "At (2,1), both dual constraints bind and the dual value is 24, matching the feasible primal value."], ["上题的对偶为 min 8u+8v，约束 2u+v≥5、u+2v≥4、u,v≥0。哪个对偶最优解证明了原问题答案？", ["(u,v)=(1,1)", "(u,v)=(2,1)", "(u,v)=(5/2,0)", "(u,v)=(0,4)"], "(2,1) 使两条对偶约束取等，对偶值为 24，与原问题可行解的值相同。"]),
    q(74, 2, ["A", "C", "D"], ["Replace the first right-hand side by 8+δ while the same two constraints remain active. Which statements are correct? Select all that apply.", ["x=(8+2δ)/3 and y=(8-δ)/3", "The basis remains feasible for every real δ", "The basis is feasible for -4≤δ≤8", "Within that range, the optimal value is 24+2δ"], "Solving the two active equations gives the stated point. Nonnegativity gives -4≤δ≤8, and the first shadow price u=2 gives value 24+2δ."], ["将第一个约束右端改为 8+δ，并假设原来两条约束仍为活动约束。哪些结论正确？", ["x=(8+2δ)/3，y=(8-δ)/3", "对任意实数 δ，该基都可行", "该基在 -4≤δ≤8 时可行", "在该范围内，最优值为 24+2δ"], "解两条活动等式得到该点；非负性给出 -4≤δ≤8，而第一个影子价格 u=2，因此目标值为 24+2δ。"], true),
    q(65, 2, ["C"], ["A maximization MILP has incumbent 940 and valid upper bound 1,000. Using gap=(UB-LB)/UB, what is the certified relative gap?", ["4%", "5%", "6%", "6.38%"], "The certified gap under the stated convention is (1000-940)/1000=6%."], ["最大化 MILP 的可行解为 940，有效上界为 1000。按 gap=(UB-LB)/UB 定义，可证最优差距是多少？", ["4%", "5%", "6%", "6.38%"], "按题目指定口径，差距为 (1000-940)/1000=6%。"]),
    q(56, 3, ["A", "C", "D"], ["For Q=[[4,2],[2,1]], which statements are correct? Select all that apply.", ["Q is positive semidefinite", "Q is positive definite", "Its eigenvalues are 0 and 5", "The quadratic x^TQx equals (2x1+x2)^2"], "Q has determinant 0 and trace 5, so its eigenvalues are 0 and 5. It is PSD but not PD, and its quadratic form is a perfect square."], ["对 Q=[[4,2],[2,1]]，哪些结论正确？", ["Q 半正定", "Q 正定", "Q 的特征值为 0 和 5", "二次型 x^TQx=(2x1+x2)^2"], "Q 的行列式为 0、迹为 5，故特征值为 0 和 5。它半正定但不正定，且二次型是完全平方。"], true),
    q(46, 4, ["B"], ["Solve min (x1-3)^2+(x2-1)^2 subject to x1+x2≤2. Which KKT pair is correct?", ["x=(3,1), λ=0", "x=(2,0), λ=2", "x=(1,1), λ=-2", "x=(0,2), λ=2"], "The Euclidean projection of (3,1) onto x1+x2≤2 is (2,0). Stationarity with g=x1+x2-2 gives λ=2."], ["求 min (x1-3)^2+(x2-1)^2，约束 x1+x2≤2。哪个 KKT 解正确？", ["x=(3,1), λ=0", "x=(2,0), λ=2", "x=(1,1), λ=-2", "x=(0,2), λ=2"], "将 (3,1) 欧氏投影到半空间 x1+x2≤2，得 (2,0)。对 g=x1+x2-2 写驻点条件，得 λ=2。"]),
    q(36, 5, ["A", "B", "D"], ["Consider min 0.5(x1^2+x2^2) subject to x1+x2≥6 and x≥0. Which KKT statements hold at the optimum? Select all that apply.", ["x1=x2=3", "The multiplier for 6-x1-x2≤0 is 3", "One nonnegativity constraint is active", "The optimal objective value is 9"], "Symmetry and stationarity give x=(3,3) and multiplier 3. Both nonnegativity constraints are slack; 0.5(9+9)=9."], ["考虑 min 0.5(x1^2+x2^2)，约束 x1+x2≥6 且 x≥0。在最优点，哪些 KKT 结论成立？", ["x1=x2=3", "约束 6-x1-x2≤0 的乘子为 3", "有一条非负约束是活动的", "最优目标值为 9"], "对称性和驻点条件给出 x=(3,3)、乘子为 3。两条非负约束都不活动，而 0.5(9+9)=9。"], true),
    q(27, 6, ["C"], ["For a robust constraint (abar+Pu)^T x≤b for every ||u||2≤ρ, let abar=(2,1), P=diag(1,2), x=(3,4), and ρ=0.5. What is the exact worst-case left side?", ["10+0.5 sqrt(25)", "10+sqrt(73)", "10+0.5 sqrt(73)", "14"], "abar^Tx=10 and P^Tx=(3,8), whose norm is sqrt(73). The support-function term is 0.5 sqrt(73)."], ["鲁棒约束为：对所有 ||u||2≤ρ，(abar+Pu)^T x≤b。令 abar=(2,1)、P=diag(1,2)、x=(3,4)、ρ=0.5。精确的最坏左端是多少？", ["10+0.5 sqrt(25)", "10+sqrt(73)", "10+0.5 sqrt(73)", "14"], "abar^Tx=10，P^Tx=(3,8)，其范数为 sqrt(73)，支撑函数项为 0.5 sqrt(73)。"]),
    q(18, 8, ["A", "C", "D"], ["A two-crop, two-year MILP uses area x(t,k), planting indicator z(t,k), and sold quantity s(t,k). Which constraints correctly encode the intended rules? Select all that apply.", ["0≤x(t,k)≤A z(t,k) links area to activation", "s(t,k)≥production(t,k) forces honest revenue", "s(t,k)≤production(t,k) and s(t,k)≤demand(t,k)", "z(t,k)+z(t+1,k)≤1 forbids consecutive planting", "Replacing every z by a continuous number in [0,1] preserves the same crop schedule"], "Activation uses a tight upper bound, sales must be below both production and demand, and the binary adjacency constraint enforces rotation. Continuous z is only a relaxation."], ["两种作物、两年的 MILP 使用面积 x(t,k)、种植指示 z(t,k) 和销量 s(t,k)。哪些约束正确表达规则？", ["0≤x(t,k)≤A z(t,k) 将面积与启用联系", "s(t,k)≥production(t,k) 保证收入诚实", "s(t,k)≤production(t,k) 且 s(t,k)≤demand(t,k)", "z(t,k)+z(t+1,k)≤1 禁止连作", "把所有 z 换成 [0,1] 中的连续数仍保留相同种植方案"], "启用关系需要紧上界，销量同时不能超过产量和需求，二元相邻约束实现轮作。连续 z 只是松弛。"], true),
    q(10, 10, ["A", "C", "D", "F"], ["A planner maximizes expected crop profit over scenarios ω. Planting x is fixed before ω is known; sales s(ω), disposal r(ω), and shortage h(ω) adapt afterward. Which mathematical requirements are correct? Select all that apply.", ["Planting variables must satisfy nonanticipativity across scenarios", "Sales may exceed scenario production if expected production is sufficient", "Scenario balances may be written production(ω)=s(ω)+r(ω) and s(ω)+h(ω)=demand(ω)", "Expected profit must weight scenario terms by their probabilities", "A negative disposal variable is an acceptable source of extra crop", "A CVaR term can penalize tail losses without changing the first-stage information boundary"], "The timeline requires common first-stage planting, scenario-feasible balances, probability-weighted recourse, and nonnegative physical flows. CVaR changes risk preference, not what may be known before the scenario."], ["规划者在情景 ω 下最大化期望农业利润。种植 x 在 ω 未知前确定；销量 s(ω)、废弃量 r(ω) 和缺口 h(ω) 事后调整。哪些数学要求正确？", ["种植变量必须在各情景间满足非预见性", "只要期望产量足够，销量就可超过当前情景产量", "情景平衡可写为 production(ω)=s(ω)+r(ω) 且 s(ω)+h(ω)=demand(ω)", "期望利润必须用情景概率加权", "负的废弃量可以作为额外作物来源", "CVaR 可惩罚尾部损失，但不改变事前决策的信息边界"], "时序要求事前种植在情景间一致，情景内物流可行，补救项按概率加权，且物理流非负。CVaR 改变风险偏好，不改变事前可获信息。"], true),
  ];

  const lesson6Questions = [
    q(90, 1, ["B"], ["For minimization, when does plan A dominate plan B?", ["A is better on one objective even if worse on every other objective", "A is no worse on every objective and strictly better on at least one", "A has the smallest weighted score under one arbitrary weight vector", "A is cheaper regardless of feasibility"], "Pareto dominance requires componentwise non-worsening and at least one strict improvement among feasible plans."], ["对最小化问题，方案 A 何时支配方案 B？", ["A 在一个目标更好，即使其他目标全更差", "A 在每个目标都不更差，并且至少一个目标严格更好", "A 在某一组任意权重下加权分数最小", "无论是否可行，A 更便宜"], "Pareto 支配要求可行方案在所有目标上都不更差，并至少有一个严格改善。"]),
    q(82, 1, ["C"], ["Why normalize objectives before using a weighted sum?", ["Normalization guarantees a convex frontier", "Normalization discovers ethical priorities automatically", "It prevents numerical units and scales from silently determining the trade-off", "It removes the need for sensitivity analysis"], "Without a common scale, an objective measured with large numerical values can dominate regardless of stated importance."], ["使用加权和之前为什么通常要归一化目标？", ["归一化保证前沿凸", "归一化会自动发现伦理优先级", "防止单位和数值尺度暗中决定权衡", "归一化后不再需要灵敏度分析"], "如果没有共同尺度，数值较大的目标可能无视所声明的重要性而主导结果。"]),
    q(74, 2, ["A", "C", "D"], ["Which statements about the epsilon-constraint method are correct? Select all that apply.", ["It can recover unsupported efficient points", "It removes all stakeholder judgment", "Its bounds can be expressed as meaningful service or risk thresholds", "Discrete models may produce repeated points and jumps"], "Epsilon constraints expose explicit thresholds and can recover non-supported points, but choosing thresholds remains a preference decision."], ["关于 epsilon-constraint 方法，哪些说法正确？请选出所有正确项。", ["它可以找到非支持的有效点", "它消除了所有利益相关者判断", "其约束界可以表达有意义的服务或风险阈值", "离散模型可能出现重复点和跳跃"], "epsilon 约束能表达明确阈值并找到非支持点，但阈值选择仍然属于偏好判断。"], true),
    q(65, 2, ["B"], ["Flood projects have worst absolute costs A=70, B=46, C=36 and worst regrets A=34, B=10, C=19. Which pair is correct?", ["Minimax cost chooses B; minimax regret chooses C", "Minimax cost chooses C; minimax regret chooses B", "Both choose A", "Both choose C"], "Minimax cost selects the smallest worst cost, C. Minimax regret selects the smallest worst regret, B."], ["防洪项目的最坏绝对成本为 A=70、B=46、C=36，最坏 regret 为 A=34、B=10、C=19。哪个结论正确？", ["minimax cost 选 B；minimax regret 选 C", "minimax cost 选 C；minimax regret 选 B", "二者都选 A", "二者都选 C"], "minimax cost 选择最小的最坏成本 C；minimax regret 选择最小的最坏 regret B。"]),
    q(56, 3, ["A", "B", "D"], ["Which uncertainty descriptions are matched appropriately? Select all that apply.", ["A coherent heat-wave scenario can couple demand and equipment efficiency", "An ellipsoid can represent correlated parameter directions", "A box always excludes simultaneous marginal extremes", "Alternative response equations represent structural uncertainty"], "Scenarios preserve joint stories, ellipsoids encode directions, and alternative mechanisms are structural. A box includes every corner."], ["哪些不确定性描述匹配正确？请选出所有正确项。", ["连贯的热浪情景可以耦合需求和设备效率", "椭球可以表示相关参数方向", "箱集总会排除边际极值同时发生", "不同响应方程表示结构不确定性"], "情景保留联合故事，椭球编码方向，不同机制属于结构不确定性；箱集包含所有角点。"], true),
    q(46, 4, ["C"], ["For x>=0 and coefficient uncertainty ai in [abar_i-rho_i, abar_i+rho_i], what protects a^T x<=b against every box realization?", ["abar^T x<=b", "abar^T x-rho^T x<=b", "(abar+rho)^T x<=b", "Replace x by its mean"], "With nonnegative activities, the adversary increases every uncertain resource coefficient to its upper endpoint."], ["当 x>=0 且 ai 位于 [abar_i-rho_i, abar_i+rho_i] 时，哪个约束能保护 a^T x<=b 对所有箱集实现都成立？", ["abar^T x<=b", "abar^T x-rho^T x<=b", "(abar+rho)^T x<=b", "用 x 的均值替代 x"], "活动非负时，对手会把每个不确定资源系数提高到上端点。"]),
    q(36, 5, ["B"], ["For ellipsoidal uncertainty a=abar+Pu, ||u||2<=rho, the exact worst uncertain contribution is:", ["rho||Px||1", "rho||P^T x||2", "rho^2 x^T P x", "the average of P"], "The support function of the l2 ball at P^T x is rho times its l2 norm."], ["对椭球不确定性 a=abar+Pu、||u||2<=rho，精确的最坏不确定贡献是？", ["rho||Px||1", "rho||P^T x||2", "rho^2 x^T P x", "P 的平均值"], "l2 球在 P^T x 方向的支撑函数是 rho 乘该向量的 l2 范数。"]),
    q(27, 6, ["A", "C", "D"], ["Which claims about robust optimization are defensible? Select all that apply.", ["Robust constraints protect only against the declared uncertainty set", "Larger uncertainty sets are always better decisions", "A missing mechanism cannot be repaired merely by widening parameter intervals", "Expected cost can be combined with robust safety constraints"], "Protection is conditional on the set and model structure. Mixed risk treatment can be appropriate; indiscriminately enlarging sets can waste resources."], ["关于鲁棒优化，哪些结论可辩护？请选出所有正确项。", ["鲁棒约束只对声明的不确定集提供保护", "不确定集越大决策一定越好", "缺失机制不能只靠扩大参数区间修复", "期望成本可以与鲁棒安全约束结合"], "保护取决于不确定集和模型结构；可以混合风险处理，而盲目扩大集合会浪费资源。"], true),
    q(18, 8, ["B"], ["Why is requiring a fixed decision to satisfy an uncertain balance equality for every realization often inappropriate?", ["Equalities are never used in optimization", "Balance normally needs recourse that adapts after demand or supply is observed", "Robust models cannot contain continuous variables", "It automatically makes the objective nonconvex"], "A single here-and-now vector usually cannot balance many distinct right-hand sides. Adjustable production, inventory, shortage, or flow is needed."], ["为什么要求一个固定决策对每个不确定实现都满足平衡等式通常不合适？", ["优化中从不使用等式", "平衡通常需要在观察需求或供给后调整的 recourse", "鲁棒模型不能有连续变量", "它一定使目标非凸"], "同一个事前向量通常无法平衡多个不同右端；需要可调的生产、库存、缺口或流量。"]),
    q(10, 10, ["A", "C", "D", "F"], ["A lamprey-control policy is nominally cheap and suppresses population under one fitted response curve. What is needed for a defensible multi-objective robust recommendation? Select all that apply.", ["Show a frontier including intervention burden and ecosystem deviation", "Select weights only because they sum to one", "Test plausible parameter sets and competing response structures", "Compare no-action, nominal, and robust policies under shared scenarios", "Call the largest uncertainty set objectively correct", "Report protection scope, price of robustness, and out-of-set stresses"], "The recommendation must expose objective trade-offs, challenge parameter and structural assumptions, compare fairly, and delimit its guarantee."], ["一个七鳃鳗控制策略在某条拟合响应曲线下成本低且能抑制种群。要形成可辩护的多目标鲁棒建议，还需要什么？请选出所有正确项。", ["展示包含干预负担和生态偏差的前沿", "只因权重和为 1 就选择权重", "测试可信参数集合和竞争响应结构", "在共同情景下比较不干预、名义和鲁棒策略", "称最大的集合客观正确", "报告保护范围、鲁棒代价和集合外压力测试"], "建议必须公开目标权衡，挑战参数与结构假设，公平比较，并说明保证的边界。"], true),
  ];

  const lesson10Questions = [
    q(90, 1, ["D"], ["In a closed SIR model, what is d(S+I+R)/dt?", ["βSI/N", "γI", "−γI", "0"], "Every internal transfer appears once positive and once negative."], ["封闭 SIR 模型中 d(S+I+R)/dt 等于什么？", ["βSI/N", "γI", "−γI", "0"], "每个内部转移项一正一负，全部抵消。"]),
    q(82, 1, ["B"], ["A well-mixed 200 L tank has flow Q=20 L/min. Its residence time is:", ["5 min", "10 min", "20 min", "200 min"], "τ=V/Q=10 minutes."], ["200 L 充分混合水箱的流量为 20 L/min，停留时间是多少？", ["5 分钟", "10 分钟", "20 分钟", "200 分钟"], "τ=V/Q=10 分钟。"]),
    q(74, 2, ["C"], ["In a Bass model with p=0.02 and q=0.38 per year, the adoption-rate peak occurs approximately at ln(q/p)/(p+q):", ["2.5 years", "5.0 years", "7.4 years", "19 years"], "ln(19)/0.40≈7.36."], ["Bass 模型 p=0.02、q=0.38/年，新增采用峰值约在 ln(q/p)/(p+q) 的何时？", ["2.5 年", "5.0 年", "7.4 年", "19 年"], "ln(19)/0.40≈7.36。"]),
    q(65, 2, ["B"], ["For β=0.30/day, γ=0.10/day, and S/N=0.60, the effective reproduction number is:", ["0.6", "1.8", "3.0", "6.0"], "R_eff=(β/γ)(S/N)=3×0.6=1.8."], ["β=0.30/天、γ=0.10/天、S/N=0.60 时，有效再生数是多少？", ["0.6", "1.8", "3.0", "6.0"], "R_eff=(β/γ)(S/N)=3×0.6=1.8。"]),
    q(56, 3, ["C"], ["If an SIR model has R0=4, infection peaks when susceptible population is:", ["N", "N/2", "N/4", "0"], "At an interior peak, S=N/R0."], ["若 SIR 模型 R0=4，感染人数达到峰值时易感人数为多少？", ["N", "N/2", "N/4", "0"], "内部峰值满足 S=N/R0。"]),
    q(46, 4, ["D"], ["A two-dimensional equilibrium has Jacobian eigenvalues −1 and 0.2. It is:", ["Asymptotically stable", "A stable center", "Inconclusive because one value is negative", "Unstable"], "One positive real part creates a growing perturbation direction."], ["二维平衡点的 Jacobian 特征值为 −1 与 0.2，它是什么性质？", ["渐近稳定", "稳定中心", "因有一个负值而无法判断", "不稳定"], "只要存在正实部，就有扰动方向会增长。"]),
    q(36, 5, ["B"], ["For Lotka–Volterra N′=rN−aNP and P′=baNP−mP, the positive coexistence equilibrium is:", ["(r/a,m/ba)", "(m/ba,r/a)", "(K/2,r/m)", "(0,0) only"], "Set both per-capita rates to zero."], ["Lotka–Volterra 系统 N′=rN−aNP、P′=baNP−mP 的正共存平衡点是？", ["(r/a,m/ba)", "(m/ba,r/a)", "(K/2,r/m)", "只有 (0,0)"], "令两个单位个体增长率同时为零。"]),
    q(27, 6, ["A", "C"], ["For x′=x(r1+a11x+a12y), y′=y(r2+a21x+a22y), which sign patterns are correctly interpreted?", ["a12<0 and a21<0 indicates competition.", "Both positive always guarantees bounded coexistence.", "Opposite signs are consistent with exploitation or predator–prey interaction.", "Cross-effects do not influence equilibria."], "Cross-term signs classify interaction direction, but positive mutual effects alone do not guarantee boundedness."], ["对 x′=x(r1+a11x+a12y)、y′=y(r2+a21x+a22y)，哪些符号解释正确？", ["a12<0 且 a21<0 表示竞争。", "两个都正一定保证有界共存。", "一正一负可对应利用或捕食关系。", "交叉作用不影响平衡点。"], "交叉项符号描述作用方向，但双正并不自动保证有界。"], true),
    q(18, 8, ["A", "B", "D"], ["In the reflow-oven model T′=k(x(t))(Ta(x(t))−T), which conclusions are defensible?", ["Increasing conveyor speed shortens residence time.", "Board temperature generally lags air-zone temperature.", "The maximum air temperature alone determines every process constraint.", "Validation at a second conveyor speed tests transfer beyond calibration."], "The ODE represents thermal lag and speed-dependent residence; process quality also depends on rates and time above thresholds."], ["对回焊炉模型 T′=k(x(t))(Ta(x(t))−T)，哪些结论可辩护？", ["提高传送带速度会缩短停留时间。", "板温通常滞后于炉区空气温度。", "只看最高空气温度就能决定所有工艺约束。", "在另一传送带速度下验证能检验模型迁移能力。"], "该 ODE 表达热滞后与速度相关停留时间；工艺还受升温速率和阈值以上时间影响。"], true),
    q(10, 10, ["A", "B", "D", "F"], ["Only viral load V(t) is observed in a three-state nonlinear model. Which statements are correct?", ["Different parameter sets may produce nearly identical V(t).", "Measuring another state can improve observability.", "A lower training loss proves causal correctness.", "Profile likelihood can expose weakly identified parameters.", "Adaptive solvers eliminate structural uncertainty.", "An intervention can be designed to separate candidate mechanisms."], "Single-output fitting can be structurally or practically non-identifiable. Extra measurements, profiles, and informative interventions help; solver accuracy and training loss do not establish mechanism."], ["三状态非线性模型只观测到病毒载量 V(t)。哪些说法正确？", ["不同参数组可能产生几乎相同的 V(t)。", "测量另一个状态可改善可观测性。", "更低训练损失能证明因果机制正确。", "profile likelihood 可暴露弱识别参数。", "自适应求解器能消除结构不确定性。", "可以设计干预来分离候选机制。"], "单输出拟合可能存在结构或实际不可识别；额外测量、profile 与信息性干预有帮助，而求解精度和训练损失不能证明机制。"], true),
  ];

  const lesson7Questions = [
    q(90, 1, ["B"], ["What is the strongest reason to use a metaheuristic?", ["Its biological metaphor sounds realistic.", "The model contains difficult black-box, nonconvex, or structured decisions that suitable exact methods cannot handle within the budget.", "It always proves global optimality.", "It removes the need to formulate constraints."], "Metaheuristics are justified by model and computational structure, not vocabulary. They ordinarily do not certify global optimality."], ["使用元启发式算法最有力的理由是什么？", ["它的生物学类比听起来很真实。", "模型含有黑箱、非凸或特殊结构决策，合适的精确方法无法在预算内处理。", "它总能证明全局最优。", "它让我们不必写约束。"], "是否采用元启发式算法取决于模型与计算结构，而不是术语；它通常也不提供全局最优证明。"]),
    q(82, 1, ["C"], ["In a genetic algorithm for a route visiting each city once, which representation naturally guarantees that every city appears once?", ["An unrestricted real vector", "Independent city IDs in every position", "A permutation", "A single binary bit"], "A permutation encodes each city exactly once. Its crossover and mutation must also preserve or repair that property."], ["在每座城市恰好访问一次的遗传算法中，哪种表示自然保证每座城市只出现一次？", ["无约束实数向量", "每个位置独立存城市编号", "排列", "一个二进制位"], "排列天然包含每座城市一次；交叉和变异也必须保持或修复这一性质。"]),
    q(74, 2, ["A", "C", "D"], ["Which diagnostics can reveal premature population collapse? Select all that apply.", ["Normalized decision-space diversity", "Only the title of the algorithm", "Pairwise Hamming or edge distance when appropriate", "Many particles or chromosomes becoming identical while the best remains weak"], "Collapse is a loss of meaningful decision diversity. It must be measured in a distance appropriate to the representation."], ["哪些诊断能揭示种群过早坍缩？请选出所有正确项。", ["归一化决策空间多样性", "只看算法名称", "适用时的 Hamming 距离或边重合距离", "大量粒子或染色体相同，而最好值仍很弱"], "坍缩是有意义决策多样性的丧失，应使用与表示方式相匹配的距离衡量。"], true),
    q(65, 2, ["B"], ["For DE/rand/1, r1=(1,4), r2=(6,2), r3=(2,3), and F=0.5. What mutant is produced?", ["(2, 3)", "(3, 3.5)", "(5, 1.5)", "(4, 4)"], "Compute r1 + F(r2-r3) = (1,4)+0.5(4,-1) = (3,3.5)."], ["在 DE/rand/1 中，r1=(1,4)、r2=(6,2)、r3=(2,3)、F=0.5。变异向量是什么？", ["(2,3)", "(3,3.5)", "(5,1.5)", "(4,4)"], "r1+F(r2-r3)=(1,4)+0.5(4,-1)=(3,3.5)。"]),
    q(56, 3, ["C"], ["A PSO particle has x=(4,1), v=(-0.5,0.8), personal best p=(2,2), social best g=(1,3), omega=0.6, c1=1.4, c2=1.8, r1=0.5, and r2=0.25. What is its new velocity?", ["(-0.5,0.8)", "(-1.35,0.90)", "(-3.05,2.08)", "(0.95,3.08)"], "Add inertia (-0.30,0.48), cognitive (-1.40,0.70), and social (-1.35,0.90). The new position, not velocity, is (0.95,3.08)."], ["PSO 粒子 x=(4,1)、v=(-0.5,0.8)、个体最优 p=(2,2)、社会最优 g=(1,3)，且 omega=0.6、c1=1.4、c2=1.8、r1=0.5、r2=0.25。新速度是多少？", ["(-0.5,0.8)", "(-1.35,0.90)", "(-3.05,2.08)", "(0.95,3.08)"], "惯性项 (-0.30,0.48)、认知项 (-1.40,0.70) 与社会项 (-1.35,0.90) 相加得到新速度；(0.95,3.08) 是新位置。"]),
    q(46, 4, ["B"], ["In simulated annealing for minimization, a proposal is worse by Delta=4 at temperature T=2. What is its acceptance probability?", ["exp(-8)", "exp(-2)", "1-exp(-2)", "It must be rejected"], "The Metropolis probability is exp(-Delta/T)=exp(-4/2)=exp(-2)."], ["模拟退火做最小化时，候选方案差 Delta=4，温度 T=2。接受概率是多少？", ["exp(-8)", "exp(-2)", "1-exp(-2)", "必须拒绝"], "Metropolis 接受概率为 exp(-Delta/T)=exp(-4/2)=exp(-2)。"]),
    q(36, 5, ["A", "B", "D"], ["Which statements about constraint handling are defensible? Select all that apply.", ["A feasibility-preserving decoder can be preferable to enormous penalties.", "Repair rules are part of the algorithm and must be documented.", "Any sufficiently large arbitrary penalty always guarantees the intended answer in a black-box model.", "Feasibility rate and final residuals should be reported independently."], "Representation, decoder, and repair determine the effective search. Arbitrary huge penalties can destroy scaling and do not automatically guarantee correctness."], ["关于约束处理，哪些说法可辩护？请选出所有正确项。", ["保持可行性的解码器可能比巨大惩罚更合适。", "修复规则属于算法的一部分，必须说明。", "在黑箱模型中任意取足够大的惩罚总能保证预期答案。", "应独立报告可行率和最终约束残差。"], "表示、解码和修复决定了实际搜索过程；任意巨大惩罚可能破坏数值尺度，也不会自动保证正确。"], true),
    q(27, 6, ["A", "C", "D"], ["A global-best PSO rapidly reaches one basin and all normalized particles become nearly identical while a grid baseline is substantially better. Which responses are logically motivated?", ["Try a local or ring topology.", "Claim global optimality because the swarm stopped moving.", "Reinitialize part of the swarm or introduce diversity.", "Inspect social attraction, inertia, and boundary handling."], "The evidence indicates premature collapse, not optimality. Slower information flow, diversity restoration, and parameter or boundary diagnostics address plausible causes."], ["全局最优 PSO 很快进入一个盆地，所有归一化粒子几乎相同，但网格基线明显更好。哪些处理有逻辑依据？", ["尝试局部或环形拓扑。", "因为粒子不再移动就宣称全局最优。", "重启部分粒子或引入多样性。", "检查社会项、惯性与边界处理。"], "证据表明是过早坍缩而不是最优；减慢信息传播、恢复多样性并检查参数与边界处理都针对合理原因。"], true),
    q(18, 8, ["B"], ["Two stochastic optimizers use populations 100 and 20. Both run for 500 generations, but one objective evaluation dominates all cost. What is the fairest primary stopping comparison?", ["Equal generations", "Equal objective-evaluation budgets", "Equal numbers of algorithm names in the report", "Whichever produces the prettier convergence curve"], "With dominant evaluation cost, equal evaluations compare computational evidence. Runtime and parallel resources should also be reported."], ["两个随机优化器的种群分别是 100 和 20，都运行 500 代，而目标评估占据主要成本。最公平的主要停止标准是什么？", ["相同代数", "相同目标评估次数", "报告中出现相同数量的算法名称", "谁的收敛图更好看就选谁"], "当目标评估主导成本时，应以相同评估次数比较，同时报告运行时间与并行资源。"]),
    q(10, 10, ["A", "C", "D", "F"], ["A hybrid crop optimizer reports one smooth convergence curve and says it found the global optimum. Which additional evidence is needed for a defensible claim? Select all that apply.", ["Exact comparison on reduced instances or valid solver bounds", "A biological metaphor for every operator", "Independent feasibility and revenue recalculation", "Multiple seeds under equal evaluation budgets and meaningful baselines", "More decimals in the best objective", "Ablation of mutation, crossover, repair, and local-search components"], "A curve from one seed cannot certify global optimality. Bounds or exact small cases, independent audits, repeated fair comparisons, and ablations establish what was actually achieved."], ["混合农作物优化器只给出一条平滑收敛曲线，并宣称得到全局最优。要使结论可辩护，还需要哪些证据？请选出所有正确项。", ["缩小实例的精确比较或有效求解器界", "为每个算子准备一个生物学类比", "独立重算可行性与收益", "相同评估预算下的多随机种子和有意义基线", "给最优值增加更多小数", "对变异、交叉、修复和局部搜索做消融"], "单次曲线不能证明全局最优。界或精确小实例、独立审计、公平重复比较和消融能说明方法真正达成了什么。"], true),
  ];

  const quizBanks = {
    "lesson-1": { prefix: "modeling-01-v2-q", questions: lesson1Questions },
    "lesson-2": { prefix: "modeling-02-q", questions: lesson2Questions },
    "lesson-3": { prefix: "modeling-03-q", questions: lesson3Questions },
    "lesson-4": { prefix: "modeling-04-v2-q", questions: lesson4Questions },
    "lesson-6": { prefix: "modeling-06-q", questions: lesson6Questions },
    "lesson-7": { prefix: "modeling-07-q", questions: lesson7Questions },
    "lesson-9": { prefix: "modeling-09-q", questions: lesson9Questions },
    "lesson-10": { prefix: "modeling-10-q", questions: lesson10Questions },
  };

  const getBank = (root) => quizBanks[root.dataset.modelingQuiz];
  const getQuestions = (root) => getBank(root)?.questions || [];
  const maxExp = (root) => getQuestions(root).reduce((sum, question) => sum + question.exp, 0);
  const localKey = (root) => getBank(root)?.prefix + "-practice-v2";

  const copy = {
    en: {
      intro: "10 questions · single and multiple choice · 42 EXP available",
      solved: "Solved",
      accuracy: "First-attempt accuracy",
      earned: "EXP earned",
      target: "Target solve rate",
      single: "Select one answer",
      multiple: "Select all that apply",
      check: "Check answer",
      choose: "Choose an answer before checking.",
      chooseMany: "Choose one or more answers before checking.",
      incorrect: "Not quite. Review the explanation, change your selection, and try again.",
      saving: "Correct — saving your result…",
      practice: (exp) => `Correct. Sign in with GitHub to save progress and earn up to ${exp} EXP.`,
      full: (exp) => `Correct on the first attempt — +${exp} EXP!`,
      partial: (exp) => `Correct after a retry — +${exp} EXP.`,
      already: "Correct. This question has already awarded EXP.",
      syncError: "Your answer was checked, but progress could not be synced. Please try again.",
      explanation: "Explanation",
      completed: "Solved",
    },
    zh: {
      intro: "10 道题 · 单选与多选 · 共 42 EXP",
      solved: "已解答",
      accuracy: "首次作答准确率",
      earned: "已获得 EXP",
      target: "目标答对率",
      single: "请选择一个答案",
      multiple: "请选出所有正确项",
      check: "检查答案",
      choose: "请先选择一个答案。",
      chooseMany: "请先选择一个或多个答案。",
      incorrect: "还差一点。读读解析，调整选项后再试一次。",
      saving: "回答正确——正在保存…",
      practice: (exp) => `回答正确。使用 GitHub 登录后可保存进度并获得最多 ${exp} EXP。`,
      full: (exp) => `首次作答正确——+${exp} EXP！`,
      partial: (exp) => `再次尝试后答对——+${exp} EXP。`,
      already: "回答正确。该题已经记录过 EXP。",
      syncError: "答案已检查，但进度未能同步，请稍后重试。",
      explanation: "解析",
      completed: "已解答",
    },
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const arraysMatch = (left, right) =>
    left.length === right.length && left.every((value, index) => value === right[index]);

  const questionId = (root, index) => getBank(root).prefix + (index + 1);

  const readLocal = (root) => {
    try { return JSON.parse(localStorage.getItem(localKey(root)) || "{}"); }
    catch (_error) { return {}; }
  };

  const writeLocal = (root, value) => {
    try { localStorage.setItem(localKey(root), JSON.stringify(value)); }
    catch (_error) { /* Practice still works when storage is unavailable. */ }
  };

  const renderStats = (root) => {
    const entries = root.__modelingQuizEntries || {};
    const attempted = Object.values(entries).filter((entry) => Number(entry.attempt_count) > 0);
    const solved = Object.values(entries).filter((entry) => entry.solved).length;
    const firstCorrect = attempted.filter((entry) => entry.first_attempt_correct).length;
    const accuracy = attempted.length ? Math.round((100 * firstCorrect) / attempted.length) : 0;
    const earned = Object.values(entries).reduce((sum, entry) => sum + (Number(entry.earned_exp) || 0), 0);
    root.querySelector('[data-stat="solved"]').textContent = `${solved}/${getQuestions(root).length}`;
    root.querySelector('[data-stat="accuracy"]').textContent = attempted.length ? `${accuracy}% (${firstCorrect}/${attempted.length})` : "—";
    root.querySelector('[data-stat="earned"]').textContent = `${earned}/${maxExp(root)}`;
  };

  const applyEntry = (root, id, entry) => {
    root.__modelingQuizEntries[id] = entry;
    const card = root.querySelector(`[data-quiz-id="${id}"]`);
    if (!card || !entry?.solved) return;
    card.classList.add("is-solved");
    card.querySelectorAll("input, button").forEach((control) => { control.disabled = true; });
    const badge = card.querySelector(".modeling-quiz-card__status");
    if (badge) badge.textContent = copy[root.dataset.locale].completed;
  };

  const loadProgress = async (root) => {
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();
    root.__modelingQuizEntries = {};
    const ids = getQuestions(root).map((_question, index) => questionId(root, index));
    if (!session || !client) {
      const stored = readLocal(root);
      ids.forEach((id) => { if (stored[id]) applyEntry(root, id, stored[id]); });
      renderStats(root);
      return;
    }

    const [attemptResult, completionResult] = await Promise.all([
      client.from("quiz_attempts").select("quiz_id,attempt_count,first_attempt_correct,solved").in("quiz_id", ids),
      client.from("quiz_completions").select("quiz_id,earned_exp").in("quiz_id", ids),
    ]);
    if (attemptResult.error) {
      const stored = readLocal(root);
      ids.forEach((id) => { if (stored[id]) applyEntry(root, id, stored[id]); });
      renderStats(root);
      return;
    }
    const expById = new Map((completionResult.data || []).map((row) => [row.quiz_id, Number(row.earned_exp) || 0]));
    (attemptResult.data || []).forEach((row) => applyEntry(root, row.quiz_id, { ...row, earned_exp: expById.get(row.quiz_id) || 0 }));
    renderStats(root);
  };

  const setResult = (card, kind, message) => {
    const output = card.querySelector(".modeling-quiz-card__result");
    output.className = `modeling-quiz-card__result is-${kind}`;
    output.textContent = message;
  };

  const saveFallbackAttempt = async (root, card, definition, selected, client, api) => {
    const id = card.dataset.quizId;
    const labels = copy[root.dataset.locale];
    const correct = arraysMatch(selected, [...definition.answer].sort());
    const stored = readLocal(root);
    const previous = stored[id] || { attempt_count: 0, solved: false, earned_exp: 0 };
    if (!previous.solved) {
      previous.attempt_count += 1;
      if (previous.attempt_count === 1) previous.first_attempt_correct = correct;
      previous.solved = correct;
    }
    if (!correct) {
      stored[id] = previous;
      writeLocal(root, stored);
      applyEntry(root, id, previous);
      renderStats(root);
      setResult(card, "incorrect", labels.incorrect);
      return;
    }

    const available = previous.attempt_count === 1 ? definition.exp : Math.ceil(definition.exp / 2);
    const results = await Promise.all(Array.from({ length: available }, (_value, index) =>
      client.rpc("complete_quiz_question", { p_quiz_id: `${id}-xp${index + 1}` })));
    const awarded = results.reduce((sum, result) => {
      if (result.error) return sum;
      const row = Array.isArray(result.data) ? result.data[0] : result.data;
      return sum + (row?.awarded ? 1 : 0);
    }, 0);
    previous.earned_exp = Math.max(Number(previous.earned_exp) || 0, available);
    stored[id] = previous;
    writeLocal(root, stored);
    applyEntry(root, id, previous);
    renderStats(root);
    setResult(card, "correct", awarded
      ? (previous.first_attempt_correct ? labels.full(awarded) : labels.partial(awarded))
      : labels.already);
    await api.loadExperience?.();
  };

  const checkAnswer = async (button) => {
    const card = button.closest(".modeling-quiz-card");
    const root = button.closest(".modeling-quiz");
    const index = Number(card.dataset.questionIndex);
    const definition = getQuestions(root)[index];
    const locale = root.dataset.locale;
    const labels = copy[locale];
    const selected = [...card.querySelectorAll("input:checked")].map((input) => input.value).sort();
    if (!selected.length) {
      setResult(card, "error", definition.multiple ? labels.chooseMany : labels.choose);
      return;
    }

    const id = questionId(root, index);
    const explanation = card.querySelector(".modeling-quiz-card__explanation");
    explanation.hidden = false;
    const api = window.__blogReadingHistory;
    const session = api?.getSession?.();
    const client = api?.getClient?.();

    if (!session || !client) {
      const correct = arraysMatch(selected, [...definition.answer].sort());
      const stored = readLocal(root);
      const previous = stored[id] || { attempt_count: 0, solved: false, earned_exp: 0 };
      if (!previous.solved) {
        previous.attempt_count += 1;
        if (previous.attempt_count === 1) previous.first_attempt_correct = correct;
        previous.solved = correct;
      }
      stored[id] = previous;
      writeLocal(root, stored);
      applyEntry(root, id, previous);
      renderStats(root);
      setResult(card, correct ? "correct" : "incorrect", correct ? labels.practice(definition.exp) : labels.incorrect);
      return;
    }

    button.disabled = true;
    setResult(card, "checking", labels.saving);
    const { data, error } = await client.rpc("submit_modeling_quiz_answer", {
      p_quiz_id: id,
      p_selected_answers: selected,
    });
    if (error) {
      button.disabled = false;
      await saveFallbackAttempt(root, card, definition, selected, client, api);
      return;
    }
    const outcome = Array.isArray(data) ? data[0] : data;
    const entry = {
      attempt_count: Number(outcome.attempt_count) || 0,
      first_attempt_correct: Boolean(outcome.first_attempt_correct),
      solved: Boolean(outcome.solved),
      earned_exp: (Number(root.__modelingQuizEntries[id]?.earned_exp) || 0) + (outcome.awarded ? Number(outcome.earned_exp) || 0 : 0),
    };
    applyEntry(root, id, entry);
    renderStats(root);
    if (!outcome.answer_correct) {
      button.disabled = false;
      setResult(card, "incorrect", labels.incorrect);
      return;
    }
    setResult(card, "correct", outcome.awarded
      ? (outcome.first_attempt_correct ? labels.full(outcome.earned_exp) : labels.partial(outcome.earned_exp))
      : labels.already);
    await api.loadExperience?.();
  };

  const renderQuiz = (root) => {
    if (root.dataset.quizReady === "true") return;
    if (!getBank(root)) return;
    root.dataset.quizReady = "true";
    const locale = root.dataset.locale === "zh" ? "zh" : "en";
    root.dataset.locale = locale;
    const labels = copy[locale];
    root.__modelingQuizEntries = {};
    root.innerHTML = `
      <div class="modeling-quiz__header">
        <p>${escapeHtml(labels.intro)}</p>
        <div class="modeling-quiz__stats" aria-live="polite">
          <span><b data-stat="solved">0/${getQuestions(root).length}</b>${escapeHtml(labels.solved)}</span>
          <span><b data-stat="accuracy">—</b>${escapeHtml(labels.accuracy)}</span>
          <span><b data-stat="earned">0/${maxExp(root)}</b>${escapeHtml(labels.earned)}</span>
        </div>
      </div>
      <div class="modeling-quiz__questions">
        ${getQuestions(root).map((definition, index) => {
          const item = definition[locale];
          const inputType = definition.multiple ? "checkbox" : "radio";
          return `<article class="modeling-quiz-card" data-question-index="${index}" data-quiz-id="${questionId(root, index)}">
            <div class="modeling-quiz-card__meta">
              <span>Q${index + 1}</span>
              <span>${escapeHtml(labels.target)} ${definition.target}%</span>
              <span>${definition.exp} EXP</span>
              <span class="modeling-quiz-card__status"></span>
            </div>
            <h3>${escapeHtml(item.question)}</h3>
            <fieldset>
              <legend>${escapeHtml(definition.multiple ? labels.multiple : labels.single)}</legend>
              ${item.options.map((option, optionIndex) => {
                const letter = LETTERS[optionIndex];
                return `<label><input type="${inputType}" name="modeling-q${index + 1}-${locale}" value="${letter}"><i>${letter}</i><span>${escapeHtml(option)}</span></label>`;
              }).join("")}
            </fieldset>
            <div class="modeling-quiz-card__actions">
              <button type="button" class="modeling-quiz-card__check">${escapeHtml(labels.check)}</button>
              <span class="modeling-quiz-card__result" aria-live="polite"></span>
            </div>
            <div class="modeling-quiz-card__explanation" hidden><strong>${escapeHtml(labels.explanation)}.</strong> ${escapeHtml(item.explanation)}</div>
          </article>`;
        }).join("")}
      </div>`;
    loadProgress(root);
  };

  const hydrate = () => document.querySelectorAll(".modeling-quiz[data-modeling-quiz]").forEach(renderQuiz);

  if (!window.__modelingQuizInitialized) {
    window.__modelingQuizInitialized = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".modeling-quiz-card__check");
      if (button) checkAnswer(button);
    });
    document.addEventListener("change", (event) => {
      const input = event.target.closest(".modeling-quiz-card input");
      if (!input) return;
      const card = input.closest(".modeling-quiz-card");
      if (card.classList.contains("is-solved")) return;
      card.querySelector(".modeling-quiz-card__explanation").hidden = true;
      setResult(card, "idle", "");
    });
    document.addEventListener("blog-reader:state", () => {
      document.querySelectorAll('.modeling-quiz[data-quiz-ready="true"]').forEach(loadProgress);
    });
  }

  hydrate();
})();
