---
name: no-skip-knowledge
description: 不能跳过知识点，对陌生概念用可交互方式（tooltip/展开）提供解析
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f10d985a-b8ef-4ed3-bc2a-93ca2392f749
---

以后设计页面/解释知识点时，**不能默认用户已经知道某个概念**。遇到可能陌生的术语，必须提供可触达的解析方式。

## 方案
使用纯 CSS 悬停 tooltip——给术语加 `.def` 类 + `data-tip="解释内容"` 属性，鼠标悬停时弹出详细解析。

```html
<span class="def" data-tip="libuv 是 Node.js 底层的异步 I/O 库，用 C 编写，负责处理文件、网络等操作">
  libuv
</span>
```

效果：字体加绿色下虚线，悬停弹出解释气泡。

## 适用范围
- 专业术语（libuv、epoll、IIFE、原型链…）
- 底层概念（执行上下文、词法环境、微任务…）
- 框架内部机制（响应式依赖收集、虚拟 DOM diff…）
- 面试回答中出现的进阶概念

## 原则
- **宁可多解释，不要跳过**。不太确定用户是否知道时，一律加 tooltip
- tooltip 内容要精炼（1-3 行），不要长篇大论
- 特别复杂的概念不适合 tooltip，改为内联展开或单独段落

**Why:** 用户反馈"你好像在默认我知道很多东西"，导致阅读时频繁卡住

**How to apply:** 新建/改版页面时扫一遍文本，所有专业术语、底层概念、框架内部机制都检查是否需要加 tooltip。与 [[content_depth_standard]] 和 [[keyword_highlight]] 配合。
