<template>
  <div class="ww-page">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <h1>Web Worker 多线程</h1>
      <p class="hero-sub">面试高频考点 · 交互式 Demo · 主线程 vs Worker 对比</p>
    </header>

    <!-- ============ TOC ============ -->
    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 什么是 Web Worker -->
    <!-- ============================================================ -->
    <section id="s1-what" class="section-card">
      <h2 class="s-title">一、什么是 Web Worker</h2>
      <p class="s-desc">
        Web Worker 是浏览器提供的<strong>多线程机制</strong>，允许在后台线程中运行 JavaScript，
        使得<strong>耗时的计算任务不阻塞主线程</strong>（UI 渲染、用户交互）。
      </p>

      <div class="diagram">
        <div class="diagram-row">
          <div class="diagram-box main-thread">
            <div class="diagram-label">主线程（Main Thread）</div>
            <div class="diagram-items">
              <span class="tag">UI 渲染</span>
              <span class="tag">DOM 操作</span>
              <span class="tag">事件处理</span>
              <span class="tag">用户交互</span>
            </div>
          </div>
          <div class="diagram-arrow">
            <span class="arrow-icon">⬅➡</span>
            <span class="arrow-label">postMessage</span>
          </div>
          <div class="diagram-box worker-thread">
            <div class="diagram-label">Worker 线程</div>
            <div class="diagram-items">
              <span class="tag">大量计算</span>
              <span class="tag">数据处理</span>
              <span class="tag">加密解密</span>
              <span class="tag">图像处理</span>
            </div>
          </div>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：Web Worker 的核心价值是"<strong>不阻塞 UI</strong>"。JS 是单线程的，
        但浏览器允许创建 Worker 线程分担计算任务。注意 Worker 不能操作 DOM，通过 <code>postMessage</code> / <code>onmessage</code> 通信
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 交互式 Demo -->
    <!-- ============================================================ -->
    <section id="s2-demo" class="section-card">
      <h2 class="s-title">二、交互式 Demo：主线程 vs Worker 对比</h2>
      <p class="s-desc">
        点击按钮执行大量计算（累加 0 ~ 20 亿）。在计算过程中，尝试在下方输入框中打字，
        观察主线程版本是否会阻塞 UI。
      </p>

      <div class="demo-area">
        <!-- UI 卡顿测试 -->
        <div class="test-input-group">
          <label class="test-label">🔤 UI 响应测试（计算中尝试输入）：</label>
          <input
            v-model="inputText"
            class="test-input"
            placeholder="在这里打字，测试页面是否卡顿..."
          />
        </div>

        <!-- Controls -->
        <div class="ww-controls">
          <button class="ctrl-btn" :disabled="loading" @click="calcMainThread">
            🧠 主线程计算
          </button>
          <button class="ctrl-btn worker-btn" :disabled="loading" @click="calcWorker">
            ⚡ Web Worker 计算
          </button>
          <button class="ctrl-btn reset-btn" @click="resetDemo">
            🔄 重置
          </button>
        </div>

        <!-- Result -->
        <div class="result-grid">
          <div class="result-card" :class="{ 'is-active': activeTab === 'main' }">
            <div class="result-header" style="background: #e74c3c">主线程</div>
            <div class="result-body">
              <div class="result-row">
                <span class="result-key">执行状态</span>
                <span class="result-val" :class="{ 'is-blocked': mainBlocked }">
                  {{ mainStatus }}
                </span>
              </div>
              <div class="result-row">
                <span class="result-key">计算结果</span>
                <span class="result-val mono">{{ mainResult }}</span>
              </div>
              <div class="result-row">
                <span class="result-key">耗时</span>
                <span class="result-val mono">{{ mainTime }}</span>
              </div>
            </div>
          </div>
          <div class="result-card" :class="{ 'is-active': activeTab === 'worker' }">
            <div class="result-header" style="background: #42b883">Web Worker</div>
            <div class="result-body">
              <div class="result-row">
                <span class="result-key">执行状态</span>
                <span class="result-val" style="color:#42b883;font-weight:600;">{{ workerStatus }}</span>
              </div>
              <div class="result-row">
                <span class="result-key">计算结果</span>
                <span class="result-val mono">{{ workerResult }}</span>
              </div>
              <div class="result-row">
                <span class="result-key">耗时</span>
                <span class="result-val mono">{{ workerTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Code -->
      <h3 class="code-title">主线程计算代码</h3>
      <pre class="code-block"><code v-text="mainThreadCode"></code></pre>
      <h3 class="code-title">Worker 线程计算代码</h3>
      <pre class="code-block"><code v-text="workerCode"></code></pre>
      <h3 class="code-title">创建 Worker 并通信</h3>
      <pre class="code-block"><code v-text="createWorkerCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：主线程执行耗时任务会阻塞 UI，导致页面"假死"（无法点击、输入、滚动）。
        Worker 在独立线程执行，UI 保持流畅。但注意 Worker 的<strong>创建和通信有开销</strong>，
        小任务直接用主线程反而更快
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: Worker 的能力与限制 -->
    <!-- ============================================================ -->
    <section id="s3-limit" class="section-card">
      <h2 class="s-title">三、Worker 的能力与限制</h2>
      <p class="s-desc">Worker 运行在独立的全局上下文中（<code>self</code> 而非 <code>window</code>），以下是在 Worker 中可用和不可用的 API：</p>

      <div class="cap-grid">
        <div class="cap-card cap-ok">
          <div class="cap-header">✅ 可用</div>
          <ul>
            <li v-for="item in canDo" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="cap-card cap-no">
          <div class="cap-header">❌ 不可用</div>
          <ul>
            <li v-for="item in cannotDo" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：Worker 中不能访问 <code>window</code>、<code>document</code>、<code>DOM</code>，
        但可以使用 <code>fetch</code>、<code>setTimeout</code>、<code>IndexedDB</code>、<code>WebSocket</code>
        和 <code>Cache API</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 三种 Worker 对比 -->
    <!-- ============================================================ -->
    <section id="s4-compare" class="section-card">
      <h2 class="s-title">四、Web Worker vs Service Worker vs SharedWorker</h2>
      <p class="s-desc">面试高频辨析题，三者名称相似但用途完全不同。</p>

      <div class="sw-table-wrap">
        <table class="sw-table">
          <thead>
            <tr>
              <th>对比维度</th>
              <th>Web Worker</th>
              <th>Service Worker</th>
              <th>SharedWorker</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in swCompare" :key="row.dim">
              <td class="dim-cell">{{ row.dim }}</td>
              <td>{{ row.web }}</td>
              <td>{{ row.service }}</td>
              <td>{{ row.shared }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<strong>Web Worker</strong> 用于耗时计算；<strong>Service Worker</strong>
        充当网络代理，用于离线缓存/PWA/拦截请求；<strong>SharedWorker</strong> 可在多个同源页面间共享数据。
        三者<strong>都不能操作 DOM</strong>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 数据传输方式 -->
    <!-- ============================================================ -->
    <section id="s5-data" class="section-card">
      <h2 class="s-title">五、数据传输方式</h2>
      <p class="s-desc">主线程与 Worker 之间通过 <code>postMessage</code> 通信，数据传输默认使用<strong>结构化克隆算法（Structured Clone）</strong>。</p>

      <div class="data-grid">
        <div class="data-card">
          <div class="data-icon">📋</div>
          <div class="data-title">结构化克隆</div>
          <p class="data-desc">默认方式，<strong>深拷贝</strong>传递数据。支持大部分 JS 类型（Object, Array, Map, Set, Date, RegExp, Blob 等），但不支持函数和 DOM 节点</p>
          <pre class="code-block mini"><code>worker.postMessage({a: 1, b: [2, 3]})</code></pre>
        </div>
        <div class="data-card">
          <div class="data-icon">⚡</div>
          <div class="data-title">Transferable Objects</div>
          <p class="data-desc">传递<strong>所有权</strong>而非拷贝，零拷贝开销。适合传递 <code>ArrayBuffer</code>、<code>ImageBitmap</code> 等大块数据。传递后原始对象不可用</p>
          <pre class="code-block mini"><code>const buf = new ArrayBuffer(1024)
worker.postMessage(buf, [buf])
// buf 在主线程中已不可用</code></pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：结构化克隆 vs <code>JSON.parse(JSON.stringify())</code> ——
        前者支持更多类型（Date, RegExp, Blob 等），且<strong>循环引用</strong>不会报错。
        Transferable Objects 用于大文件/二进制数据处理，<strong>零拷贝</strong>性能更好
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 注意事项 -->
    <!-- ============================================================ -->
    <section id="s6-note" class="section-card">
      <h2 class="s-title">六、使用注意事项</h2>

      <div class="note-list">
        <div class="note-item" v-for="(note, idx) in notes" :key="idx">
          <span class="note-num">{{ idx + 1 }}</span>
          <span class="note-text" v-html="note"></span>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>："如何终止 Worker？"——<code>worker.terminate()</code> 从外部终止；
        内部调用 <code>self.close()</code> 自行关闭。终止后无法复用，需重新 <code>new Worker()</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 7: 大厂生产案例 -->
    <!-- ============================================================ -->
    <section id="s7-cases" class="section-card">
      <h2 class="s-title">七、大厂生产环境案例</h2>
      <p class="s-desc">以下是互联网头部公司在生产环境中实际使用 Web Worker 的场景，面试时能说出具体案例会极大加分。</p>

      <div class="cases-list">
        <div class="case-card" v-for="(c, i) in cases" :key="i">
          <div class="case-header">
            <span class="case-company">{{ c.company }}</span>
            <span class="case-product">{{ c.product }}</span>
          </div>
          <div class="case-body">
            <div class="case-scenario">
              <span class="case-tag">场景</span>
              {{ c.scenario }}
            </div>
            <div class="case-problem">
              <span class="case-tag">问题</span>
              {{ c.problem }}
            </div>
            <div class="case-solution">
              <span class="case-tag">方案</span>
              {{ c.solution }}
            </div>
            <div class="case-result" v-if="c.result">
              <span class="case-tag">效果</span>
              {{ c.result }}
            </div>
          </div>
        </div>
      </div>

      <div class="cases-patterns">
        <h3 class="s-subtitle">通用应用模式总结</h3>
        <div class="pattern-grid">
          <div class="pattern-item" v-for="p in patterns" :key="p.label">
            <span class="pattern-icon">{{ p.icon }}</span>
            <div class="pattern-info">
              <div class="pattern-label">{{ p.label }}</div>
              <div class="pattern-desc">{{ p.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试话术</strong>："Web Worker 不仅是个 API，更是大型前端应用的<strong>架构分层手段</strong>。
        把计算密集型任务与 UI 渲染分离，让 Worker 专注数据、主线程专注交互。
        Google Sheets 甚至将 WasmGC 编译的计算引擎跑在 Worker 中，实现了 2 倍性能提升。"
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 8: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s8-qa" class="section-card">
      <h2 class="s-title">八、面试高频问答（⭐→⭐⭐⭐）</h2>
      <p class="s-desc">点击问题展开答案，先思考再看解析。难度从一颗星（基础）到三颗星（进阶）。</p>

      <div class="qa-list">
        <div
          v-for="(item, idx) in workerQuestions"
          :key="idx"
          class="qa-item"
          :class="{ 'qa-open': workerOpenIdx === idx }"
        >
          <button class="qa-question" @click="workerOpenIdx = workerOpenIdx === idx ? -1 : idx">
            <span class="qa-level" :class="'qa-lv' + item.level">{{ '⭐'.repeat(item.level) }}</span>
            <span class="qa-text">{{ item.q }}</span>
            <span class="qa-arrow">{{ workerOpenIdx === idx ? '▾' : '▸' }}</span>
          </button>
          <div class="qa-answer" v-if="workerOpenIdx === idx">
            <div class="qa-answer-inner" v-html="item.a"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ─── TOC ───
const toc = [
  { id: 's1-what',    label: '什么是 Worker' },
  { id: 's2-demo',    label: '交互 Demo' },
  { id: 's3-limit',   label: '能力与限制' },
  { id: 's4-compare', label: '三种 Worker' },
  { id: 's5-data',    label: '数据传输' },
  { id: 's6-note',    label: '注意事项' },
  { id: 's7-cases',   label: '大厂案例' },
  { id: 's8-qa',      label: '面试问答' },
]

// ─── Section 2: Demo ───
const inputText = ref('')
const loading = ref(false)
const activeTab = ref<'main' | 'worker'>()
const mainBlocked = ref(false)

const mainResult = ref('—')
const mainTime = ref('—')
const mainStatus = ref('等待执行')

const workerResult = ref('—')
const workerTime = ref('—')
const workerStatus = ref('等待执行')

const ITERATIONS = 2_000_000_000

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function calcMainThread() {
  loading.value = true
  activeTab.value = 'main'
  mainResult.value = '计算中...'
  mainTime.value = '计时中...'
  mainStatus.value = '⏳ 执行中（UI 已阻塞）'

  // 用 requestAnimationFrame 让 UI 先刷新一下
  await sleep(50)

  const start = performance.now()

  // 同步阻塞计算
  let sum = 0
  for (let i = 0; i < ITERATIONS; i++) {
    sum += i
  }

  const end = performance.now()

  mainResult.value = formatNumber(sum)
  mainTime.value = `${(end - start).toFixed(0)} ms`
  mainStatus.value = '✅ 计算完成（期间 UI 卡顿）'
  loading.value = false
}

function calcWorker() {
  loading.value = true
  activeTab.value = 'worker'
  workerResult.value = '计算中...'
  workerTime.value = '计时中...'
  workerStatus.value = '⏳ Worker 执行中（UI 流畅）'

  const start = performance.now()
  const worker = new Worker(new URL('../../worker/index.js', import.meta.url))

  worker.onmessage = (e) => {
    const end = performance.now()
    workerResult.value = formatNumber(e.data)
    workerTime.value = `${(end - start).toFixed(0)} ms`
    workerStatus.value = '✅ 计算完成（UI 全程流畅）'
    worker.terminate()
    loading.value = false
  }

  worker.onerror = (err) => {
    workerStatus.value = '❌ 计算出错'
    workerResult.value = String(err)
    loading.value = false
  }

  worker.postMessage(ITERATIONS)
}

function resetDemo() {
  loading.value = false
  activeTab.value = undefined
  mainResult.value = '—'
  mainTime.value = '—'
  mainStatus.value = '等待执行'
  workerResult.value = '—'
  workerTime.value = '—'
  workerStatus.value = '等待执行'
  inputText.value = ''
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

// ─── Code snippets ───
const mainThreadCode = `// 主线程计算（20 亿次累加）
function calcInMainThread() {
  let sum = 0
  for (let i = 0; i < 2000000000; i++) {
    sum += i
  }
  return sum
}
// ⚠️ 执行期间 UI 完全卡顿，
//    无法点击、输入、滚动`

const workerCode = `// worker/index.js
self.onmessage = (e) => {
  const max = e.data
  let sum = 0
  for (let i = 0; i < max; i++) {
    sum += i
  }
  self.postMessage(sum)
  self.close()  // 任务完成，自行关闭
}`

const createWorkerCode = `// 主线程中创建 Worker
const worker = new Worker('worker.js')

// 发送数据
worker.postMessage(data)

// 接收结果
worker.onmessage = (e) => {
  console.log('结果:', e.data)
  worker.terminate()  // 用完终止
}

// 错误处理
worker.onerror = (err) => {
  console.error('Worker 错误:', err)
}`

// ─── Section 3: Limits ───
const canDo = [
  '使用 fetch / XMLHttpRequest 发送网络请求',
  '使用 setTimeout / setInterval 定时器',
  '使用 console 调试输出',
  '使用 IndexedDB 本地存储',
  '使用 Cache API 缓存',
  '使用 WebSocket 通信',
  '使用 importScripts 加载其他脚本',
  '使用 WebAssembly 执行高性能代码',
  '使用 navigator 的部分属性',
]

const cannotDo = [
  '操作 DOM（document.getElementById 等）',
  '访问 window 对象',
  '使用 parent / top 等父窗口属性',
  '使用 localStorage / sessionStorage',
  '使用 alert / confirm / prompt 弹窗',
  '访问全局变量和函数（非同源）',
]

// ─── Section 4: Comparison ───
const swCompare = [
  { dim: '用途',         web: '耗时计算/数据处理',       service: '网络代理/离线缓存/PWA',    shared: '多页面共享数据' },
  { dim: '生命周期',     web: '临时，任务结束可关闭',     service: '持久，由浏览器管理',        shared: '页面关后仍可存活' },
  { dim: '作用域',       web: '单个页面',                service: '多个同源页面',              shared: '多个同源页面' },
  { dim: '是否拦截请求', web: '否',                      service: '是（核心功能）',            shared: '否' },
  { dim: '是否需要 HTTPS',web: '否（localhost 也可）',    service: '是（生产环境）',            shared: '否' },
  { dim: '能否操作 DOM', web: '❌ 不能',                 service: '❌ 不能',                   shared: '❌ 不能' },
  { dim: '通信方式',     web: 'postMessage',             service: 'postMessage + fetch 事件',  shared: 'postMessage（多端口）' },
]

// ─── Section 6: Notes ───
const notes = [
  '<strong>同源限制</strong>：Worker 脚本必须与主页面同源（协议、域名、端口一致）',
  '<strong>CORS 限制</strong>：通过 CDN 加载外部 Worker 脚本需要服务端支持 CORS',
  '<strong>创建开销</strong>：Worker 创建约 50ms 开销，适合大任务，小任务直接用主线程',
  '<strong>模块 Worker</strong>：<code>new Worker("worker.js", { type: "module" })</code> 支持 ES Module',
  '<strong>关闭 Worker</strong>：外部调用 <code>worker.terminate()</code>，内部调用 <code>self.close()</code>',
  '<strong>错误处理</strong>：务必监听 <code>worker.onerror</code>，否则 Worker 内报错会静默失败',
]

// ─── Section 7: Real-world cases ───
const cases = [
  {
    company: 'Google',
    product: 'Google Sheets',
    scenario: '电子表格计算引擎（20 亿次级公式计算/排序/筛选）',
    problem: '原始 JS 计算引擎在主线程执行，大数据量表操作导致页面冻结数秒，Chrome 弹出"页面无响应"警告',
    solution: '将 Java 编译的 WasmGC 计算引擎迁移到 Web Worker + MessageChannel 通信，主线程只负责渲染表格视图',
    result: '相较于纯 JS 版本性能提升约 2 倍，用户操作全程流畅，成为 Google 首个在生产环境使用 WasmGC 的产品',
  },
  {
    company: 'Autodesk',
    product: 'Forma（建筑设计云平台）',
    scenario: '浏览器端 3D 体素空间分析——对大型建筑模型进行采光/通风/阴影计算',
    problem: '复杂建筑几何体的体素化计算耗时 5-15 秒，在主线程执行触发浏览器"页面无响应"弹窗',
    solution: '将 WASM 编译的 VASA 分析库加载到 Web Worker 中，Worker 完成体素化 + 计算后只传回数值结果',
    result: 'Worker 通信开销 < 5%（不到 1 秒额外耗时），完全消除 UI 冻结。该方案在 Autodesk University 2024 作为生产最佳实践发布',
  },
  {
    company: 'Microsoft',
    product: 'VS Code（Web 版）',
    scenario: '插件系统（Extension Host）——运行第三方插件的 JS/TS 代码',
    problem: '插件代码质量不可控，死循环或大量计算会拖垮主线程，影响编辑器核心功能（输入、光标移动、语法高亮）',
    solution: '将所有插件进程（Extension Host）运行在 Web Worker 中，插件与编辑器主进程通过协议通信，插件崩溃不影响编辑器本身',
    result: 'VS Code 的架构核心设计之一，使 Web 版 VS Code（vscode.dev）能稳定运行数千个第三方插件',
  },
  {
    company: 'OutSystems',
    product: '低代码平台文件上传',
    scenario: '大文件（100MB+）上传场景，需要切片并发上传',
    problem: '单线程上传 183MB 文件耗时 26 秒且卡 UI，更大的文件直接超时中断',
    solution: '创建 16 个 Web Worker 构成上传线程池，每个 Worker 独立上传 1MB 切片，主线程只负责进度展示',
    result: '183MB 文件上传时间从 26 秒降至 17 秒，内存占用从 286MB 降至仅当前切片大小，UI 全程可交互',
  },
  {
    company: 'Figma / Adobe / Zoom',
    product: '设计工具 / 视频会议',
    scenario: '图像滤镜处理 / 音视频编解码 / 实时特效',
    problem: '图像渲染、滤镜计算、音视频编码非常消耗 CPU，主线程处理会导致画笔卡顿、画面撕裂、声音断续',
    solution: '将图像处理的像素计算、音视频编解码放到 Worker 线程，主线程专注渲染和交互响应',
    result: 'Figma 的图层操作丝滑流畅；Zoom Web 版在低性能设备上也能维持实时音视频处理',
  },
]

const patterns = [
  { icon: '🧮', label: '大量计算', desc: '公式引擎、数据分析、科学计算' },
  { icon: '🖼️', label: '图像/音视频处理', desc: '滤镜、编解码、压缩、特效' },
  { icon: '📁', label: '大文件解析', desc: 'CSV/JSON/Excel 解析、切片上传' },
  { icon: '🔐', label: '加密/哈希', desc: '密钥生成、签名、数据加解密' },
  { icon: '🤖', label: '客户端 ML 推理', desc: 'TensorFlow.js / ONNX 模型预测' },
  { icon: '🧩', label: '插件沙箱隔离', desc: '第三方代码运行在隔离线程中' },
]

// ─── Section 8: Interview Q&A ───
const workerOpenIdx = ref(-1)
const workerQuestions = [
  { level: 1, q: '什么是 Web Worker？它解决了什么问题？',
    a: 'Web Worker 是浏览器提供的<strong>多线程机制</strong>，允许在后台独立线程运行 JavaScript。<br><br><strong>解决的问题</strong>：JavaScript 是单线程语言，如果在主线程执行耗时计算（如大量数据遍历、加密解密、图像处理），会<strong>阻塞 UI 渲染和用户交互</strong>（页面卡死、点击无响应、输入框无法打字）。Web Worker 把这些任务放到独立线程执行，主线程保持流畅。' },
  { level: 1, q: 'Web Worker 和主线程之间如何通信？',
    a: '通过 <code>postMessage()</code> 发送消息，通过 <code>onmessage</code> 监听接收消息。<br><br><strong>主线程 → Worker</strong>：<br><code>worker.postMessage(data)</code><br><br><strong>Worker → 主线程</strong>：<br><code>self.postMessage(result)</code><br><br>通信数据默认使用<strong>结构化克隆算法</strong>深拷贝，支持 Object、Array、Date、Blob、ArrayBuffer 等类型。<br><br>注意：数据是<strong>拷贝</strong>传递，不是引用传递（除非使用 Transferable Objects）。' },
  { level: 2, q: 'Worker 中能做什么？不能做什么？',
    a: '<strong>✅ 可以做</strong>：<br>· 使用 <code>fetch</code> 发送网络请求<br>· 使用 <code>setTimeout / setInterval</code> 定时器<br>· 使用 <code>IndexedDB</code> 本地存储<br>· 使用 <code>WebSocket</code> 通信<br>· 使用 <code>Cache API</code><br>· 使用 <code>importScripts</code> 加载其他脚本<br>· 使用 <code>console</code> 调试输出<br><br><strong>❌ 不可以做</strong>：<br>· 操作 DOM（<code>document.getElementById</code> 等）<br>· 访问 <code>window</code> 对象<br>· 使用 <code>localStorage / sessionStorage</code><br>· 使用 <code>alert / confirm / prompt</code> 弹窗<br>· 访问全局变量（非同源）' },
  { level: 2, q: 'Web Worker、Service Worker、SharedWorker 三者的区别？',
    a: '<table style="font-size:0.85rem;border-collapse:collapse;width:100%;"><tr><th style="border:1px solid #ccc;padding:6px;text-align:left">维度</th><th style="border:1px solid #ccc;padding:6px;text-align:left">Web Worker</th><th style="border:1px solid #ccc;padding:6px;text-align:left">Service Worker</th><th style="border:1px solid #ccc;padding:6px;text-align:left">SharedWorker</th></tr><tr><td style="border:1px solid #ccc;padding:6px">用途</td><td style="border:1px solid #ccc;padding:6px">耗时计算</td><td style="border:1px solid #ccc;padding:6px">网络代理/离线</td><td style="border:1px solid #ccc;padding:6px">多页共享数据</td></tr><tr><td style="border:1px solid #ccc;padding:6px">生命周期</td><td style="border:1px solid #ccc;padding:6px">临时</td><td style="border:1px solid #ccc;padding:6px">持久（浏览器管理）</td><td style="border:1px solid #ccc;padding:6px">页面关后可存活</td></tr><tr><td style="border:1px solid #ccc;padding:6px">拦截请求</td><td style="border:1px solid #ccc;padding:6px">❌</td><td style="border:1px solid #ccc;padding:6px">✅ 核心功能</td><td style="border:1px solid #ccc;padding:6px">❌</td></tr><tr><td style="border:1px solid #ccc;padding:6px">操作 DOM</td><td style="border:1px solid #ccc;padding:6px">❌</td><td style="border:1px solid #ccc;padding:6px">❌</td><td style="border:1px solid #ccc;padding:6px">❌</td></tr></table>' },
  { level: 2, q: '如何终止一个 Web Worker？',
    a: '<strong>两种方式</strong>：<br><br>① <strong>外部终止</strong>：主线程调用 <code>worker.terminate()</code>，Worker 立即停止，无法恢复<br>② <strong>内部自关闭</strong>：Worker 内部调用 <code>self.close()</code>，Worker 自行关闭<br><br><strong>重要</strong>：终止后的 Worker 无法复用，如果还需要 Worker 必须重新 <code>new Worker()</code>。<br>建议任务完成后及时终止 Worker 释放资源，尤其是在移动端。' },
  { level: 3, q: '什么是 Transferable Objects？什么场景下使用？',
    a: 'Transferable Objects（可转移对象）是一种<strong>零拷贝</strong>的数据传递方式。<br><br><strong>工作原理</strong>：将数据的<strong>所有权</strong>从一个上下文转移到另一个上下文，而不是拷贝数据。传递后原上下文中的对象变得不可用。<br><br><strong>适用类型</strong>：<code>ArrayBuffer</code>、<code>ImageBitmap</code>、<code>MessagePort</code>、<code>ReadableStream</code> 等<br><br><strong>使用方式</strong>：<br><code>const buf = new ArrayBuffer(1024 * 1024 * 100)</code> <br> <code>worker.postMessage(buf, [buf])</code> <br> <code>// 此时 buf 在主线程中已不可用（byteLength 为 0）</code><br><br><strong>适用场景</strong>：大文件上传、图像处理、Canvas 数据传递、WebAssembly 内存共享等对性能要求高的场景。' },
  { level: 3, q: '结构化克隆和 JSON.parse(JSON.stringify()) 有什么区别？',
    a: '<strong>结构化克隆（Structured Clone）</strong>是 postMessage 默认使用的序列化算法。<br><br><table style="font-size:0.85rem;border-collapse:collapse;width:100%;"><tr><th style="border:1px solid #ccc;padding:6px;text-align:left">特性</th><th style="border:1px solid #ccc;padding:6px;text-align:left">结构化克隆</th><th style="border:1px solid #ccc;padding:6px;text-align:left">JSON.parse/stringify</th></tr><tr><td style="border:1px solid #ccc;padding:6px">Date</td><td style="border:1px solid #ccc;padding:6px">✅ 保留</td><td style="border:1px solid #ccc;padding:6px">❌ 变成字符串</td></tr><tr><td style="border:1px solid #ccc;padding:6px">RegExp</td><td style="border:1px solid #ccc;padding:6px">✅ 保留</td><td style="border:1px solid #ccc;padding:6px">❌ 变空对象</td></tr><tr><td style="border:1px solid #ccc;padding:6px">Map/Set</td><td style="border:1px solid #ccc;padding:6px">✅ 保留</td><td style="border:1px solid #ccc;padding:6px">❌ 变空对象</td></tr><tr><td style="border:1px solid #ccc;padding:6px">Blob/File</td><td style="border:1px solid #ccc;padding:6px">✅ 保留</td><td style="border:1px solid #ccc;padding:6px">❌</td></tr><tr><td style="border:1px solid #ccc;padding:6px">循环引用</td><td style="border:1px solid #ccc;padding:6px">✅ 支持</td><td style="border:1px solid #ccc;padding:6px">❌ 报错</td></tr><tr><td style="border:1px solid #ccc;padding:6px">undefined</td><td style="border:1px solid #ccc;padding:6px">❌ 不保留</td><td style="border:1px solid #ccc;padding:6px">❌ 丢失</td></tr><tr><td style="border:1px solid #ccc;padding:6px">函数</td><td style="border:1px solid #ccc;padding:6px">❌ 不支持</td><td style="border:1px solid #ccc;padding:6px">❌ 丢失</td></tr></table><br>总结：结构化克隆远比 JSON 强大，但仍不支持函数和 DOM 节点。' },
  { level: 3, q: 'Worker 的创建开销有多大？什么情况下应该用？',
    a: '<strong>创建开销</strong>：<br>· 时间：约 50ms（初始化 Worker 环境）<br>· 内存：约 4MB（独立 JS 运行环境）<br><br><strong>使用建议</strong>：<br>· 适合<strong>耗时 > 100ms</strong> 的计算密集型任务<br>· 如果只是简单计算（几毫秒），直接在主线程执行反而更快<br>· 对于频繁使用的场景，建议<strong>复用 Worker</strong>（创建一次，多次 postMessage）而不是用完就 terminate<br><br><strong>不适合</strong>：DOM 操作、简单数学运算、小数组遍历<br><strong>适合</strong>：大数据排序/搜索、图像像素处理、加密解密、文件解析' },
  { level: 3, q: 'Worker 中的错误如果不处理会怎样？如何做好错误处理？',
    a: 'Worker 内部抛出的错误<strong>默认静默失败</strong>——开发者完全感知不到。<br><br><strong>正确的错误处理方式</strong>：<br><br>① <strong>外部监听</strong>：<br><code>worker.onerror = (err) => {</code><br><code>&nbsp;&nbsp;console.error("Worker 错误:", err.message)</code><br><code>}</code><br><br>② <strong>内部 try-catch</strong>：<br><code>self.onmessage = async (e) => {</code><br><code>&nbsp;&nbsp;try {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;const result = heavyComputation(e.data)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;self.postMessage(result)</code><br><code>&nbsp;&nbsp;} catch (err) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;self.postMessage({ error: err.message })</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br>③ <strong>监听 error 事件</strong>：<br><code>worker.addEventListener("error", handler)</code><br><br>建议内外双重防护，外部防止 Worker 崩溃无声，内部防止局部错误导致整个 Worker 失效。' },
  { level: 3, q: '什么是模块 Worker？有什么优势？',
    a: '<strong>模块 Worker</strong> 是支持 ES Module 语法的 Worker：<br><code>new Worker("worker.js", { type: "module" })</code><br><br><strong>优势</strong>：<br>① 支持 <code>import / export</code> 导入导出模块，不再依赖 <code>importScripts</code><br>② 支持 <strong>动态导入</strong> <code>import()</code>，按需加载代码<br>③ 模块作用域隔离，变量不互相污染<br>④ 支持 <code>await</code> 顶层使用（在支持的环境）<br>⑤ 代码组织更清晰，适合大型项目<br><br><strong>注意</strong>：模块 Worker 需要浏览器支持（Chrome 80+），且<strong>不支持跨域加载</strong>（需要服务端配置 CORS）。' },
]

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(reg => console.log('✅ Service Worker 注册成功!', reg))
    .catch(err => console.log('❌ Service Worker 注册失败', err))
}
</script>

<style scoped>
/* ============================================
   Web Worker Learning Page
   ============================================ */
.ww-page {
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

/* ─── Hero ─── */
.hero {
  text-align: center;
  padding: 2.5rem 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}
.hero h1 {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}
.hero-sub {
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.95rem;
}

/* ─── TOC ─── */
.toc {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 0.8rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-background);
  z-index: 10;
}
.toc-link {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  background: var(--color-background-soft);
  color: var(--color-text);
  text-decoration: none;
  border: 1px solid var(--color-border);
  transition: all 0.2s;
}
.toc-link:hover {
  background: var(--color-background-mute);
  color: var(--color-heading);
  border-color: var(--color-heading);
}

/* ─── Section Card ─── */
.section-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
}
.s-title {
  font-size: 1.3rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}
.s-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1.2rem;
}
.s-desc code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}
.s-tip {
  background: color-mix(in srgb, hsla(160, 100%, 37%, 1) 10%, transparent);
  border-left: 3px solid hsla(160, 100%, 37%, 1);
  padding: 0.8rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-text);
}

/* ─── Diagram ─── */
.diagram {
  margin-bottom: 1rem;
}
.diagram-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.diagram-box {
  flex: 1;
  min-width: 200px;
  padding: 16px;
  border-radius: 10px;
  text-align: center;
}
.main-thread {
  background: rgba(231, 76, 60, 0.1);
  border: 2px solid #e74c3c44;
}
.worker-thread {
  background: rgba(66, 184, 131, 0.1);
  border: 2px solid #42b88344;
}
.diagram-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
  margin-bottom: 10px;
}
.diagram-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.tag {
  font-size: 0.78rem;
  background: var(--color-background);
  padding: 4px 10px;
  border-radius: 4px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.diagram-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.arrow-icon {
  font-size: 1.5rem;
}
.arrow-label {
  font-size: 0.72rem;
  color: var(--color-text);
  opacity: 0.6;
}

/* ─── Demo Area ─── */
.demo-area {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
}
.test-input-group {
  margin-bottom: 1rem;
}
.test-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-heading);
}
.test-input {
  width: 100%;
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background-soft);
  color: var(--color-text);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.test-input:focus {
  border-color: hsla(160, 100%, 37%, 1);
}

/* ─── Controls ─── */
.ww-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.ctrl-btn {
  padding: 8px 18px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.ctrl-btn:hover:not(:disabled) {
  border-color: var(--color-heading);
  color: var(--color-heading);
}
.ctrl-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.worker-btn {
  border-color: #42b88388;
  color: #42b883;
}
.worker-btn:hover:not(:disabled) {
  background: #42b883;
  color: #fff;
}
.reset-btn:hover:not(:disabled) {
  border-color: #e74c3c;
  color: #e74c3c;
}

/* ─── Results ─── */
.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.result-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.result-card.is-active {
  box-shadow: 0 0 0 2px hsla(160, 100%, 37%, 0.3);
}
.result-header {
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 12px;
}
.result-body {
  padding: 10px 12px;
}
.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.85rem;
}
.result-row + .result-row {
  border-top: 1px solid var(--color-border);
}
.result-key {
  color: var(--color-text);
  opacity: 0.6;
}
.result-val {
  font-weight: 600;
  color: var(--color-heading);
  text-align: right;
}
.result-val.mono {
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 0.82rem;
  word-break: break-all;
}
.result-val.is-blocked {
  color: #e74c3c;
}

/* ─── Code Blocks ─── */
.code-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 1rem 0 0.3rem;
}
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.6;
  margin: 0 0 0.8rem;
  tab-size: 2;
}
.code-block code {
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  white-space: pre;
}
.code-block.mini {
  padding: 0.6rem 0.8rem;
  margin: 0;
  font-size: 0.78rem;
}

/* ─── Section 3: Capabilities ─── */
.cap-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
.cap-card {
  border-radius: 8px;
  padding: 1rem;
}
.cap-card ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  line-height: 1.8;
}
.cap-ok {
  background: rgba(66, 184, 131, 0.08);
  border: 1px solid #42b88344;
}
.cap-ok .cap-header { color: #42b883; }
.cap-no {
  background: rgba(231, 76, 60, 0.08);
  border: 1px solid #e74c3c44;
}
.cap-no .cap-header { color: #e74c3c; }
.cap-header {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

/* ─── Section 4: Comparison Table ─── */
.sw-table-wrap {
  overflow-x: auto;
  margin-bottom: 1rem;
}
.sw-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.sw-table th,
.sw-table td {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  text-align: left;
}
.sw-table th {
  background: var(--color-background-mute);
  font-weight: 600;
  color: var(--color-heading);
  font-size: 0.85rem;
}
.sw-table td {
  color: var(--color-text);
}
.dim-cell {
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
  background: var(--color-background-mute);
}

/* ─── Section 5: Data Transfer ─── */
.data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
.data-card {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.2rem;
}
.data-icon {
  font-size: 1.8rem;
  margin-bottom: 4px;
}
.data-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-heading);
  margin-bottom: 6px;
}
.data-desc {
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 8px;
  color: var(--color-text);
}

/* ─── Section 6: Notes ─── */
.note-list {
  margin-bottom: 1rem;
}
.note-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}
.note-item:last-child {
  border-bottom: none;
}
.note-num {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 600;
}
.note-text {
  font-size: 0.88rem;
  line-height: 1.5;
  padding-top: 2px;
  color: var(--color-text);
}
.note-text code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

/* ─── Section 7: Cases ─── */
.cases-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 1.5rem;
}
.case-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}
.case-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
}
.case-company {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--color-heading);
}
.case-product {
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.6;
  background: var(--color-background);
  padding: 2px 8px;
  border-radius: 4px;
}
.case-body {
  padding: 12px 14px;
  font-size: 0.85rem;
  line-height: 1.6;
}
.case-body > div {
  margin-bottom: 6px;
}
.case-body > div:last-child {
  margin-bottom: 0;
}
.case-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 3px;
  margin-right: 6px;
  vertical-align: middle;
}
.case-scenario .case-tag {
  background: #3498db22;
  color: #3498db;
}
.case-problem .case-tag {
  background: #e74c3c22;
  color: #e74c3c;
}
.case-solution .case-tag {
  background: #42b88322;
  color: #42b883;
}
.case-result .case-tag {
  background: #f39c1222;
  color: #f39c12;
}
.cases-patterns {
  margin-bottom: 1rem;
}
.s-subtitle {
  font-size: 1.05rem;
  color: var(--color-heading);
  margin: 0 0 0.8rem;
}
.pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.pattern-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
}
.pattern-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}
.pattern-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-heading);
  margin-bottom: 2px;
}
.pattern-desc {
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.7;
}

/* ─── Section 8: Q&A ─── */
.qa-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qa-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.qa-item.qa-open {
  border-color: hsla(160, 100%, 37%, 0.5);
  box-shadow: 0 0 0 1px hsla(160, 100%, 37%, 0.15);
}
.qa-question {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  background: var(--color-background);
  color: var(--color-heading);
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.qa-question:hover {
  background: var(--color-background-mute);
}
.qa-level {
  flex-shrink: 0;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 3px;
}
.qa-lv1 {
  background: #42b88322;
  color: #42b883;
}
.qa-lv2 {
  background: #f39c1222;
  color: #f39c12;
}
.qa-lv3 {
  background: #e74c3c22;
  color: #e74c3c;
}
.qa-text {
  flex: 1;
  line-height: 1.4;
}
.qa-arrow {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.4;
}
.qa-answer {
  border-top: 1px solid var(--color-border);
  background: var(--color-background-soft);
}
.qa-answer-inner {
  padding: 14px;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--color-text);
}
.qa-answer-inner code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}
.qa-answer-inner strong {
  color: var(--color-heading);
}

/* ─── Responsive ─── */
@media (max-width: 700px) {
  .hero h1 { font-size: 1.3rem; }
  .section-card { padding: 1.2rem; }
  .result-grid { grid-template-columns: 1fr; }
  .cap-grid { grid-template-columns: 1fr; }
  .data-grid { grid-template-columns: 1fr; }
  .diagram-row { flex-direction: column; }
}
</style>
