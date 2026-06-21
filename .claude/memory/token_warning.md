---
name: token-warning
description: 当检测到token用量可能较大时，先提醒用户
metadata:
  type: feedback
---

当检测到以下场景时，先口头提醒用户"当前操作可能消耗较多 token，是否继续？"：
- 即将读取超长文件（>500行）
- 即将执行返回大量数据的搜索/查询
- 上下文对话轮次较多时，在发起大操作前提醒
- WebSearch / WebFetch 返回长内容时

**Why:** 用户发现后半段 token 消耗会飞速上涨，需要有机会在烧 token 之前决定是否继续。

**How to apply:** 在大操作之前主动口头预警，给用户选择权。
