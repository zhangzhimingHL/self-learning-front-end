<template>
  <div class="home">
    <header class="hero">
      <h1>前端复习路线</h1>
      <p class="subtitle">4 年经验 · 一二线面试准备 · 体系化查漏补缺</p>
      <div class="hero-stats">
        <span class="stat">
          <strong>{{ doneCount }}</strong> 已完成
        </span>
        <span class="stat-divider">·</span>
        <span class="stat">
          <strong>{{ totalCount }}</strong> 总模块
        </span>
        <span class="stat-divider">·</span>
        <span class="stat">
          <strong>{{ Math.round(doneCount / totalCount * 100) }}%</strong> 进度
        </span>
      </div>
      <div class="hero-bar">
        <div class="hero-bar-fill" :style="{ width: (doneCount / totalCount * 100) + '%' }"></div>
      </div>
    </header>

    <section v-for="group in groups" :key="group.title" class="roadmap-group">
      <div class="group-header">
        <h2 class="group-title">{{ group.icon }} {{ group.title }}</h2>
        <span class="group-progress">{{ groupDone(group) }}/{{ group.items.length }}</span>
      </div>
      <div class="cards">
        <div
          v-for="item in group.items"
          :key="item.path"
          class="card"
          :class="{
            'card-done': completed.has(item.path),
            'card-placeholder': !completed.has(item.path)
          }"
        >
          <router-link :to="item.path" class="card-body">
            <div class="card-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </router-link>
          <button
            class="card-toggle"
            :class="{ 'toggle-done': completed.has(item.path) }"
            @click="toggleDone(item.path)"
            :title="completed.has(item.path) ? '标记为未完成' : '标记为已完成'"
          >
            {{ completed.has(item.path) ? '✓ 已完成' : '○ 待学习' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

interface RoadmapItem {
  icon: string
  title: string
  desc: string
  path: string
}

interface RoadmapGroup {
  icon: string
  title: string
  items: RoadmapItem[]
}

// ─── 完成状态（localStorage 持久化） ───
const STORAGE_KEY = 'learning-completed'
function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set<string>(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set<string>()
  }
}
function saveCompleted(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

const completed = reactive(loadCompleted())

function toggleDone(path: string) {
  if (completed.has(path)) {
    completed.delete(path)
  } else {
    completed.add(path)
  }
  saveCompleted(completed)
}

const groups: RoadmapGroup[] = [
  {
    icon: '🟨',
    title: 'JS 基础',
    items: [
      { icon: '🟨', title: '作用域与闭包', desc: '作用域链、变量提升、闭包原理、执行上下文', path: '/javascript-core' },
      { icon: '🎯', title: 'this 指向规则', desc: '四种绑定规则、优先级、箭头函数、手写 call/apply/bind', path: '/javascript-this' },
      { icon: '⛓️', title: '原型与继承', desc: '原型链、继承方式、class 语法、instanceof 原理', path: '/javascript-prototype' },
      { icon: '🔄', title: 'Event Loop', desc: '宏任务/微任务、浏览器与 Node 事件循环、输出题', path: '/javascript-event-loop' },
      { icon: '🤝', title: 'Promise 与异步', desc: 'Promise A+、async/await、手写 Promise.all/race', path: '/javascript-promise' },
      { icon: '📋', title: '深拷贝', desc: '浅深对比、JSON 局限、手写递归深拷贝、循环引用 WeakMap', path: '/javascript-deep-clone' },
      { icon: '🔄', title: '类型转换', desc: '显式/隐式转换、== vs ===、ToPrimitive、经典面试题', path: '/javascript-type-coercion' },
      { icon: '✍️', title: '手写题合集', desc: 'EventEmitter、并发调度器、防抖节流完整版', path: '/javascript-handwriting' },
      { icon: '📊', title: '数组方法', desc: '手写 reduce/map/filter、去重、扁平化、树形结构', path: '/javascript-array-methods' },
      { icon: '⚙️', title: 'Generator/模块化', desc: '可迭代协议、Generator 自动执行器、ESM vs CJS', path: '/javascript-generator-module' },
      { icon: '🔢', title: '进阶运算', desc: '大数相加、版本号对比、LRU 缓存', path: '/javascript-advanced' },
    ],
  },
  {
    icon: '💚',
    title: 'Vue 3 深度',
    items: [
      { icon: '⚡', title: '响应式原理', desc: 'Proxy + Reflect、依赖收集、ref/reactive/computed 实现', path: '/vue-reactivity' },
      { icon: '🖼️', title: '虚拟 DOM / diff', desc: 'VDOM 结构、patch 流程、双端 diff、静态标记', path: '/vue-vdom' },
      { icon: '🧩', title: '组件设计模式', desc: 'props/emit/slot、provide/inject、Composables', path: '/vue-component-patterns' },
      { icon: '📦', title: 'Pinia 状态管理', desc: 'Pinia vs Vuex、store 模式、插件系统、源码简析', path: '/vue-pinia' },
    ],
  },
  {
    icon: '🌐',
    title: '浏览器与网络',
    items: [
      { icon: '🌐', title: '渲染机制', desc: '关键渲染路径、回流重绘、合成层、LCP/FCP', path: '/browser-rendering' },
      { icon: '⚡', title: '性能优化', desc: '性能指标、加载优化、代码分割、缓存策略', path: '/browser-performance' },
      { icon: '🔒', title: '跨域与安全', desc: 'XSS/CSRF、CORS、OAuth/JWT、CSP', path: '/browser-security' },
      { icon: '📡', title: 'HTTP 缓存', desc: '强缓存/协商缓存、Cache-Control、Service Worker', path: '/browser-http-cache' },
    ],
  },
  {
    icon: '🔧',
    title: '工程化',
    items: [
      { icon: '🔧', title: '构建工具', desc: 'Vite/Webpack 原理、HMR、Tree Shaking、模块打包', path: '/engineering-build-tools' },
      { icon: '📋', title: 'CI/CD', desc: 'GitHub Actions、自动化部署、流水线搭建', path: '/engineering-ci-cd' },
      { icon: '✅', title: '代码质量', desc: 'ESLint、Prettier、Git Hooks、Monorepo', path: '/engineering-code-quality' },
    ],
  },
  {
    icon: '🚀',
    title: '扩展',
    items: [
      { icon: '🖥️', title: 'Node.js 服务端', desc: 'Express/Koa、RESTful API、鉴权、数据库', path: '/extra-nodejs' },
      { icon: '📘', title: 'TypeScript 深度', desc: '泛型进阶、工具类型、条件类型、类型体操', path: '/extra-typescript' },
      { icon: '🧮', title: '数据结构与算法', desc: '栈/队列/树、排序搜索、动态规划、手撕题', path: '/extra-algorithms' },
      { icon: '🏗️', title: '设计模式', desc: '单例/观察者/工厂/代理、前端应用、SOLID', path: '/extra-design-patterns' },
      { icon: '🐳', title: 'Docker / DevOps', desc: 'Dockerfile、docker-compose、Nginx、部署', path: '/extra-devops' },
    ],
  },
]

const totalCount = computed(() => groups.reduce((s, g) => s + g.items.length, 0))
const doneCount = computed(() => groups.reduce((s, g) => s + g.items.filter(i => completed.has(i.path)).length, 0))

function groupDone(group: RoadmapGroup) {
  return group.items.filter(i => completed.has(i.path)).length
}
</script>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

/* ─── Hero ─── */
.hero {
  text-align: center;
  padding: 2rem 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}
.hero h1 {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin-bottom: 0.4rem;
}
.subtitle {
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.95rem;
  margin-bottom: 1.2rem;
}
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 0.8rem;
}
.hero-stats strong {
  color: var(--color-heading);
  font-size: 1.1rem;
}
.stat-divider {
  opacity: 0.3;
}
.hero-bar {
  max-width: 400px;
  margin: 0 auto;
  height: 6px;
  background: var(--color-background-mute);
  border-radius: 3px;
  overflow: hidden;
}
.hero-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #42b883, #3aa876);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* ─── Group ─── */
.roadmap-group {
  margin-bottom: 2rem;
}
.group-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}
.group-title {
  font-size: 1.15rem;
  color: var(--color-heading);
}
.group-progress {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.5;
  font-weight: 600;
}

/* ─── Cards ─── */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--color-background-soft);
  overflow: hidden;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.card-done {
  border-color: #42b88344;
}
.card-done:hover {
  border-color: #42b88355;
}
.card-placeholder {
  opacity: 0.7;
}
.card-placeholder:hover {
  opacity: 1;
}

.card-body {
  display: block;
  padding: 1.2rem 1.2rem 0.8rem;
  text-decoration: none;
  color: inherit;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}
.card-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.card h3 {
  font-size: 1rem;
  color: var(--color-heading);
  margin-bottom: 0.3rem;
}

.card-toggle {
  display: block;
  width: 100%;
  padding: 0.5rem 1.2rem;
  border: none;
  border-top: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  opacity: 0.4;
  font-size: 0.78rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  font-family: inherit;
}
.card-toggle:hover {
  opacity: 1;
  background: var(--color-background-mute);
}
.card-toggle.toggle-done {
  color: #42b883;
  opacity: 0.8;
}
.card-toggle.toggle-done:hover {
  opacity: 1;
  background: #42b8830a;
}
.card p {
  font-size: 0.82rem;
  opacity: 0.6;
  line-height: 1.5;
}

/* ─── Responsive ─── */
@media (max-width: 700px) {
  .hero h1 { font-size: 1.4rem; }
  .cards { grid-template-columns: 1fr; }
}
</style>
