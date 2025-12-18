# 人工智能导论课程深度应用案例集

**基于 shiro123444 项目实践的完整教学案例库**

---

## 📋 文档说明

**报告人**: shiro123444  
**编制日期**: 2025年12月18日  
**GitHub主页**: https://github.com/shiro123444  
**分析范围**: 全部9个仓库的深度技术分析  
**应用场景**: 人工智能导论课程实践教学  

---

## �� 课程对应关系总览

| 课程章节 | 对应项目 | 应用案例编号 | 难度等级 |
|---------|---------|-------------|---------|
| **1. AI基础与智能体** | social-media-ai-system | 案例1 | ★★★★★ |
| **2. 机器学习算法** | brain | 案例2 | ★★★★★ |
| **3. 自然语言处理** | social-media-ai-system | 案例3 | ★★★★☆ |
| **4. 知识表示与推理** | kg | 案例4 | ★★★★☆ |
| **5. 多模态AI** | -- (实时感官) | 案例5 | ★★★★★ |
| **6. 数据科学基础** | brain | 案例6 | ★★★☆☆ |
| **7. 教育AI应用** | CS50 | 案例7 | ★★★☆☆ |
| **8. 桌面应用开发** | student-management-system | 案例8 | ★★★☆☆ |
| **9. 医疗AI** | medcial-Q-A-SYSTEM | 案例9 | ★★★☆☆ |

---

## 📚 完整案例库索引


### 案例索引

1. **[案例1] HotFlow AI - 企业级智能体工作流系统** (⭐⭐⭐⭐⭐)
   - 课程模块: AI基础、智能体系统、NLP
   - 技术关键词: Agent Framework, MCP协议, DeepSeek LLM
   - 教学时长: 4-6课时
   
2. **[案例2] SSVEP脑机接口 - 机器学习算法优化实战** (⭐⭐⭐⭐⭐)
   - 课程模块: 机器学习、信号处理、主动学习
   - 技术关键词: CCA, TRCA, Filter-Bank, Active Learning
   - 教学时长: 4-6课时

3. **[案例3] 智能内容生成 - NLP应用全流程** (⭐⭐⭐⭐☆)
   - 课程模块: 自然语言处理、文本生成
   - 技术关键词: LLM, Prompt Engineering, RAG
   - 教学时长: 3-4课时

4. **[案例4] Thinking Quantum - 知识图谱问答系统** (⭐⭐⭐⭐☆)
   - 课程模块: 知识表示、图数据库、GraphRAG
   - 技术关键词: Neo4j, 知识图谱, D3.js可视化
   - 教学时长: 3-4课时

5. **[案例5] 心理咨询助手 - 多模态AI系统** (⭐⭐⭐⭐★)
   - 课程模块: 多模态学习、情绪识别、语音处理
   - 技术关键词: Face++, Web Speech API, TTS, GPGPU
   - 教学时长: 4-5课时

6. **[案例6] 数据分析与可视化实践** (⭐⭐⭐☆☆)
   - 课程模块: 数据科学基础
   - 技术关键词: NumPy, Pandas, Matplotlib, 统计分析
   - 教学时长: 2-3课时

7. **[案例7] CS50学习平台 - 教育技术应用** (⭐⭐⭐☆☆)
   - 课程模块: 教育AI、知识管理
   - 技术关键词: VitePress, CI/CD, 自动化工作流
   - 教学时长: 2-3课时

8. **[案例8] 学生管理系统 - 智能桌面应用** (⭐⭐⭐☆☆)
   - 课程模块: 软件工程、数据库应用
   - 技术关键词: PyQt5, QML, SQLite, MVC
   - 教学时长: 2-3课时

9. **[案例9] 医疗问答系统 - 垂直领域AI** (⭐⭐⭐☆☆)
   - 课程模块: 领域AI应用
   - 技术关键词: 领域知识、问答系统
   - 教学时长: 2-3课时

---

# 第一部分：核心AI技术案例

---

## 📖 案例1: HotFlow AI - 企业级智能体工作流系统

### 1.1 案例概述

**项目名称**: HotFlow AI - 智能社交媒体内容生产系统  
**仓库**: social-media-ai-system  
**技术级别**: 企业级AI应用  
**课程适用**: AI基础、智能体系统、自然语言处理  

#### 系统简介

HotFlow AI是一个基于Microsoft Agent Framework构建的企业级智能体系统，实现了社交媒体内容生产的全生命周期自动化。系统通过多个专业智能体的协同工作，模拟人类的"感知-认知-创作-行动"认知过程。

### 1.2 教学目标

#### 知识目标
- 理解智能体（Agent）的概念和工作原理
- 掌握Model Context Protocol (MCP)标准
- 学习顺序工作流（Sequential Workflow）设计
- 了解大语言模型（LLM）的实际应用

#### 能力目标
- 能够设计和实现多智能体协作系统
- 能够集成外部工具和API
- 能够处理AI系统的错误和边界情况
- 能够评估和优化AI系统性能

#### 素质目标
- 培养系统性思维能力
- 提升问题分解和抽象能力
- 增强创新意识和工程实践能力

### 1.3 核心技术深度解析

#### 1.3.1 智能体架构（Agent Architecture）

**理论基础：**

智能体是AI领域的核心概念，表示能够感知环境、做出决策并采取行动的自治实体。HotFlow AI实现了四个专业智能体：

```
┌─────────────────────────────────────────────────┐
│          Agent Framework 编排层                  │
├─────────────────────────────────────────────────┤
│  1. 热点获取智能体 (Hotspot Executor)           │
│     └─ 工具: daily-hot-mcp                      │
│     └─ 职责: 监控15+平台热榜                    │
│                                                  │
│  2. 深度分析智能体 (Analysis Executor)          │
│     └─ 工具: think-tool                         │
│     └─ 职责: 趋势识别与策略制定                 │
│                                                  │
│  3. 内容创作智能体 (Creation Executor)          │
│     └─ 工具: DeepSeek LLM                       │
│     └─ 职责: 多模态内容生成                     │
│                                                  │
│  4. 自动发布智能体 (Publish Executor)           │
│     └─ 工具: xiaohongshu-mcp                    │
│     └─ 职责: 内容发布和监控                     │
└─────────────────────────────────────────────────┘
```

**实现细节：**

```python
from autogen import SequentialBuilder, WorkflowContext

class MCPHotspotExecutor:
    """热点获取执行器"""
    
    @handler
    async def execute(self, context: WorkflowContext):
        # 1. 动态创建MCP工具连接
        async with MCPStreamableHTTPTool(url=MCP_URL) as tool:
            # 2. 创建绑定工具的临时Agent
            agent = client.create_agent(
                model="deepseek-chat",
                tools=[tool],
                system_message="你是热点分析专家..."
            )
            
            # 3. 执行查询
            result = await agent.run(
                "获取科技领域的最新热点"
            )
            
            # 4. 将结果传递给下一个智能体
            context.set_data("hotspots", result)
        
        return context
```

**教学要点：**

1. **智能体设计模式**
   - 单一职责原则：每个智能体专注一个任务
   - 接口隔离：通过WorkflowContext传递数据
   - 依赖倒置：基于抽象的工具接口

2. **异步编程实践**
   - async/await语法的正确使用
   - 资源的生命周期管理（async with）
   - 并发与并行的区别

#### 1.3.2 Model Context Protocol (MCP)

**理论基础：**

MCP是一个标准化协议，用于在AI应用和外部工具之间建立连接。它类似于HTTP之于Web，为工具集成提供了统一接口。

**协议架构：**

```
┌─────────────┐         MCP          ┌─────────────┐
│  AI应用     │ ◄─────────────────► │  工具服务器  │
│ (Client)    │                      │  (Server)    │
└─────────────┘                      └─────────────┘
       │                                     │
       │  1. discover_tools()                │
       │ ──────────────────────────────────► │
       │  2. tool_list                       │
       │ ◄────────────────────────────────── │
       │  3. call_tool(params)               │
       │ ──────────────────────────────────► │
       │  4. result                          │
       │ ◄────────────────────────────────── │
```

**实现示例：**

```python
# MCP Server端（工具提供方）
class DailyHotMCPServer:
    def list_tools(self):
        """列出可用工具"""
        return [
            {
                "name": "get_hot_topics",
                "description": "获取指定平台的热门话题",
                "parameters": {
                    "platform": "bilibili|weibo|zhihu",
                    "category": "tech|entertainment|..."
                }
            }
        ]
    
    def call_tool(self, tool_name, params):
        """执行工具调用"""
        if tool_name == "get_hot_topics":
            return self._fetch_hot_topics(
                params["platform"],
                params["category"]
            )

# MCP Client端（AI应用）
class MCPStreamableHTTPTool:
    async def __aenter__(self):
        # 建立连接
        self.session = await aiohttp.ClientSession()
        self.tools = await self._discover_tools()
        return self
    
    async def _discover_tools(self):
        """工具发现"""
        response = await self.session.get(
            f"{self.url}/tools"
        )
        return await response.json()
```

**教学要点：**

1. **协议设计原则**
   - 简单性：易于理解和实现
   - 可扩展性：支持新工具的添加
   - 标准化：跨平台兼容

2. **RESTful API设计**
   - 资源定位（URI）
   - HTTP方法语义
   - 状态码使用

#### 1.3.3 认知增强机制（Cognitive Enhancement）

**理论基础：**

基于双过程理论（Dual Process Theory），人类思维分为快速直觉的"系统1"和缓慢理性的"系统2"。HotFlow AI通过think-tool实现"系统2"思维。

**实现架构：**

```xml
<thinking>
  <!-- 问题分析 -->
  <problem_analysis>
    当前任务：分析热点话题
    关键挑战：区分短期热点和长期趋势
  </problem_analysis>
  
  <!-- 策略制定 -->
  <strategy>
    1. 按话题类型分类
    2. 分析跨平台一致性
    3. 评估传播速度
  </strategy>
  
  <!-- 推理过程 -->
  <reasoning>
    话题A在B站和知乎同时出现 → 跨平台热度
    传播速度快但持续时间短 → 短期热点
    结论：适合快速响应，不适合深度内容
  </reasoning>
</thinking>

<answer>
  推荐话题B：AI编程助手
  理由：长期趋势，适合深度内容创作
</answer>
```

**Python实现：**

```python
class ThinkToolExecutor:
    """认知增强执行器"""
    
    async def execute(self, context: WorkflowContext):
        hotspots = context.get_data("hotspots")
        
        # 强制模型输出思考过程
        prompt = f"""
        请分析以下热点数据，在<thinking>标签中展示你的分析过程：
        
        数据：{hotspots}
        
        要求：
        1. 在<thinking>中进行多步推理
        2. 在<answer>中给出最终结论
        """
        
        response = await self.llm.generate(prompt)
        
        # 提取思考过程和答案
        thinking = self._extract_tag(response, "thinking")
        answer = self._extract_tag(response, "answer")
        
        # 记录认知过程（用于改进和审计）
        self.logger.info(f"Thinking: {thinking}")
        
        context.set_data("analysis", answer)
        return context
```

**教学要点：**

1. **Prompt Engineering技巧**
   - 结构化输出控制
   - 思维链（Chain of Thought）
   - 少样本学习（Few-shot Learning）

2. **认知科学应用**
   - 双过程理论的计算实现
   - 元认知监控
   - 推理路径可视化

### 1.4 课程教学设计

#### 课时1-2: 智能体基础（2课时）

**教学内容：**
1. 智能体概念与分类
2. Agent Framework架构
3. 简单智能体实现

**实践任务：**
```python
# 任务1：实现天气查询智能体
class WeatherAgent:
    async def execute(self, city: str):
        # TODO: 调用天气API
        # TODO: 解析结果
        # TODO: 返回自然语言描述
        pass

# 任务2：实现多轮对话智能体
class ChatAgent:
    def __init__(self):
        self.history = []
    
    async def chat(self, user_input: str):
        # TODO: 维护对话历史
        # TODO: 生成上下文相关回复
        pass
```

**评估标准：**
- 智能体能正确响应用户请求（30%）
- 代码结构清晰，注释完整（20%）
- 错误处理完善（20%）
- 用户体验良好（30%）

#### 课时3-4: MCP协议与工具集成（2课时）

**教学内容：**
1. MCP协议详解
2. HTTP/WebSocket通信
3. 工具发现与调用

**实践任务：**
```python
# 任务：开发计算器MCP服务器
class CalculatorMCPServer:
    def list_tools(self):
        """
        返回工具列表：
        - add: 加法
        - subtract: 减法
        - multiply: 乘法
        - divide: 除法
        """
        pass
    
    def call_tool(self, tool_name, params):
        """执行计算"""
        pass

# 客户端调用示例
async with MCPClient("http://localhost:8000") as client:
    tools = await client.discover_tools()
    result = await client.call_tool("add", {"a": 5, "b": 3})
    print(result)  # 8
```

#### 课时5-6: 完整系统实现（2课时）

**综合项目：**
构建一个简化版的HotFlow AI系统

**要求：**
1. 实现至少3个智能体
2. 使用MCP连接外部工具
3. 实现顺序工作流
4. 提供完整文档

**评分细则：**
| 项目 | 分值 | 评分标准 |
|------|------|---------|
| 架构设计 | 25 | 模块划分合理，接口清晰 |
| 代码实现 | 30 | 功能完整，代码规范 |
| 工具集成 | 20 | MCP协议正确使用 |
| 文档质量 | 15 | README + API文档 |
| 创新性 | 10 | 独特功能或优化 |

### 1.5 教学资源

#### 代码示例库

```
teaching-resources/
├── 01-basic-agent/
│   ├── weather_agent.py        # 天气查询示例
│   ├── chat_agent.py            # 对话智能体
│   └── README.md
├── 02-mcp-protocol/
│   ├── calculator_server.py     # MCP服务器
│   ├── calculator_client.py     # MCP客户端
│   └── test_mcp.py
├── 03-full-system/
│   ├── hotflow_mini/           # 简化版HotFlow
│   ├── tests/
│   └── docs/
└── slides/                     # PPT课件
    ├── lesson1.pptx
    ├── lesson2.pptx
    └── lesson3.pptx
```

#### 推荐阅读

1. **论文**
   - *Attention Is All You Need* (Transformer架构)
   - *ReAct: Synergizing Reasoning and Acting in Language Models*

2. **文档**
   - Microsoft AutoGen Documentation
   - Model Context Protocol Specification

3. **视频**
   - Andrew Ng的AI Agent课程
   - DeepLearning.AI的LangChain教程

### 1.6 常见问题与解答

**Q1: 为什么需要多个智能体，一个不够吗？**

A: 单一智能体容易导致：
- 职责不清：一个Agent做所有事情
- 难以维护：代码耦合度高
- 性能瓶颈：无法并行处理

多智能体遵循"分而治之"思想，每个Agent专注一个任务，类似微服务架构。

**Q2: MCP和普通API有什么区别？**

A: 主要区别：
| 方面 | 普通API | MCP |
|------|---------|-----|
| 目的 | 数据交换 | 工具集成 |
| 接口 | 固定端点 | 动态发现 |
| 语义 | HTTP方法 | 工具描述 |
| AI友好度 | 低 | 高 |

MCP专为AI应用设计，提供了工具描述、参数验证等AI友好特性。

**Q3: 如何避免AI产生幻觉（Hallucination）？**

A: 策略：
1. **约束输出格式**：使用XML/JSON强制结构化
2. **引入外部知识**：RAG（检索增强生成）
3. **多步验证**：Think-tool强制推理过程
4. **温度参数调整**：降低temperature减少随机性

### 1.7 扩展阅读

#### 进阶主题

1. **LangGraph vs AutoGen**
   - 工作流编排的不同范式
   - 优缺点对比

2. **Agent安全性**
   - Prompt Injection攻击
   - 沙箱隔离技术

3. **大规模Agent系统**
   - 分布式Agent协调
   - 负载均衡策略

---

## 📖 案例2: SSVEP脑机接口 - 机器学习算法优化实战

### 2.1 案例概述

**项目名称**: SSVEP多算法对比实验系统  
**仓库**: brain  
**技术级别**: 研究级机器学习应用  
**课程适用**: 机器学习、信号处理、数据科学  

#### 系统简介

这是一个基于稳态视觉诱发电位（SSVEP）的脑机接口系统，通过三种不同算法的系统对比，展示了机器学习算法的优化过程。项目实现了从89.58%到100%准确率的提升，是机器学习课程的绝佳实战案例。

### 2.2 教学目标

#### 知识目标
- 理解经典机器学习算法（CCA）
- 掌握特征工程技巧（Filter-Bank）
- 学习模型优化方法（主动学习）
- 了解信号处理基础

#### 能力目标
- 能够进行算法对比实验
- 能够分析和可视化实验数据
- 能够识别和解决性能瓶颈
- 能够编写科研级文档

### 2.3 核心技术深度解析

#### 2.3.1 典型相关分析（CCA）

**理论基础：**

CCA是一种多元统计方法，用于找到两组变量之间的最大相关性。在SSVEP中：
- 第一组变量：6通道EEG信号
- 第二组变量：参考正弦波（sin/cos）

**数学公式：**

```
目标：max ρ = corr(X·a, Y·b)

其中：
X ∈ ℝ^(n×p): EEG信号矩阵 (n个采样点, p=6通道)
Y ∈ ℝ^(n×q): 参考信号矩阵 (n个采样点, q=4谐波)
a ∈ ℝ^p, b ∈ ℝ^q: 典型相关向量

求解：
(C_xx^(-1) C_xy C_yy^(-1) C_yx) a = λ² a

ρ = √λ_max  # 最大特征值的平方根
```

**Python实现：**

```python
import numpy as np
from sklearn.cross_decomposition import CCA

class DirectCCA:
    """基线算法：直接CCA"""
    
    def __init__(self, freqs, fs=250, harmonics=2):
        self.freqs = freqs
        self.fs = fs
        self.harmonics = harmonics
        self.references = self._generate_references()
    
    def _generate_references(self):
        """生成参考信号"""
        t = np.arange(0, 4, 1/self.fs)  # 4秒信号
        refs = {}
        
        for freq in self.freqs:
            signals = []
            for h in range(1, self.harmonics + 1):
                # 基频和谐波
                signals.append(np.sin(2 * np.pi * h * freq * t))
                signals.append(np.cos(2 * np.pi * h * freq * t))
            refs[freq] = np.column_stack(signals)
        
        return refs
    
    def predict(self, X):
        """
        预测刺激频率
        
        参数:
            X: (n_samples, n_channels) EEG信号
        
        返回:
            freq_idx: 预测的频率索引
        """
        cca = CCA(n_components=1)
        correlations = []
        
        for freq in self.freqs:
            Y = self.references[freq]
            
            # CCA计算
            cca.fit(X, Y)
            X_c, Y_c = cca.transform(X, Y)
            
            # 典型相关系数
            corr = np.corrcoef(X_c[:, 0], Y_c[:, 0])[0, 1]
            correlations.append(corr)
        
        return np.argmax(correlations)
```

**教学要点：**

1. **协方差矩阵计算**
   ```python
   C_xx = np.cov(X, rowvar=False)
   C_yy = np.cov(Y, rowvar=False)
   C_xy = np.cov(X, Y, rowvar=False)[:p, p:]
   ```

2. **广义特征值问题**
   ```python
   from scipy.linalg import eig
   
   # 求解 A·a = λ·B·a
   eigenvalues, eigenvectors = eig(A, B)
   ```

3. **数值稳定性**
   - 避免矩阵求逆：使用SVD分解
   - 正则化：添加微小对角项防止奇异

#### 2.3.2 滤波器组CCA（Filter-Bank CCA）

**理论基础：**

将信号分解到多个频段（子带），在每个子带独立进行CCA，然后加权融合。这利用了不同频率成分在不同子带的能量分布差异。

**子带划分：**

```
原始信号 (6-90 Hz)
     ↓
┌────┴────┬────────┬────────┬────────┐
│ Theta   │ Alpha  │ Beta-L │ Beta-H │
│ 4-8 Hz  │ 8-12Hz │ 12-20Hz│ 20-35Hz│
│ 权重:0.25│ 0.25   │ 0.25   │ 0.25   │
└─────────┴────────┴────────┴────────┘
     │        │        │        │
    CCA      CCA      CCA      CCA
     │        │        │        │
     └────────┴────────┴────────┘
              ↓
          加权融合
              ↓
          最终得分
```

**Python实现：**

```python
from scipy.signal import butter, filtfilt

class FilterBankCCA(DirectCCA):
    """改进算法：滤波器组CCA"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # 定义子带
        self.subbands = [
            (4, 8),    # Theta
            (8, 12),   # Alpha
            (12, 20),  # Beta-Low
            (20, 35)   # Beta-High
        ]
        
        # 子带权重（可学习）
        self.weights = np.array([0.25, 0.25, 0.25, 0.25])
    
    def _bandpass_filter(self, data, lowcut, highcut, order=5):
        """带通滤波"""
        nyq = 0.5 * self.fs
        low = lowcut / nyq
        high = highcut / nyq
        
        b, a = butter(order, [low, high], btype='band')
        return filtfilt(b, a, data, axis=0)
    
    def predict(self, X):
        """多子带预测"""
        n_freqs = len(self.freqs)
        scores = np.zeros((len(self.subbands), n_freqs))
        
        # 在每个子带上计算CCA
        for i, (low, high) in enumerate(self.subbands):
            X_filtered = self._bandpass_filter(X, low, high)
            
            for j, freq in enumerate(self.freqs):
                Y = self.references[freq]
                
                cca = CCA(n_components=1)
                cca.fit(X_filtered, Y)
                X_c, Y_c = cca.transform(X_filtered, Y)
                
                corr = np.corrcoef(X_c[:, 0], Y_c[:, 0])[0, 1]
                scores[i, j] = corr
        
        # 加权融合
        final_scores = np.dot(self.weights, scores)
        return np.argmax(final_scores)
```

**教学要点：**

1. **巴特沃斯滤波器设计**
   ```python
   # 滤波器阶数影响性能
   order = 5  # 越高越陡峭，但计算量大
   
   # 归一化频率
   normalized_freq = freq / (sampling_rate / 2)
   ```

2. **零相位滤波**
   ```python
   # filtfilt: 前向+后向滤波，消除相位延迟
   y = filtfilt(b, a, x)
   
   # 对比：lfilter只前向滤波，有相位延迟
   y_delayed = lfilter(b, a, x)
   ```

3. **权重学习**
   ```python
   # 在验证集上学习最优权重
   from scipy.optimize import minimize
   
   def objective(weights, scores, labels):
       predictions = np.argmax(scores.T @ weights, axis=1)
       return -np.mean(predictions == labels)
   
   result = minimize(
       objective,
       x0=[0.25, 0.25, 0.25, 0.25],
       bounds=[(0, 1)] * 4,
       constraints={'type': 'eq', 'fun': lambda w: w.sum() - 1}
   )
   optimal_weights = result.x
   ```

#### 2.3.3 任务相关成分分析（TRCA）

**理论基础：**

TRCA通过最大化同一类别内试次之间的协方差，找到最优的空间滤波器。这个滤波器能提取与特定刺激频率最相关的脑电成分。

**数学推导：**

```
目标：max J(w) = w^T S w / w^T Q w

其中：
S: 类内协方差（between-trial covariance）
Q: 总协方差（总方差）

S_k = Σ_{i<j} X_i^k X_j^k^T  # 第k类的类内协方差
S = Σ_k S_k

求解：广义特征值问题
S w = λ Q w
```

**Python实现：**

```python
from scipy.linalg import eigh

class TRCA:
    """任务相关成分分析"""
    
    def __init__(self, n_components=1):
        self.n_components = n_components
        self.filters = {}
        self.templates = {}
    
    def fit(self, X_train, y_train, freqs):
        """
        训练TRCA模型
        
        参数:
            X_train: list of (n_samples, n_channels)
            y_train: list of int, 频率标签
            freqs: list of float, 刺激频率
        """
        for freq_idx in range(len(freqs)):
            # 获取当前频率的所有试次
            trials = [X for X, y in zip(X_train, y_train) if y == freq_idx]
            
            # 计算类内协方差 S
            S = self._compute_between_trial_covariance(trials)
            
            # 计算总协方差 Q
            Q = self._compute_total_covariance(trials)
            
            # 求解广义特征值问题
            eigenvalues, eigenvectors = eigh(S, Q)
            
            # 选择最大特征值对应的特征向量
            idx = np.argsort(eigenvalues)[::-1]
            self.filters[freq_idx] = eigenvectors[:, idx[:self.n_components]]
            
            # 计算TRCA模板（投影后的平均）
            projected = [trial @ self.filters[freq_idx] for trial in trials]
            self.templates[freq_idx] = np.mean(projected, axis=0)
    
    def _compute_between_trial_covariance(self, trials):
        """计算类内协方差"""
        n_channels = trials[0].shape[1]
        S = np.zeros((n_channels, n_channels))
        
        # 所有试次对之间的协方差
        for i in range(len(trials)):
            for j in range(i + 1, len(trials)):
                S += trials[i].T @ trials[j]
        
        return S
    
    def _compute_total_covariance(self, trials):
        """计算总协方差"""
        # 连接所有试次
        X_concat = np.vstack(trials)
        return X_concat.T @ X_concat
    
    def predict(self, X_test):
        """预测"""
        correlations = []
        
        for freq_idx in self.filters.keys():
            # 投影到TRCA空间
            X_projected = X_test @ self.filters[freq_idx]
            
            # 与模板计算相关性
            corr = np.corrcoef(
                X_projected.flatten(),
                self.templates[freq_idx].flatten()
            )[0, 1]
            
            correlations.append(corr)
        
        return np.argmax(correlations)
```

**教学要点：**

1. **广义特征值分解**
   ```python
   # scipy提供了专门的函数
   eigenvalues, eigenvectors = eigh(A, B)
   
   # 等价于求解
   # A v = λ B v
   ```

2. **空间滤波器可视化**
   ```python
   import matplotlib.pyplot as plt
   
   # 显示滤波器权重（拓扑图）
   plt.imshow(filters.reshape(6, 1), cmap='RdBu_r')
   plt.colorbar()
   plt.title('TRCA Spatial Filter')
   ```

3. **CCA + TRCA融合**
   ```python
   def combined_predict(X):
       cca_score = cca_model.predict(X)
       trca_score = trca_model.predict(X)
       
       # 加权融合
       final_score = 0.6 * cca_score + 0.4 * trca_score
       return final_score
   ```

#### 2.3.4 主动学习（Active Learning）

**理论基础：**

主动学习通过智能选择最有价值的样本进行标注，减少标注成本。在本项目中，使用Margin采样策略。

**Margin采样：**

```
定义：Margin = score_top1 - score_top2

解释：
- Margin大 → 模型确定
- Margin小 → 模型犹豫（样本在决策边界附近）

策略：优先标注Margin最小的样本
```

**实现流程：**

```
1. 初始训练集：全部48个样本
   ↓
2. 训练基础模型
   ↓
3. 在未标注集预测，计算Margin
   ↓
4. 选择Margin最小的12个样本
   ↓
5. 人工标注（或使用真实标签）
   ↓
6. 扩充训练集：48 + 12 = 60
   ↓
7. 重新训练
   ↓
8. 重复步骤3-7（第二轮选8个）
   ↓
9. 最终训练集：68个样本
```

**Python实现：**

```python
class ActiveLearner:
    """主动学习器"""
    
    def __init__(self, model):
        self.model = model
        self.labeled_indices = []
        self.unlabeled_indices = []
    
    def calculate_margin(self, X):
        """计算不确定性（Margin）"""
        scores = []
        
        for x in X:
            # 获取所有类别的得分
            class_scores = self.model.predict_proba(x)
            
            # 排序
            sorted_scores = np.sort(class_scores)[::-1]
            
            # Margin = top1 - top2
            margin = sorted_scores[0] - sorted_scores[1]
            scores.append(margin)
        
        return np.array(scores)
    
    def query(self, n_samples):
        """
        查询最有价值的样本
        
        参数:
            n_samples: 要查询的样本数
        
        返回:
            selected_indices: 选中的样本索引
        """
        X_unlabeled = self.X[self.unlabeled_indices]
        
        # 计算Margin
        margins = self.calculate_margin(X_unlabeled)
        
        # 选择Margin最小的样本
        uncertain_idx = np.argsort(margins)[:n_samples]
        selected_indices = [self.unlabeled_indices[i] for i in uncertain_idx]
        
        return selected_indices, margins[uncertain_idx]
    
    def update(self, new_indices, new_labels):
        """更新训练集"""
        self.labeled_indices.extend(new_indices)
        self.unlabeled_indices = [
            i for i in range(len(self.X))
            if i not in self.labeled_indices
        ]
        
        # 重新训练
        X_train = self.X[self.labeled_indices]
        y_train = self.y[self.labeled_indices]
        self.model.fit(X_train, y_train)
```

**实验结果分析：**

```
第1轮主动学习：
- 选择样本：12个（Margin最小）
- Margin统计：min=0.0026, avg=0.1609, max=0.3158
- 训练集规模：48 → 60
- 准确率提升：97.92% → 99.58%

第2轮主动学习：
- 选择样本：8个
- Margin统计：min=0.0593, avg=0.1943, max=0.3242
- 训练集规模：60 → 68
- 准确率提升：99.58% → 100.00%

关键发现：
1. Margin的最小值和平均值都上升
   → 困难样本逐渐被覆盖
2. 仅用20个额外标注（42%）达到100%
   → 主动学习高效
```

**教学要点：**

1. **不确定性度量方法**
   ```python
   # 1. Margin采样（本项目使用）
   margin = top1_score - top2_score
   
   # 2. 熵采样
   entropy = -Σ p_i log(p_i)
   
   # 3. 方差采样（委员会方法）
   variance = Var(predictions_from_different_models)
   ```

2. **标注预算分配**
   ```python
   # 策略1：固定批次
   batches = [12, 8, 8, ...]
   
   # 策略2：动态调整（基于准确率提升）
   if accuracy_gain < threshold:
       batch_size = batch_size // 2
   ```

3. **停止条件**
   ```python
   # 条件1：达到目标准确率
   if accuracy >= target_accuracy:
       stop()
   
   # 条件2：Margin不再降低
   if min_margin > previous_min_margin:
       stop()
   
   # 条件3：预算用尽
   if labeled_count >= budget:
       stop()
   ```

### 2.4 课程教学设计

#### 课时1-2: 算法基础（2课时）

**理论讲解：**
1. CCA数学原理
2. 滤波器设计基础
3. 特征值分解

**实践任务：**
```python
# 任务1：实现基础CCA
def canonical_correlation_analysis(X, Y):
    """
    计算X和Y的典型相关系数
    
    要求：
    1. 手动实现（不用sklearn）
    2. 计算协方差矩阵
    3. 求解广义特征值问题
    4. 返回最大相关系数
    """
    # TODO: 实现
    pass

# 任务2：滤波器设计
def design_bandpass_filter(lowcut, highcut, fs, order=5):
    """
    设计带通滤波器并可视化频率响应
    
    要求：
    1. 使用scipy.signal.butter
    2. 绘制频率响应曲线
    3. 测试不同阶数的影响
    """
    # TODO: 实现
    pass
```

#### 课时3-4: 算法优化（2课时）

**实验对比：**
1. DirectCCA vs Filter-Bank CCA
2. 性能提升分析
3. 可视化结果

**实践任务：**
```python
# 综合实验：算法对比
def compare_algorithms(X_train, y_train, X_test, y_test):
    """
    对比三种算法性能
    
    要求：
    1. 实现DirectCCA, FilterBankCCA, TRCA
    2. 计算准确率、混淆矩阵
    3. 绘制性能对比图
    4. 分析优缺点
    
    输出：
    - 准确率表格
    - 混淆矩阵热力图
    - 每类准确率柱状图
    - 性能分析报告（500字）
    """
    # TODO: 实现
    pass
```

#### 课时5-6: 主动学习（2课时）

**项目实战：**
实现完整的主动学习流程

**评分标准：**
| 项目 | 分值 | 要求 |
|------|------|------|
| 算法实现 | 40 | 正确实现Margin采样 |
| 实验设计 | 30 | 合理的实验流程 |
| 数据分析 | 20 | 详细的结果分析 |
| 文档质量 | 10 | 清晰的实验报告 |

### 2.5 教学资源

#### 数据集

```
data/
├── D1.csv              # 训练集（48个样本）
├── D2.csv              # 测试集（48个样本）
└── README.md           # 数据说明
```

**数据格式：**
```
列1-6: 脑电通道（CP3, CPZ, CP4, PO3, POZ, PO4）
列7: taskID（任务段标识）
列8: stimID（刺激频率编号，0-7对应8-15Hz）
```

#### 评估脚本

```python
# evaluate.py
def evaluate_model(y_true, y_pred, class_names):
    """完整的评估指标"""
    from sklearn.metrics import (
        accuracy_score,
        classification_report,
        confusion_matrix
    )
    
    # 准确率
    acc = accuracy_score(y_true, y_pred)
    print(f"Overall Accuracy: {acc:.2%}")
    
    # 分类报告
    print("\nClassification Report:")
    print(classification_report(
        y_true, y_pred,
        target_names=class_names
    ))
    
    # 混淆矩阵
    cm = confusion_matrix(y_true, y_pred)
    plot_confusion_matrix(cm, class_names)
    
    # 每类准确率
    class_acc = cm.diagonal() / cm.sum(axis=1)
    plot_per_class_accuracy(class_acc, class_names)
```

### 2.6 扩展阅读

1. **经典论文**
   - Hotelling H. (1936). *Relations Between Two Sets of Variates*
   - Chen X. et al. (2017). *Filter Bank Canonical Correlation Analysis for Multimodal SSVEP-based BCIs*

2. **开源项目**
   - pyRiemann: Python Riemannian Geometry库
   - MNE-Python: 脑电信号处理

3. **在线课程**
   - Coursera: Machine Learning (Andrew Ng)
   - Fast.ai: Practical Deep Learning

---

