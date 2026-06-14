<template>
  <div class="placeholder">
    <div class="placeholder-card">
      <span class="placeholder-icon">📚</span>
      <h1>{{ title }}</h1>
      <p class="placeholder-desc">{{ description }}</p>
      <div class="placeholder-status">
        <span class="status-badge">内容整理中</span>
      </div>
      <p class="placeholder-hint">知识点 + 交互式 Demo + 面试高频问答，后续补充</p>
      <router-link to="/" class="back-link">← 返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageMap: Record<string, { title: string; description: string }> = {
  'javascript-prototype': {
    title: '原型与原型链',
    description: '原型链查找机制、继承的多种方式、class 语法糖、instanceof 原理、原型链污染',
  },
  'javascript-event-loop': {
    title: 'Event Loop 事件循环',
    description: '宏任务与微任务、浏览器事件循环、Node.js 事件循环、requestAnimationFrame、典型面试输出题',
  },
  'javascript-promise': {
    title: 'Promise 与异步',
    description: 'Promise A+ 规范、链式调用、错误处理、async/await 语法糖、手写 Promise.all/race/any',
  },
  'vue-reactivity': {
    title: 'Vue 3 响应式原理',
    description: 'Proxy vs Object.defineProperty、依赖收集与触发、ref/reactive/computed 实现、effect 系统',
  },
  'vue-vdom': {
    title: '虚拟 DOM 与 diff',
    description: '虚拟 DOM 结构、patch 流程、双端 diff 算法、静态标记与 Block Tree、patchFlags',
  },
  'vue-component-patterns': {
    title: '组件设计模式',
    description: 'props/emit/v-model、插槽作用域、provide/inject、组合式函数（Composables）、高阶组件',
  },
  'vue-pinia': {
    title: 'Pinia 状态管理',
    description: 'Pinia vs Vuex、store 定义模式、Action/Promise、插件系统、SSR 兼容、源码简析',
  },
  'browser-rendering': {
    title: '浏览器渲染机制',
    description: '关键渲染路径、回流与重绘、合成层与硬件加速、渲染阻塞优化、LCP/FCP 优化',
  },
  'browser-performance': {
    title: '前端性能优化',
    description: '性能度量指标、资源加载优化、代码分割与懒加载、缓存策略、性能监控与告警',
  },
  'browser-security': {
    title: '前端安全与跨域',
    description: 'XSS/CSRF/点击劫持、CORS 跨域方案、OAuth/JWT 认证、Content Security Policy、同源策略',
  },
  'browser-http-cache': {
    title: 'HTTP 缓存策略',
    description: '强缓存与协商缓存、Cache-Control/ETag/Last-Modified、Service Worker 缓存、缓存更新策略',
  },
  'engineering-build-tools': {
    title: '构建工具原理',
    description: 'Vite vs Webpack 对比、模块打包原理、HMR 热更新、Tree Shaking、代码分割、Rollup/ESBuild',
  },
  'engineering-ci-cd': {
    title: 'CI/CD 与自动化',
    description: 'GitHub Actions/GitLab CI、自动化测试集成、构建与部署流水线、Docker 容器化部署',
  },
  'engineering-code-quality': {
    title: '代码质量与规范',
    description: 'ESLint/Prettier 配置、Git Hooks 与 lint-staged、Code Review 流程、Monorepo 管理',
  },
  'extra-nodejs': {
    title: 'Node.js 服务端',
    description: 'Express/Koa 框架、RESTful API 设计、中间件模式、数据库操作、JWT 鉴权、日志与错误处理',
  },
  'extra-typescript': {
    title: 'TypeScript 深度',
    description: '泛型进阶、工具类型、条件类型、映射类型、infer 推断、类型体操实战、声明文件编写',
  },
  'extra-algorithms': {
    title: '数据结构与算法',
    description: '常见数据结构（栈/队列/树/图）、排序与搜索、动态规划、面试高频手撕题、时空复杂度分析',
  },
  'extra-design-patterns': {
    title: '设计模式',
    description: '单例/观察者/发布订阅/工厂/策略/代理模式、在前端框架中的应用、与 SOLID 原则',
  },
  'extra-devops': {
    title: 'Docker 与 DevOps',
    description: 'Docker 基础与 Dockerfile、docker-compose 编排、Nginx 反向代理、Linux 基础命令、部署方案',
  },
}

const title = computed(() => pageMap[route.name as string]?.title || '未知页面')
const description = computed(() => pageMap[route.name as string]?.description || '内容规划中')
</script>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
.placeholder-card {
  text-align: center;
  max-width: 480px;
  padding: 3rem 2rem;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}
.placeholder-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}
.placeholder-card h1 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 0.8rem;
}
.placeholder-desc {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.placeholder-status {
  margin-bottom: 1rem;
}
.status-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #f39c1222;
  color: #f39c12;
  font-weight: 600;
}
.placeholder-hint {
  font-size: 0.82rem;
  color: var(--color-text);
  opacity: 0.4;
  margin-bottom: 1.5rem;
}
.back-link {
  display: inline-block;
  font-size: 0.9rem;
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
</style>
