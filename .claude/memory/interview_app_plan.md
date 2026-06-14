---
name: interview-app-plan
description: 面试刷题页面规划——SM-2 间隔重复刷题系统，纯前端 localStorage 存储
metadata: 
  node_type: memory
  type: project
  originSessionId: fb304daf-61f2-4cc9-b2e1-a2fa857cbd74
---

## 目标
搭建一个面试题综合刷题页面，支持按内容/难度/熟练度刷题、随机刷题、间隔重复记忆。

## 架构
- 前端纯 Vue 3 + TypeScript，无后端
- 题目数据：静态 JS 对象（从 BlockView 和 WebWorker 页面抽离为共享数据源）
- 存储层：localStorage（记录每次复习得分和下次复习时间）
- 后期可无缝切换为后端存储（仅需替换 localStorage 为 API 调用）

## SM-2 算法（Anki/SuperMemo 核心）
每次答题后自评 0-3 分：
- 0：完全忘了
- 1：想起来了但模糊
- 2：答对了但犹豫
- 3：秒答且完全正确

根据分数计算下次复习时间（interval），答错/低分重置间隔。

## 功能列表
| 功能 | 优先级 | 负责人 |
|------|--------|--------|
| SM-2 算法 + localStorage 存储 | P0 | 我 |
| 页面框架布局 | P0 | 我 |
| 筛选栏（章节/难度） | P0 | 用户 |
| 刷题卡片（题目→答案→评分） | P0 | 用户 |
| 统计看板（掌握率/待复习数） | P1 | 用户 |
| 随机刷题模式 | P1 | 用户 |
| 每日复习提醒 | P2 | 用户 |

## 后期演进
- 换后端：只换存储层，SM-2 算法和交互逻辑不动
- 对接 vibe coding 面试项目：新增题目只需在题库数组里 push
