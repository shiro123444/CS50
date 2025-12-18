
## 📖 案例3: 智能内容生成 - NLP应用全流程

### 3.1 基于LLM的文本生成技术

**项目来源**: social-media-ai-system (HotFlow AI的内容创作模块)

#### 核心技术：Prompt Engineering

**什么是Prompt Engineering？**

Prompt Engineering（提示工程）是与大语言模型交互的艺术和科学。它通过精心设计输入提示（prompt），引导模型生成期望的输出。

**基本原则：**

```
1. 明确性（Clarity）
   ❌ "写点东西"  
   ✅ "写一篇关于AI伦理的500字文章"

2. 上下文（Context）
   ❌ "解释深度学习"
   ✅ "作为AI导论课程的讲师，用通俗语言向大一学生解释深度学习"

3. 约束性（Constraints）
   ❌ "总结这篇文章"
   ✅ "用3个要点总结这篇文章，每点不超过30字"

4. 示例（Examples）- Few-shot Learning
   提供1-3个示例，让模型理解任务模式
```

**实战案例：社交媒体文案生成**

```python
class ContentGenerator:
    """内容生成器"""
    
    def generate_xiaohongshu_post(self, topic, keywords, style="活泼"):
        """生成小红书风格文案"""
        
        prompt = f"""
你是一位专业的小红书内容创作者，擅长撰写吸引人的种草文案。

任务：为以下话题创作一篇小红书笔记

话题：{topic}
关键词：{', '.join(keywords)}
风格：{style}

要求：
1. 标题：20字以内，包含emoji，吸引眼球
2. 正文：200-300字，分3-4个段落
3. 标签：5-8个相关标签，以#开头
4. 语言：口语化，使用"姐妹们"、"真的yyds"等网络用语

格式：
标题：[emoji] [标题文字]
正文：
[第一段]
[第二段]
...
标签：#标签1 #标签2 ...

请开始创作：
"""
        
        response = self.llm.generate(prompt)
        return self._parse_response(response)
    
    def _parse_response(self, response):
        """解析LLM输出"""
        lines = response.strip().split('\n')
        
        result = {
            'title': '',
            'content': '',
            'tags': []
        }
        
        section = None
        for line in lines:
            if line.startswith('标题：'):
                result['title'] = line[3:].strip()
            elif line.startswith('正文：'):
                section = 'content'
            elif line.startswith('标签：'):
                tags = line[3:].strip().split()
                result['tags'] = tags
            elif section == 'content' and line.strip():
                result['content'] += line.strip() + '\n'
        
        return result
```

**高级技巧：Few-shot Learning**

```python
few_shot_prompt = """
我会给你几个小红书文案示例，请学习其风格并为新话题创作。

示例1：
话题：AI绘画工具
标题：🎨 Midjourney玩了一周，真的被惊艳到了！
正文：
姐妹们！最近发现了一个宝藏AI绘画工具Midjourney！
只要输入你想要的画面描述，它就能生成超美的插画✨
我用它画了我的梦中小屋，效果绝了！
重点是界面简单，新手也能快速上手～
标签：#AI绘画 #Midjourney #设计工具

示例2：
话题：Python编程
标题：💻 零基础学Python，3天入门不是梦！
正文：
作为一个纯小白，之前看到代码就头疼😵
但是跟着这个教程学，居然3天就写出了第一个程序！
教程循序渐进，每个知识点都配有小项目练习
现在已经能做简单的数据分析了，太有成就感！
标签：#Python #编程入门 #数据分析

现在，请为以下话题创作：
话题：DeepSeek大模型
关键词：AI, 大语言模型, 免费, 开源
风格：活泼、种草
"""
```

### 3.2 教学应用案例

#### 课程模块：自然语言处理基础

**教学目标：**
1. 理解Prompt Engineering原理
2. 掌握Few-shot Learning技巧
3. 学会评估文本生成质量

**实践任务：**

**任务1：Prompt优化挑战**

给定基础prompt，通过优化提升输出质量：

```python
# 初始版本（效果差）
prompt_v1 = "写一篇介绍机器学习的文章"

# 优化版本1（添加约束）
prompt_v2 = """
写一篇800字的文章，介绍机器学习的基本概念。
要求：
1. 面向零基础读者
2. 包含3个实际应用案例
3. 避免使用专业术语
"""

# 优化版本2（添加结构）
prompt_v3 = """
写一篇800字的文章，介绍机器学习。

结构：
1. 开头（100字）：什么是机器学习？
2. 核心原理（300字）：机器学习如何工作？
3. 应用案例（300字）：生活中的机器学习
4. 总结（100字）：机器学习的未来

要求：
- 面向零基础读者
- 语言通俗易懂
- 每个案例不超过100字
"""

# 优化版本3（添加角色和示例）
prompt_v4 = """
你是一位资深的AI科普作者，擅长用生动的比喻解释复杂概念。

任务：写一篇800字的文章，向高中生介绍机器学习。

示例开头：
"想象一下，你在教一个小孩子识别猫和狗的图片。一开始，你会给他看很多猫和狗的照片，告诉他哪些是猫，哪些是狗。渐渐地，他就能自己分辨了。这，就是机器学习的基本原理！"

请按照以下结构展开...
[结构同v3]
"""

# 学生任务：
# 1. 测试四个版本的prompt
# 2. 对比输出质量
# 3. 总结优化技巧
# 4. 提出自己的优化版本
```

**任务2：文本质量评估**

实现自动化评估系统：

```python
class TextQualityEvaluator:
    """文本质量评估器"""
    
    def evaluate(self, generated_text, criteria):
        """
        评估生成文本质量
        
        参数:
            generated_text: 生成的文本
            criteria: 评估标准字典
        
        返回:
            scores: 各项得分
        """
        scores = {}
        
        # 1. 长度检查
        if 'length' in criteria:
            target_min, target_max = criteria['length']
            actual_length = len(generated_text)
            if target_min <= actual_length <= target_max:
                scores['length'] = 1.0
            else:
                deviation = min(
                    abs(actual_length - target_min),
                    abs(actual_length - target_max)
                )
                scores['length'] = max(0, 1 - deviation / target_max)
        
        # 2. 关键词覆盖
        if 'keywords' in criteria:
            keywords = criteria['keywords']
            covered = sum(1 for kw in keywords if kw in generated_text)
            scores['keyword_coverage'] = covered / len(keywords)
        
        # 3. 可读性（Flesch Reading Ease）
        scores['readability'] = self._calculate_readability(generated_text)
        
        # 4. 连贯性（使用LLM评估）
        scores['coherence'] = self._evaluate_coherence(generated_text)
        
        # 5. 创意性（与训练集的差异度）
        scores['creativity'] = self._evaluate_creativity(generated_text)
        
        return scores
    
    def _calculate_readability(self, text):
        """计算可读性得分"""
        # Flesch Reading Ease公式（中文简化版）
        avg_sentence_length = self._avg_sentence_length(text)
        avg_word_length = self._avg_word_length(text)
        
        # 得分范围：0-100，越高越易读
        score = 206.835 - 1.015 * avg_sentence_length - 84.6 * avg_word_length
        return max(0, min(100, score)) / 100
```

---

## 📖 案例4: Thinking Quantum - 知识图谱问答系统

### 4.1 案例概述

**项目名称**: Thinking Quantum - 知识图谱增强的AI问答系统  
**仓库**: kg  
**技术级别**: 中高级AI应用  
**课程适用**: 知识表示与推理、图数据库、RAG技术  

### 4.2 核心技术：知识图谱 + GraphRAG

#### 4.2.1 知识图谱基础

**什么是知识图谱？**

知识图谱是一种语义网络，用节点表示实体，用边表示实体间的关系。

```
示例：AI领域知识图谱

[机器学习] --包含--> [深度学习]
     |
     |--应用于--> [图像识别]
     |
     |--需要--> [训练数据]
     
[深度学习] --基于--> [神经网络]
     |
     |--包含--> [CNN]
     |--包含--> [RNN]
     |--包含--> [Transformer]
```

**Neo4j图数据库**

```cypher
-- 创建节点
CREATE (ml:Concept {name: '机器学习', type: 'AI技术'})
CREATE (dl:Concept {name: '深度学习', type: 'AI技术'})
CREATE (nn:Concept {name: '神经网络', type: '算法'})

-- 创建关系
CREATE (ml)-[:包含]->(dl)
CREATE (dl)-[:基于]->(nn)

-- 查询
MATCH (start:Concept {name: '机器学习'})
      -[r:包含*1..3]->(end:Concept)
RETURN start.name, type(r), end.name
```

#### 4.2.2 GraphRAG技术

**什么是GraphRAG？**

GraphRAG = 图检索增强生成（Graph-enhanced Retrieval-Augmented Generation）

传统RAG的局限：
- 只能检索文本片段
- 缺乏结构化知识
- 难以推理多跳关系

GraphRAG的优势：
- 利用图结构进行推理
- 多跳查询获取相关上下文
- 结合拓扑信息提升准确性

**实现流程：**

```
用户问题
   ↓
1. 实体识别（NER）
   "什么是深度学习？" → 提取["深度学习"]
   ↓
2. 图谱检索（Cypher查询）
   MATCH (dl:Concept {name: '深度学习'})
         -[r*1..2]-(related:Concept)
   RETURN dl, r, related
   ↓
3. 子图提取
   获取深度学习的2跳邻域
   ↓
4. 上下文构建
   将子图信息转换为文本
   ↓
5. LLM生成
   结合上下文生成答案
```

**Python实现：**

```python
from neo4j import GraphDatabase

class GraphRAGEngine:
    """图增强检索生成引擎"""
    
    def __init__(self, neo4j_uri, neo4j_user, neo4j_password, llm):
        self.driver = GraphDatabase.driver(
            neo4j_uri,
            auth=(neo4j_user, neo4j_password)
        )
        self.llm = llm
    
    def answer_question(self, question):
        """回答问题"""
        
        # 1. 实体识别
        entities = self._extract_entities(question)
        
        # 2. 图谱检索
        subgraph = self._retrieve_subgraph(entities, hops=2)
        
        # 3. 构建上下文
        context = self._build_context(subgraph)
        
        # 4. 生成答案
        answer = self._generate_answer(question, context)
        
        return answer, subgraph
    
    def _extract_entities(self, question):
        """提取问题中的实体"""
        # 方法1：基于规则的匹配
        # 方法2：使用NER模型
        # 方法3：LLM提取
        
        prompt = f"""
        从以下问题中提取关键实体（概念名称）：
        问题：{question}
        
        只返回实体列表，JSON格式：
        ["实体1", "实体2", ...]
        """
        
        response = self.llm.generate(prompt)
        entities = json.loads(response)
        return entities
    
    def _retrieve_subgraph(self, entities, hops=2):
        """从图谱检索相关子图"""
        with self.driver.session() as session:
            query = """
            MATCH path = (start:Concept)
                         -[r*1..{hops}]-(end:Concept)
            WHERE start.name IN $entities
            RETURN path
            LIMIT 100
            """.format(hops=hops)
            
            result = session.run(query, entities=entities)
            
            # 构建子图
            subgraph = {
                'nodes': set(),
                'edges': []
            }
            
            for record in result:
                path = record['path']
                for node in path.nodes:
                    subgraph['nodes'].add((
                        node['name'],
                        node.get('description', '')
                    ))
                for rel in path.relationships:
                    subgraph['edges'].append((
                        rel.start_node['name'],
                        rel.type,
                        rel.end_node['name']
                    ))
            
            return subgraph
    
    def _build_context(self, subgraph):
        """将子图转换为文本上下文"""
        context_parts = []
        
        # 节点描述
        context_parts.append("相关概念：")
        for name, desc in subgraph['nodes']:
            context_parts.append(f"- {name}: {desc}")
        
        # 关系描述
        context_parts.append("\n概念关系：")
        for start, rel, end in subgraph['edges']:
            context_parts.append(f"- {start} {rel} {end}")
        
        return "\n".join(context_parts)
    
    def _generate_answer(self, question, context):
        """基于上下文生成答案"""
        prompt = f"""
        基于以下知识图谱信息，回答用户问题。
        
        知识：
        {context}
        
        问题：{question}
        
        要求：
        1. 答案要准确，基于提供的知识
        2. 如果知识不足，明确说明
        3. 引用具体的概念和关系
        4. 语言通俗易懂
        
        请回答：
        """
        
        answer = self.llm.generate(prompt)
        return answer
```

### 4.3 教学应用案例

#### 课程实践：构建AI概念知识图谱

**阶段1：数据准备（1课时）**

```python
# 任务：设计AI领域知识图谱schema

ai_kg_schema = {
    "节点类型": [
        {
            "名称": "Concept",
            "属性": ["name", "type", "description", "difficulty_level"],
            "示例": {
                "name": "机器学习",
                "type": "AI技术",
                "description": "通过数据和经验自动改进的算法",
                "difficulty_level": "中级"
            }
        },
        {
            "名称": "Application",
            "属性": ["name", "domain", "maturity"],
            "示例": {
                "name": "图像识别",
                "domain": "计算机视觉",
                "maturity": "成熟"
            }
        }
    ],
    "关系类型": [
        {"名称": "包含", "方向": "有向", "语义": "A包含B作为子概念"},
        {"名称": "基于", "方向": "有向", "语义": "A基于B构建"},
        {"名称": "应用于", "方向": "有向", "语义": "A应用于B领域"},
        {"名称": "需要", "方向": "有向", "语义": "A需要B作为前置知识"}
    ]
}

# 学生任务：
# 1. 扩充schema，添加更多节点和关系类型
# 2. 设计合理的属性
# 3. 绘制ER图
```

**阶段2：图谱构建（2课时）**

```python
# 任务：导入AI知识到Neo4j

import json
from neo4j import GraphDatabase

def import_knowledge_graph(driver, data_file):
    """导入知识图谱"""
    
    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    with driver.session() as session:
        # 创建节点
        for entity in data['entities']:
            session.run(
                """
                MERGE (c:Concept {name: $name})
                SET c.type = $type,
                    c.description = $description
                """,
                name=entity['name'],
                type=entity['type'],
                description=entity['description']
            )
        
        # 创建关系
        for rel in data['relationships']:
            session.run(
                """
                MATCH (a:Concept {name: $from})
                MATCH (b:Concept {name: $to})
                MERGE (a)-[r:`{rel_type}`]->(b)
                """.format(rel_type=rel['type']),
                from=rel['from'],
                to=rel['to']
            )

# 学生任务：
# 1. 创建包含至少50个概念的知识图谱
# 2. 确保关系准确且有意义
# 3. 导入到Neo4j数据库
# 4. 使用Neo4j Browser可视化
```

**阶段3：GraphRAG实现（2课时）**

```python
# 综合项目：实现AI问答系统

class AITutorBot:
    """AI导师问答机器人"""
    
    def __init__(self, graph_db, llm):
        self.graph = graph_db
        self.llm = llm
        self.conversation_history = []
    
    def chat(self, user_input):
        """
        对话接口
        
        要求：
        1. 从知识图谱检索相关信息
        2. 结合对话历史生成回复
        3. 如果知识不足，诚实说明
        4. 提供进一步学习建议
        """
        # TODO: 实现
        pass
    
    def recommend_learning_path(self, target_concept):
        """
        生成学习路径
        
        示例：
        用户想学习"Transformer"
        系统应该：
        1. 在图谱中查找前置概念
        2. 构建学习依赖图
        3. 生成推荐学习顺序
        
        返回：
        [
            "神经网络基础",
            "注意力机制",
            "Seq2Seq模型",
            "Transformer"
        ]
        """
        # TODO: 实现
        pass

# 评分标准：
# - 知识图谱质量（30分）
# - GraphRAG实现（40分）
# - 问答准确性（20分）
# - 代码质量（10分）
```

---

## 📖 案例5: 心理咨询助手 - 多模态AI系统

### 5.1 案例概述

**项目名称**: 基于模拟感官的心理咨询智能助手  
**仓库**: -- (实时感官)  
**技术级别**: 高级多模态AI应用  
**课程适用**: 多模态学习、计算机视觉、语音处理  

### 5.2 核心技术：多模态融合

#### 5.2.1 视觉：情绪识别

**Face++ API集成**

```python
import aiohttp
import base64

class EmotionRecognizer:
    """情绪识别器"""
    
    API_DETECT = "https://api-cn.faceplusplus.com/facepp/v3/detect"
    API_ANALYZE = "https://api-cn.faceplusplus.com/facepp/v3/face/analyze"
    
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
    
    async def analyze_emotion(self, image_data):
        """
        分析图片中的情绪
        
        返回：
        {
            'happiness': 0.85,    # 开心：85%
            'sadness': 0.05,      # 悲伤：5%
            'anger': 0.02,        # 愤怒：2%
            'fear': 0.01,         # 恐惧：1%
            'surprise': 0.04,     # 惊讶：4%
            'disgust': 0.01,      # 厌恶：1%
            'neutral': 0.02       # 平静：2%
        }
        """
        # 1. 检测人脸，获取face_token
        face_token = await self._detect_face(image_data)
        
        # 2. 分析情绪
        emotions = await self._analyze_face(face_token)
        
        return emotions
    
    async def _detect_face(self, image_data):
        """人脸检测"""
        async with aiohttp.ClientSession() as session:
            data = aiohttp.FormData()
            data.add_field('api_key', self.api_key)
            data.add_field('api_secret', self.api_secret)
            data.add_field('image_base64', base64.b64encode(image_data))
            
            async with session.post(self.API_DETECT, data=data) as resp:
                result = await resp.json()
                
                if 'faces' in result and len(result['faces']) > 0:
                    return result['faces'][0]['face_token']
                else:
                    raise ValueError("No face detected")
    
    async def _analyze_face(self, face_token):
        """情绪分析"""
        async with aiohttp.ClientSession() as session:
            data = {
                'api_key': self.api_key,
                'api_secret': self.api_secret,
                'face_tokens': face_token,
                'return_attributes': 'emotion'
            }
            
            async with session.post(self.API_ANALYZE, data=data) as resp:
                result = await resp.json()
                
                # 提取情绪数据
                face_data = result['faces'][0]
                emotions = face_data['attributes']['emotion']
                
                # 归一化到0-1
                return {k: v / 100.0 for k, v in emotions.items()}
```

**情绪趋势分析**

```python
class EmotionTrendAnalyzer:
    """情绪趋势分析器"""
    
    def __init__(self, window_size=5):
        self.window_size = window_size
        self.history = []
    
    def add_emotion(self, emotion_state):
        """添加情绪记录"""
        self.history.append(emotion_state)
        
        # 保持窗口大小
        if len(self.history) > self.window_size * 2:
            self.history = self.history[-self.window_size * 2:]
    
    def analyze_trend(self):
        """
        分析情绪趋势
        
        返回：'improving' | 'stable' | 'declining'
        """
        if len(self.history) < self.window_size:
            return 'stable'  # 数据不足
        
        # 分为前后两半
        mid = len(self.history) // 2
        first_half = self.history[:mid]
        second_half = self.history[mid:]
        
        # 积极情绪
        positive_emotions = {'happiness', 'surprise'}
        
        # 计算积极情绪占比
        first_positive = sum(
            1 for s in first_half
            if s.dominant_emotion in positive_emotions
        ) / len(first_half)
        
        second_positive = sum(
            1 for s in second_half
            if s.dominant_emotion in positive_emotions
        ) / len(second_half)
        
        # 判断趋势
        if second_positive > first_positive + 0.1:
            return 'improving'
        elif second_positive < first_positive - 0.1:
            return 'declining'
        else:
            return 'stable'
    
    def get_emotion_summary(self):
        """生成情绪摘要（用于AI提示词）"""
        if not self.history:
            return "暂无情绪数据"
        
        recent = self.history[-3:]  # 最近3次
        
        # 统计主导情绪
        emotion_counts = {}
        for state in recent:
            emotion = state.dominant_emotion
            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
        
        # 生成描述
        dominant = max(emotion_counts, key=emotion_counts.get)
        trend = self.analyze_trend()
        
        emotion_names = {
            'happiness': '开心',
            'sadness': '悲伤',
            'anger': '愤怒',
            'fear': '恐惧',
            'surprise': '惊讶',
            'disgust': '厌恶',
            'neutral': '平静'
        }
        
        trend_names = {
            'improving': '改善中',
            'stable': '稳定',
            'declining': '下降中'
        }
        
        return f"用户当前主要情绪为{emotion_names[dominant]}，趋势{trend_names[trend]}"
```

#### 5.2.2 听觉：语音识别与合成

**Web Speech API（语音识别）**

```typescript
class VoiceRecognizer {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  
  constructor(
    private onResult: (text: string, isFinal: boolean) => void,
    private onError: (error: string) => void
  ) {
    this.initRecognition();
  }
  
  private initRecognition() {
    const SpeechRecognition = 
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      throw new Error('浏览器不支持语音识别');
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'zh-CN';
    this.recognition.continuous = false;  // 单次识别
    this.recognition.interimResults = true;  // 返回中间结果
    
    // 识别结果
    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = result.isFinal;
      
      this.onResult(transcript, isFinal);
    };
    
    // 错误处理
    this.recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // 未检测到语音，自动重启
        setTimeout(() => this.start(), 100);
      } else if (event.error === 'network') {
        this.onError('网络错误，请检查连接');
      } else {
        this.onError(`识别错误: ${event.error}`);
      }
    };
    
    // 识别结束
    this.recognition.onend = () => {
      if (this.isListening) {
        // 自动重启，实现连续监听
        this.recognition?.start();
      }
    };
  }
  
  start() {
    if (!this.isListening) {
      this.isListening = true;
      this.recognition?.start();
    }
  }
  
  stop() {
    this.isListening = false;
    this.recognition?.stop();
  }
}

// 使用示例
const recognizer = new VoiceRecognizer(
  (text, isFinal) => {
    if (isFinal) {
      console.log('最终结果:', text);
      sendToAI(text);  // 发送给AI处理
    } else {
      console.log('中间结果:', text);
      updateUI(text);  // 实时显示
    }
  },
  (error) => {
    console.error('识别错误:', error);
  }
);

recognizer.start();
```

**千问TTS（流式语音合成）**

```typescript
class QwenTTSClient {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext;
  private scheduledTime = 0;
  
  constructor(private apiKey: string) {
    this.audioContext = new AudioContext({ sampleRate: 24000 });
  }
  
  async speak(text: string, voice = 'Cherry') {
    """
    流式语音合成
    
    工作流程：
    1. 建立WebSocket连接
    2. 发送文本和语音参数
    3. 接收PCM音频流
    4. 实时播放
    """
    
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket('ws://localhost:3003/tts');
      
      const pcmBuffer: Int16Array[] = [];
      let isFirstBuffer = true;
      
      this.ws.onopen = () => {
        // 发送请求
        this.ws!.send(JSON.stringify({
          text,
          voice,
          model: 'cosyvoice-v1',
          format: 'pcm'
        }));
      };
      
      this.ws.onmessage = (event) => {
        if (typeof event.data === 'string') {
          const msg = JSON.parse(event.data);
          
          if (msg.type === 'audio') {
            // 接收PCM数据
            const pcmData = new Int16Array(
              Uint8Array.from(atob(msg.data), c => c.charCodeAt(0)).buffer
            );
            
            pcmBuffer.push(pcmData);
            
            // 缓冲策略
            const bufferThreshold = isFirstBuffer ? 4800 : 2400;
            // 首次200ms，后续100ms
            
            if (pcmBuffer.length >= bufferThreshold / 1000) {
              this.playBuffer(pcmBuffer);
              pcmBuffer.length = 0;
              isFirstBuffer = false;
            }
          } else if (msg.type === 'end') {
            // 播放剩余数据
            if (pcmBuffer.length > 0) {
              this.playBuffer(pcmBuffer);
            }
            resolve();
          }
        }
      };
      
      this.ws.onerror = reject;
    });
  }
  
  private playBuffer(pcmBuffer: Int16Array[]) {
    const combined = this.combinePCM(pcmBuffer);
    const float32 = this.int16ToFloat32(combined);
    
    // 创建音频缓冲区
    const audioBuffer = this.audioContext.createBuffer(
      1,  // 单声道
      float32.length,
      24000  // 采样率
    );
    audioBuffer.getChannelData(0).set(float32);
    
    // 创建音频源
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    
    // 精确调度
    const startTime = Math.max(
      this.scheduledTime,
      this.audioContext.currentTime
    );
    source.start(startTime);
    
    // 更新调度时间
    this.scheduledTime = startTime + (float32.length / 24000);
  }
  
  private int16ToFloat32(int16Array: Int16Array): Float32Array {
    const float32 = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32[i] = int16Array[i] / 32768.0;
    }
    return float32;
  }
  
  private combinePCM(buffers: Int16Array[]): Int16Array {
    const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0);
    const combined = new Int16Array(totalLength);
    
    let offset = 0;
    for (const buf of buffers) {
      combined.set(buf, offset);
      offset += buf.length;
    }
    
    return combined;
  }
}
```

#### 5.2.3 多模态融合策略

**上下文整合**

```python
class MultimodalContextBuilder:
    """多模态上下文构建器"""
    
    def __init__(self):
        self.emotion_analyzer = EmotionTrendAnalyzer()
        self.conversation_history = []
    
    def build_context(
        self,
        user_input: str,
        current_emotion: dict,
        voice_transcript: str = None
    ) -> str:
        """
        构建多模态上下文
        
        整合：
        1. 文本输入
        2. 情绪状态
        3. 情绪趋势
        4. 对话历史
        """
        
        # 更新情绪历史
        self.emotion_analyzer.add_emotion(current_emotion)
        
        # 构建上下文
        context_parts = []
        
        # 1. 情绪信息
        emotion_summary = self.emotion_analyzer.get_emotion_summary()
        context_parts.append(f"[情绪状态] {emotion_summary}")
        
        # 2. 对话历史
        if self.conversation_history:
            recent = self.conversation_history[-3:]
            history_text = "\n".join([
                f"{msg['role']}: {msg['content']}"
                for msg in recent
            ])
            context_parts.append(f"[对话历史]\n{history_text}")
        
        # 3. 当前输入
        if voice_transcript:
            context_parts.append(f"[语音输入] {voice_transcript}")
        
        context_parts.append(f"[文本输入] {user_input}")
        
        return "\n\n".join(context_parts)
    
    def generate_response(self, context: str) -> str:
        """生成响应"""
        
        prompt = f"""
你是一位专业的心理咨询师，具有同理心和专业知识。

当前情境：
{context}

请根据用户的情绪状态和输入，给出恰当的回应。

要求：
1. 如果用户情绪消极，先表达理解和支持
2. 提供具体的建议或应对策略
3. 语气温和、鼓励
4. 回复控制在100字以内

请回复：
"""
        
        return self.llm.generate(prompt)
```

### 5.3 教学应用案例

#### 课程实践：构建情绪感知对话系统

**阶段1：单模态实现（2课时）**

```python
# 任务1：实现情绪识别
class BasicEmotionRecognizer:
    """
    使用Face++ API实现情绪识别
    
    要求：
    1. 捕获摄像头画面
    2. 每3秒分析一次
    3. 显示情绪柱状图
    4. 保存情绪历史
    """
    pass

# 任务2：实现语音识别
class BasicVoiceRecognizer:
    """
    使用Web Speech API实现语音识别
    
    要求：
    1. 实时显示识别结果
    2. 区分中间结果和最终结果
    3. 错误处理和自动恢复
    """
    pass
```

**阶段2：多模态融合（2课时）**

```python
# 综合项目：情绪感知聊天机器人

class EmotionAwareChatbot:
    """
    情绪感知聊天机器人
    
    功能：
    1. 实时监测用户情绪
    2. 语音/文字输入
    3. 根据情绪调整回复风格
    4. 语音播报回复
    
    评分标准：
    - 情绪识别准确性（20分）
    - 多模态整合（30分）
    - 回复质量（30分）
    - 用户体验（20分）
    """
    
    def __init__(self):
        self.emotion_recognizer = EmotionRecognizer()
        self.voice_recognizer = VoiceRecognizer()
        self.tts_client = QwenTTSClient()
        self.context_builder = MultimodalContextBuilder()
    
    async def run(self):
        """主循环"""
        # TODO: 实现完整交互流程
        pass
```

---

## 📖 案例6-9：其他项目应用案例

### 案例6: CS50学习平台 - 教育AI应用

**核心技术：自动化知识管理**

**应用场景：**
- VitePress静态站点生成
- GitHub Actions自动部署
- Giscus社区互动

**课程价值：**
展示如何将传统学习笔记转化为现代化在线平台

---

### 案例7: 学生管理系统 - 数据库应用

**核心技术：PyQt5 + QML + SQLite**

**应用场景：**
- 桌面应用开发
- 数据库设计
- MVC架构实践

**课程价值：**
完整的软件工程实践案例

---

### 案例8: 医疗问答系统 - 垂直领域AI

**核心技术：领域知识库 + 问答系统**

**应用场景：**
- 专业领域AI应用
- 知识库构建
- 安全性考量

**课程价值：**
展示AI在专业领域的应用方法

---

### 案例9: 个人知识库 - Obsidian应用

**核心技术：知识管理工具**

**应用场景：**
- 个人知识管理
- Markdown文档
- 跨平台同步

**课程价值：**
培养知识管理和文档化能力

---

# 总结

本案例集涵盖了从基础到高级的完整AI技术栈，包括：

**核心技术：**
- 智能体系统
- 机器学习算法
- 自然语言处理
- 知识图谱
- 多模态学习

**工程实践：**
- 系统架构设计
- API集成
- 数据库应用
- 前端开发

**教学价值：**
每个案例都包含完整的教学设计、代码示例和评估标准，可直接用于AI导论课程的实践教学。

---

**文档版本**: v2.0  
**最后更新**: 2025年12月18日  
**适用课程**: 人工智能导论  
**推荐学时**: 24-32课时  
