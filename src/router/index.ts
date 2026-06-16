import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },

    // ─── JS 基础 ───
    {
      path: '/javascript-core',
      name: 'javascript-core',
      component: () => import('../views/knowledge/JavaScriptCore.vue'),
    },
    {
      path: '/javascript-this',
      name: 'javascript-this',
      component: () => import('../views/knowledge/JavaScriptThis.vue'),
    },
    {
      path: '/javascript-prototype',
      name: 'javascript-prototype',
      component: () => import('../views/knowledge/JavaScriptPrototype.vue'),
    },
    {
      path: '/javascript-event-loop',
      name: 'javascript-event-loop',
      component: () => import('../views/knowledge/JavaScriptEventLoop.vue'),
    },
    {
      path: '/javascript-promise',
      name: 'javascript-promise',
      component: () => import('../views/knowledge/JavaScriptPromise.vue'),
    },

    // ─── Vue 3 深度 ───
    {
      path: '/vue-reactivity',
      name: 'vue-reactivity',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/vue-vdom',
      name: 'vue-vdom',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/vue-component-patterns',
      name: 'vue-component-patterns',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/vue-pinia',
      name: 'vue-pinia',
      component: () => import('../views/PlaceholderView.vue'),
    },

    // ─── 浏览器与网络 ───
    {
      path: '/browser-rendering',
      name: 'browser-rendering',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/browser-performance',
      name: 'browser-performance',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/browser-security',
      name: 'browser-security',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/browser-http-cache',
      name: 'browser-http-cache',
      component: () => import('../views/PlaceholderView.vue'),
    },

    // ─── 工程化 ───
    {
      path: '/engineering-build-tools',
      name: 'engineering-build-tools',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/engineering-ci-cd',
      name: 'engineering-ci-cd',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/engineering-code-quality',
      name: 'engineering-code-quality',
      component: () => import('../views/PlaceholderView.vue'),
    },

    // ─── 扩展 ───
    {
      path: '/extra-nodejs',
      name: 'extra-nodejs',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/extra-typescript',
      name: 'extra-typescript',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/extra-algorithms',
      name: 'extra-algorithms',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/extra-design-patterns',
      name: 'extra-design-patterns',
      component: () => import('../views/PlaceholderView.vue'),
    },
    {
      path: '/extra-devops',
      name: 'extra-devops',
      component: () => import('../views/PlaceholderView.vue'),
    },

    // ─── 交互 Demo ───
    {
      path: '/geolocation',
      name: 'geolocation',
      component: () => import('../views/demos/Geolocation.vue'),
    },
    {
      path: '/web-worker',
      name: 'web-worker',
      component: () => import('../views/demos/WebWorker.vue'),
    },

    // ─── 其他 ───
    {
      path: '/html-elements',
      name: 'html-elements',
      component: () => import('../views/knowledge/BlockView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
