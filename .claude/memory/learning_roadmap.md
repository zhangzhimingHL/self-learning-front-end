---
name: learning-roadmap
description: 目标 15k+ offer 的前端学习路线图，包含知识点页面规划和动手环节设计
metadata:
  type: project
  originSessionId: current
---

# 前端学习路线图（目标 15k+）

## 学习原则

- **一讲一练**：每个知识点页面配一个交互式 Demo，亲手修改/运行来加深理解
- **滚动复习**：利用刷题页面 SM-2 算法定期回顾已学知识
- **由浅入深**：先从面试最常考的核心开始，逐步扩展

## 路线总览

```
阶段一：JavaScript 核心（权重 40%）
├─ 01 闭包与作用域
├─ 02 this 指向与 call/apply/bind
├─ 03 原型与原型链
├─ 04 Promise 与异步编程
├─ 05 事件循环 Event Loop
├─ 06 防抖与节流
├─ 07 深拷贝与浅拷贝
├─ 08 数组/对象高阶方法

阶段二：CSS 进阶（权重 20%）
├─ 09 Flexbox 弹性布局
├─ 10 CSS Grid 网格布局
├─ 11 CSS 定位与层叠上下文
├─ 12 CSS 动画与过渡
├─ 13 响应式与移动端适配

阶段三：Vue 3 深入（权重 25%）
├─ 14 Composition API 核心
├─ 15 响应式原理（ref/reactive）
├─ 16 组件通信方式大全
├─ 17 自定义指令与插件
├─ 18 Vue Router 深入
├─ 19 Pinia 状态管理

阶段四：浏览器与网络（权重 15%）
├─ 20 HTTP 缓存策略
├─ 21 CORS 跨域
├─ 22 浏览器存储（Cookie/Storage/IndexedDB）
├─ 23 安全（XSS/CSRF）
├─ 24 性能优化（加载/渲染/指标）

阶段五：补充加分
├─ 25 工程化（Vite/Webpack）
├─ 26 算法入门
├─ 27 TypeScript 进阶
```

## 动手环节设计

每个知识点都对应一个可交互的 Demo 页面：

| 知识点 | 动手环节 | 学习方式 |
|--------|----------|----------|
| 闭包 | 计数器/私有变量/循环陷阱 | 在 Demo 区写代码看输出 |
| this | 模拟实现 call/apply/bind | 写 polyfill，逐行 debug |
| 原型 | 手写 new / instanceof | 实现继承，验证原型链 |
| Promise | 手写 Promise / Promise.all | 从零实现，理解微任务 |
| 事件循环 | 可视化执行顺序 | 点按钮预测输出，验证 |
| 防抖节流 | 搜索框/滚动监听对比 | 调参数看实时效果 |
| 深拷贝 | 递归实现 / 循环引用处理 | 手写 deepClone |
| Flex/Grid | 可视化布局编辑器 | 拖拽调整参数看实时变化 |
| Vue 响应式 | 手写简易 reactive | 从 defineProperty 到 Proxy |

## 页面路由规划

```
/javascript-core     → JS 核心知识 + 面试问答
/css-advanced        → CSS 进阶知识 + 面试问答
/vue-deep            → Vue 3深入 + 面试问答
/browser-network     → 浏览器/网络 + 面试问答
```

每个页面沿用现有 BlockView.vue 的风格：Hero + TOC + 知识点章节 + 交互 Demo + 代码示例 + 面试问答。
