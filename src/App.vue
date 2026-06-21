<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <router-link to="/">
          <h2>📘 前端复习路线</h2>
        </router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
          <span class="nav-icon">🏠</span>
          <span>路线总览</span>
        </router-link>

        <!-- JS 基础 -->
        <div class="nav-group-title">JS 基础</div>
        <router-link to="/javascript-core" class="nav-item">
          <span class="nav-icon">🟨</span>
          <span>作用域与闭包</span>
        </router-link>
        <router-link to="/javascript-this" class="nav-item">
          <span class="nav-icon">🎯</span>
          <span>this 指向规则</span>
        </router-link>
        <router-link to="/javascript-prototype" class="nav-item">
          <span class="nav-icon">⛓️</span>
          <span>原型与继承</span>
        </router-link>
        <router-link to="/javascript-event-loop" class="nav-item">
          <span class="nav-icon">🔄</span>
          <span>Event Loop</span>
        </router-link>
        <router-link to="/javascript-promise" class="nav-item">
          <span class="nav-icon">🤝</span>
          <span>Promise 与异步</span>
        </router-link>
        <router-link to="/javascript-deep-clone" class="nav-item">
          <span class="nav-icon">📋</span>
          <span>深拷贝</span>
        </router-link>
        <router-link to="/javascript-type-coercion" class="nav-item">
          <span class="nav-icon">🔄</span>
          <span>类型转换</span>
        </router-link>
        <router-link to="/javascript-handwriting" class="nav-item">
          <span class="nav-icon">✍️</span>
          <span>手写题合集</span>
        </router-link>
        <router-link to="/javascript-array-methods" class="nav-item">
          <span class="nav-icon">📊</span>
          <span>数组方法</span>
        </router-link>
        <router-link to="/javascript-generator-module" class="nav-item">
          <span class="nav-icon">⚙️</span>
          <span>Generator/模块化</span>
        </router-link>
        <router-link to="/javascript-advanced" class="nav-item">
          <span class="nav-icon">🔢</span>
          <span>进阶运算</span>
        </router-link>

        <!-- Vue 3 深度 -->
        <div class="nav-group-title">Vue 3 深度</div>
        <router-link to="/vue-reactivity" class="nav-item">
          <span class="nav-icon">⚡</span>
          <span>响应式原理</span>
        </router-link>
        <router-link to="/vue-vdom" class="nav-item">
          <span class="nav-icon">🖼️</span>
          <span>虚拟 DOM / diff</span>
        </router-link>
        <router-link to="/vue-component-patterns" class="nav-item">
          <span class="nav-icon">🧩</span>
          <span>组件设计模式</span>
        </router-link>
        <router-link to="/vue-pinia" class="nav-item">
          <span class="nav-icon">📦</span>
          <span>Pinia 状态管理</span>
        </router-link>

        <!-- 浏览器与网络 -->
        <div class="nav-group-title">浏览器与网络</div>
        <router-link to="/browser-rendering" class="nav-item">
          <span class="nav-icon">🌐</span>
          <span>渲染机制</span>
        </router-link>
        <router-link to="/browser-performance" class="nav-item">
          <span class="nav-icon">⚡</span>
          <span>性能优化</span>
        </router-link>
        <router-link to="/browser-security" class="nav-item">
          <span class="nav-icon">🔒</span>
          <span>跨域与安全</span>
        </router-link>
        <router-link to="/browser-http-cache" class="nav-item">
          <span class="nav-icon">📡</span>
          <span>HTTP 缓存</span>
        </router-link>

        <!-- 工程化 -->
        <div class="nav-group-title">工程化</div>
        <router-link to="/engineering-build-tools" class="nav-item">
          <span class="nav-icon">🔧</span>
          <span>构建工具</span>
        </router-link>
        <router-link to="/engineering-ci-cd" class="nav-item">
          <span class="nav-icon">📋</span>
          <span>CI/CD</span>
        </router-link>
        <router-link to="/engineering-code-quality" class="nav-item">
          <span class="nav-icon">✅</span>
          <span>代码质量</span>
        </router-link>

        <!-- 扩展 -->
        <div class="nav-group-title">扩展</div>
        <router-link to="/extra-nodejs" class="nav-item">
          <span class="nav-icon">🖥️</span>
          <span>Node.js 服务端</span>
        </router-link>
        <router-link to="/extra-typescript" class="nav-item">
          <span class="nav-icon">📘</span>
          <span>TypeScript 深度</span>
        </router-link>
        <router-link to="/extra-algorithms" class="nav-item">
          <span class="nav-icon">🧮</span>
          <span>数据结构与算法</span>
        </router-link>
        <router-link to="/extra-design-patterns" class="nav-item">
          <span class="nav-icon">🏗️</span>
          <span>设计模式</span>
        </router-link>
        <router-link to="/extra-devops" class="nav-item">
          <span class="nav-icon">🐳</span>
          <span>Docker / DevOps</span>
        </router-link>

        <!-- 交互 Demo -->
        <div class="nav-group-title">交互 Demo</div>
        <router-link to="/html-elements" class="nav-item">
          <span class="nav-icon">📄</span>
          <span>块级·行内·行内块级</span>
        </router-link>
        <router-link to="/geolocation" class="nav-item">
          <span class="nav-icon">📍</span>
          <span>地理定位</span>
        </router-link>
        <router-link to="/web-worker" class="nav-item">
          <span class="nav-icon">⚡</span>
          <span>Web Worker 多线程</span>
        </router-link>

        <div class="nav-group-title">其他</div>
        <router-link to="/about" class="nav-item">
          <span class="nav-icon">ℹ️</span>
          <span>关于</span>
        </router-link>
      </nav>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: var(--color-background-mute);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}

.logo {
  padding: 0 1.2rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.logo h2 {
  font-size: 1.2rem;
  color: var(--color-heading);
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-group-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.5;
  padding: 1rem 1.2rem 0.3rem;
  font-weight: 600;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: var(--color-background-soft);
  color: var(--color-heading);
}

.nav-item.active,
.nav-item.router-link-exact-active {
  background: color-mix(in srgb, var(--color-border) 50%, transparent);
  color: var(--color-heading);
  border-left-color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
}

.nav-icon {
  font-size: 1.1rem;
  width: 1.5rem;
  text-align: center;
}

.main-content {
  flex: 1;
  margin-left: 220px;
  padding: 2rem;
  max-width: calc(100vw - 220px);
}
</style>
