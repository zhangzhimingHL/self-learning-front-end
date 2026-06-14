---
name: collaboration-mode
description: "用户要求\"搓车轮\"式的协作——我搭框架，用户亲手写交互逻辑"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fb304daf-61f2-4cc9-b2e1-a2fa857cbd74
---

用户明确要求不要全权代劳，要保留手动敲写代码的能力。协作模式为：

- **我负责**：搭框架、SM-2 算法、localStorage 存储层、工具函数、疑难部分、接口说明
- **用户负责**：亲手写刷题交互功能，包括筛选栏、刷题卡片、统计看板、随机刷题模式、每日复习提醒

**Why:** 用户担心 AI 代劳太多会丧失搓车轮的能力，希望知行合一

**How to apply:** 每次新功能，我先搭好框架和接口说明，预留 TODO 让用户亲手实现交互逻辑。用户卡住时再指导/debug，而不是直接替写。
