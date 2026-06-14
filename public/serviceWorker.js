// 安装
self.addEventListener('install', (event) => {
  console.log('install 运行')
  self.skipWaiting() // 立刻激活
})

// 激活
self.addEventListener('activate', (event) => {
  console.log('activate 运行')
  event.waitUntil(self.clients.claim()) // 👈 必须加！接管页面
})

// 监听请求
self.addEventListener('fetch', (event) => {
  console.log('拦截请求 →', event.request.url) // 你一定会看到！
  event.respondWith(fetch(event.request))
})