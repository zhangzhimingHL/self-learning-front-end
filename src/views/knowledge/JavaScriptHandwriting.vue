<template>
  <div class="js-page">
    <header class="hero">
      <h1>核心手写题合集</h1>
      <p class="hero-sub">面试必考 · <span class="kw">EventEmitter</span> · <span class="kw">并发调度器</span> · <span class="kw">防抖节流</span> · <span class="kw">call/apply/bind</span> · <span class="kw">new</span></p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: EventEmitter -->
    <!-- ============================================================ -->
    <section id="s1-emitter" class="section-card">
      <h2 class="s-title">一、EventEmitter 发布订阅 <span class="s-badge">字节/阿里高频</span></h2>
      <p class="s-desc">
        <span class="kw">发布订阅模式</span>是前端最常用的设计模式之一。核心方法：<code>on</code>（订阅）、<code>emit</code>（发布）、<code>off</code>（取消订阅）、<code>once</code>（一次性订阅）。
      </p>

      <h3 class="s-subtitle">① 核心概念</h3>
      <p class="s-desc">
        本质是一个<span class="kw">事件 → 回调数组</span>的映射。on 把回调存进数组，emit 遍历数组依次调用，off 从数组里移除，once 包装成执行一次后自动移除。
      </p>
      <div class="rule-list">
        <div class="rule-item">
          <span class="rule-tag rv">on(event, fn)</span>
          <span>→ 将 fn 添加到 events[event] 数组中，返回<span class="kw">取消订阅函数</span></span>
        </div>
        <div class="rule-item">
          <span class="rule-tag ra">emit(event, ...args)</span>
          <span>→ 遍历 events[event] 数组，<span class="kw">依次同步调用</span>每个回调</span>
        </div>
        <div class="rule-item">
          <span class="rule-tag rt">once(event, fn)</span>
          <span>→ 包装 fn：执行一次后自动 <span class="kw">off</span>（在 emit 时处理）</span>
        </div>
        <div class="rule-item">
          <span class="rule-tag rn">off(event, fn?)</span>
          <span>→ 从 events[event] 中移除指定 fn，不传 fn 则<span class="kw">移除全部</span></span>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">event-emitter-demo.js</span>
          <button class="run-btn" @click="runCode('emitterDemo')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.emitterDemo.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.emitterDemo.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.emitterDemo.output || '点击 "运行" 查看发布订阅执行过程' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 手写 EventEmitter</h3>
      <p class="s-desc">
        实现完整版，需要处理：<span class="kw">once 包装</span>、<span class="kw">off 精确移除</span>（用 indexOf 找）、<span class="kw">emit 时避免 splice 破坏遍历</span>（用副本遍历）。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-event-emitter.js</span>
          <button class="run-btn" @click="runCode('myEmitter')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myEmitter.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myEmitter.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myEmitter.output || '点击 "运行" 测试手写 EventEmitter' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试陷阱</strong>：emit 时如果直接对 events[eventName] 做 splice（比如 once 回调执行后移除自身），会导致<span class="kw">遍历错乱</span>（数组长度变化、索引跳跃）。正确做法是<span class="kw">先拷贝数组再遍历</span>：<code>[...handlers].forEach(fn => fn())</code>。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 带并发限制的异步调度器 -->
    <!-- ============================================================ -->
    <section id="s2-scheduler" class="section-card">
      <h2 class="s-title">二、带并发限制的异步调度器 <span class="s-badge">字节超高频</span></h2>
      <p class="s-desc">
        给定一组异步任务，要求<span class="kw">同时最多运行 N 个</span>，一个任务完成后立即从等待队列取下一个补上。
        本质是<span class="kw">池化</span>思想——维持一个固定大小的"执行槽位"，任务在槽位中执行，满了就排队。
      </p>

      <h3 class="s-subtitle">① 使用示例</h3>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">scheduler-demo.js</span>
          <button class="run-btn" @click="runCode('schedulerDemo')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.schedulerDemo.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.schedulerDemo.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.schedulerDemo.output || '点击 "运行" 查看调度过程' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 手写实现</h3>
      <p class="s-desc">
        核心：<span class="kw">running 计数器</span> + <span class="kw">pending 等待队列</span>。每个任务完成后调用 <code>#next()</code> 检查是否有空位并从队列取下一个。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-scheduler.js</span>
          <button class="run-btn" @click="runCode('myScheduler')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myScheduler.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myScheduler.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myScheduler.output || '点击 "运行" 测试手写调度器' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分</strong>：用 <code>add(fn)</code> 返回一个 <code>Promise</code>，任务执行完后 resolve 结果——这让调用方可以用 <code>await scheduler.add(fn)</code> 拿到每个任务的返回值。这就是<span class="kw">"任务 + 队列"</span>模式，Webpack 的模块构建、Vite 的文件预构建都用类似思路。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 防抖与节流 -->
    <!-- ============================================================ -->
    <section id="s3-debounce" class="section-card">
      <h2 class="s-title">三、防抖与节流 <span class="s-badge">高频</span></h2>
      <p class="s-desc">
        两者都是<span class="kw">控制高频触发</span>的手段，但策略截然不同：<span class="kw">防抖 debounce</span> 是"等你停下来再执行"，<span class="kw">节流 throttle</span> 是"固定节奏执行"。
      </p>

      <h3 class="s-subtitle">① 对比可视化</h3>
      <div class="method-list">
        <div class="method-item">
          <code>debounce(fn, delay)</code>
          <span>— 每次触发重新计时，<span class="kw">最后一次触发后 delay ms 才执行</span>。适合输入框搜索、窗口 resize</span>
        </div>
        <div class="method-item">
          <code>throttle(fn, interval)</code>
          <span>— 每隔 interval ms <span class="kw">最多执行一次</span>。适合滚动事件、按钮防重复点击</span>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">debounce-throttle-demo.js</span>
          <button class="run-btn" @click="runCode('debounceThrottleDemo')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.debounceThrottleDemo.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.debounceThrottleDemo.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.debounceThrottleDemo.output || '点击 "运行" 对比防抖和节流' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 手写 debounce（含 immediate + cancel）</h3>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-debounce.js</span>
          <button class="run-btn" @click="runCode('myDebounce')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myDebounce.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myDebounce.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myDebounce.output || '点击 "运行" 测试手写 debounce' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ 手写 throttle（时间戳法 + 定时器法）</h3>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-throttle.js</span>
          <button class="run-btn" @click="runCode('myThrottle')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myThrottle.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myThrottle.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myThrottle.output || '点击 "运行" 测试手写 throttle' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试陷阱</strong>：throttle 有两种实现——<span class="kw">时间戳法</span>（立即执行，最后一次不执行）和<span class="kw">定时器法</span>（延迟执行，最后一次会执行）。实际面试中通常会要求写"<span class="kw">首次触发立即执行</span>"的版本，需要结合两种思路。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 手写 call / apply / bind -->
    <!-- ============================================================ -->
    <section id="s4-call-apply-bind" class="section-card">
      <h2 class="s-title">四、手写 call / apply / bind <span class="s-badge">必考</span></h2>
      <p class="s-desc">
        三者都用于<span class="kw">改变函数的 this 指向</span>。<code>call/apply</code> 立即执行，<code>bind</code> 返回绑定后的新函数。手写的关键是理解<span class="kw">隐式绑定</span>——<code>obj.fn()</code> 中 fn 的 this 指向 obj。
      </p>

      <h3 class="s-subtitle">① 手写 call</h3>
      <p class="s-desc">
        核心思路：把函数<span class="kw">临时挂到目标对象上</span>当作方法调用，利用 <code>obj.fn()</code> 的隐式绑定改变 this，调用完再删掉。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-call-apply-bind.js</span>
          <button class="run-btn" @click="runCode('myCallApplyBind')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myCallApplyBind.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myCallApplyBind.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myCallApplyBind.output || '点击 "运行" 测试手写 call/apply/bind' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分细节</strong>：<br>
        ① <code>call</code> 使用 <code>Symbol</code> 做临时属性名，避免覆盖对象上已有的属性<br>
        ② <code>bind</code> 返回的函数还要支持 <code>new</code> 调用——当用 new 调用时，this 应该指向新创建的实例而非绑定对象<br>
        ③ <code>bind</code> 返回的函数要保持 <code>prototype</code> 链
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 手写 new -->
    <!-- ============================================================ -->
    <section id="s5-new" class="section-card">
      <h2 class="s-title">五、手写 new 操作符 <span class="s-badge">必考</span></h2>
      <p class="s-desc">
        <code>new Fn(...)</code> 做了四件事。手写 <code>myNew</code> 是面试经典题。
      </p>

      <h3 class="s-subtitle">① new 的四步</h3>
      <div class="rule-list">
        <div class="rule-item">
          <span class="rule-tag rv">① 创建对象</span>
          <span>→ 创建一个<span class="kw">空对象</span>，其 <code>__proto__</code> 指向构造函数的 <code>prototype</code></span>
        </div>
        <div class="rule-item">
          <span class="rule-tag ra">② 绑定 this</span>
          <span>→ 以新对象为 this 执行构造函数（<span class="kw">call/apply</span>）</span>
        </div>
        <div class="rule-item">
          <span class="rule-tag rt">③ 返回结果</span>
          <span>→ 如果构造函数返回<span class="kw">对象</span>（引用值），用该返回值；否则返回新创建的对象</span>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-new.js</span>
          <button class="run-btn" @click="runCode('myNew')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myNew.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myNew.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myNew.output || '点击 "运行" 测试手写 new' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>易错点</strong>：构造函数如果返回了<span class="kw">对象（包括数组、函数）</span>，new 就用这个返回值。但如果返回的是<span class="kw">原始值（字符串、数字等）</span>，new 会忽略它，返回创建的对象。这个细节经常被忽略。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s6-playground" class="section-card">
      <h2 class="s-title">六、🧪 动手实验区</h2>
      <p class="s-desc">修改代码，测试手写实现的行为。</p>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-code.js</span>
          <button class="run-btn" @click="runCode('playground')">▶ 运行你的代码</button>
          <button class="run-btn reset-btn" @click="resetPlayground">↺ 重置</button>
        </div>
        <textarea v-model="playgroundCode" class="code-editor" spellcheck="false" rows="12"></textarea>
        <div class="output-panel" :class="{ 'has-content': snippets.playground.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.playground.output || '修改上方代码，点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <div class="playground-hints">
        <p><strong>试试这些场景：</strong></p>
        <div class="hint-chips">
          <span class="hint-chip" @click="loadHint(0)">🔹 测试 EventEmitter.once</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 测试调度器并发数</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 测试 debounce immediate</span>
          <span class="hint-chip" @click="loadHint(3)">🔹 测试 bind 后的 new</span>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 7: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s7-qa" class="section-card">
      <h2 class="s-title">七、面试高频问答（⭐→⭐⭐⭐）</h2>
      <p class="s-desc">点击问题展开答案，先思考再看解析。</p>

      <div class="qa-list">
        <div v-for="(item, idx) in questions" :key="idx" class="qa-item" :class="{ 'qa-open': openIdx === idx }">
          <button class="qa-question" @click="openIdx = openIdx === idx ? -1 : idx">
            <span class="qa-level" :class="'qa-lv' + item.level">{{ '⭐'.repeat(item.level) }}</span>
            <span class="qa-text">{{ item.q }}</span>
            <span class="qa-arrow">{{ openIdx === idx ? '▾' : '▸' }}</span>
          </button>
          <div class="qa-answer" v-if="openIdx === idx">
            <div class="qa-answer-inner" v-html="item.a"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DefTooltip from '@/components/DefTooltip.vue'

const toc = [
  { id: 's1-emitter',      label: 'EventEmitter' },
  { id: 's2-scheduler',    label: '调度器' },
  { id: 's3-debounce',     label: '防抖节流' },
  { id: 's4-call-apply-bind', label: 'call/apply/bind' },
  { id: 's5-new',          label: '手写 new' },
  { id: 's6-playground',   label: '动手实验' },
  { id: 's7-qa',           label: '面试问答' },
]

function captureConsole(fn: () => void): string[] {
  const lines: string[] = []
  const origLog = console.log
  const origError = console.error
  console.log = (...args: unknown[]) => lines.push(args.map(a => formatArg(a)).join(' '))
  console.error = (...args: unknown[]) => lines.push('❌ ' + args.map(a => formatArg(a)).join(' '))
  try { fn() } catch (e: unknown) { lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e))) }
  console.log = origLog
  console.error = origError
  return lines
}

function formatArg(arg: unknown): string {
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'
  if (typeof arg === 'string') return arg
  if (typeof arg === 'object') { try { return JSON.stringify(arg) } catch { return String(arg) } }
  return String(arg)
}

function runAsync(fn: () => void, snippetKey: string) {
  const snippet = snippets[snippetKey]
  if (!snippet) return
  snippet.output = '⏳ 执行中...'
  const captured: string[] = []
  const origLog = console.log
  console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
  setTimeout(() => {
    console.log = origLog
    snippet.output = captured.join('\n')
  }, 500)
  try { fn() } catch (e: unknown) {
    console.log = origLog
    snippet.output = '💥 错误: ' + (e instanceof Error ? e.message : String(e))
  }
}

interface Snippet { code: string; output: string }
const snippets = reactive<Record<string, Snippet>>({
  // ─── EventEmitter Demo ───
  emitterDemo: {
    code: `// EventEmitter 基本使用演示
class EventEmitter {
  constructor() {
    this._events = {}  // { eventName: [fn1, fn2, ...] }
  }
  on(event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn)
  }
  emit(event, ...args) {
    const fns = this._events[event]
    if (!fns) return
    // 关键：先拷贝再遍历，防止 once 的 splice 破坏遍历
    for (const fn of [...fns]) {
      fn(...args)
    }
  }
  off(event, fn) {
    const fns = this._events[event]
    if (!fns) return
    if (fn) {
      const i = fns.indexOf(fn)
      if (i > -1) fns.splice(i, 1)
    } else {
      delete this._events[event]
    }
  }
  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args)
      this.off(event, wrapper)  // 执行一次后自动移除
    }
    this.on(event, wrapper)
  }
}

const bus = new EventEmitter()

// 订阅
bus.on('click', (x, y) => console.log('点击坐标:', x, y))
bus.on('click', () => console.log('第二个点击回调'))

// 一次性订阅
bus.once('load', () => console.log('页面加载完成（只触发一次）'))

// 发布
bus.emit('click', 100, 200)
// 输出：
//   点击坐标: 100 200
//   第二个点击回调

bus.emit('load')
// 输出：页面加载完成（只触发一次）

bus.emit('load')  // 第二次 emit 不会触发——因为 once 已自动移除
console.log('第二次 emit load 无输出 ✓')

// 取消订阅
const fn = () => console.log('不会被调用')
bus.on('test', fn)
bus.off('test', fn)
bus.emit('test')
console.log('取消订阅成功，无输出 ✓')`,
    output: '',
  },

  // ─── 手写 EventEmitter ───
  myEmitter: {
    code: `// ===== 手写 EventEmitter 完整版 =====
class MyEventEmitter {
  #events = new Map()

  on(event, fn) {
    const fns = this.#events.get(event) || []
    fns.push(fn)
    this.#events.set(event, fns)
    // 返回取消订阅函数
    return () => this.off(event, fn)
  }

  emit(event, ...args) {
    const fns = this.#events.get(event)
    if (!fns || !fns.length) return
    // 先拷贝再遍历——防止 off/splice 破坏遍历
    for (const fn of [...fns]) {
      fn(...args)
    }
  }

  off(event, fn) {
    if (!fn) return this.#events.delete(event)
    const fns = this.#events.get(event)
    if (!fns) return
    const idx = fns.indexOf(fn)
    if (idx > -1) fns.splice(idx, 1)
    if (!fns.length) this.#events.delete(event)
  }

  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args)
      this.off(event, wrapper)
    }
    return this.on(event, wrapper)
  }
}

// ===== 测试 =====
const emitter = new MyEventEmitter()

const unsub = emitter.on('data', (msg) => {
  console.log('收到数据:', msg)
})

emitter.emit('data', 'hello')
emitter.emit('data', 'world')

unsub()  // 取消订阅
emitter.emit('data', '这条不会被打印')

emitter.once('ready', () => console.log('初始化完成'))
emitter.emit('ready')  // 第一次触发
emitter.emit('ready')  // 第二次不触发

console.log('测试通过 ✓')`,
    output: '',
  },

  // ─── 调度器 Demo ───
  schedulerDemo: {
    code: `// 模拟异步任务
function delay(ms, label) {
  return () => new Promise(resolve => {
    console.log(\`  ▶ 开始: \${label}\`)
    setTimeout(() => {
      console.log(\`  ✔ 完成: \${label}\`)
      resolve(label)
    }, ms)
  })
}

// Scheduler：最多同时执行 2 个任务
class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.running = 0
    this.queue = []
  }
  add(task) {
    return new Promise((resolve, reject) => {
      const run = () => {
        this.running++
        task().then(resolve, reject).finally(() => {
          this.running--
          this.next()
        })
      }
      this.queue.push(run)
      this.next()
    })
  }
  next() {
    if (this.running < this.limit && this.queue.length) {
      this.queue.shift()()
    }
  }
}

// 测试：4 个任务，并发限制 2
const scheduler = new Scheduler(2)

function test() {
  console.log('开始调度（并发限制为 2）')
  Promise.all([
    scheduler.add(delay(200, 'Task-1')),
    scheduler.add(delay(50,  'Task-2')),
    scheduler.add(delay(100, 'Task-3')),
    scheduler.add(delay(80,  'Task-4')),
  ]).then(results => {
    console.log('全部任务完成:', results)
    console.log('顺序应为: [Task-1, Task-2, Task-3, Task-4]')
  })
}
test()

// 预期输出：
// ▶ 开始: Task-1
// ▶ 开始: Task-2      ← 同时最多 2 个
// ✔ 完成: Task-2      ← 50ms 后完成，补上 Task-3
// ▶ 开始: Task-3
// ✔ 完成: Task-3      ← 100ms 后完成，补上 Task-4
// ▶ 开始: Task-4
// ✔ 完成: Task-4
// ✔ 完成: Task-1      ← 200ms 后完成
// 全部任务完成: [Task-1, Task-2, Task-3, Task-4]`,
    output: '',
  },

  // ─── 手写调度器 ───
  myScheduler: {
    code: `// ===== 手写并发调度器 =====
class MyScheduler {
  constructor(limit = 2) {
    this.limit = limit
    this.running = 0
    this.queue = []
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject })
      this.#run()
    })
  }

  #run() {
    if (this.running >= this.limit || !this.queue.length) return
    const { task, resolve, reject } = this.queue.shift()
    this.running++
    // 用 Promise.resolve 包装保证 task 返回的是 thenable
    Promise.resolve(task()).then(resolve, reject).finally(() => {
      this.running--
      this.#run()
    })
  }
}

// ===== 测试 =====
let start = Date.now()
function time(label) {
  const elapsed = Date.now() - start
  console.log(\`\${label} [+ \${elapsed}ms]\`)
}

const scheduler = new MyScheduler(2)

function makeTask(name, ms) {
  return () => new Promise(resolve => {
    time(\`▶ 开始 \${name}\`)
    setTimeout(() => {
      time(\`✔ 完成 \${name}\`)
      resolve(name)
    }, ms)
  })
}

Promise.all([
  scheduler.add(makeTask('A', 200)),
  scheduler.add(makeTask('B', 50)),
  scheduler.add(makeTask('C', 100)),
  scheduler.add(makeTask('D', 80)),
]).then(results => {
  time('全部完成: ' + results.join(', '))
})

// 预期现象：
// - A 和 B 同时开始（running=2，C/D 排队）
// - B 先完成（50ms）→ 补上 C
// - D 还在排队，等 A(200ms) 或 C(100ms) 完成
// - 总耗时约 280ms（A 200 + 排队中 C 完成后的 D 80）`,
    output: '',
  },

  // ─── 防抖节流对比 Demo ───
  debounceThrottleDemo: {
    code: `// ===== 防抖 vs 节流 =====
let callCount = 0

// 防抖：每次调用重置定时器，等停下来才执行
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流（时间戳版）：两次执行的间隔 ≥ interval
function throttle(fn, interval) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}

// 模拟高频触发
function simulate(type, controlledFn, total = 5) {
  console.log(\`--- \${type} 测试 (5次触发) ---\`)
  const start = Date.now()
  let i = 0
  const id = setInterval(() => {
    const elapsed = Date.now() - start
    if (i < total) {
      controlledFn('触发#' + (i+1) + ' [' + elapsed + 'ms]')
    }
    i++
    if (i >= total) clearInterval(id)
  }, 80)  // 每 80ms 触发一次
}

// 实际执行函数
function handler(label) {
  callCount++
  console.log(\`  执行 \${label}  累计执行次数: \${callCount}\`)
}

// 测试 debounce（delay=200ms）
callCount = 0
console.log('【防抖 debounce 200ms】')
simulate('debounce', debounce((msg) => handler(msg), 200))

setTimeout(() => {
  // 测试 throttle（interval=200ms）
  callCount = 0
  console.log('\\n【节流 throttle 200ms】')
  simulate('throttle', throttle((msg) => handler(msg), 200))
}, 1500)

// 防抖：5 次连续触发算 1 次（最后一次 80*4=320ms 后才执行）
// 节流：5 次连续触发，每隔 200ms 执行一次（约 2-3 次）`,
    output: '',
  },

  // ─── 手写 debounce ───
  myDebounce: {
    code: `// ===== 手写 debounce（含 immediate + cancel）=====
function myDebounce(fn, delay, immediate = false) {
  let timer = null
  let lastCallTime = 0

  const debounced = function (...args) {
    const now = Date.now()

    const later = () => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }

    const callNow = immediate && Date.now() - lastCallTime >= delay
    clearTimeout(timer)
    timer = setTimeout(later, delay)

    if (callNow) {
      lastCallTime = now
      fn.apply(this, args)
    }
  }

  // cancel 方法：清除定时器
  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

// ===== 测试 =====
let count = 0
const fn = (msg) => {
  count++
  console.log(\`执行#\${count}: \${msg}\`)
}

// 普通防抖（trailing）
console.log('--- 普通防抖（trailing）---')
const d1 = myDebounce(fn, 150)
d1('第一次')
d1('第二次')
d1('第三次')  // 只有这次会执行

setTimeout(() => {
  count = 0
  // immediate 防抖
  console.log('\\n--- immediate 防抖 ---')
  const d2 = myDebounce((msg) => fn(msg), 150, true)
  d2('第一次')          // 立即执行
  d2('第二次')          // 忽略（还没过 150ms）
  d2('忽略的调用')
  setTimeout(() => d2('延迟调用'), 200)  // 过了 150ms，立即执行

  // cancel 功能
  setTimeout(() => {
    count = 0
    console.log('\\n--- cancel 功能 ---')
    const d3 = myDebounce((msg) => fn(msg), 200)
    d3('这条不会执行')
    d3.cancel()
    setTimeout(() => console.log('cancel 后 count=' + count + ' ✓'), 300)
  }, 600)
}, 800)`,
    output: '',
  },

  // ─── 手写 throttle ───
  myThrottle: {
    code: `// ===== 手写 throttle =====
function myThrottle(fn, interval, options = {}) {
  const { leading = true, trailing = true } = options
  let timer = null
  let lastTime = 0

  const throttled = function (...args) {
    const now = Date.now()

    // 第一次调用：如果 leading 为 false，更新 lastTime 跳过首次
    if (!lastTime && !leading) {
      lastTime = now
    }

    const remaining = interval - (now - lastTime)

    if (remaining <= 0) {
      // 间隔到了，立即执行
      if (timer) { clearTimeout(timer); timer = null }
      lastTime = now
      fn.apply(this, args)
    } else if (!timer && trailing) {
      // 间隔不到但需要 trailing，设置定时器
      timer = setTimeout(() => {
        timer = null
        lastTime = leading ? Date.now() : 0
        fn.apply(this, args)
      }, remaining)
    }
  }

  throttled.cancel = () => {
    clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return throttled
}

// ===== 测试 =====
let count = 0
function handler(msg) {
  count++
  console.log(\`执行#\${count}: \${msg} [\${Date.now() % 100000}ms]\`)
}

// 场景：模拟高频滚动（每 80ms 触发一次，节流间隔 200ms）
console.log('模拟高频调用（节流间隔 200ms）')
const t = myThrottle(handler, 200, { leading: true, trailing: true })

const id = setInterval(() => {
  const n = count + 1
  t('调用-' + n)
  if (n >= 8) {
    clearInterval(id)
    setTimeout(() => {
      console.log(\`\\n总执行次数: \${count} (远小于 8 次触发)\`)
    }, 500)
  }
}, 80)

// leading=true + trailing=true → 首次立即执行 + 最后一次会补充执行`,
    output: '',
  },

  // ─── 手写 call/apply/bind ───
  myCallApplyBind: {
    code: `// ===== 手写 call =====
Function.prototype.myCall = function (context, ...args) {
  // 处理 null/undefined → 全局对象
  context = context == null ? globalThis : Object(context)
  // 用 Symbol 做唯一 key，防止覆盖已有属性
  const key = Symbol('fn')
  context[key] = this        // this 就是调用的函数
  const result = context[key](...args)
  delete context[key]
  return result
}

// ===== 手写 apply =====
Function.prototype.myApply = function (context, args) {
  context = context == null ? globalThis : Object(context)
  const key = Symbol('fn')
  context[key] = this
  const result = args ? context[key](...args) : context[key]()
  delete context[key]
  return result
}

// ===== 手写 bind =====
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this
  const bound = function (...callArgs) {
    // new 调用时，this 指向实例而非 context
    const actualThis = new.target ? this : context
    return fn.apply(actualThis, [...boundArgs, ...callArgs])
  }
  // 维护原型链
  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype)
  }
  return bound
}

// ===== 测试 =====
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation)
}
const user = { name: '张三' }

console.log('--- call ---')
greet.myCall(user, 'Hello', '!')

console.log('--- apply ---')
greet.myApply(user, ['你好', '。'])

console.log('--- bind ---')
const greetZhang = greet.myBind(user, 'Hi')
greetZhang('!!')

console.log('--- bind 后 new ---')
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name + ' ' + this.age + '岁')
}
const BoundPerson = Person.myBind(null, '李四')
const p = new BoundPerson(25)
console.log('实例:', p.name, p.age)
console.log('原型链:', p instanceof Person, p instanceof BoundPerson)`,
    output: '',
  },

  // ─── 手写 new ───
  myNew: {
    code: `// ===== 手写 new =====
function myNew(constructor, ...args) {
  // ① 创建对象，原型指向 constructor.prototype
  const obj = Object.create(constructor.prototype)
  // ② 以 obj 为 this 执行构造函数
  const result = constructor.apply(obj, args)
  // ③ 如果返回的是引用值（对象/函数/数组），用返回值；否则用 obj
  return result instanceof Object ? result : obj
}

// ===== 测试 =====
function Animal(type) {
  this.type = type
}
Animal.prototype.speak = function () {
  console.log('我是 ' + this.type)
}

const cat = myNew(Animal, '猫')
cat.speak()
console.log('构造自 Animal:', cat instanceof Animal)
console.log('type 属性:', cat.type)

// 测试：构造函数返回对象
function Factory(name) {
  return { name, isFactory: true }
}
const f = myNew(Factory, '特殊工厂')
console.log('\\n返回对象的构造函数:')
console.log('不是 Factory 实例:', f instanceof Factory)  // false
console.log('直接是返回的对象:', f)

// 测试：构造函数返回原始值（被忽略）
function Person(name) {
  this.name = name
  return 42  // 原始值，被忽略！
}
const p = myNew(Person, '王五')
console.log('\\n返回原始值的构造函数:')
console.log('name:', p.name)  // '王五'，不是 42
console.log('是 Person 实例:', p instanceof Person)
console.log('原始值被忽略 ✓')`,
    output: '',
  },

  // ─── 动手实验区 ───
  playground: {
    code: `// 在这里测试你的手写实现
// 试试写一个 EventEmitter 或 debounce

class MyEmitter {
  constructor() {
    this._events = {}
  }
  on(event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn)
  }
  emit(event, ...args) {
    const fns = this._events[event]
    if (!fns) return
    // 为什么用 [...fns] 而不是直接遍历？
    for (const fn of [...fns]) {
      fn(...args)
    }
  }
}

const bus = new MyEmitter()
bus.on('test', (msg) => console.log('收到:', msg))
bus.emit('test', 'Hello Handwriting!')`,
    output: '',
  },
})

// ─── 运行代码 ───
function runCode(key: string) {
  if (key === 'playground') {
    snippets.playground.output = ''
    const captured: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
    try {
      const func = new Function('Promise', 'setTimeout', 'setInterval', playgroundCode.value)
      func(Promise, setTimeout, setInterval)
    } catch (e: unknown) {
      captured.push('💥 错误: ' + (e instanceof Error ? e.message : String(e)))
    }
    setTimeout(() => {
      console.log = origLog
      if (captured.length) snippets.playground.output = captured.join('\n')
    }, 200)
    snippets.playground.output = '⏳ 执行中...\n' + captured.join('\n')
    return
  }

  // 需要 setTimeout 延迟输出的代码段
  const asyncKeys = ['emitterDemo', 'myEmitter', 'schedulerDemo', 'myScheduler',
    'debounceThrottleDemo', 'myDebounce', 'myThrottle', 'myCallApplyBind', 'myNew']
  if (asyncKeys.includes(key)) {
    runAsync(() => {
      const func = new Function('Promise', 'setTimeout', 'setInterval', 'globalThis', snippets[key].code)
      func(Promise, setTimeout, setInterval, globalThis)
    }, key)
    return
  }

  const snippet = snippets[key]
  if (!snippet) return
  const lines = captureConsole(() => {
    const func = new Function('Promise', 'setTimeout', snippet.code)
    func(Promise, setTimeout)
  })
  snippet.output = lines.join('\n')
}

// ─── 动手实验区 ───
const playgroundCode = ref(snippets.playground.code)
function resetPlayground() {
  playgroundCode.value = snippets.playground.code
  snippets.playground.output = ''
}
const hints = [
  `// 测试 EventEmitter.once
const emitter = new (class {
  constructor() { this._events = {} }
  on(e, fn) { (this._events[e] || (this._events[e] = [])).push(fn) }
  emit(e, ...args) { (this._events[e] || []).forEach(fn => fn(...args)) }
  once(e, fn) {
    const wrapper = (...args) => {
      fn(...args)
      this.off(e, wrapper)
    }
    this.on(e, wrapper)
  }
  off(e, fn) {
    const fns = this._events[e]
    if (!fns) return
    const i = fns.indexOf(fn)
    if (i > -1) fns.splice(i, 1)
  }
})()

emitter.once('init', () => console.log('第1次 init'))
emitter.emit('init')   // 输出
emitter.emit('init')   // 不输出——once 已移除
console.log('once 测试通过 ✓')`,
  `// 测试并发调度器：limit=1 退化为串行
class Scheduler {
  constructor(limit) { this.limit = limit; this.running = 0; this.queue = [] }
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        this.running++
        Promise.resolve(task()).then(resolve, reject).finally(() => {
          this.running--
          if (this.queue.length && this.running < this.limit)
            this.queue.shift()()
        })
      })
      if (this.running < this.limit && this.queue.length)
        this.queue.shift()()
    })
  }
}

function delay(ms, label) {
  return () => new Promise(r => {
    console.log('▶ ' + label)
    setTimeout(() => { console.log('✔ ' + label); r(label) }, ms)
  })
}

const s = new Scheduler(1)  // 串行
Promise.all([
  s.add(delay(100, 'A')),
  s.add(delay(50, 'B')),
  s.add(delay(30, 'C')),
]).then(r => console.log('完成:', r))
// limit=1 → A→B→C 顺序执行，总耗时 180ms`,
  `// debounce immediate：首次立即执行
function myDebounce(fn, delay, immediate) {
  let timer = null, lastCallTime = 0
  return function (...args) {
    const now = Date.now()
    const later = () => { timer = null; if (!immediate) fn.apply(this, args) }
    const callNow = immediate && now - lastCallTime >= delay
    clearTimeout(timer)
    timer = setTimeout(later, delay)
    if (callNow) { lastCallTime = now; fn.apply(this, args) }
  }
}

let count = 0
const fn = myDebounce((msg) => {
  count++
  console.log('执行#' + count + ': ' + msg)
}, 150, true)

fn('第1次')  // 立即执行
fn('第2次')  // 忽略
fn('第3次')  // 忽略

setTimeout(() => fn('第4次（延迟）'), 300)  // 立即执行
setTimeout(() => console.log('总执行次数: ' + count), 500)
// immediate=true 保证首次触发立即响应`,
  `// bind 后的函数用 new 调用
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this
  const bound = function (...callArgs) {
    // new.target 判断是否用 new 调用
    const actualThis = new.target ? this : context
    return fn.apply(actualThis, [...boundArgs, ...callArgs])
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype)
  return bound
}

function Person(city, name) {
  this.city = city
  this.name = name
}
Person.prototype.intro = function () {
  console.log(this.name + ' 来自 ' + this.city)
}

const Beijinger = Person.myBind(null, '北京')
const p = new Beijinger('小明')

console.log('city:', p.city)     // '北京'
console.log('name:', p.name)     // '小明'
p.intro()
console.log('instanceof Person:', p instanceof Person)
console.log('bind + new 测试通过 ✓')`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]
  snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 1,
    q: 'EventEmitter 中 once 怎么实现？on 和 once 的区别是什么？',
    a: '<span class="kw">once 的原理</span>：用一个 <span class="kw">wrapper 函数</span>包装原始 fn——在 wrapper 内部调用 fn 后立即 <code>off(event, wrapper)</code> 移除自身。<br><br>区别：<br>· <span class="kw">on</span>：持久订阅，每次 emit 都会触发，直到手动 off<br>· <span class="kw">once</span>：一次性订阅，emit 一次后自动移除<br><br><span class="kw">面试回答框架</span>：on→存数组 / emit→遍历调用 / once→包装→调用后 off / off→indexOf+splice。<br><br><span class="kw">加分点</span>：emit 时用 <code>[...fns]</code> 拷贝再遍历，防止 once 的 splice 破坏遍历索引。',
  },
  {
    level: 1,
    q: 'EventEmitter 的 on 方法返回什么？为什么这样设计？',
    a: '<code>on(event, fn)</code> 通常返回一个<span class="kw">取消订阅函数</span>（<code>() => this.off(event, fn)</code>）。<br><br><span class="kw">设计目的</span>：调用方不需要持有 emitter 引用就能取消自己的订阅，尤其适合匿名回调或闭包场景：<br><br><code>const unsub = emitter.on("data", data => { ... })</code><br><code>// 组件卸载时</code><br><code>unsub()</code><br><br>这和 React 的 useEffect 返回 cleanup 函数、RxJS 的 Subscription 是同一设计思路。',
  },
  {
    level: 2,
    q: '带并发限制的调度器怎么实现？核心思路是什么？',
    a: '核心数据结构：<span class="kw">running 计数器</span> + <span class="kw">queue 等待队列</span>。<br><br><span class="kw">add(task)</span> 返回一个 Promise：<br>① 把 task 包装后 push 到 queue<br>② 调用 next() 检查是否可执行<br>③ next() 判断 <code>running < limit && queue.length > 0</code>，满足就从 queue 取出一个执行<br>④ 任务完成后（finally）<code>running--</code>，再调用 next() 补上<br><br><span class="kw">关键</span>：每个 task 完成时触发 next() 检查——这就是"完成一个补一个"的来源。<br><br><span class="kw">面试回答框架</span>：class Scheduler(limit) → add(task) 返回 Promise → queue 数组存储待执行任务 → running 计数器 → next() 检查能否执行新任务 → finally 中 running-- + next()。',
  },
  {
    level: 2,
    q: '防抖和节流的区别？各自适用什么场景？',
    a: '核心区别是<span class="kw">"等" vs "降"</span>：<br><br>· <span class="kw">防抖 debounce</span>：<span class="kw">等你停下来再执行</span>。连续触发只执行最后一次。适合：搜索框实时建议（用户停止输入后再发请求）、窗口 resize 后重新计算布局<br><br>· <span class="kw">节流 throttle</span>：<span class="kw">降低执行频率</span>。固定间隔最多执行一次。适合：滚动加载更多、鼠标移动跟踪、按钮防重复点击<br><br><span class="kw">一句话记</span>：防抖是"说完了再说"，节流是"按节奏说"。<br><br><span class="kw">面试加分</span>：能说出 debounce 的 immediate 选项（首次立即执行，后续等待）和 throttle 的 trailing 选项（保证最后一次也执行）。',
  },
  {
    level: 2,
    q: 'throttle 的两种实现方式（时间戳 / 定时器）各有什么优缺点？',
    a: '<span class="kw">时间戳法</span>（记录 lastTime + 比较间隔）：<br>✅ 首次触发立即执行<br>❌ 停止触发后，最后一次不会执行（因为间隔不够）<br><br><span class="kw">定时器法</span>（每次设置 timer）：<br>✅ 停止触发后会执行最后一次（trailing）<br>❌ 首次触发不会立即执行<br><br><span class="kw">实际面试写法</span>通常结合两种思路：leading + trailing 可配置版本——用 <code>remaining = interval - (now - lastTime)</code> 判断是否可执行，用 timer 兜底 trailing。',
  },
  {
    level: 2,
    q: '手写 call/apply 的核心原理是什么？为什么用 Symbol 做 key？',
    a: '<span class="kw">核心原理</span>：利用 <code>obj.fn()</code> 中 fn 的 this 指向 obj 这个<span class="kw">隐式绑定</span>规则。<br><br>步骤：<br>① 把函数<span class="kw">临时挂到目标对象</span>上 → <code>context[key] = this</code><br>② 以对象方法的方式调用 → <code>context[key](...args)</code><br>③ 调用完<span class="kw">删除临时属性</span> → <code>delete context[key]</code><br><br><span class="kw">为什么用 Symbol 做 key</span>：<br>避免<span class="kw">属性名冲突</span>。如果直接用 <code>context.fn = this</code>，可能覆盖 context 上已有的 fn 属性。Symbol 保证唯一性。<br><br><span class="kw">call vs apply</span> 的区别仅在参数传递方式：call 展开传，apply 数组传。',
  },
  {
    level: 3,
    q: '手写 bind 需要处理哪些边界情况？new 调用时怎么办？',
    a: '手写 bind 要处理三个关键点：<br><br>① <span class="kw">参数合并</span>：bind 时可以传部分参数（柯里化），调用时再传剩余参数<br><code>fn.bind(ctx, a)(b) → fn(a, b)</code><br><br>② <span class="kw">new 调用的处理</span>：如果 bind 返回的函数被 new 调用，<span class="kw">this 应该指向新创建的实例</span>，而不是绑定的 context。<br>判断方式：<code>this instanceof bound</code> 或用 <code>new.target</code><br><br>③ <span class="kw">原型链维护</span>：bound 函数应该继承原函数的 prototype，确保创建实例时原型链正确：<br><code>bound.prototype = Object.create(fn.prototype)</code><br><br><span class="kw">面试回答框架</span>：保存原函数 → 返回新函数 → 合并参数 → new 判断 → 原型链 → apply 调用。',
  },
  {
    level: 1,
    q: 'new 操作符做了哪几件事？如果构造函数 return 了一个对象会怎样？',
    a: '<span class="kw">new Fn() 做了四件事</span>：<br><br>① 创建一个空对象，<code>obj.__proto__ = Fn.prototype</code><br>② 以 obj 为 this 执行 <code>Fn()</code><br>③ 判断 Fn 的返回值：<br>&nbsp;&nbsp;· 返回<span class="kw">引用值</span>（对象/数组/函数）→ 用返回值<br>&nbsp;&nbsp;· 返回<span class="kw">原始值</span>（string/number/null 等）→ 忽略，用 obj<br>④ 如果第③步没有返回引用值，返回新创建的对象<br><br><span class="kw">常见陷阱</span>：<br><code>function F() { return { x: 1 } }</code><br><code>new F()</code> 返回 <code>{ x: 1 }</code>，不是 F 的实例！<code>new F() instanceof F</code> 为 <code>false</code>。<br><br><span class="kw">判断方式</span>：<code>result instanceof Object</code>，instanceof 对原始值返回 false，对对象返回 true。',
  },
  {
    level: 3,
    q: '能把 Promise、EventEmitter、调度器串起来讲吗？（理解它们的设计关联）',
    a: '<span class="kw">三者共同的模式：回调管理</span>。<br><br>· <span class="kw">Promise</span>：管理单个异步操作的<span class="kw">状态变化</span>（pending→settled），then/catch 注册回调，状态确定后调用。特点是<span class="kw">一次性</span>（settled 后不再变）。<br><br>· <span class="kw">EventEmitter</span>：管理<span class="kw">多个事件</span>的多对多通信。每个事件都可能有多个监听者。特点是<span class="kw">多次触发</span>，每次 emit 都调用所有订阅者。<br><br>· <span class="kw">调度器</span>：管理<span class="kw">多个异步任务</span>的执行节奏。本质是 Promise + 队列：每个任务返回 Promise，调度器控制同时执行的 Promise 数量。<br><br><span class="kw">关联</span>：调度器本身可以用 EventEmitter 暴露事件（task-start / task-end / all-done），每个任务的处理又是基于 Promise 的。三者组合使用，能构建完整的异步任务管理系统。<br><br><span class="kw">大厂面试思路</span>：面试官可能给一个场景（如"实现一个文件上传管理器，支持并发控制和进度通知"），考察你能否自然地组合这三种模式。',
  },
]
</script>

<style scoped>
.js-page { max-width: 960px; margin: 0 auto; padding-bottom: 3rem; }
.hero { text-align: center; padding: 2.5rem 1rem 2rem; border-bottom: 1px solid var(--color-border); margin-bottom: 1.5rem; }
.hero h1 { font-size: 1.8rem; color: var(--color-heading); margin-bottom: 0.5rem; }
.hero-sub { color: var(--color-text); opacity: 0.6; font-size: 0.95rem; }
.kw { color: hsla(160, 100%, 37%, 1); font-weight: 600; }
.toc { display: flex; gap: 6px; flex-wrap: wrap; padding: 0.8rem 0; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); position: sticky; top: 0; background: var(--color-background); z-index: 10; }
.toc-link { font-size: 0.8rem; padding: 4px 12px; border-radius: 20px; background: var(--color-background-soft); color: var(--color-text); text-decoration: none; border: 1px solid var(--color-border); transition: all 0.2s; }
.toc-link:hover { background: var(--color-background-mute); color: var(--color-heading); border-color: var(--color-heading); }
.section-card { background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.8rem; margin-bottom: 1.5rem; }
.s-title { font-size: 1.3rem; color: var(--color-heading); margin-bottom: 0.5rem; }
.s-badge { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 10px; background: #8b5cf622; color: #8b5cf6; vertical-align: middle; margin-left: 8px; }
.s-subtitle { font-size: 1.05rem; color: var(--color-heading); margin: 1.5rem 0 0.5rem; padding-left: 0.5rem; border-left: 3px solid hsla(160, 100%, 37%, 1); }
.s-desc { font-size: 0.92rem; line-height: 1.6; color: var(--color-text); opacity: 0.8; margin-bottom: 0.8rem; }
.s-desc code { background: color-mix(in srgb, var(--color-border) 40%, transparent); padding: 1px 6px; border-radius: 4px; font-size: 0.85em; }

.rule-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.rule-item { display: flex; align-items: baseline; gap: 8px; background: var(--color-background); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.6rem 1rem; font-size: 0.88rem; }
.rule-item span { color: var(--color-text); opacity: 0.8; }
.rule-tag { flex-shrink: 0; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.rv { background: #42b88322; color: #42b883; }
.ra { background: #8b5cf622; color: #8b5cf6; }
.rt { background: #e74c3c22; color: #e74c3c; }
.rn { background: #88888822; color: #888; }

.method-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.method-item { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.6rem 1rem; font-size: 0.88rem; line-height: 1.6; }
.method-item code { font-weight: 700; color: var(--color-heading); margin-right: 6px; }
.method-item span { color: var(--color-text); opacity: 0.8; }

.s-tip { background: color-mix(in srgb, hsla(160, 100%, 37%, 1) 10%, transparent); border-left: 3px solid hsla(160, 100%, 37%, 1); padding: 0.8rem 1rem; border-radius: 0 6px 6px 0; font-size: 0.88rem; line-height: 1.6; color: var(--color-text); margin-top: 1rem; }

.demo-area { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 1rem; overflow: hidden; }
.demo-code-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: var(--color-background-mute); border-bottom: 1px solid var(--color-border); }
.demo-code-filename { font-size: 0.78rem; color: var(--color-text); opacity: 0.5; font-family: 'Cascadia Code', 'Fira Code', monospace; }
.run-btn { padding: 4px 14px; border: 1px solid hsla(160, 100%, 37%, 1); border-radius: 4px; background: hsla(160, 100%, 37%, 0.1); color: hsla(160, 100%, 37%, 1); font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-weight: 600; }
.run-btn:hover { background: hsla(160, 100%, 37%, 1); color: #fff; }
.run-btn.reset-btn { border-color: var(--color-border); color: var(--color-text); background: transparent; margin-left: 6px; }
.run-btn.reset-btn:hover { border-color: #e74c3c; color: #e74c3c; background: transparent; }
.code-block { background: #1e1e2e; color: #cdd6f4; padding: 1rem 1.2rem; overflow-x: auto; font-size: 0.82rem; line-height: 1.6; margin: 0; tab-size: 2; }
.code-block code { font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace; white-space: pre; }
.code-editor { width: 100%; min-height: 220px; padding: 1rem 1.2rem; background: #1e1e2e; color: #cdd6f4; border: none; font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace; font-size: 0.82rem; line-height: 1.6; tab-size: 2; resize: vertical; outline: none; box-sizing: border-box; }
.code-editor:focus { outline: 1px solid hsla(160, 100%, 37%, 0.4); }
.output-panel { border-top: 1px solid var(--color-border); padding: 10px 14px; background: #1a1a2e; min-height: 48px; }
.output-label { font-size: 0.72rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.output-content { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 0.82rem; color: #a0e0a0; white-space: pre-wrap; margin: 0; line-height: 1.5; min-height: 1.2em; }
.output-panel.has-content .output-content { color: #a0e0a0; }
.output-panel:not(.has-content) .output-content { color: #666; font-style: italic; }
.playground-hints { margin-top: 1rem; }
.playground-hints p { font-size: 0.85rem; margin-bottom: 8px; color: var(--color-heading); }
.hint-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.hint-chip { font-size: 0.8rem; padding: 5px 12px; border-radius: 20px; background: var(--color-background-mute); border: 1px solid var(--color-border); color: var(--color-text); cursor: pointer; transition: all 0.2s; }
.hint-chip:hover { border-color: hsla(160, 100%, 37%, 1); color: hsla(160, 100%, 37%, 1); background: hsla(160, 100%, 37%, 0.05); }

.qa-list { display: flex; flex-direction: column; gap: 6px; }
.qa-item { border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; transition: box-shadow 0.2s; }
.qa-item.qa-open { border-color: hsla(160, 100%, 37%, 0.5); box-shadow: 0 0 0 1px hsla(160, 100%, 37%, 0.15); }
.qa-question { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; border: none; background: var(--color-background); color: var(--color-heading); font-size: 0.9rem; text-align: left; cursor: pointer; transition: background 0.15s; }
.qa-question:hover { background: var(--color-background-mute); }
.qa-level { flex-shrink: 0; font-size: 0.75rem; padding: 2px 6px; border-radius: 3px; }
.qa-lv1 { background: #42b88322; color: #42b883; }
.qa-lv2 { background: #f39c1222; color: #f39c12; }
.qa-lv3 { background: #e74c3c22; color: #e74c3c; }
.qa-text { flex: 1; line-height: 1.4; }
.qa-arrow { flex-shrink: 0; font-size: 0.85rem; color: var(--color-text); opacity: 0.4; }
.qa-answer { border-top: 1px solid var(--color-border); background: var(--color-background-soft); }
.qa-answer-inner { padding: 14px; font-size: 0.88rem; line-height: 1.7; color: var(--color-text); }
.qa-answer-inner code { background: color-mix(in srgb, var(--color-border) 40%, transparent); padding: 1px 6px; border-radius: 4px; font-size: 0.85em; }
.qa-answer-inner strong { color: var(--color-heading); }

@media (max-width: 700px) { .hero h1 { font-size: 1.3rem; } .section-card { padding: 1.2rem; } }
</style>
