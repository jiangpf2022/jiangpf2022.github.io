#!/usr/bin/env python3
"""Build the generated Chinese practice bank for every COMS6998E LLM article."""

from __future__ import annotations

import json
import random
import re
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "source" / "data" / "llm-generated-practice.json"
RNG = random.Random(6998)
LETTERS = "ABCD"


@dataclass(frozen=True)
class Topic:
    title: str
    concept: str
    support: str
    application: str
    misconception: str
    consequence: str
    calc: tuple[str, str, tuple[str, str, str], str] | None = None


def T(title, concept, support, application, misconception, consequence, calc=None):
    return Topic(title, concept, support, application, misconception, consequence, calc)


ARTICLES: dict[str, dict] = {
    "LLM-Based-Generative-AI-Columbia-University": {
        "title": "LLM 1 - Fundamentals of Deep Learning",
        "topics": [
            T("1. Why AI Scaled", "AI 扩张由数据、算法、算力与云基础设施共同推动。", "AlexNet 与基础模型体现规模和方法的协同。", "评估新模型时同时核对数据、计算预算与训练方法。", "只增加参数数量就一定得到更好的通用模型。", "团队会把相关性误写成单一规模因素的因果结论。"),
            T("2. System Stack", "生成式 AI 系统由数据、模型、软件栈和生产服务共同组成。", "模型质量与部署可靠性属于不同但相互依赖的层。", "设计方案时同时说明数据管线、训练框架、监控和服务目标。", "训练出模型后，软件与生产层不再影响用户体验。", "系统会在监控、可复现性或服务可靠性上失去控制。"),
            T("3. Cloud Lifecycle", "云上机器学习应覆盖数据、训练、部署、监控和再训练的完整生命周期。", "IaaS、PaaS 与 SaaS 提供不同抽象层级。", "上线前定义漂移监控和触发再训练的条件。", "部署完成意味着生命周期结束。", "模型随数据变化退化却无法被及时发现。"),
            T("4. Generalization", "泛化关注模型在未见数据上的误差，而不是训练集拟合程度。", "欠拟合对应高偏差，过拟合通常对应高方差。", "用独立验证集比较训练误差与验证误差。", "训练误差越低，测试误差必然越低。", "团队会选择记忆训练样本却无法迁移的模型。", ("训练误差为 0.08、验证误差为 0.23，两者的泛化间隙是多少？", "0.15", ("0.08", "0.23", "0.31"), "泛化间隙=0.23−0.08=0.15。")),
            T("5. Regularization", "正则化通过约束有效复杂度在拟合与泛化之间取得平衡。", "L1 倾向稀疏，L2 平滑地惩罚大权重。", "在验证集上选择正则系数而不是只看训练损失。", "正则系数越大，模型性能一定越好。", "过强约束会造成欠拟合，过弱约束会保留高方差。", ("目标为数据损失 1.2 加 λ||w||²，λ=0.1、||w||²=3，正则化目标是多少？", "1.5", ("1.2", "1.3", "3.3"), "1.2+0.1×3=1.5。")),
            T("6. Metrics", "指标必须与错误成本、类别分布和决策阈值相匹配。", "不平衡分类中准确率可能掩盖少数类失败。", "同时报告混淆矩阵、精确率、召回率和阈值曲线。", "只要准确率高，就无需检查类别比例。", "系统可能在总体准确率高时漏掉大量关键正类。", ("TP=80、FP=20、FN=40，F1 约为多少？", "0.727", ("0.800", "0.667", "0.571"), "Precision=0.8，Recall=80/120=0.667，F1=2PR/(P+R)≈0.727。")),
            T("7. Training", "训练循环由前向计算、损失、反向传播和参数更新组成。", "梯度下降使用损失对参数的导数决定更新方向。", "先验证一个小批次能否过拟合，再扩大训练。", "反向传播直接给出全局最优解。", "实现错误可能被误认为模型容量不足。", ("参数 w=2，梯度为 0.5，学习率 0.1；一次 SGD 更新后的 w 是多少？", "1.95", ("2.05", "1.5", "2.5"), "w←w−ηg=2−0.1×0.5=1.95。")),
            T("8. Batch and Rate", "批量大小与学习率共同影响梯度噪声、吞吐量和收敛。", "增大 batch 不会自动带来线性加速或相同泛化。", "调整 batch 后重新验证学习率和收敛曲线。", "batch 翻倍时学习率永远必须精确翻倍。", "训练可能吞吐量上升却收敛变差。", ("数据集 10,000 个样本、batch=200，一个 epoch 有多少次更新？", "50", ("20", "200", "2000"), "更新次数=10000/200=50。")),
            T("9. Hardware", "训练性能取决于计算、显存容量、带宽和通信的共同瓶颈。", "训练与推理对批量、延迟和内存访问的要求不同。", "用 profiler 区分算力受限、内存受限和通信受限。", "GPU 峰值 FLOPS 可以直接预测端到端训练时间。", "硬件采购会被理论峰值误导。", ("单卡每秒处理 400 个样本，处理 120,000 个样本至少需要多少秒？", "300", ("30", "120", "480"), "120000/400=300 秒。")),
            T("10. Parallelism", "数据、模型、流水线和张量并行解决不同容量与吞吐瓶颈。", "混合并行需要同时考虑通信拓扑和负载均衡。", "先依据模型是否放得下，再选择并行分解。", "所有并行方式都只是在复制完整模型。", "并行布局与瓶颈不匹配会增加通信而不提速。", ("8 张 GPU 做数据并行，每卡 batch=16，全局 batch 是多少？", "128", ("16", "64", "256"), "全局 batch=8×16=128。")),
            T("11. Sync and Benchmarks", "同步训练等待所有 worker，并以最慢 worker 决定一步时间。", "基准必须同时报告吞吐、精度、硬件和通信设置。", "比较 all-reduce 方案时固定模型、batch 与精度目标。", "只报告 GPU 数量即可证明缩放效率。", "straggler 与通信成本会被错误隐藏。", ("1 卡吞吐 100，8 卡吞吐 600；缩放效率是多少？", "75%", ("60%", "80%", "600%"), "效率=600/(8×100)=0.75=75%。")),
        ],
    },
    "LLM-2-Attention-and-Transformers": {
        "title": "LLM 2 - Attention and Transformers",
        "topics": [
            T("Word Representations", "词表示把离散 token 映射为连续向量，静态向量无法区分同词异义。", "ELMo 已通过双向上下文生成上下文化表示。", "比较 bank 在金融与河岸语境中的不同向量。", "同一个单词在所有上下文中都应使用完全相同的语义向量。", "多义词会在下游任务中被错误合并。", ("词表 50,000、嵌入维度 768，嵌入矩阵有多少参数？", "38,400,000", ("50,768", "6,510", "76,800,000"), "参数量=50000×768=38,400,000。")),
            T("Attention", "注意力用 query 与 key 的相似度为 value 加权。", "多头注意力允许不同子空间学习不同关系。", "先核对 Q、K、V 的形状，再进行缩放点积和 softmax。", "注意力权重直接由 value 与 value 的点积得到。", "实现会在维度或归一化方向上出错。", ("两项未归一化分数为 0 和 ln3，softmax 后第二项权重是多少？", "0.75", ("0.25", "0.5", "3"), "exp(ln3)/(exp0+exp(ln3))=3/(1+3)=0.75。")),
            T("From Seq2Seq to Transformers", "Transformer 用并行注意力缓解循环网络的顺序瓶颈。", "编码器—解码器注意力让解码器读取全部源序列状态。", "翻译任务中分别使用编码器自注意力、因果解码注意力和交叉注意力。", "Transformer 消除了序列顺序信息的需求。", "没有位置和掩码时模型会混淆次序或偷看未来。"),
            T("Attention as Matrix Computation", "矩阵注意力计算 softmax(QKᵀ/√dk)V。", "因果 mask 在 softmax 前屏蔽未来位置。", "用批量矩阵乘法一次计算所有 token 和头。", "softmax 应在 value 相乘后才计算。", "权重不能形成每个 query 对所有 key 的概率分布。", ("序列长度 n=4 时，单头注意力分数矩阵 QKᵀ 的形状是什么？", "4×4", ("4×d", "d×d", "1×4"), "每个 query 与 4 个 key 比较，因此得到 4×4。")),
            T("Inputs and Outputs", "输入由 token embedding 与位置表示组合，输出头把隐藏状态映射到词表 logits。", "权重共享可以让输入嵌入与输出投影复用参数。", "检查 tokenizer、位置索引和 shift 后的训练目标是否一致。", "Transformer 输入只需要 token ID，不需要位置或嵌入。", "模型可能无法区分排列不同的相同 token 集合。", ("隐藏维度 512、词表 30,000，未共享输出投影含多少权重？", "15,360,000", ("30,512", "60,000", "7,680,000"), "30000×512=15,360,000。")),
            T("The Transformer Block", "完整块由注意力、残差、归一化和逐位置前馈网络组成。", "pre-norm 把归一化放在子层之前以改善深层训练稳定性。", "逐一追踪残差支路与张量形状。", "前馈网络在不同 token 之间直接混合信息。", "会把 token 混合功能和通道变换功能混淆。"),
            T("Mixture of Experts", "MoE 用稀疏路由扩大参数容量而不激活全部专家。", "路由均衡与跨设备通信是系统级难点。", "同时报告总参数、激活参数和专家负载。", "MoE 推理时每个 token 必须经过所有专家。", "专家拥塞会造成尾延迟和训练不稳定。", ("8 个专家、top-2 路由，每个 token 激活专家比例是多少？", "25%", ("12.5%", "50%", "100%"), "每个 token 激活 2/8=25%。")),
            T("Three Architecture Families", "encoder-only 擅长理解，encoder-decoder 擅长条件转换，decoder-only 擅长续写。", "架构选择应匹配可见上下文和目标生成方式。", "分类用双向编码器，翻译用编码器—解码器，开放生成用因果解码器。", "三种架构的注意力 mask 和输入可见性完全相同。", "模型会使用不匹配任务的信息流。"),
            T("BERT in Detail", "BERT 是双向 encoder 堆栈，典型预训练包含 masked language modeling。", "下游任务可使用 token、句对或 pooled 表示接不同任务头。", "NER 使用 token 级输出，分类使用句级表示。", "BERT 使用因果 mask 逐 token 生成长文本。", "把理解型模型误当成原生自回归生成器。", ("序列 200 个 token，若随机 mask 15%，期望被选中多少 token？", "30", ("15", "20", "170"), "200×0.15=30。")),
            T("GPT, GPT-3, and LLaMA", "GPT 与 LLaMA 属于 decoder-only 家族，通过因果预测下一个 token 预训练。", "数据混合、规模和训练配方与参数量同样重要。", "比较模型时同时核对上下文、tokenizer、数据和推理预算。", "GPT-3 是单一固定参数规模且只由参数量定义。", "比较会忽略数据和训练计算造成的差异。"),
        ],
    },
    "LLM-3-Decoding-Prompting-and-LLM-Applications": {
        "title": "LLM 3–4 - Decoding, Prompt Engineering, and RAG",
        "topics": [
            T("From Representations to Generated Text", "语言模型输出条件 token 分布，解码策略把分布转为具体序列。", "高概率不等于事实正确或符合任务。", "把模型概率、解码规则和外部验证分开设计。", "选择最高概率 token 可以保证整段答案真实。", "系统会把模型置信度误当成事实证据。"),
            T("Deterministic Decoding", "greedy 每步选局部最高概率，beam 保留多个部分序列。", "beam 宽度增加搜索但不保证更符合人类偏好。", "在可复现结构输出中比较 greedy 与有限 beam。", "beam search 一定找到全局最优且事实正确的答案。", "搜索分数会替代任务质量判断。", ("beam 宽度为 4、每个候选扩展 3 个 token，裁剪前有多少扩展？", "12", ("4", "7", "64"), "4×3=12。")),
            T("Sampling and Distribution Control", "温度、top-k 与 top-p 改变采样分布的集中程度。", "低温更确定，高温更平坦但可能更随机。", "创意任务提高多样性，事实任务降低温度并增加验证。", "温度为 0.5 会把所有概率直接除以 2。", "参数设置会被误解，导致多样性或稳定性失控。", ("两个 logits 为 0 和 1，温度 T=0.5 后的差值是多少？", "2", ("0.5", "1", "1.5"), "logits 先除以 T，差值从 1 变为 1/0.5=2。")),
            T("Prompts as Model Interfaces", "prompt 是包含角色、任务、上下文、约束和输出格式的接口。", "system、user 与 assistant 消息承担不同控制作用。", "明确成功标准和失败处理，而不是只写主题关键词。", "prompt 越长，结果一定越好。", "无关上下文会稀释约束并增加冲突。"),
            T("Building and Evaluating Prompts", "提示工程应通过可重复数据集、指标和误差分析迭代。", "先建立基线，再逐项修改提示以识别因果影响。", "保存 prompt 版本、模型版本、参数和测试样本。", "看到一个成功示例即可确认提示有效。", "提示会对少数示例过拟合且无法复现。"),
            T("In-Context Learning", "ICL 在推理上下文中给示例，不更新模型权重。", "示例顺序、标签平衡和覆盖范围都会影响结果。", "选择互补示例并检查 token 预算。", "增加示例数量永远单调提高准确率。", "上下文拥挤和偏置示例会降低表现。", ("上下文预算 4096 token，系统与问题占 1096，每个示例 500，最多完整放几个示例？", "6", ("5", "7", "8"), "剩余 3000 token，可容纳 floor(3000/500)=6。")),
            T("Reasoning Patterns", "CoT、Auto-CoT 与 Tree of Thoughts 提供不同的推理展开与搜索方式。", "推理文本仍需验证，长链条不等于正确。", "数学题结合结构化步骤、检查点和最终验证。", "只要要求模型逐步思考，答案就必然正确。", "错误步骤会被流畅语言掩盖。"),
            T("ReAct, Tools, and Reliable Workflows", "ReAct 交替推理与行动，工具调用必须有参数验证和结果检查。", "后处理与权限边界属于系统可靠性的一部分。", "对工具结果做 schema 校验并限制高风险动作。", "模型生成工具调用后可以不经验证直接执行。", "错误参数或提示注入会转化为现实操作风险。"),
            T("Common Application Patterns", "写作、翻译、代码、抽取和结构化动作需要不同验证策略。", "抽取任务应优先约束 schema，代码任务需要测试。", "为每种应用定义可执行验收条件。", "所有应用只需同一个通用提示和同一个指标。", "系统无法发现任务特有失败。"),
            T("Application Frameworks", "LangChain 偏向编排，LlamaIndex 偏向数据与检索中心的应用。", "框架减少样板代码但不替代评估和安全设计。", "先画数据流与调用边界，再选择最小框架。", "使用框架会自动解决幻觉、权限和质量问题。", "复杂抽象会隐藏真实故障位置。"),
            T("Putting the Whole System Together", "可靠应用把模型、检索、工具、后处理、监控和评估连接成闭环。", "每个组件都需要输入输出契约和失败降级。", "端到端测试正常、边界和对抗场景。", "单个模型基准分高即可证明整个应用可靠。", "组件交互错误会在端到端阶段集中暴露。"),
        ],
    },
    "LLM-5-Pretraining-Scaling-and-Domain-Models": {
        "title": "LLM 5 - Pretraining, Scaling, and Domain Models",
        "topics": [
            T("Choose Before You Train", "应从产品目标、数据与约束决定复用、适配、继续预训练或从零训练。", "模型卡用于核对许可、架构、数据和已知限制。", "先做最小可行基线，再证明更昂贵训练必要。", "参数越多就越应该从零预训练。", "资源会投入到并不解决业务缺口的训练。"),
            T("Pretraining Objectives", "MLM、causal LM 与 span corruption 对应不同可见信息与架构。", "自监督目标从原始数据构造预测标签。", "根据下游生成方式选择目标和 mask。", "三种目标的条件信息完全相同。", "训练目标与部署任务不匹配。"),
            T("The Real Training Memory Budget", "训练显存包括参数、梯度、优化器状态、激活和临时缓冲。", "Adam 的一阶和二阶动量带来持续状态。", "先按精度与优化器分项估算，再实测峰值。", "参数文件大小就是完整训练显存。", "模型能加载却无法开始反向传播。", ("10 亿参数按课程经验预算 24GB，训练 7B 模型约需多少 GB？", "168", ("24", "96", "336"), "7×24=168GB。")),
            T("Precision, Mixed Precision, and Quantization", "BF16 保留 FP32 指数范围，量化把高精度值映射到较低位宽。", "PTQ 与 QAT 在训练介入程度上不同。", "分别评估显存、速度和精度损失。", "量化只是修改文件扩展名，不改变数值表示。", "低位宽误差会被忽略。", ("10 亿参数仅存权重：FP32 约 4GB，INT8 约多少？", "1GB", ("0.5GB", "2GB", "4GB"), "INT8 每参数 1 byte，因此约 1GB。")),
            T("From One GPU to Many", "DDP 复制模型并切分数据，ZeRO/FSDP 切分训练状态以提高容量。", "扩容应同时衡量吞吐和最大可训练模型。", "根据显存瓶颈决定是否需要状态分片。", "ZeRO 的阶段包括数据分片。", "会把数据并行与状态分片概念混淆。", ("4 卡 DDP，每卡 batch=32，全局 batch 是多少？", "128", ("32", "64", "256"), "4×32=128。")),
            T("Compute Budgets and Scaling Laws", "缩放律是经验预测，固定计算下模型规模与数据 token 需要联合分配。", "Chinchilla 强调许多大模型训练 token 不足。", "在固定 FLOP 预算下比较不同 N 与 D 组合。", "缩放律是对任何数据和任务都精确成立的定理。", "预算会被错误地全部投入参数而忽略数据。", ("持续 2 PFLOP/s 训练 3 天等于多少 PF-day？", "6", ("1.5", "3", "48"), "PF-day=2×3=6。")),
            T("Domain Pretraining", "领域继续预训练通过目标语料改变数据分布，应控制质量与通用能力回退。", "领域 tokenizer、去重和数据治理会影响收益。", "同时设置领域与通用持出评估。", "领域数据越集中越不可能发生遗忘。", "领域提升会伴随通用能力或偏差风险。"),
            T("BloombergGPT: Design and Training", "BloombergGPT 用金融与通用语料混合训练，并在真实预算下选择 50B 规模。", "准备语料与实际消费 token 需要区分。", "记录混合比例、tokenizer、ZeRO/MiCS 和 checkpoint。", "BloombergGPT 训练数据全部来自金融文本。", "案例会被简化为单一领域语料故事。", ("若金融 token 占 51%，总计 700B token，金融 token 约多少？", "357B", ("343B", "510B", "51B"), "700×0.51=357B。")),
            T("BloombergGPT: Evaluation and Evidence", "领域模型应同时比较金融任务和通用任务，并说明评分方式。", "multiple-choice 候选评分方式会改变结论。", "按任务族报告优势与不足，不只给平均数。", "某些金融任务领先即可证明所有金融任务都领先。", "不均匀结果会被平均值掩盖。"),
            T("What Pretraining Does Not Finish", "预训练不自动完成指令遵循、事实保证、安全对齐和产品集成。", "后续仍需要 SFT、对齐、检索、评估与监控。", "把预训练模型视为系统组件而非最终产品。", "预训练损失下降意味着部署质量全部达标。", "模型会在真实交互与安全边界上失败。"),
        ],
    },
    "LLM-6-Instruction-Fine-Tuning-and-PEFT": {
        "title": "LLM 6 - Instruction Fine-Tuning and PEFT",
        "topics": [
            T("1. When Prompting Stops Being Enough", "prompting 不更新权重，fine-tuning 用数据持续改变行为。", "是否微调取决于稳定行为缺口、数据和成本。", "先用 prompt 与 ICL 建立基线，再决定是否训练。", "任何 prompt 失败都应立即全参数微调。", "训练成本会被用于可由接口设计解决的问题。"),
            T("2. Build an Instruction Dataset", "指令数据要从原始记录构造 prompt-completion 对，并先切分再套模板。", "tokenization、padding 与质量审计属于数据设计。", "按原始实体切分以避免模板泄漏。", "先生成全部模板再随机切分总能避免泄漏。", "训练和验证会共享近重复样本。"),
            T("3. Single-Task Fine-Tuning and Forgetting", "窄任务微调可快速提升目标任务，但可能造成灾难性遗忘。", "学习率、epoch、数据窄度和全参数漂移影响遗忘。", "同时评估目标任务和通用能力。", "灾难性遗忘只发生在监督学习之外。", "模型会把无关问题强行映射成目标标签。"),
            T("4. Multi-Task Instruction Tuning", "多任务指令微调让一个模型学习通用的指令—行为接口。", "任务混合比例和模板多样性决定迁移。", "用 held-out task family 检验真正迁移。", "多任务微调要求每个任务单独保存一个模型。", "大数据任务会压制小任务或引入负迁移。"),
            T("5. Case Study: Dialogue Summarization", "对话摘要需要定义信息契约、基线和生产评估。", "ROUGE 不能替代事实性、遗漏和行动项检查。", "先比较零样本、提示和微调基线。", "训练 ROUGE 提高即可证明生产摘要可靠。", "模型会生成流畅但遗漏或捏造行动项的摘要。"),
            T("6. Why Full Fine-Tuning Is Expensive", "全微调需更新并保存全部参数、梯度和优化器状态。", "每个任务一个完整 checkpoint 难以扩展。", "按任务数估算训练与存储总成本。", "可训练参数数量是唯一显存来源。", "部署多任务时 checkpoint 存储与加载失控。", ("一个 14GB checkpoint 为 20 个任务各存一份，需要多少 GB？", "280", ("14", "34", "140"), "14×20=280GB。")),
            T("7. Parameter-Efficient Fine-Tuning", "PEFT 冻结大部分基础模型，只训练小型适配参数。", "方法包括 additive、reparameterization 与 selective。", "把质量、延迟、存储和切换成本一起评估。", "PEFT 意味着训练完全不需要激活和反向传播。", "团队会低估运行基础模型的内存与计算。"),
            T("8. LoRA: Learning a Low-Rank Update", "LoRA 用 BA 近似权重更新 ΔW，并只训练低秩矩阵。", "rank、alpha、dropout 与插入位置共同决定容量。", "先从注意力投影的较小 rank 开始验证。", "LoRA 直接删除原始权重矩阵。", "错误 rank 与位置会造成欠拟合或无谓开销。", ("W 为 1024×1024，LoRA rank=8；A、B 参数总数是多少？", "16,384", ("8,192", "1,048,576", "2,097,152"), "r(din+dout)=8×(1024+1024)=16,384。")),
            T("9. Evaluating LoRA Honestly", "LoRA 应与基础模型、全微调和不同 rank 在同一协议下比较。", "验证曲线、行为评估和复现信息比单一重叠分数更重要。", "固定数据、seed 和训练预算后比较。", "只要可训练参数少就可以接受质量下降。", "效率主张会缺少公平基线。"),
            T("10. Soft Prompt Tuning", "soft prompt 是输入嵌入空间中的可训练连续向量，不是人工文本提示。", "一个冻结模型可服务多个学习到的 prompt。", "比较软提示长度、模型规模和任务差异。", "soft prompt 可以直接被人读成自然语言规则。", "可解释性和迁移能力会被夸大。", ("软提示长度 20、隐藏维度 4096，可训练参数是多少？", "81,920", ("4,116", "20,480", "409,600"), "20×4096=81,920。")),
            T("11. QLoRA and a Practical Decision Guide", "QLoRA 量化冻结基础模型并训练 LoRA，以降低显存。", "应选择能满足质量的最小干预，而非默认最复杂方法。", "从 prompting、soft prompt、LoRA、QLoRA 到全微调逐级升级。", "QLoRA 会把 LoRA 适配器也固定为不可训练。", "方法选择会脱离数据、质量和硬件约束。"),
        ],
    },
    "LLM-7-Efficient-LLM-Serving": {
        "title": "LLM 7 - Efficient LLM Serving",
        "topics": [
            T("1. The Serving Workload", "prefill 高并行处理提示，decode 逐 token 且常受内存带宽限制。", "连续批处理在序列结束时立即插入新请求。", "分别测首 token 延迟和 token 间延迟。", "prefill 与 decode 的计算形态完全相同。", "调度器会用错误指标优化服务。", ("prefill 80ms、生成 20 token，每 token 30ms，总延迟约多少？", "680ms", ("600ms", "100ms", "2,400ms"), "80+20×30=680ms。")),
            T("2. FlashAttention", "FlashAttention 通过分块和在线 softmax 减少 HBM 读写，不是近似注意力。", "数值结果保持精确注意力语义。", "在长序列上比较内存访问与运行时间。", "FlashAttention 的核心是丢弃大部分注意力分数。", "会把 IO 优化误写成算法近似。"),
            T("3. KV Cache and PagedAttention", "KV cache 保存历史 key/value，PagedAttention 用块管理非连续内存。", "分页减少外部碎片并支持共享、换出和恢复。", "按层数、头数、维度和精度估算每 token 内存。", "KV cache 只在 prefill 使用，decode 不再读取。", "长上下文容量会被严重低估。", ("若每 token KV cache 为 1MB，8,000 token 约需多少 GB？", "8GB", ("1GB", "4GB", "80GB"), "8000MB 约为 8GB。")),
            T("4. vLLM", "vLLM 结合 PagedAttention、连续批处理和调度提高吞吐。", "显存不足时可通过抢占与重计算恢复请求。", "同时测吞吐、TTFT、ITL 和失败率。", "vLLM 通过让所有请求长度相同来消除浪费。", "真实长短请求下的调度收益会被误解。"),
            T("5. SGLang and RadixAttention", "RadixAttention 复用共享前缀 KV，适合程序化、多轮和分支工作流。", "constrained decoding 与 jump-forward 可跳过确定字符。", "对共享 system prompt 和 JSON schema 测缓存命中。", "RadixAttention 只是在磁盘上压缩模型权重。", "前缀复用机会会被浪费。"),
            T("6. Serving Thousands of LoRA Adapters", "多租户 LoRA 服务需要高效存储、装载、合并和调度适配器。", "vLLM 与 S-LoRA 在适配器存放与交换策略上不同。", "把 adapter 热度和切换成本纳入调度。", "每个 LoRA 都必须复制完整基础模型。", "适配器切换和内存层次会成为瓶颈。", ("每个 LoRA 80MB，1,000 个适配器总存储约多少 GB？", "80GB", ("8GB", "800GB", "1,000GB"), "80MB×1000=80,000MB≈80GB。")),
            T("7. Sharing GPUs Safely", "GPU 共享需要空间与时间隔离，并控制队列、显存和尾延迟。", "分区大小是容量与排队的联合决策。", "设置配额、抢占策略和租户级监控。", "平均利用率高即可证明多租户安全公平。", "单个租户会拖慢或挤出其他请求。"),
            T("8. Benchmarking a Serving System", "服务基准必须指定请求分布、并发、长度、硬件与延迟百分位。", "吞吐不能脱离 TTFT、ITL 和 SLO 比较。", "使用真实到达过程和冷/热缓存场景。", "只报告最大 tokens/s 就足以比较系统。", "高吞吐会掩盖不可接受的尾延迟。", ("100 个请求中 p95 延迟对应排序后的第几个附近？", "第95个", ("第5个", "第50个", "第100个必然"), "p95 表示约 95% 请求不超过该延迟，对应排序第 95 个附近。")),
            T("9. Design Checklist", "设计应从工作负载、SLO、内存、调度、隔离和评测形成闭环。", "优化必须在目标硬件和真实流量上验证。", "上线前做容量测试、故障恢复和回滚演练。", "选择最快内核即可跳过系统设计。", "局部内核收益无法转化为稳定服务。"),
        ],
        "checkpoint": T("综合检查点", "高效服务是模型内核、KV 内存、调度与 SLO 的联合优化。", "prefill/decode 分离和真实流量基准是核心。", "用端到端负载验证优化而不是只看微基准。", "任何单项吞吐提升都必然改善所有用户延迟。", "系统会牺牲尾延迟、隔离或稳定性换取表面吞吐。"),
    },
    "LLM-8-Evaluating-LLMs": {
        "title": "LLM 8 - Evaluating Language Models",
        "topics": [
            T("1. Evaluation Is a Measurement Design", "评估需要定义对象、任务分布、指标、基线与不确定性。", "单一总分不能覆盖事实性、安全、推理和系统成本。", "先写评估问题，再选择数据和指标。", "选择流行 benchmark 就等于完成测量设计。", "结论会超出数据与指标支持范围。"),
            T("2. GLUE and SuperGLUE", "GLUE/SuperGLUE 汇集多种语言理解任务，后者提高难度。", "benchmark 饱和后需要更难任务和更细误差分析。", "按任务报告而非只看平均分。", "GLUE 的单一平均分能证明所有语言能力。", "任务差异会被宏观平均掩盖。"),
            T("3. Broader Benchmark Suites", "MMLU、BIG-bench、BBH 与 HELM 扩展知识、能力和多指标评估。", "HELM 强调场景、指标和透明报告。", "检查数据污染、提示敏感性和任务覆盖。", "更大的题库自动消除 benchmark 泄漏。", "模型可能通过污染或提示特例获得虚高分。"),
            T("4. ROUGE and BLEU", "ROUGE 偏召回，BLEU 基于 n-gram precision 并含 brevity penalty。", "重叠指标不能判断事实一致性或语义等价。", "同时给重叠分、人工事实评估和错误案例。", "ROUGE 或 BLEU 高即可保证回答事实正确。", "表面词重叠会掩盖关键语义错误。", ("unigram overlap=8，生成 10 个词，参考 12 个词；ROUGE-1 precision 是多少？", "0.8", ("0.667", "0.75", "1.2"), "precision=8/10=0.8。")),
            T("5. Evaluating Reasoning", "推理评估必须同时检查最终答案与中间推理质量。", "ROSCOE 可检测事实性、重复、矛盾和对齐问题。", "设计能区分正确答案与错误理由的样本。", "最终答案正确就能证明推理链可靠。", "偶然猜对会被当成可靠推理。", ("6 个句对最大矛盾概率为 0.7，若 self-consistency=1−max，得多少？", "0.3", ("0.7", "0.42", "1.7"), "1−0.7=0.3。")),
            T("6. TravelPlanner", "规划任务需要同时检查硬约束、预算、时间与可执行性。", "micro pass 看单约束，macro pass 要求整条计划全部通过。", "逐条验证交通、营业时间和预算。", "多个局部约束通过意味着整份计划必然通过。", "局部正确会掩盖整体不可执行。", ("5 个独立硬约束各通过率 0.9，全部通过概率约多少？", "0.590", ("0.9", "0.5", "0.810"), "0.9^5≈0.590。")),
            T("7. Systems Metrics", "系统评估应包含延迟、吞吐、成本、失败率和资源利用。", "平均延迟不能替代 p95/p99 尾延迟。", "在固定质量和负载下比较成本。", "模型准确率相同意味着服务体验相同。", "系统瓶颈和高尾延迟会被遗漏。", ("每秒完成 40 请求、平均每请求 500 token，吞吐是多少 token/s？", "20,000", ("540", "12,500", "40,000"), "40×500=20,000 token/s。")),
            T("8. LLMPerf", "LLMPerf 用标准化负载测量 LLM 服务吞吐和延迟。", "必须记录模型、硬件、并发和输入输出长度。", "重复运行并报告分布而非单点。", "跨系统比较时可忽略请求长度。", "不同工作负载会被错误当作系统差异。"),
            T("9. Building an Evaluation Portfolio", "评估组合应覆盖能力、安全、鲁棒性、成本和真实业务任务。", "不同证据等级不能被一个平均分替代。", "维护回归集、挑战集和线上监控。", "一次 benchmark 胜利足以证明生产系统优秀。", "模型会在未覆盖场景中失败而无人察觉。"),
        ],
        "checkpoint": T("综合检查点", "可靠评估把任务质量、推理过程、系统性能和风险放在同一证据框架中。", "指标必须有适用边界和可复现协议。", "用多层证据交叉验证模型结论。", "只要题量大，任何单一指标都可代表全部质量。", "评估结论会被错误外推到未测能力。"),
    },
}


BAD_APPLICATIONS = (
    "只观察一个成功样本，不记录任何失败情况。",
    "删除所有不符合预期的数据后再报告结果。",
    "只看单一平均分，忽略任务分布和适用边界。",
)


# A second, deliberately harder calculation for quantitatively rich sections.
# These do not merely change the numbers in the introductory calculation: each
# one adds an inverse problem, a second stage, or a system-level constraint.
ADVANCED_CALCS = {
    ("LLM 1 - Fundamentals of Deep Learning", "4. Generalization"):
        ("模型 A 的训练/验证误差为 0.04/0.18，模型 B 为 0.10/0.13。若部署分布与验证集一致，仅依据这些数据应优先选择哪个模型，理由是什么？", "模型 B；其验证误差更低且泛化间隙更小", ("模型 A；训练误差最低", "模型 A；泛化间隙更大", "两者必然等价"), "应以未见数据表现为主。A 的间隙为 0.14，B 为 0.03；B 的验证误差也更低。"),
    ("LLM 1 - Fundamentals of Deep Learning", "5. Regularization"):
        ("目标函数为 L(w)+λw²。若 w=4、λ=0.1，L 对 w 的梯度为 −0.3，则总梯度是多少？", "0.5", ("−0.7", "−0.3", "0.8"), "正则项梯度为 2λw=0.8，总梯度 −0.3+0.8=0.5。"),
    ("LLM 1 - Fundamentals of Deep Learning", "6. Metrics"):
        ("二分类器有 TP=90、FP=30、FN=10。其 F1 约为多少？", "0.818", ("0.750", "0.900", "0.857"), "Precision=90/120=0.75，Recall=90/100=0.9，F1=2×0.75×0.9/(0.75+0.9)≈0.818。"),
    ("LLM 1 - Fundamentals of Deep Learning", "8. Batch and Rate"):
        ("8 张 GPU，每卡 micro-batch=4，梯度累积 8 步后更新一次；全局有效 batch 是多少？", "256", ("32", "64", "512"), "全局有效 batch=8×4×8=256。"),
    ("LLM 1 - Fundamentals of Deep Learning", "10. Parallelism"):
        ("单卡模型占用 36GB，而每卡仅有 24GB。数据并行和把模型均匀切到 2 卡的模型并行，哪种能首先解决容量问题？", "2 卡模型并行；每卡约承载 18GB 模型状态", ("数据并行；每卡只承载 4.5GB", "数据并行；模型会自动压缩", "两种都不能改变单卡模型占用"), "数据并行复制完整模型，不能解决模型本身放不下；2 路模型并行可分摊模型状态。"),
    ("LLM 1 - Fundamentals of Deep Learning", "11. Sync and Benchmarks"):
        ("单卡每步 100ms，8 卡同步训练每步 140ms，且每卡处理相同 batch。相对单卡的吞吐加速比约为多少？", "5.71×", ("1.40×", "8.00×", "11.20×"), "吞吐与每步总样本数除以步时成正比，加速比=8×100/140≈5.71。"),
    ("LLM 2 - Attention and Transformers", "Attention"):
        ("注意力分数为 [0, ln3]，对应 value 为 [2, 6]。加权输出是多少？", "5", ("3", "4", "6"), "softmax 权重为 [0.25,0.75]，输出=0.25×2+0.75×6=5。"),
    ("LLM 2 - Attention and Transformers", "Attention as Matrix Computation"):
        ("序列长度从 2,048 增至 4,096，其他条件不变，标准注意力分数矩阵的元素数约变为原来的多少倍？", "4 倍", ("2 倍", "8 倍", "16 倍"), "注意力分数规模与 n² 成正比，长度翻倍使元素数变为 2²=4 倍。"),
    ("LLM 2 - Attention and Transformers", "Mixture of Experts"):
        ("一个 MoE 层有 16 个专家、top-2 路由；一个 batch 有 1,600 个 token，capacity factor=1.25。若均匀分配，每个专家容量应设为多少 token？", "250", ("125", "200", "2,000"), "总路由量=1600×2=3200；均匀每专家 200，再乘 1.25 得 250。"),
    ("LLM 2 - Attention and Transformers", "BERT in Detail"):
        ("BERT 对 1,000 个 token 选取 15% 做 MLM，其中 80% 换成 [MASK]、10% 换成随机 token、10% 保持不变。期望真正显示为 [MASK] 的 token 有多少？", "120", ("15", "100", "150"), "1000×0.15×0.8=120。"),
    ("LLM 3–4 - Decoding, Prompt Engineering, and RAG", "Deterministic Decoding"):
        ("两个长度相同的候选序列 token 概率分别为 [0.8,0.4] 与 [0.6,0.6]。按概率乘积，beam search 应保留哪一个？", "第二个；0.36>0.32", ("第一个；0.8>0.6", "第一个；总和 1.2 更大", "二者概率完全相同"), "序列分数比较联合概率：0.8×0.4=0.32，0.6×0.6=0.36。"),
    ("LLM 3–4 - Decoding, Prompt Engineering, and RAG", "Sampling and Distribution Control"):
        ("二分类 logits 差为 2。温度从 1 调到 2 后，高 logit 类的概率从 σ(2) 变为多少？", "σ(1)≈0.731", ("σ(4)≈0.982", "0.500", "0.881"), "温度缩放把 logit 差除以 T：2/2=1，因此概率为 σ(1)≈0.731。"),
    ("LLM 3–4 - Decoding, Prompt Engineering, and RAG", "In-Context Learning"):
        ("上下文上限 8,192 token；系统提示 900、用户问题 700、预留输出 1,500。每个示例平均 850 token，最多能放几个完整示例？", "5", ("6", "7", "8"), "示例预算=8192−900−700−1500=5092，floor(5092/850)=5。"),
    ("LLM 5 - Pretraining, Scaling, and Domain Models", "The Real Training Memory Budget"):
        ("一个 7B 模型采用 BF16 权重与梯度（各 2 bytes/参数），Adam 两个 FP32 状态（各 4 bytes/参数），暂不计激活。仅这些持久状态约需多少 GB？", "84GB", ("28GB", "56GB", "112GB"), "每参数 2+2+4+4=12 bytes；7B×12≈84GB。"),
    ("LLM 5 - Pretraining, Scaling, and Domain Models", "Precision, Mixed Precision, and Quantization"):
        ("一个 70B 模型的权重从 FP16 量化到 4-bit，仅按权重计算，存储量约从多少降到多少？", "140GB 降到 35GB", ("280GB 降到 70GB", "140GB 降到 70GB", "70GB 降到 17.5GB"), "FP16 为 2 bytes/参数：140GB；4-bit 为 0.5 byte/参数：35GB。"),
    ("LLM 5 - Pretraining, Scaling, and Domain Models", "From One GPU to Many"):
        ("4 卡训练，每卡 micro-batch=8，梯度累积 4 步。若数据集有 10,240 个样本，一个 epoch 有多少次参数更新？", "80", ("20", "320", "1,280"), "有效 batch=4×8×4=128，更新次数=10240/128=80。"),
    ("LLM 5 - Pretraining, Scaling, and Domain Models", "Compute Budgets and Scaling Laws"):
        ("用近似训练计算量 C≈6ND。若参数 N=10B、训练 token D=300B，计算量约是多少 FLOPs？", "1.8×10²²", ("3×10²¹", "6×10²¹", "1.8×10²¹"), "6×10¹⁰×3×10¹¹=18×10²¹=1.8×10²² FLOPs。"),
    ("LLM 6 - Instruction Fine-Tuning and PEFT", "8. LoRA: Learning a Low-Rank Update"):
        ("对一个 4096×4096 投影使用 rank=16 的 LoRA。LoRA 参数量占原矩阵参数量约多少？", "0.78%", ("0.39%", "1.56%", "6.25%"), "LoRA 参数=16×(4096+4096)=131072；原矩阵=4096²=16777216，占比约 0.781%。"),
    ("LLM 6 - Instruction Fine-Tuning and PEFT", "10. Soft Prompt Tuning"):
        ("50 个任务各使用长度 100、隐藏维度 4096 的 FP16 soft prompt。全部 soft prompt 总存储约多少 MB？", "约 41MB", ("约 4.1MB", "约 82MB", "约 410MB"), "参数数=50×100×4096=20,480,000；FP16 每参数 2 bytes，约 40.96MB。"),
    ("LLM 7 - Efficient LLM Serving", "1. The Serving Workload"):
        ("请求 prefill 用 120ms，随后生成 40 token；首个 token 包含在 prefill 后 25ms，其余 token 间隔 25ms。总完成延迟约多少？", "1,120ms", ("1,000ms", "1,095ms", "1,145ms"), "从开始到 40 个 token 完成约 120+40×25=1120ms。"),
    ("LLM 7 - Efficient LLM Serving", "3. KV Cache and PagedAttention"):
        ("KV cache 每 token 每层 128KB，模型有 32 层，上下文 4,096 token。单请求 KV cache 约多少 GB？", "16GB", ("4GB", "8GB", "32GB"), "128KB×32×4096=16,777,216KB≈16GB。"),
    ("LLM 7 - Efficient LLM Serving", "8. Benchmarking a Serving System"):
        ("两系统吞吐均为 20,000 token/s。A 的 p95 TTFT=0.8s，B 为 2.4s，而 SLO 要求 p95<1s。应如何判断？", "只有 A 满足该 SLO，吞吐相同不能判定体验相同", ("二者等价，因为吞吐相同", "B 更好，因为 TTFT 更大", "只需比较平均输出长度"), "吞吐必须与尾延迟和 SLO 联合判断；B 违反 p95 TTFT 约束。"),
    ("LLM 8 - Evaluating Language Models", "4. ROUGE and BLEU"):
        ("候选长度 c=8、参考长度 r=10，未乘 brevity penalty 的 BLEU 几何均值为 0.75。BP=exp(1−r/c)，最终 BLEU 约为多少？", "0.584", ("0.600", "0.750", "0.963"), "BP=exp(1−10/8)=exp(−0.25)≈0.779；BLEU≈0.779×0.75=0.584。"),
    ("LLM 8 - Evaluating Language Models", "6. TravelPlanner"):
        ("一条行程有 6 个必须全部满足的独立硬约束，每项通过率 0.95。整条行程全部通过的概率约是多少？", "0.735", ("0.700", "0.950", "0.815"), "macro pass≈0.95⁶≈0.735，说明局部高通过率仍会累积成明显整体失败。"),
    ("LLM 9 - RLHF, PPO, and GRPO", "3. Human Feedback and Reward Models"):
        ("chosen 与 rejected 的奖励差为 2。pairwise loss=−logσ(2) 约为多少？", "0.127", ("0.269", "0.500", "0.881"), "σ(2)≈0.881，因此 −log(0.881)≈0.127。"),
    ("LLM 9 - RLHF, PPO, and GRPO", "4. PPO for RLHF"):
        ("设优势 A=−3、概率比 ρ=0.70、ε=0.20。PPO 的 min(ρA,clip(ρ)A) 是多少？", "−2.4", ("−3.0", "−2.1", "2.4"), "ρA=−2.1；clip(ρ)=0.8，clip(ρ)A=−2.4；取较小值 −2.4。"),
    ("LLM 9 - RLHF, PPO, and GRPO", "8. GRPO Derivation"):
        ("一组奖励为 [3,1,1,1]，使用总体标准差做组内标准化。奖励 3 的回答优势约为多少？", "1.732", ("0.577", "1.000", "2.000"), "均值 1.5，总体标准差 √0.75≈0.866，优势=(3−1.5)/0.866≈1.732。"),
    ("LLM 9 - RLHF, PPO, and GRPO", "9. Results and Interpretation"):
        ("若单次采样正确率 p=0.1，独立采样 10 次，Pass@10 约为多少？", "0.651", ("0.100", "0.349", "1.000"), "Pass@10=1−(1−0.1)¹⁰=1−0.9¹⁰≈0.651。"),
}


def shuffle_options(correct: list[str], wrong: list[str]):
    tagged = [(x, True) for x in correct] + [(x, False) for x in wrong]
    if len(tagged) != 4 or len({x for x, _ in tagged}) != 4:
        raise ValueError(f"Invalid options: {tagged}")
    RNG.shuffle(tagged)
    return [x for x, _ in tagged], [LETTERS[i] for i, (_, ok) in enumerate(tagged) if ok]


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "", text.lower())


def question(section_title, prompt, correct, wrong, explanation, difficulty, kind="single"):
    options, answers = shuffle_options(list(correct), list(wrong))
    return {
        "sectionTitle": section_title,
        "prompt": prompt,
        "options": options,
        "answers": answers,
        "explanation": explanation,
        "difficulty": difficulty,
        "type": "multiple" if kind == "multiple" else "single",
        "source": "generated-practice",
    }


def build_topic_questions(topic: Topic, all_topics: list[Topic], article_title: str):
    quiz_title = f"{article_title} 综合检查点" if topic.title == "综合检查点" else topic.title
    others = [x for x in all_topics if x.title != topic.title]
    wrong_pool = [topic.misconception] + [x.misconception for x in others]
    app_wrong = list(BAD_APPLICATIONS)
    consequence_wrong = ["模型参数会自动归零。", "性能会在所有任务上得到保证性提升。", "系统因此不再需要任何验证。"]
    q = []
    q.append(question(topic.title, f"关于“{quiz_title}”，哪项概括最准确？", [topic.concept], wrong_pool[:3], topic.concept, "进阶"))
    q.append(question(topic.title, f"关于“{quiz_title}”，下列哪项说法不正确？", [topic.misconception], [topic.concept, topic.support, topic.application], f"错误说法是：{topic.misconception} 正确边界是：{topic.concept}", "挑战"))
    q.append(question(topic.title, f"围绕“{quiz_title}”，下列哪些陈述成立？选择所有正确项。", [topic.concept, topic.support, topic.application], [topic.misconception], f"前三项分别覆盖定义、关键约束和实践方法；“{topic.misconception}”是需要避免的误解。", "挑战", "multiple"))
    q.append(question(topic.title, f"一个团队正在应用“{quiz_title}”中的方法。哪项做法最合理？", [topic.application], app_wrong, f"合理实践是：{topic.application} 它把概念转化为可验证的工程步骤。", "进阶"))
    if topic.calc:
        stem, correct, distractors, explanation = topic.calc
        q.append(question(topic.title, stem, [correct], list(distractors), explanation, "挑战"))
    else:
        q.append(question(topic.title, f"如果忽略“{quiz_title}”的关键约束，最可能首先出现什么问题？", [topic.consequence], consequence_wrong, f"最直接的失败模式是：{topic.consequence}", "挑战"))
    return q


def build_advanced_questions(topic: Topic, all_topics: list[Topic], article_title: str):
    """Five transfer questions that test mechanisms, diagnosis, and computation."""
    title = f"{article_title} 综合检查点" if topic.title == "综合检查点" else topic.title
    others = [x for x in all_topics if x.title != topic.title]
    if len(others) < 3:
        raise ValueError(f"Need three related topics for advanced distractors: {title}")
    d1, d2, d3 = others[:3]
    q = []
    q.append(question(
        topic.title,
        f"一个系统出现了以下现象：{topic.consequence} 团队同时声称：{topic.misconception} 哪项诊断最能定位真正原因？",
        [f"固定其他条件，执行“{topic.application}”，并检查结果是否符合“{topic.support}”。"],
        [
            f"改用“{d1.application}”，并把“{d1.support}”作为唯一判据。",
            f"改用“{d2.application}”，并把“{d2.support}”作为唯一判据。",
            f"改用“{d3.application}”，并把“{d3.support}”作为唯一判据。",
        ],
        f"高质量诊断需要受控干预和机制证据。本节可操作的干预是“{topic.application}”，对应证据是“{topic.support}”。",
        "高阶",
    ))
    q.append(question(
        topic.title,
        f"为了区分“{topic.concept}”与误解“{topic.misconception}”，实验中应保留哪些证据？选择所有正确项。",
        [
            "在相同数据、预算和评测协议下设置遵循约束的方案与违反约束的对照组。",
            f"记录能直接检验这一机制的证据：{topic.support}",
            f"对“{topic.consequence}”所对应的失败样本进行分层分析。",
        ],
        [f"把另一机制的证据“{d1.support}”直接当成本节机制已经成立。"],
        "前三项分别控制混杂因素、验证本节机制并检查失败边界；其他章节中的有效证据不能未经论证直接替代本节证据。",
        "高阶",
        "multiple",
    ))
    q.append(question(
        topic.title,
        f"离线验证支持“{topic.support}”，但上线后仍出现“{topic.consequence}”。此时最严谨的结论是什么？",
        ["离线证据只在其数据与假设范围内成立；应先检查分布变化、实现差异和未覆盖边界，再决定是否否定机制。"],
        [
            f"这足以证明问题来自“{d1.title}”，无需检查当前机制的实现。",
            f"只要补充“{d2.support}”，当前机制就自动在部署分布中成立。",
            f"直接改用“{d3.application}”，无需复现离线—线上差异。",
        ],
        "验证集证据不能自动外推到新分布。高阶判断需要区分机制失效、实现偏差与部署分布变化。",
        "高阶",
    ))
    q.append(question(
        topic.title,
        f"围绕“{title}”，下列哪条推理链在逻辑上成立？",
        [f"先提出可检验机制“{topic.concept}”，再用“{topic.support}”寻找证据，最后通过“{topic.application}”验证其适用范围。"],
        [
            f"从“{topic.concept}”出发，却只测量“{d1.support}”，随后执行“{d1.application}”。",
            f"从“{d2.concept}”出发，却用“{topic.support}”证明它，并执行“{topic.application}”。",
            f"先接受“{topic.misconception}”，再用“{d3.support}”替代当前机制的边界测试。",
        ],
        "有效推理必须从机制到证据再到受控验证，并明确结论的适用范围，不能把局部观察升级为普遍因果结论。",
        "高阶",
    ))
    calc = ADVANCED_CALCS.get((article_title, topic.title))
    if calc:
        stem, correct, distractors, explanation = calc
        q.append(question(topic.title, stem, [correct], list(distractors), explanation, "高阶"))
    else:
        q.append(question(
            topic.title,
            f"设计方案必须同时利用“{topic.concept}”并避免“{topic.consequence}”。哪项方案最完整？",
            [f"采用“{topic.application}”，同步验证“{topic.support}”，并把失败模式写入上线门槛和回退条件。"],
            [
                f"采用“{d1.application}”，只验证“{d1.support}”，但不检查当前失败模式。",
                f"采用“{topic.application}”，却以“{d2.support}”替代本节应验证的机制证据。",
                f"接受“{topic.misconception}”，并用“{d3.application}”绕过本节约束。",
            ],
            "完整方案同时包含机制、可执行干预、可观察证据以及失败时的控制措施。",
            "高阶",
        ))
    return q


def load_llm9_questions():
    topics = [
        T("1. Alignment After Fine-Tuning",
          "对齐把帮助性、诚实性与无害性等人类偏好转化为可优化、可审计的行为目标。",
          "预训练似然与监督模仿都不能完整表达多个候选回答之间的相对质量。",
          "先写清偏好准则，再分维度报告结果并检查目标之间的冲突。",
          "只要监督微调损失足够低，模型就已经与所有人类偏好完全对齐。",
          "系统会把流畅模仿误当成可靠、安全且诚实的行为。"),
        T("2. Reinforcement Learning for Language",
          "在语言模型 RL 中，状态是提示与已生成前缀，动作是下一个 token，完整回答是一条 rollout。",
          "奖励往往在回答结束后才出现，因此信用分配比有逐步奖励的环境更困难。",
          "明确终止规则、采样策略与奖励时点，并保留足够多样的轨迹。",
          "每生成一个 token，环境都会天然提供准确的人类偏好奖励。",
          "训练会把延迟且含噪的序列级奖励错误归因到每个动作。",
          ("旧策略给某 token 的概率为 0.20，新策略为 0.30；PPO 概率比 ρ 是多少？", "1.5", ("0.5", "0.67", "2.0"), "ρ=π新/π旧=0.30/0.20=1.5。")),
        T("3. Human Feedback and Reward Models",
          "奖励模型从同一提示下的 chosen/rejected 比较学习一个相对偏好标尺。",
          "Bradley–Terry 概率只由两个回答的奖励差决定，绝对分数没有跨模型的统一单位。",
          "记录标注准则、一致性与分歧，并保留独立的人类审计集。",
          "奖励模型输出 4 分的回答必然比输出 2 分的回答让人类满意两倍。",
          "团队会把代理分数当成人类价值本身，并忽略分布外失效。",
          ("若 chosen 奖励为 2、rejected 奖励为 1，则 σ(2−1) 约为多少？", "0.731", ("0.269", "0.500", "1.000"), "偏好概率为 σ(1)=1/(1+e⁻¹)≈0.731。")),
        T("4. PPO for RLHF",
          "PPO 用旧策略采样轨迹，以优势加权概率比，并通过裁剪限制单次策略移动。",
          "价值模型提供基线以降低方差，熵项抑制过早的分布坍缩。",
          "固定 rollout 对应的旧策略，联合监控 reward、KL、clip fraction 与 value error。",
          "PPO 裁剪保证实际策略在任何状态上都绝不越出信赖域。",
          "实现可能在旧策略、优势符号或裁剪方向上出错而仍显示奖励上升。",
          ("设 A=2、ρ=1.30、ε=0.20；PPO 的 min(ρA, clip(ρ)A) 是多少？", "2.4", ("2.0", "2.6", "3.0"), "ρA=2.6，裁剪后 1.2×2=2.4，取较小值 2.4。")),
        T("5. Reward Hacking and KL Control",
          "奖励黑客是策略提高代理奖励却偏离真实目标；KL 约束用冻结参考策略限制漂移。",
          "Goodhart 定律说明代理指标一旦被强力优化，其与真实目标的关系可能破裂。",
          "同时审计高奖励样本、任务质量和 KL，并用 held-out 人工评审检查捷径。",
          "只要奖励模型训练准确率高，策略就不可能找到奖励漏洞。",
          "模型会生成无关、夸张或投机的文本来获取高分。",
          ("任务奖励为 1.0，logπθ−logπref=0.4，β=0.25；r总=r任务−βΔlogπ 为多少？", "0.90", ("0.60", "1.10", "1.40"), "1.0−0.25×0.4=0.90。")),
        T("6. Scaling Feedback and Constitutional AI",
          "Constitutional AI 用明确原则指导自我批评、修订和 AI 偏好反馈，以扩展人工监督。",
          "RLAIF 降低重复标注成本，但原则选择、反馈模型偏差和高风险审计仍需人类治理。",
          "为原则建立优先级与冲突处理，并对医疗、金融等高风险场景保留人工升级。",
          "使用 AI 生成反馈后，系统不再包含任何人类价值判断或偏差来源。",
          "同源模型的盲点可能被大规模复制到策略和奖励模型。"),
        T("7. DeepSeekMath",
          "DeepSeekMath 的能力来自数学语料预训练、SFT 数据和 GRPO 强化学习的组合。",
          "论文结果必须连同数据、采样、工具使用和评测协议一起解释。",
          "比较 SFT 与 RL 时固定模型、数据切分、解码预算和评分规则。",
          "只要 benchmark 分数提高，就能断言提升完全来自 GRPO 算法。",
          "数据和推理预算的影响会被错误归因给优化器。",
          ("MATH 准确率从 40% 升至 52%，绝对提升与相对提升分别是多少？", "12 个百分点，30%", ("12%，12%", "30 个百分点，12%", "52 个百分点，30%"), "绝对提升=52−40=12 个百分点；相对提升=12/40=30%。")),
        T("8. GRPO Derivation",
          "GRPO 用同一问题的一组回答构造相对优势，移除 PPO 的价值模型，但保留策略、奖励与参考模型。",
          "组内标准化的优势只在当前问题与样本组内有意义，不能当作跨题绝对奖励。",
          "检查组内方差、概率比裁剪、长度归一化和 KL 项各自的作用。",
          "移除 critic 意味着 GRPO 不再需要采样多个回答、奖励计算或参考策略。",
          "系统会低估 rollout、奖励模型和组采样带来的计算与方差。",
          ("一组奖励为 [1,1,0,0]，使用总体标准差标准化；奖励为 1 的回答优势是多少？", "1", ("0", "0.5", "2"), "均值 0.5、总体标准差 0.5，因此 (1−0.5)/0.5=1。")),
        T("9. Results and Interpretation",
          "Maj@K 衡量正确答案的概率质量与稳定性，Pass@K 更接近至少采到一次正确解的能力边界。",
          "Maj@K 上升而 Pass@K 基本不变，支持策略把已有正确解变得更常见，而非扩展可解题上限。",
          "报告采样参数、K、置信区间、基线和失败样本，并区分绝对与相对提升。",
          "只要 Pass@K 不变，就能证明强化学习完全没有改善模型。",
          "论文结果会被误读为模型没有变化或获得了全新推理能力。",
          ("单次正确概率 p=0.2，独立采样 K=5 时 Pass@5=1−(1−p)^5 约为多少？", "0.672", ("0.200", "0.328", "1.000"), "1−0.8⁵=1−0.32768≈0.672。")),
    ]
    banks = [{
        "target": topic.title,
        "label": topic.title,
        "questions": (
            build_topic_questions(topic, topics, "LLM 9 - RLHF, PPO, and GRPO")
            + build_advanced_questions(topic, topics, "LLM 9 - RLHF, PPO, and GRPO")
        ),
    } for topic in topics]
    checkpoint_topic = T(
        "综合检查点",
        "RLHF 系统把偏好数据、奖励代理、策略优化、漂移约束和独立评估连接成反馈闭环。",
        "任何单一组件的高分都不能证明整个闭环安全可靠。",
        "从标注分歧、奖励漏洞、KL 漂移和 held-out 行为四条证据链联合验收。",
        "只要最终平均奖励上升，奖励模型、策略和部署行为就必然同时改善。",
        "代理目标的局部改进会掩盖真实行为退化。",
        ("奖励模型分数提高 0.8，但 KL 惩罚增加 0.5，β=0.4；净目标改变量约为多少？", "0.6", ("0.3", "0.8", "1.0"), "净改变量=0.8−0.4×0.5=0.6。"),
    )
    banks.append({
        "target": "__checkpoint__", "before": "10. Complete Lecture Archive", "label": "综合检查点",
        "questions": (
            build_topic_questions(checkpoint_topic, topics + [checkpoint_topic], "LLM 9 - RLHF, PPO, and GRPO")
            + build_advanced_questions(checkpoint_topic, topics + [checkpoint_topic], "LLM 9 - RLHF, PPO, and GRPO")
        ),
    })
    return {"title": "LLM 9 - RLHF, PPO, and GRPO", "banks": banks}


def build():
    output = {"version": "20261114-generated-v2", "notice": "AI 生成练习 · 非 CourseWorks 真题", "articles": {}}
    seen = set()
    total = 0
    for slug, article in ARTICLES.items():
        topics = article["topics"]
        banks = []
        for topic in topics:
            items = build_topic_questions(topic, topics, article["title"])
            items += build_advanced_questions(topic, topics, article["title"])
            banks.append({"target": topic.title, "label": topic.title, "questions": items})
        if checkpoint := article.get("checkpoint"):
            all_topics = topics + [checkpoint]
            items = build_topic_questions(checkpoint, all_topics, article["title"])
            items += build_advanced_questions(checkpoint, all_topics, article["title"])
            banks.append({"target": "__checkpoint__", "label": "综合检查点", "questions": items})
        output["articles"][slug] = {"title": article["title"], "banks": banks}

    output["articles"]["LLM-9-RLHF-and-GRPO"] = load_llm9_questions()

    for slug, article in output["articles"].items():
        count = sum(len(bank["questions"]) for bank in article["banks"])
        if count < 100:
            raise AssertionError(f"{slug} has only {count} questions")
        for bank in article["banks"]:
            if len(bank["questions"]) != 10:
                raise AssertionError(f"{slug}/{bank['label']} does not have ten questions")
            for q in bank["questions"]:
                key = normalize(q["prompt"])
                if key in seen:
                    raise AssertionError(f"Duplicate prompt: {q['prompt']}")
                seen.add(key)
                if len(q["options"]) != 4 or len(set(q["options"])) != 4:
                    raise AssertionError(f"Bad options: {q['prompt']}")
                total += 1
    if total != 830:
        raise AssertionError(f"Expected 830 generated questions, got {total}")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"created={OUTPUT}")
    print(f"articles={len(output['articles'])} questions={total} unique={len(seen)}")
    for slug, article in output["articles"].items():
        print(slug, sum(len(x["questions"]) for x in article["banks"]), len(article["banks"]))


if __name__ == "__main__":
    build()
