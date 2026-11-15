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
    "Inspect one successful example and omit every failure case.",
    "Remove observations that contradict the expected result before reporting it.",
    "Report one average while ignoring the task distribution and operating boundary.",
)




# English content is cached in source so builds never depend on a translation service.
ENGLISH_PROFILES = {('LLM 1 - Fundamentals of Deep Learning', '1. Why AI Scaled'): ('AI expansion is driven by data, algorithms, computing power and cloud infrastructure.', 'AlexNet and base models demonstrate synergy of scale and approach.', 'When evaluating new models, check your data, budget, and training methods simultaneously.', 'Just increasing the number of parameters will definitely result in a better general model.', 'Teams misinterpret correlations as causal conclusions about a single scale factor.', None),
 ('LLM 1 - Fundamentals of Deep Learning', '10. Parallelism'): ('Data, model, pipeline, and tensor parallelism solve different capacity and throughput bottlenecks.', 'Hybrid parallelism requires considering both communication topology and load balancing.', 'First, choose whether the model can be accommodated, and then choose parallel decomposition.', 'All parallel approaches are simply replicating the complete model.', 'A mismatch between parallel layout and bottlenecks increases traffic without increasing speed.', ('8 GPUs are used for data parallelization, batch=16 per card, what is the global batch?', '128', ('16', '64', '256'), 'Global batch=8×16=128.')),
 ('LLM 1 - Fundamentals of Deep Learning', '11. Sync and Benchmarks'): ('Synchronous training waits for all workers, and the slowest worker determines the step time.', 'Benchmarks must report throughput, accuracy, hardware, and communication settings simultaneously.', 'Fixed model, batch, and accuracy targets when comparing all-reduce schemes.', 'Scaling efficiency is demonstrated by reporting only the number of GPUs.', 'straggler and communication costs are erroneously hidden.', ('1 card throughput 100, 8 card throughput 600; what is the scaling efficiency?', '75%', ('60%', '80%', '600%'), 'Efficiency=600/(8×100)=0.75=75%.')),
 ('LLM 1 - Fundamentals of Deep Learning', '2. System Stack'): ('Generative AI systems are composed of data, models, software stacks, and production services.', 'Model quality and deployment reliability belong to different but interdependent layers.', 'When designing the solution, the data pipeline, training framework, monitoring and service goals are also specified.', 'After the model is trained, the software and production layers no longer affect the user experience.', 'Systems can lose control over monitoring, reproducibility, or service reliability.', None),
 ('LLM 1 - Fundamentals of Deep Learning', '3. Cloud Lifecycle'): ('Machine learning on the cloud should cover the complete life cycle of data, training, deployment, monitoring and retraining.', 'IaaS, PaaS and SaaS provide different levels of abstraction.', 'Define drift monitoring and trigger retraining conditions before going online.', 'The completion of deployment means the end of the life cycle.', 'The model degrades as the data changes but cannot be discovered in time.', None),
 ('LLM 1 - Fundamentals of Deep Learning', '4. Generalization'): ("Generalization focuses on the model's error on unseen data, rather than how well it fits the training set.", 'Underfitting corresponds to high bias, and overfitting usually corresponds to high variance.', 'Compare training error and validation error using an independent validation set.', 'The lower the training error, the lower the test error must be.', 'Teams will choose models that memorize training samples but fail to transfer.', ('The training error is 0.08 and the validation error is 0.23. What is the generalization gap between the two?', '0.15', ('0.08', '0.23', '0.31'), 'Generalization gap=0.23−0.08=0.15.')),
 ('LLM 1 - Fundamentals of Deep Learning', '5. Regularization'): ('Regularization strikes a balance between fitting and generalization by constraining the effective complexity.', 'L1 tends to be sparse, L2 penalizes large weights smoothly.', 'Choose regularization coefficients on the validation set rather than just looking at the training loss.', 'The larger the regularization coefficient, the better the model performance must be.', 'Constraints that are too strong will cause underfitting, and constraints that are too weak will retain high variance.', ('The target is data loss 1.2 plus λ||w||², λ=0.1, ||w||²=3, what is the regularization target?', '1.5', ('1.2', '1.3', '3.3'), '1.2+0.1×3=1.5。')),
 ('LLM 1 - Fundamentals of Deep Learning', '6. Metrics'): ('Metrics must match error costs, class distributions, and decision thresholds.', 'Accuracy in imbalanced classification may mask minority class failures.', 'Confusion matrix, precision, recall and threshold curves are also reported.', 'As long as the accuracy is high, there is no need to check class proportions.', 'The system may miss a large number of critical positive classes when the overall accuracy is high.', ('TP=80, FP=20, FN=40, what is approximately F1?', '0.727', ('0.800', '0.667', '0.571'), 'Precision=0.8，Recall=80/120=0.667，F1=2PR/(P+R)≈0.727。')),
 ('LLM 1 - Fundamentals of Deep Learning', '7. Training'): ('The training loop consists of forward computation, loss, backpropagation, and parameter updates.', 'Gradient descent uses the derivative of the loss with respect to the parameters to determine the update direction.', 'First verify whether a small batch can overfit, and then expand the training.', 'Backpropagation directly gives the global optimal solution.', 'Implementation errors may be mistaken for insufficient model capacity.', ('The parameter w=2, the gradient is 0.5, and the learning rate is 0.1; what is w after an SGD update?', '1.95', ('2.05', '1.5', '2.5'), 'w←w−ηg=2−0.1×0.5=1.95。')),
 ('LLM 1 - Fundamentals of Deep Learning', '8. Batch and Rate'): ('Batch size together with learning rate affects gradient noise, throughput, and convergence.', 'Increasing the batch size does not automatically lead to linear speedup or the same generalization.', 'Re-verify the learning rate and convergence curve after adjusting the batch.', 'The learning rate must always double exactly when the batch is doubled.', 'Training may increase throughput but worsen convergence.', ('The data set has 10,000 samples and batch=200. How many updates are there in one epoch?', '50', ('20', '200', '2000'), 'Number of updates=10000/200=50.')),
 ('LLM 1 - Fundamentals of Deep Learning', '9. Hardware'): ('Training performance depends on the common bottlenecks of computing, memory capacity, bandwidth, and communication.', 'Training and inference have different requirements for batch size, latency, and memory access.', 'Use profiler to distinguish between computing power constraint, memory constraint and communication constraint.', 'GPU peak FLOPS can directly predict end-to-end training time.', 'Hardware purchases can be misled by theoretical peaks.', ('If a single card processes 400 samples per second, how many seconds will it take to process 120,000 samples?', '300', ('30', '120', '480'), '120000/400=300 seconds.')),
 ('LLM 2 - Attention and Transformers', 'Attention'): ('Attention is weighted by the similarity between query and key.', 'Multi-head attention allows different subspaces to learn different relationships.', 'First check the shapes of Q, K, and V, and then perform scaling dot product and softmax.', 'The attention weight is directly obtained by the dot product of value and value.', 'Implementations can err in the direction of dimensionality or normalization.', ('The two unnormalized scores are 0 and ln3, what is the weight of the second term after softmax?', '0.75', ('0.25', '0.5', '3'), 'exp(ln3)/(exp0+exp(ln3))=3/(1+3)=0.75。')),
 ('LLM 2 - Attention and Transformers', 'Attention as Matrix Computation'): ('Matrix attention computes softmax(QKᵀ/√dk)V.', 'Causal mask masks future positions before softmax.', 'Compute all tokens and headers at once with batch matrix multiplication.', 'softmax should be calculated after value is multiplied.', 'Weights cannot form a probability distribution for each query over all keys.', ('What is the shape of the single-head attention score matrix QKᵀ when the sequence length n=4?', '4×4', ('4×d', 'd×d', '1×4'), 'Each query is compared with 4 keys, so we get 4×4.')),
 ('LLM 2 - Attention and Transformers', 'BERT in Detail'): ('BERT is a bidirectional encoder stack, and typical pre-training includes masked language modeling.', 'Downstream tasks can use tokens, sentence pairs, or pooled to represent different task headers.', 'NER uses token-level output, and classification uses sentence-level representation.', 'BERT uses causal masks to generate long text token by token.', 'Mistaking understanding models for native autoregressive generators.', ('There are 200 tokens in the sequence. If the random mask is 15%, how many tokens are expected to be selected?', '30', ('15', '20', '170'), '200×0.15=30。')),
 ('LLM 2 - Attention and Transformers', 'From Seq2Seq to Transformers'): ('Transformer uses parallel attention to alleviate the sequential bottleneck of recurrent networks.', 'Encoder-decoder attention allows the decoder to read the entire source sequence state.', 'Encoder self-attention, causal decoding attention and cross-attention are used respectively in the translation task.', 'Transformers eliminate the need for sequence order information.', 'Without positions and masks the model will get confused or peek into the future.', None),
 ('LLM 2 - Attention and Transformers', 'GPT, GPT-3, and LLaMA'): ('GPT and LLaMA belong to the decoder-only family and are pre-trained through causal prediction of the next token.', 'Data mix, scale, and training recipe are just as important as the number of parameters.', 'Check context, tokenizer, data, and inference budget simultaneously when comparing models.', 'GPT-3 is a single fixed parameter scale and is defined only by the number of parameters.', 'The comparison ignores differences caused by data and training calculations.', None),
 ('LLM 2 - Attention and Transformers', 'Inputs and Outputs'): ('The input consists of token embeddings combined with positional representations, and the output header maps hidden states to vocabulary logits.', 'Weight sharing allows input embedding and output projection to reuse parameters.', 'Check whether the training goals after tokenizer, position index and shift are consistent.', 'Transformer input requires only token ID, no position or embedding.', 'The model may not be able to distinguish the same set of tokens in different arrangements.', ('Hidden dimensions 512, vocabulary 30,000, how much weight does the unshared output projection contain?', '15,360,000', ('30,512', '60,000', '7,680,000'), '30000×512=15,360,000。')),
 ('LLM 2 - Attention and Transformers', 'Mixture of Experts'): ('MoE uses sparse routing to expand parameter capacity without activating all experts.', 'Route balancing and cross-device communication are system-level difficulties.', 'Total parameters, activation parameters and expert load are also reported.', 'Each token must pass through all experts during MoE inference.', 'Expert congestion can cause tail latency and training instability.', ('8 experts, top-2 routes, what is the proportion of experts activated for each token?', '25%', ('12.5%', '50%', '100%'), 'Each token activates 2/8=25%.')),
 ('LLM 2 - Attention and Transformers', 'The Transformer Block'): ('The complete block consists of attention, residual, normalization, and position-wise feedforward networks.', 'pre-norm places normalization before sub-layers to improve deep training stability.', 'Trace the residual branches and tensor shapes one by one.', 'Feedforward networks mix information directly between different tokens.', 'It will confuse the token mixing function and the channel transformation function.', None),
 ('LLM 2 - Attention and Transformers', 'Three Architecture Families'): ('encoder-only is good at understanding, encoder-decoder is good at conditional conversion, and decoder-only is good at continuation.', 'Schema choices should match the visibility context and how the target is generated.', 'Bidirectional encoders are used for classification, encoder-decoders are used for translation, and causal decoders are used for open generation.', 'The attention mask and input visibility are exactly the same for the three architectures.', 'The model uses information flows that do not match the task.', None),
 ('LLM 2 - Attention and Transformers', 'Word Representations'): ('Word representation maps discrete tokens into continuous vectors, and static vectors cannot differentiate between synonyms and different meanings.', 'ELMo has generated contextualized representations via bidirectional context.', 'Compare the different vectors of bank in the financial and riparian contexts.', 'The same word should use exactly the same semantic vector in all contexts.', 'Polysemy words can be incorrectly merged in downstream tasks.', ('Vocabulary 50,000, embedding dimension 768, how many parameters does the embedding matrix have?', '38,400,000', ('50,768', '6,510', '76,800,000'), 'Number of parameters = 50000 × 768 = 38,400,000.')),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Application Frameworks'): ('LangChain is biased toward orchestration, and LlamaIndex is biased toward data and retrieval-centered applications.', 'Frameworks reduce boilerplate code but do not replace evaluation and secure design.', 'First draw the data flow and call boundaries, and then select the smallest frame.', 'Using a framework automatically resolves illusions, permissions, and quality issues.', 'Complex abstractions can hide the true location of faults.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Building and Evaluating Prompts'): ('Tip engineering should iterate through repeatable data sets, metrics, and error analysis.', 'Establish a baseline first, then modify the prompts item by item to identify causal effects.', 'Save prompt version, model version, parameters and test samples.', 'Seeing a successful example confirms that the tip works.', 'The tip will overfit to a small number of examples and cannot be reproduced.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Common Application Patterns'): ('Writing, translating, coding, extracting, and structuring actions require different verification strategies.', 'Extraction tasks should prioritize schema constraints, and code tasks need to be tested.', 'Define executable acceptance conditions for each application.', 'All applications only need the same common tip and the same indicator.', 'The system cannot detect task-specific failures.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Deterministic Decoding'): ('Greedy selects the highest local probability at each step, and beam retains multiple partial sequences.', 'Beam width increases search but is not guaranteed to be more consistent with human preference.', 'Comparing greedy to finite beam in reproducible structure output.', 'Beam search must find the globally optimal and factually correct answer.', 'Search scores serve as a substitute for task quality judgments.', ('The beam width is 4 and each candidate extension has 3 tokens. How many extensions are there before clipping?', '12', ('4', '7', '64'), '4×3=12。')),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'From Representations to Generated Text'): ('The language model outputs a conditional token distribution, and the decoding strategy converts the distribution into a specific sequence.', 'High probability does not equate to being factually correct or on task.', 'Design model probabilities, decoding rules and external verification separately.', 'Choosing the token with the highest probability can ensure that the entire answer is true.', 'The system can mistake model confidence for factual evidence.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'In-Context Learning'): ('ICL gives examples in an inference context and does not update model weights.', 'Sample order, label balance, and coverage all affect the results.', 'Choose complementary examples and check token budgets.', 'Increasing the number of examples always monotonically improves accuracy.', 'Contextual crowding and biased examples degrade performance.', ('The context budget is 4096 tokens, system and problem account for 1096, and each example is 500. How many examples can be released in full?', '6', ('5', '7', '8'), 'There are 3000 tokens left, which can accommodate floor(3000/500)=6.')),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Prompts as Model Interfaces'): ('prompt is an interface that contains roles, tasks, contexts, constraints, and output formats.', 'System, user and assistant messages assume different control roles.', 'Clarify success criteria and failure handling instead of just writing topic keywords.', 'The longer the prompt, the better the result will be.', 'Irrelevant context dilutes constraints and increases conflicts.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Putting the Whole System Together'): ('Reliable applications connect models, retrieval, tools, post-processing, monitoring and evaluation in a closed loop.', 'Each component requires input-output contracts and failure degradation.', 'End-to-end testing of normal, borderline, and adversarial scenarios.', 'A high benchmark score for a single model proves that the entire application is reliable.', 'Component interaction errors will be exposed intensively in the end-to-end stage.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'ReAct, Tools, and Reliable Workflows'): ('ReAct alternates reasoning and action, and tool calls must have parameter validation and result checking.', 'Post-processing and permission boundaries are part of system reliability.', 'Perform schema verification on tool results and limit high-risk actions.', 'The model generation tool can be executed directly without verification after being called.', 'Incorrect parameters or prompt injection can translate into real operational risks.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Reasoning Patterns'): ('CoT, Auto-CoT and Tree of Thoughts provide different reasoning expansion and search methods.', 'The inference text still needs to be verified, and a long chain does not mean correct.', 'Math questions combine structured steps, checkpoints, and final verification.', 'As long as the model is asked to think step by step, the answer must be correct.', 'Wrong steps will be masked by smooth language.', None),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Sampling and Distribution Control'): ('Temperature, top-k and top-p change the concentration of the sampling distribution.', 'Low temperatures are more deterministic, high temperatures are flatter but potentially more random.', 'Creative tasks increase variety, and factual tasks lower the temperature and increase validation.', 'A temperature of 0.5 divides all probabilities directly by 2.', 'Parameter settings can be misinterpreted, leading to runaway diversity or stability.', ('What is the difference between the two logits 0 and 1 at temperature T=0.5?', '2', ('0.5', '1', '1.5'), 'Logits are first divided by T, and the difference changes from 1 to 1/0.5=2.')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'BloombergGPT: Design and Training'): ('BloombergGPT is trained with a mixture of financial and general corpora, and selects a 50B scale under real budget.', 'Preparing corpus and actually consuming tokens need to be distinguished.', 'Record mix ratio, tokenizer, ZeRO/MiCS and checkpoint.', 'BloombergGPT training data all comes from financial texts.', 'Cases will be simplified into single-domain corpus stories.', ('If financial tokens account for 51%, totaling 700B tokens, how many financial tokens are there?', '357B', ('343B', '510B', '51B'), '700×0.51=357B。')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'BloombergGPT: Evaluation and Evidence'): ('The domain model should compare both financial tasks and general tasks and explain how they are scored.', 'The way multiple-choice candidates are scored changes the conclusions.', 'Report strengths and weaknesses by task family, not just averages.', 'Leading in some financial tasks proves leading in all financial tasks.', 'Uneven results will be masked by the average.', None),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Choose Before You Train'): ('Reuse, adaptation, continued pre-training or training from scratch should be decided based on product goals, data and constraints.', 'Model cards are used to verify licensing, architecture, data, and known limitations.', 'Create a minimum viable baseline first before more expensive training is justified.', 'The more parameters there are, the more it should be pretrained from scratch.', 'Resources will be invested in training that does not address business gaps.', None),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Compute Budgets and Scaling Laws'): ('The scaling law is an empirical prediction. Under fixed calculation, the model size and data token need to be jointly allocated.', 'Chinchilla emphasized that many large model training tokens are insufficient.', 'Compare different N and D combinations under a fixed FLOP budget.', 'The scaling law is a theorem that holds exactly for any data and task.', 'Budgets can be mistakenly invested entirely in parameters and data ignored.', ('How many PF-days equals 3 days of training at 2 PFLOP/s?', '6', ('1.5', '3', '48'), 'PF-day=2×3=6。')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Domain Pretraining'): ('The domain continues pre-training to change the data distribution through the target corpus, and the quality and general ability regression should be controlled.', 'Domain tokenizers, deduplication and data governance impact revenue.', 'Also set up domain and general hold out evaluations.', 'The more concentrated the domain data is, the less likely it will be forgotten.', 'Domain advancement comes with the risk of general competencies or deviations.', None),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'From One GPU to Many'): ('DDP copies the model and shards the data, and ZeRO/FSDP shards the training state to increase capacity.', 'Scaling should measure both throughput and maximum trainable model.', 'Determine whether state sharding is needed based on memory bottlenecks.', 'ZeRO’s stages include data sharding.', 'It will confuse the concepts of data parallelism and state sharding.', ('4-card DDP, batch=32 per card, what is the global batch?', '128', ('32', '64', '256'), '4×32=128。')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Precision, Mixed Precision, and Quantization'): ('BF16 preserves the FP32 exponent range, and quantization maps high-precision values \u200b\u200bto lower bitwidths.', 'PTQ and QAT differ in the degree of training involvement.', 'Memory, speed, and accuracy losses are evaluated separately.', 'Quantization only modifies the file extension and does not change the numerical representation.', 'Low bit width errors are ignored.', ('Only weights remain for 1 billion parameters: FP32 is about 4GB, and INT8 is about how much?', '1GB', ('0.5GB', '2GB', '4GB'), 'INT8 1 byte per parameter, so ~1GB.')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Pretraining Objectives'): ('MLM, causal LM and span corruption correspond to different visible information and structures.', 'The self-supervised objective constructs predicted labels from raw data.', 'Select the target and mask based on the downstream generation method.', 'The condition information for the three targets is exactly the same.', 'The training objectives do not match the deployment tasks.', None),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'The Real Training Memory Budget'): ('Training memory includes parameters, gradients, optimizer state, activations, and temporary buffers.', "Adam's first- and second-order momentum brings about persistent states.", 'First estimate by accuracy and optimizer, and then measure the peak value.', 'The parameter file size is the complete training memory.', 'The model can be loaded but backpropagation cannot be started.', ('1 billion parameters are budgeted at 24GB based on course experience. How many GB is required to train a 7B model?', '168', ('24', '96', '336'), '7×24=168GB。')),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'What Pretraining Does Not Finish'): ('Pre-training does not automate instruction following, fact assurance, safety alignment, and product integration.', 'Follow-up still requires SFT, alignment, retrieval, evaluation and monitoring.', 'Think of pretrained models as system components rather than final products.', 'The decrease in pre-training loss means that the deployment quality is all up to standard.', 'Models fail at the boundaries of real interaction and safety.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '1. When Prompting Stops Being Enough'): ('Prompting does not update weights, fine-tuning uses data to continuously change behavior.', 'Whether or not to fine-tune depends on the stabilization behavior gap, data, and cost.', 'First use prompt and ICL to establish a baseline, and then decide whether to train.', 'Any prompt failure should be immediately fully parameterized.', 'Training costs are spent on problems that can be solved by interface design.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '10. Soft Prompt Tuning'): ('A soft prompt is a trainable continuous vector in the input embedding space, not an artificial text prompt.', 'A frozen model can serve multiple learned prompts.', 'Comparing soft cue length, model size, and task differences.', 'Soft prompts can be directly read as natural language rules by humans.', 'Interpretability and transferability will be exaggerated.', ('Soft prompt length is 20, hidden dimension is 4096, what are the trainable parameters?', '81,920', ('4,116', '20,480', '409,600'), '20×4096=81,920。')),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '11. QLoRA and a Practical Decision Guide'): ('QLoRA quantifies the frozen base model and trains LoRA to reduce video memory.', 'The smallest intervention that satisfies quality should be chosen rather than defaulting to the most complex approach.', 'Upgrade step by step from prompting, soft prompt, LoRA, QLoRA to full fine-tuning.', 'QLoRA will also pin the LoRA adapter as untrainable.', 'Method selection will be independent of data, quality, and hardware constraints.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '2. Build an Instruction Dataset'): ('The command data needs to construct prompt-completion pairs from the original records, split them first and then set the template.', 'Tokenization, padding and quality auditing belong to data design.', 'Split by original entity to avoid template leaks.', 'Generating all templates first and then randomly segmenting them can always avoid leaks.', 'Training and validation share near-duplicate samples.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '3. Single-Task Fine-Tuning and Forgetting'): ('Narrow task fine-tuning can quickly improve the target task, but can cause catastrophic forgetfulness.', 'Learning rate, epoch, data narrowness and full parameter drift affect forgetting.', 'Assess target tasks and general abilities simultaneously.', 'Catastrophic forgetting only occurs outside of supervised learning.', 'The model will forcibly map irrelevant questions to target labels.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '4. Multi-Task Instruction Tuning'): ('Multi-task instruction fine-tuning allows a model to learn a common instruction-behavior interface.', 'The task mix ratio and template diversity determine migration.', 'Use the held-out task family to check for true migration.', 'Multi-task fine-tuning requires a separate model to be saved for each task.', 'Big data tasks can overwhelm small tasks or introduce negative migration.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '5. Case Study: Dialogue Summarization'): ('The conversation summary requires defining information contracts, baselines, and production estimates.', 'ROUGE is not a substitute for factual, omission and action item checks.', 'The zero sample, hint and fine-tuned baselines are compared first.', 'The production summaries are proven reliable by increasing the training ROUGE.', 'The model produces summaries that are smooth but miss or fabricate action items.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '6. Why Full Fine-Tuning Is Expensive'): ('Full fine-tuning requires updating and saving all parameters, gradients, and optimizer state.', 'A complete checkpoint per task is difficult to scale.', 'Estimate total training and storage costs by number of tasks.', 'The number of trainable parameters is the only source of video memory.', 'Checkpoint storage and loading are out of control when deploying multitasking.', ('How many GB are needed to store one copy for each of 20 tasks in a 14GB checkpoint?', '280', ('14', '34', '140'), '14×20=280GB。')),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '7. Parameter-Efficient Fine-Tuning'): ('PEFT freezes most of the base model and only trains small adaptation parameters.', 'Methods include additive, reparameterization and selective.', 'Evaluate quality, latency, storage, and switching costs together.', 'PEFT means that training does not require activation and backpropagation at all.', 'Teams underestimate the memory and computation required to run the base model.', None),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '8. LoRA: Learning a Low-Rank Update'): ('LoRA updates ΔW with BA-approximated weights and only trains low-rank matrices.', 'Rank, alpha, dropout and insertion position jointly determine the capacity.', 'Start verification from the smaller rank of attention projection.', 'LoRA directly deletes the original weight matrix.', 'Wrong rank and position can cause underfitting or unnecessary overhead.', ('W is 1024×1024, LoRA rank=8; what is the total number of A and B parameters?', '16,384', ('8,192', '1,048,576', '2,097,152'), 'r(din+dout)=8×(1024+1024)=16,384。')),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '9. Evaluating LoRA Honestly'): ('LoRA should be compared with the base model, full fine-tuning and different ranks under the same protocol.', 'Validation curves, behavioral assessments, and replication information are more important than a single overlap score.', 'Comparison after fixed data, seed and training budget.', 'Quality degradation is acceptable as long as there are few trainable parameters.', 'Efficiency claims will lack a baseline of fairness.', None),
 ('LLM 7 - Efficient LLM Serving', '1. The Serving Workload'): ('Prefill prompts for high parallel processing, decodes token by token and is often limited by memory bandwidth.', 'Continuous batching inserts new requests immediately at the end of the sequence.', 'Measure the first token delay and inter-token delay respectively.', 'The calculation forms of prefill and decode are exactly the same.', 'The scheduler uses error metrics to optimize services.', ('Prefill 80ms, generate 20 tokens, each token is 30ms, what is the total delay?', '680ms', ('600ms', '100ms', '2,400ms'), '80+20×30=680ms。')),
 ('LLM 7 - Efficient LLM Serving', '2. FlashAttention'): ('FlashAttention reduces HBM reads and writes via chunking and online softmax, not approximate attention.', 'Numerical results preserve precise attention semantics.', 'Comparing memory accesses versus runtime on long sequences.', 'The core of FlashAttention is to discard most of the attention score.', 'IO optimization will be mistakenly written as algorithm approximation.', None),
 ('LLM 7 - Efficient LLM Serving', '3. KV Cache and PagedAttention'): ('KV cache saves historical key/value, and PagedAttention uses blocks to manage non-contiguous memory.', 'Paging reduces external fragmentation and supports sharing, swapping out, and recovery.', 'Estimate per-token memory by number of layers, heads, dimensions, and precision.', 'KV cache is only used in prefill, and decode is no longer read.', 'Long context capacity can be severely underestimated.', ('If the KV cache per token is 1MB, approximately how many GB are needed for 8,000 tokens?', '8GB', ('1GB', '4GB', '80GB'), '8000MB is approximately 8GB.')),
 ('LLM 7 - Efficient LLM Serving', '4. vLLM'): ('vLLM combines PagedAttention, continuous batching, and scheduling to improve throughput.', 'When the video memory is insufficient, the request can be restored through preemption and recalculation.', 'Also measure throughput, TTFT, ITL and failure rate.', 'vLLM eliminates waste by making all requests the same length.', 'Scheduling benefits under real long and short requests will be misunderstood.', None),
 ('LLM 7 - Efficient LLM Serving', '5. SGLang and RadixAttention'): ('RadixAttention reuses shared prefix KV, suitable for programmatic, multi-round and branching workflows.', 'constrained decoding and jump-forward can skip certain characters.', 'Test cache hits against shared system prompt and JSON schema.', 'RadixAttention simply compresses model weights on disk.', 'Prefix reuse opportunities will be wasted.', None),
 ('LLM 7 - Efficient LLM Serving', '6. Serving Thousands of LoRA Adapters'): ('Multi-tenant LoRA services require efficient storage, loading, merging and scheduling adapters.', 'vLLM and S-LoRA differ in adapter storage and exchange strategies.', 'Incorporate adapter popularity and switching costs into scheduling.', 'Every LoRA must replicate the complete base model.', 'Adapter switching and memory hierarchy can become bottlenecks.', ('80MB per LoRA, approximately how many GB of total storage for 1,000 adapters?', '80GB', ('8GB', '800GB', '1,000GB'), '80MB×1000=80,000MB≈80GB。')),
 ('LLM 7 - Efficient LLM Serving', '7. Sharing GPUs Safely'): ('GPU sharing requires spatial and temporal isolation, and control of queues, memory, and tail latencies.', 'Partition size is a joint decision of capacity and queuing.', 'Set quotas, preemption policies, and tenant-level monitoring.', 'A high average utilization proves multi-tenant security and fairness.', 'A single tenant can slow down or crowd out other requests.', None),
 ('LLM 7 - Efficient LLM Serving', '8. Benchmarking a Serving System'): ('Service benchmarks must specify request distribution, concurrency, length, hardware, and latency percentiles.', 'Throughput cannot be separated from TTFT, ITL and SLO comparisons.', 'Use realistic arrival processes and cold/hot cache scenarios.', 'Just reporting the maximum tokens/s is enough to compare systems.', 'High throughput can mask unacceptable tail latency.', ('Among 100 requests, where does the p95 latency correspond to the sorted position?', '95th', ('5th', '50th', 'The 100th inevitable'), 'p95 means that about 95% of requests do not exceed this delay, corresponding to around the 95th order.')),
 ('LLM 7 - Efficient LLM Serving', '9. Design Checklist'): ('The design should form a closed loop from workload, SLO, memory, scheduling, isolation and measurement.', 'Optimizations must be verified on target hardware and real traffic.', 'Conduct capacity testing, fault recovery and rollback drills before going online.', 'Skip system design by choosing the fastest core.', 'Local core gains cannot be translated into stable services.', None),
 ('LLM 7 - Efficient LLM Serving', '综合检查点'): ('Efficient service is a joint optimization of model kernel, KV memory, scheduling and SLO.', 'Prefill/decode separation and real traffic benchmarks are core.', 'Validate optimizations with end-to-end load instead of just looking at micro-benchmarks.', 'Any single throughput improvement necessarily improves latency for all users.', 'Systems sacrifice tail latency, isolation, or stability for surface throughput.', None),
 ('LLM 8 - Evaluating Language Models', '1. Evaluation Is a Measurement Design'): ('Assessment requires defining objects, task distributions, indicators, baselines and uncertainties.', 'A single total score cannot cover factuality, safety, reasoning, and system costs.', 'Write the assessment questions first, then choose the data and metrics.', 'Choosing a popular benchmark is equivalent to completing the measurement design.', 'The conclusion will be beyond the range supported by the data and indicators.', None),
 ('LLM 8 - Evaluating Language Models', '2. GLUE and SuperGLUE'): ('GLUE/SuperGLUE brings together multiple language understanding tasks, with the latter increasing in difficulty.', 'After the benchmark is saturated, more difficult tasks and more detailed error analysis are required.', 'Report by task rather than just looking at average scores.', 'A single average score on the GLUE demonstrates all language proficiency.', 'Task differences are masked by macro averaging.', None),
 ('LLM 8 - Evaluating Language Models', '3. Broader Benchmark Suites'): ('MMLU, BIG-bench, BBH and HELM expand knowledge, capabilities and multi-metric assessment.', 'HELM emphasizes scenarios, metrics, and transparent reporting.', 'Examine data contamination, prompt sensitivity, and task coverage.', 'Larger question banks automatically eliminate benchmark leaks.', 'Models may achieve artificially high scores through contamination or prompting special cases.', None),
 ('LLM 8 - Evaluating Language Models', '4. ROUGE and BLEU'): ('ROUGE partial recall, BLEU is based on n-gram precision and includes brevity penalty.', 'Overlap metrics cannot judge factual consistency or semantic equivalence.', 'Also give points for overlap, manual fact assessment, and error cases.', 'A high ROUGE or BLEU guarantees a factually correct answer.', 'Superficial word overlap can mask critical semantic errors.', ('unigram overlap=8, generate 10 words, reference 12 words; what is ROUGE-1 precision?', '0.8', ('0.667', '0.75', '1.2'), 'precision=8/10=0.8。')),
 ('LLM 8 - Evaluating Language Models', '5. Evaluating Reasoning'): ('Reasoning assessments must examine both the final answer and the quality of intermediate reasoning.', 'ROSCOE detects factuality, duplication, contradiction, and alignment issues.', 'Design samples that distinguish correct answers from incorrect reasons.', 'The correct final answer proves that the reasoning chain is reliable.', 'An accidental correct guess will be regarded as a reliable inference.', ('The maximum contradiction probability of 6 sentence pairs is 0.7. If self-consistency=1−max, what is the result?', '0.3', ('0.7', '0.42', '1.7'), '1−0.7=0.3。')),
 ('LLM 8 - Evaluating Language Models', '6. TravelPlanner'): ('Planning tasks requires checking hard constraints, budget, time, and executability simultaneously.', 'Micro pass depends on order constraints, while macro pass requires the entire plan to be passed.', 'Verify transportation, hours of operation, and budget item by item.', 'The passage of multiple local constraints means that the entire plan must pass.', 'Partial correctness masks overall unenforceability.', ('Each of the five independent hard constraints has a pass rate of 0.9. What is the approximate probability of all passing?', '0.590', ('0.9', '0.5', '0.810'), '0.9^5≈0.590。')),
 ('LLM 8 - Evaluating Language Models', '7. Systems Metrics'): ('System evaluation should include latency, throughput, cost, failure rate, and resource utilization.', 'Average latency is not a substitute for p95/p99 tail latency.', 'Compare costs at fixed mass and load.', 'The same model accuracy means the same service experience.', 'System bottlenecks and high-tail latencies are missed.', ('40 requests are completed per second, with an average of 500 tokens per request. What is the throughput of token/s?', '20,000', ('540', '12,500', '40,000'), '40×500=20,000 token/s。')),
 ('LLM 8 - Evaluating Language Models', '8. LLMPerf'): ('LLMPerf measures LLM service throughput and latency using normalized load.', 'Model, hardware, concurrency, and input and output lengths must be documented.', 'Repeat the run and report distributions rather than single points.', 'Request length can be ignored when comparing across systems.', 'Different workloads can be mistaken for system differences.', None),
 ('LLM 8 - Evaluating Language Models', '9. Building an Evaluation Portfolio'): ('The assessment portfolio should cover capabilities, safety, robustness, cost and real business tasks.', 'Different levels of evidence cannot be replaced by an average score.', 'Maintain regression sets, challenge sets and online monitoring.', 'A benchmark victory is enough to prove that the production system is excellent.', 'Models can fail in uncovered scenarios without anyone noticing.', None),
 ('LLM 8 - Evaluating Language Models', '综合检查点'): ('Robust assessment places task quality, reasoning processes, system performance, and risk in the same evidence framework.', 'Metrics must have applicable boundaries and reproducible protocols.', 'Cross-validate model conclusions with multiple layers of evidence.', 'As long as the number of questions is large, any single indicator can represent the entire quality.', 'Assessment conclusions can be incorrectly extrapolated to unmeasured abilities.', None),
 ('LLM 9 - RLHF, PPO, and GRPO', '1. Alignment After Fine-Tuning'): ('Alignment transforms human preferences such as helpfulness, honesty, and harmlessness into optimizable and auditable behavioral goals.', 'Neither pre-trained likelihood nor supervised imitation can fully express the relative quality among multiple candidate responses.', 'Write out the preference criteria first, then report the results by dimension and check for conflicts between goals.', 'As long as the supervised fine-tuning loss is low enough, the model is already fully aligned with all human preferences.', 'Systems can mistake smooth imitation for reliable, safe, and honest behavior.', None),
 ('LLM 9 - RLHF, PPO, and GRPO', '2. Reinforcement Learning for Language'): ('In language model RL, the state is the prompt plus the generated prefix, the action is the next token, and the complete response is a rollout.', 'Rewards often arrive only after the response is complete, which makes credit assignment harder than in an environment with dense stepwise rewards.', 'Specify termination rules, the sampling policy, and reward timing while retaining sufficiently diverse trajectories.', 'The environment naturally supplies an accurate human-preference reward after every generated token.', 'Training may misattribute a delayed, noisy sequence-level reward to individual actions.', ('The old policy assigns a token probability of 0.20 and the new policy assigns 0.30. What is the PPO probability ratio ρ?', '1.5', ('0.5', '0.67', '2.0'), 'ρ=π_new/π_old=0.30/0.20=1.5.')),
 ('LLM 9 - RLHF, PPO, and GRPO', '3. Human Feedback and Reward Models'): ('The reward model learns a relative preference scale from chosen/rejected comparisons under the same cue.', 'Bradley–Terry probabilities are determined only by the reward difference of the two responses, and the absolute scores have no uniform units across models.', 'Document annotation criteria, agreement and disagreement, and maintain an independent human audit set.', 'A reward model that outputs a 4-point answer must be twice as satisfying to a human as an answer that outputs a 2-point answer.', 'Teams treat agent scores as human values \u200b\u200bthemselves and ignore out-of-distribution failures.', ('If the chosen reward is 2 and the rejected reward is 1, what is approximately σ(2−1)?', '0.731', ('0.269', '0.500', '1.000'), 'The preference probability is σ(1)=1/(1+e⁻¹)≈0.731.')),
 ('LLM 9 - RLHF, PPO, and GRPO', '4. PPO for RLHF'): ('PPO samples trajectories with old policies, weights probability ratios by advantage, and limits single policy moves through clipping.', 'The value model provides a baseline to reduce variance, and the entropy term suppresses premature distribution collapse.', 'Fixed the old strategy corresponding to rollout, and jointly monitored reward, KL, clip fraction and value error.', 'PPO pruning ensures that the actual policy never crosses the trust zone in any state.', 'Implementations may be wrong with old strategies, dominant symbols, or clipping directions and still show reward increases.', ('Assume A=2, ρ=1.30, ε=0.20; what is min(ρA, clip(ρ)A) of PPO?', '2.4', ('2.0', '2.6', '3.0'), 'ρA=2.6, after cropping 1.2×2=2.4, take the smaller value 2.4.')),
 ('LLM 9 - RLHF, PPO, and GRPO', '5. Reward Hacking and KL Control'): ('Reward hacking is a strategy that increases agent rewards but deviates from the real target; KL constraints use a frozen reference strategy to limit drift.', "Goodhart's law states that once a proxy indicator is strongly optimized, its relationship with the real target may break down.", 'Simultaneously audit high reward samples, task quality and KL, and check shortcuts with held-out human review.', 'As long as the reward model training accuracy is high, it is impossible for the policy to find reward vulnerabilities.', 'Models generate irrelevant, exaggerated, or speculative text to score high.', ('The task reward is 1.0, logπθ−logπref=0.4, β=0.25; r total=r task−βΔlogπ, what is it?', '0.90', ('0.60', '1.10', '1.40'), '1.0−0.25×0.4=0.90。')),
 ('LLM 9 - RLHF, PPO, and GRPO', '6. Scaling Feedback and Constitutional AI'): ('Constitutional AI uses clear principles to guide self-criticism, revision, and feedback on AI preferences to extend human oversight.', 'RLAIF reduces the cost of repeated annotation, but principle selection, feedback model deviations, and high-risk auditing still require human governance.', 'Establish priorities and conflict handling for principles, and reserve manual upgrades for high-risk scenarios such as medical care and finance.', 'When AI is used to generate feedback, the system no longer contains any human value judgments or sources of bias.', 'The blind spots of homology models may be replicated at scale into policy and reward models.', None),
 ('LLM 9 - RLHF, PPO, and GRPO', '7. DeepSeekMath'): ("DeepSeekMath's power comes from a combination of mathematical corpus pre-training, SFT data, and GRPO reinforcement learning.", 'Paper results must be explained together with the data, sampling, tool usage, and evaluation protocol.', 'Fixed model, data slicing, decoding budget, and scoring rules when comparing SFT to RL.', 'As long as the benchmark score improves, it can be concluded that the improvement comes entirely from the GRPO algorithm.', 'The impact of data and inference budgets is misattributed to the optimizer.', ('MATH accuracy increases from 40% to 52%. What is the absolute improvement and relative improvement?', '12 percentage points, 30%', ('12%，12%', '30 percentage points, 12%', '52 points, 30%'), 'Absolute improvement=52−40=12 percentage points; relative improvement=12/40=30%.')),
 ('LLM 9 - RLHF, PPO, and GRPO', '8. GRPO Derivation'): ('GRPO uses a set of answers to the same question to construct relative advantage, removing the value model of PPO but retaining the strategy, reward, and reference models.', 'The advantage of within-group standardization is only meaningful within the current question and sample group and cannot be used as an absolute reward across questions.', 'Examine the respective effects of within-group variance, probability ratio clipping, length normalization, and the KL term.', 'Removing the critic means that GRPO no longer needs to sample multiple responses, reward calculations, or reference strategies.', 'The system underestimates the computation and variance introduced by rollouts, reward models, and group sampling.',
                                                         ('A set of rewards is [1,1,0,0], normalized using the population standard deviation; what is the advantage of answering with a reward of 1?', '1', ('0', '0.5', '2'), 'The mean is 0.5 and the population standard deviation is 0.5, so (1−0.5)/0.5=1.')),
 ('LLM 9 - RLHF, PPO, and GRPO', '9. Results and Interpretation'): ('Maj@K measures the probability quality and stability of the correct answer, and Pass@K is closer to the ability boundary of picking the correct solution at least once.', 'Maj@K increases while Pass@K remains basically unchanged, supporting strategies to make existing correct solutions more common rather than expanding the upper limit of solvable problems.', 'Reports sampling parameters, K, confidence intervals, baseline and failure samples, and distinguishes between absolute and relative improvement.', 'As long as Pass@K remains unchanged, it can be proven that reinforcement learning does not improve the model at all.', 'The paper results can be misinterpreted as indicating that the model has not changed or that it has gained new inference capabilities.',
                                                                    ('When the single correct probability p=0.2 and independent sampling K=5, what is the approximate value of Pass@5=1−(1−p)^5?', '0.672', ('0.200', '0.328', '1.000'), '1−0.8⁵=1−0.32768≈0.672。')),
 ('LLM 9 - RLHF, PPO, and GRPO', '综合检查点'): ('The RLHF system connects preference data, reward agents, policy optimization, drift constraints and independent evaluation into a feedback closed loop.', 'A high score for any single component cannot prove that the entire closed loop is safe and reliable.', 'Joint acceptance of four evidence chains from labeling divergence, reward vulnerability, KL drift and held-out behavior.', 'As long as the final average reward rises, the reward model, policy, and deployment behavior must simultaneously improve.', 'Local improvements in agent goals can mask true behavioral degradation.', ('The reward model score increases by 0.8, but the KL penalty increases by 0.5, β=0.4; approximately what is the net target change?', '0.6', ('0.3', '0.8', '1.0'), 'Net change=0.8−0.4×0.5=0.6.'))}

ENGLISH_ADVANCED_CALCS = {('LLM 1 - Fundamentals of Deep Learning', '10. Parallelism'): ('The single-card model takes up 36GB, while each card only has 24GB. Which one can solve the capacity problem first, data parallelism or model parallelism that evenly cuts the model to 2 cards?', '2-card model parallelism; each card carries approximately 18GB of model state', ('Data parallelism; each card carries only 4.5GB', 'Data parallelism; models are automatically compressed', 'Neither method can change the occupancy of a single card model.'), 'Data parallel copying of the complete model cannot solve the problem that the model itself cannot be put down; 2-way model parallelism can share the model state.'),
 ('LLM 1 - Fundamentals of Deep Learning', '11. Sync and Benchmarks'): ('Each step of a single card takes 100ms, and each step of 8-card synchronous training takes 140ms, and each card processes the same batch. What is the approximate throughput acceleration ratio compared to a single card?', '5.71×', ('1.40×', '8.00×', '11.20×'), 'The throughput is proportional to the total number of samples per step divided by the step time, and the acceleration ratio = 8×100/140≈5.71.'),
 ('LLM 1 - Fundamentals of Deep Learning', '4. Generalization'): ('The training/validation error for model A is 0.04/0.18 and for model B is 0.10/0.13. If the deployment distribution is consistent with the validation set, based on this data alone, which model should be preferred and why?', 'Model B; has lower validation error and smaller generalization gap', ('Model A; lowest training error', 'Model A; larger generalization gap', 'Both must be equivalent'), 'It should be based on the performance of unseen data. A has a gap of 0.14 and B has a gap of 0.03; B also has a lower validation error.'),
 ('LLM 1 - Fundamentals of Deep Learning', '5. Regularization'): ('The objective function is L(w)+λw². If w=4, λ=0.1, and the gradient of L with respect to w is −0.3, what is the total gradient?', '0.5', ('−0.7', '−0.3', '0.8'), 'The gradient of the regular term is 2λw=0.8, and the total gradient is −0.3+0.8=0.5.'),
 ('LLM 1 - Fundamentals of Deep Learning', '6. Metrics'): ('The two classifiers are TP=90, FP=30, and FN=10. What is its F1 approximately?', '0.818', ('0.750', '0.900', '0.857'), 'Precision=90/120=0.75，Recall=90/100=0.9，F1=2×0.75×0.9/(0.75+0.9)≈0.818。'),
 ('LLM 1 - Fundamentals of Deep Learning', '8. Batch and Rate'): ('8 GPUs, micro-batch=4 per card, gradient is updated after 8 steps of accumulation; what is the global effective batch?', '256', ('32', '64', '512'), 'Globally valid batch=8×4×8=256.'),
 ('LLM 2 - Attention and Transformers', 'Attention'): ('The attention score is [0, ln3], and the corresponding value is [2, 6]. What is the weighted output?', '5', ('3', '4', '6'), 'The softmax weight is [0.25,0.75], and the output=0.25×2+0.75×6=5.'),
 ('LLM 2 - Attention and Transformers', 'Attention as Matrix Computation'): ('As the sequence length increases from 2,048 to 4,096, other things remaining unchanged, approximately how many times does the number of elements of the standard attention score matrix increase?', '4 times', ('2 times', '8 times', '16 times'), 'The attention score scale is proportional to n², doubling the length gives 2²=4 times the number of elements.'),
 ('LLM 2 - Attention and Transformers', 'BERT in Detail'): ('BERT selects 15% of 1,000 tokens for MLM, 80% of which are changed to [MASK], 10% to random tokens, and 10% remain unchanged. How many tokens are expected to actually appear as [MASK]?', '120', ('15', '100', '150'), '1000×0.15×0.8=120。'),
 ('LLM 2 - Attention and Transformers', 'Mixture of Experts'): ('One MoE layer has 16 experts and top-2 routes; one batch has 1,600 tokens and capacity factor=1.25. If distributed evenly, how many tokens should the capacity of each expert be set to?', '250', ('125', '200', '2,000'), 'Total routing volume = 1600 × 2 = 3200; average 200 per expert, multiplied by 1.25 to get 250.'),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Deterministic Decoding'): ('The probabilities of two candidate sequence tokens with the same length are [0.8,0.4] and [0.6,0.6] respectively. In terms of probability product, which one should be retained in beam search?', 'The second one; 0.36>0.32', ('The first one; 0.8>0.6', 'First; the sum is 1.2 greater', 'The probability of both is exactly the same'), 'Sequence score comparison joint probabilities: 0.8×0.4=0.32, 0.6×0.6=0.36.'),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'In-Context Learning'): ('The upper limit of context is 8,192 tokens; system prompts 900, user questions 700, and reserved output 1,500. Each example costs an average of 850 tokens. How many complete examples can be placed at most?', '5', ('6', '7', '8'), 'Example budget=8192−900−700−1500=5092, floor(5092/850)=5.'),
 ('LLM 3–4 - Decoding, Prompt Engineering, and RAG', 'Sampling and Distribution Control'): ('The binary logits difference is 2. What does the probability of the high logit class change from σ(2) when the temperature is adjusted from 1 to 2?', 'σ(1)≈0.731', ('σ(4)≈0.982', '0.500', '0.881'), 'Temperature scaling divides the logit difference by T: 2/2=1, so the probability is σ(1)≈0.731.'),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Compute Budgets and Scaling Laws'): ('Use approximate training computation C≈6ND. If parameter N=10B and training token D=300B, how many FLOPs will be the calculation amount?', '1.8×10²²', ('3×10²¹', '6×10²¹', '1.8×10²¹'), '6×10¹⁰×3×10¹¹=18×10²¹=1.8×10²² FLOPs。'),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'From One GPU to Many'): ('4-card training, micro-batch=8 per card, gradient accumulation for 4 steps. If the data set has 10,240 samples, how many parameter updates are there in one epoch?', '80', ('20', '320', '1,280'), 'Effective batch=4×8×4=128, number of updates=10240/128=80.'),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'Precision, Mixed Precision, and Quantization'): ('If the weight of a 70B model is quantized from FP16 to 4-bit, and calculated based on weight only, how much will the storage amount be reduced from?', '140GB reduced to 35GB', ('280GB reduced to 70GB', '140GB reduced to 70GB', '70GB down to 17.5GB'), 'FP16 is 2 bytes/parameter: 140GB; 4-bit is 0.5 byte/parameter: 35GB.'),
 ('LLM 5 - Pretraining, Scaling, and Domain Models', 'The Real Training Memory Budget'): ('A 7B model uses BF16 weights and gradients (2 bytes/parameter each), and two FP32 states of Adam (4 bytes/parameter each), excluding activation for the time being. Approximately how many GB will this persistent state alone require?', '84GB', ('28GB', '56GB', '112GB'), '2+2+4+4=12 bytes per parameter; 7B×12≈84GB.'),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '10. Soft Prompt Tuning'): ('Each of the 50 tasks uses a FP16 soft prompt of length 100 and hidden dimension 4096. Approximately how many MB is the total storage for all soft prompts?', 'About 41MB', ('About 4.1MB', 'About 82MB', 'About 410MB'), 'Number of parameters = 50 × 100 × 4096 = 20,480,000; FP16 has 2 bytes per parameter, approximately 40.96MB.'),
 ('LLM 6 - Instruction Fine-Tuning and PEFT', '8. LoRA: Learning a Low-Rank Update'): ('Use LoRA with rank=16 for a 4096×4096 projection. How much does the LoRA parameter amount account for in the original matrix parameter amount?', '0.78%', ('0.39%', '1.56%', '6.25%'), 'LoRA parameters=16×(4096+4096)=131072; original matrix=4096²=16777216, accounting for about 0.781%.'),
 ('LLM 7 - Efficient LLM Serving', '1. The Serving Workload'): ('Requesting prefill takes 120ms, and then generates 40 tokens; the first token is included 25ms after prefill, and the remaining tokens are spaced 25ms apart. What is the approximate total completion delay?', '1,120ms', ('1,000ms', '1,095ms', '1,145ms'), 'From the beginning to the completion of 40 tokens, it takes about 120+40×25=1120ms.'),
 ('LLM 7 - Efficient LLM Serving', '3. KV Cache and PagedAttention'): ('The KV cache is 128KB per token per layer, the model has 32 layers, and the context is 4,096 tokens. How many GB is the KV cache for a single request?', '16GB', ('4GB', '8GB', '32GB'), '128KB×32×4096=16,777,216KB≈16GB。'),
 ('LLM 7 - Efficient LLM Serving', '8. Benchmarking a Serving System'): ('The throughput of both systems is 20,000 token/s. A has a p95 TTFT=0.8s, B is 2.4s, and the SLO requires p95<1s. How to judge?', 'Only A meets the SLO, and the same throughput cannot determine the same experience.', ('They are equivalent because the throughput is the same', 'B is better because TTFT is larger', 'Just compare the average output length'), 'Throughput must be judged jointly with tail latency and SLO; B violates p95 TTFT constraint.'),
 ('LLM 8 - Evaluating Language Models', '4. ROUGE and BLEU'): ('The candidate length c=8, the reference length r=10, and the BLEU geometric mean without multiplying the brevity penalty is 0.75. BP=exp(1−r/c), what is the final BLEU?', '0.584', ('0.600', '0.750', '0.963'), 'BP=exp(1−10/8)=exp(−0.25)≈0.779；BLEU≈0.779×0.75=0.584。'),
 ('LLM 8 - Evaluating Language Models', '6. TravelPlanner'): ('A trip has 6 independent hard constraints that must all be satisfied, each with a pass rate of 0.95. What is the approximate probability of passing the entire trip?', '0.735', ('0.700', '0.950', '0.815'), 'macro pass≈0.95⁶≈0.735, indicating that local high pass rates can still accumulate into obvious overall failures.'),
 ('LLM 9 - RLHF, PPO, and GRPO', '3. Human Feedback and Reward Models'): ('The reward difference between chosen and rejected is 2. What is the approximate value of pairwise loss=−logσ(2)?', '0.127', ('0.269', '0.500', '0.881'), 'σ(2)≈0.881, therefore −log(0.881)≈0.127.'),
 ('LLM 9 - RLHF, PPO, and GRPO', '4. PPO for RLHF'): ('Assume advantage A=−3, probability ratio ρ=0.70, and ε=0.20. What is min(ρA,clip(ρ)A) of PPO?', '−2.4', ('−3.0', '−2.1', '2.4'), 'ρA=−2.1; clip(ρ)=0.8, clip(ρ)A=−2.4; take the smaller value −2.4.'),
 ('LLM 9 - RLHF, PPO, and GRPO', '8. GRPO Derivation'): ('A group of rewards is [3,1,1,1], and the overall standard deviation is used for intra-group standardization. What is the approximate answer advantage for Bonus 3?', '1.732', ('0.577', '1.000', '2.000'), 'The mean is 1.5, the overall standard deviation is √0.75≈0.866, and the advantage=(3−1.5)/0.866≈1.732.'),
 ('LLM 9 - RLHF, PPO, and GRPO', '9. Results and Interpretation'): ('If the accuracy of a single sampling is p=0.1 and the samples are independently sampled 10 times, what is the approximate value of Pass@10?', '0.651', ('0.100', '0.349', '1.000'), 'Pass@10=1−(1−0.1)¹⁰=1−0.9¹⁰≈0.651。')}
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


def clean_english(text: str) -> str:
    return (text.replace("。", ".").replace("，", ", ").replace("；", "; ")
            .replace("：", ": ").replace("？", "?").replace("（", "(").replace("）", ")"))


def english_topic(topic: Topic, article_title: str) -> Topic:
    profile = ENGLISH_PROFILES[(article_title, topic.title)]
    concept, support, application, misconception, consequence, calc = profile
    if calc:
        calc = (clean_english(calc[0]), clean_english(calc[1]),
                tuple(clean_english(x) for x in calc[2]), clean_english(calc[3]))
    title = "Checkpoint Quiz" if topic.title == "综合检查点" else topic.title
    return Topic(title, *(clean_english(x) for x in
                          (concept, support, application, misconception, consequence)), calc)


def related_topics(topic: Topic, all_topics: list[Topic]) -> list[Topic]:
    """Return adjacent course concepts, which make plausible rather than random distractors."""
    index = all_topics.index(topic)
    offsets = (-1, 1, 2, -2, 3)
    related = []
    for offset in offsets:
        candidate = all_topics[(index + offset) % len(all_topics)]
        if candidate != topic and candidate not in related:
            related.append(candidate)
    if len(related) < 3:
        raise ValueError(f"Need three related topics for {topic.title}")
    return related


def question(section_title, prompt, correct, wrong, explanation, difficulty, kind="single", skill="unspecified"):
    options, answers = shuffle_options(list(correct), list(wrong))
    return {
        "sectionTitle": section_title,
        "prompt": prompt,
        "options": options,
        "answers": answers,
        "explanation": explanation,
        "difficulty": difficulty,
        "type": "multiple" if kind == "multiple" else "single",
        "skill": skill,
        "source": "generated-practice",
    }


def build_topic_questions(topic: Topic, all_topics: list[Topic], article_title: str):
    quiz_title = f"{article_title} Checkpoint Quiz" if topic.title == "Checkpoint Quiz" else topic.title
    d1, d2, d3 = related_topics(topic, all_topics)[:3]
    q = []
    q.append(question(topic.title, f"Which statement best captures the central principle of {quiz_title}?",
                      [topic.concept], [d1.concept, d2.concept, d3.concept],
                      topic.concept, "Intermediate", skill="core_principle"))
    q.append(question(topic.title, f"Which claim reveals the most serious misconception about {quiz_title}?",
                      [topic.misconception], [d1.misconception, d2.misconception, d3.misconception],
                      f"The incorrect assumption is: {topic.misconception} The valid boundary is: {topic.concept}",
                      "Challenging", skill="misconception_detection"))
    q.append(question(topic.title,
                      f"Which TWO observations would provide the strongest direct evidence for {quiz_title}? Select all that apply.",
                      [topic.support, f"A controlled intervention reduces the documented failure: {topic.consequence}"],
                      [d1.support, "A single successful example is reported without measuring the proposed mechanism or any failure cases."],
                      "Direct evidence must test the stated mechanism and its characteristic failure mode; evidence for a neighboring topic is not a substitute.",
                      "Challenging", "multiple", skill="evidence_selection"))
    q.append(question(topic.title, f"A team must operationalize {quiz_title}. Which action is the most defensible first step?",
                      [topic.application], [d1.application, d2.application, d3.application],
                      f"The action tied to this section is: {topic.application}", "Intermediate", skill="implementation_choice"))
    if topic.calc:
        stem, correct, distractors, explanation = topic.calc
        q.append(question(topic.title, stem, [correct], list(distractors), explanation,
                          "Challenging", skill="foundational_calculation"))
    else:
        q.append(question(topic.title, f"If the defining constraint of {quiz_title} is ignored, which failure should appear first?",
                          [topic.consequence], [d1.consequence, d2.consequence, d3.consequence],
                          f"The predicted failure is: {topic.consequence}", "Challenging", skill="failure_prediction"))
    return q


def build_advanced_questions(topic: Topic, all_topics: list[Topic], article_title: str):
    """Five transfer questions that test mechanisms, diagnosis, and computation."""
    title = f"{article_title} Checkpoint Quiz" if topic.title == "Checkpoint Quiz" else topic.title
    d1, d2, d3 = related_topics(topic, all_topics)[:3]
    q = []
    q.append(question(
        topic.title,
        f"A system exhibits this failure: {topic.consequence} The team nevertheless assumes: {topic.misconception} Which diagnostic intervention best tests the disputed mechanism?",
        [f"Hold the workload and evaluation protocol fixed, apply this intervention—{topic.application}—and test whether the predicted evidence appears: {topic.support}"],
        [
            f"Change to this unrelated intervention—{d1.application}—and use only this criterion: {d1.support}",
            f"Change to this unrelated intervention—{d2.application}—and use only this criterion: {d2.support}",
            f"Change to this unrelated intervention—{d3.application}—and use only this criterion: {d3.support}",
        ],
        f"A useful diagnosis changes one causal factor and measures evidence predicted by the mechanism. The relevant intervention is '{topic.application}'; the predicted evidence is '{topic.support}'.",
        "Advanced", skill="causal_diagnosis",
    ))
    q.append(question(
        topic.title,
        f"Which THREE design choices are required for a controlled test of {title}? Select all that apply.",
        [
            "Keep the data, compute budget, and scoring protocol identical between treatment and control.",
            f"Measure the mechanism-specific evidence: {topic.support}",
            f"Stratify errors associated with this predicted failure: {topic.consequence}",
        ],
        [f"Treat evidence for {d1.title}—{d1.support}—as proof of the current mechanism without testing it."],
        "The correct choices control confounders, measure the mechanism, and inspect its failure boundary.",
        "Advanced", "multiple", skill="controlled_experiment",
    ))
    q.append(question(
        topic.title,
        f"Offline evaluation supports this finding—{topic.support}—but deployment still exhibits: {topic.consequence} What is the strongest justified conclusion?",
        ["The offline result is conditional on its data and assumptions; inspect distribution shift, implementation differences, and uncovered edge cases before rejecting the mechanism."],
        [
            f"The observation proves that {d1.title} is responsible, so the current implementation need not be inspected.",
            f"Adding this unrelated result—{d2.support}—automatically validates the current mechanism in production.",
            f"Adopt this different action—{d3.application}—without reproducing the offline-to-online discrepancy.",
        ],
        "Evidence does not automatically transfer to a new distribution. Separate mechanism failure, implementation error, and distribution shift.",
        "Advanced", skill="distribution_shift",
    ))
    q.append(question(
        topic.title,
        f"Which comparison correctly distinguishes {title} from the neighboring concept {d1.title}?",
        [f"For {title}, the relevant evidence is '{topic.support}', whereas evidence specific to {d1.title} is '{d1.support}'; neither can replace the other without an explicit causal link."],
        [
            f"Because both appear in the same course, evidence for {d1.title} automatically proves {title}.",
            f"The two concepts are equivalent whenever this action is taken: {d2.application}",
            f"The misconception '{topic.misconception}' makes evidence for either concept unnecessary.",
        ],
        "Closely related mechanisms still require their own predicted evidence and intervention; course proximity is not causal equivalence.",
        "Advanced", skill="concept_discrimination",
    ))
    calc = ENGLISH_ADVANCED_CALCS.get((article_title, topic.title))
    if calc:
        stem, correct, distractors, explanation = calc
        q.append(question(topic.title, clean_english(stem), [clean_english(correct)],
                          [clean_english(x) for x in distractors], clean_english(explanation),
                          "Advanced", skill="advanced_calculation"))
    else:
        q.append(question(
            topic.title,
            f"A deployment gate must preserve the principle '{topic.concept}' while preventing this failure: {topic.consequence} Which policy is complete?",
            [f"Apply this action—{topic.application}—verify this evidence—{topic.support}—and encode the failure mode in release and rollback criteria."],
            [
                f"Apply {d1.application} and validate only {d1.support}, without checking the current failure mode.",
                f"Apply {topic.application}, but substitute the unrelated evidence {d2.support} for the required measurement.",
                f"Accept the misconception '{topic.misconception}' and bypass the constraint with {d3.application}",
            ],
            "A complete release policy joins the mechanism, intervention, observable evidence, and a control for failure.",
            "Advanced", skill="system_integration",
        ))
    return q


def load_llm9_questions():
    article_title = "LLM 9 - RLHF, PPO, and GRPO"
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
    topics = [english_topic(topic, article_title) for topic in topics]
    banks = [{
        "target": topic.title,
        "label": topic.title,
        "questions": (
            build_topic_questions(topic, topics, article_title)
            + build_advanced_questions(topic, topics, article_title)
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
    checkpoint_topic = english_topic(checkpoint_topic, article_title)
    banks.append({
        "target": "__checkpoint__", "before": "10. Complete Lecture Archive", "label": "Checkpoint Quiz",
        "questions": (
            build_topic_questions(checkpoint_topic, topics + [checkpoint_topic], article_title)
            + build_advanced_questions(checkpoint_topic, topics + [checkpoint_topic], article_title)
        ),
    })
    return {"title": "LLM 9 - RLHF, PPO, and GRPO", "banks": banks}


def build():
    output = {"version": "20261114-generated-v3", "notice": "AI-generated practice · Not an official CourseWorks quiz", "articles": {}}
    seen = set()
    total = 0
    for slug, article in ARTICLES.items():
        topics = [english_topic(topic, article["title"]) for topic in article["topics"]]
        banks = []
        for topic in topics:
            items = build_topic_questions(topic, topics, article["title"])
            items += build_advanced_questions(topic, topics, article["title"])
            banks.append({"target": topic.title, "label": topic.title, "questions": items})
        if raw_checkpoint := article.get("checkpoint"):
            checkpoint = english_topic(raw_checkpoint, article["title"])
            all_topics = topics + [checkpoint]
            items = build_topic_questions(checkpoint, all_topics, article["title"])
            items += build_advanced_questions(checkpoint, all_topics, article["title"])
            banks.append({"target": "__checkpoint__", "label": "Checkpoint Quiz", "questions": items})
        output["articles"][slug] = {"title": article["title"], "banks": banks}

    output["articles"]["LLM-9-RLHF-and-GRPO"] = load_llm9_questions()

    for slug, article in output["articles"].items():
        count = sum(len(bank["questions"]) for bank in article["banks"])
        if count < 100:
            raise AssertionError(f"{slug} has only {count} questions")
        for bank in article["banks"]:
            if len(bank["questions"]) != 10:
                raise AssertionError(f"{slug}/{bank['label']} does not have ten questions")
            skills = [q["skill"] for q in bank["questions"]]
            if len(set(skills)) != 10:
                raise AssertionError(f"{slug}/{bank['label']} repeats a tested skill: {skills}")
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
    serialized = json.dumps(output, ensure_ascii=False, indent=2) + "\n"
    if re.search(r"[\u3400-\u9fff]", serialized):
        raise AssertionError("Chinese text remains in the generated English practice bank")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(serialized, encoding="utf-8")
    print(f"created={OUTPUT}")
    print(f"articles={len(output['articles'])} questions={total} unique={len(seen)}")
    for slug, article in output["articles"].items():
        print(slug, sum(len(x["questions"]) for x in article["banks"]), len(article["banks"]))


if __name__ == "__main__":
    build()
