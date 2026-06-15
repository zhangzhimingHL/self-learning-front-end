<template>
  <div class="js-page">
    <header class="hero">
      <h1>Event Loop 事件循环</h1>
      <p class="hero-sub">面试必考 · <span class="kw">宏任务</span>/<span class="kw">微任务</span> · <span class="kw">async/await</span> 执行顺序 · <span class="kw">Node.js 事件循环</span> · 经典输出题</p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 事件循环基础 -->
    <!-- ============================================================ -->
    <section id="s1-basics" class="section-card">
      <h2 class="s-title">一、事件循环基础</h2>
      <p class="s-desc">
        JS 是<span class="kw">单线程</span>语言，一次只能做一件事。<span class="kw">事件循环</span>（Event Loop）是 JS 的<span class="kw">异步调度机制</span>——把任务排队，按顺序执行。
        理解事件循环的关键是搞清楚<span class="kw">调用栈</span>、<span class="kw">宏任务队列</span>、<span class="kw">微任务队列</span>三者如何配合。
      </p>

      <h3 class="s-subtitle">① 调用栈（Call Stack）</h3>
      <p class="s-desc">函数调用时压栈，返回时弹栈。栈空了才会去任务队列取任务。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">call-stack.js</span>
          <button class="run-btn" @click="runCode('callStack')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.callStack.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.callStack.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.callStack.output || '点击 "运行" 查看调用栈行为' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 宏任务 vs 微任务</h3>
      <p class="s-desc">
        <span class="kw">宏任务（MacroTask）</span>：<code>setTimeout</code>、<code>setInterval</code>、<code>I/O</code>、<code>UI 渲染</code>、<code>requestAnimationFrame</code><br>
		        <span class="kw-tag">💡</span> <code>requestAnimationFrame(rAF)</code> 严格来说不属于宏任务队列，它在事件循环的<strong>渲染阶段之前</strong>单独有一个队列。浏览器会在每次<strong>渲染之前</strong>执行所有排队的 rAF 回调。常用于动画：保证在下一帧渲染前更新 DOM，不掉帧。优先级：微任务 > <span class="kw">rAF</span> > 渲染 > 宏任务。<br>
        <span class="kw">微任务（MicroTask）</span>：<code>Promise.then/catch/finally</code>、<code>MutationObserver</code>、<code>queueMicrotask</code><br>
	        <span class="kw-tag">💡</span> <code>queueMicrotask(fn)</code> 直接向微任务队列推一个任务，等价于 <code>Promise.resolve().then(fn)</code>，但写法更简洁。工作中不常用，但在需要"让一段代码在当前同步任务之后、渲染之前执行"时很有用。<br>
		        <span class="kw-tag">🔗</span> <strong>和 Vue.nextTick 的区别</strong>：<code>Vue.nextTick(fn)</code> 底层也是用微任务实现的（优先用 <code>Promise</code>，降级 <code>setTimeout</code>），但多了一层 Vue 内部的<strong>批量更新 flushing</strong>——调用 <code>nextTick</code> 时，Vue 会先把响应式变更的副作用 flush 完，再执行你的回调。而 <code>queueMicrotask</code> 是裸的微任务，没有这个批量更新步骤。<br>
		        <span class="kw-tag">💡</span> <strong>MutationObserver</strong>：监听 DOM 变化的 API，回调也是微任务。比如检测某个元素 class 变了、子节点增删了。React 和 Vue 底层都用过它来做 DOM 变化侦测（Vue 2 的 nextTick 降级方案之一也用到了它）。日常工作很少直接操作它，但要知道它是微任务的来源之一。<br><br>
        每次事件循环：<span class="kw">执行一个宏任务 → 清空所有微任务 → 必要时渲染 → 取下一个宏任务</span>。
        微任务可以在一次循环中<span class="kw">无限添加</span>，会阻塞下一个宏任务。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">macro-vs-micro.js</span>
          <button class="run-btn" @click="runCode('macroVsMicro')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.macroVsMicro.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.macroVsMicro.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.macroVsMicro.output || '点击 "运行" 查看宏任务微任务执行顺序' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <span class="kw">面试高频</span>：记住口诀——"<span class="kw">一个宏任务，一筐微任务</span>"。每次事件循环只取一个宏任务，但微任务会一直清空到队列为空才停下。
      </div>

      <div class="s-tip s-tip-warn">
        ⚠️ <strong>常见困惑</strong>：上面说"执行一个宏任务 → 清空所有微任务"，但为什么实际跑起来微任务（Promise.then）总是比下一个宏任务（setTimeout）先输出？<br><br>
        关键点：<strong>整段脚本本身就是第一个宏任务</strong>。所以流程其实是：<br>
        <code>宏任务 #1（脚本）</code> → 脚本执行中产出的微任务排队 → 脚本结束 → <code>清空微任务队列</code> → <code>宏任务 #2（setTimeout 回调）</code><br><br>
        也就是说，"<span class="kw">微任务不在所有宏任务之前，而是在下一个宏任务之前</span>"。初始脚本执行完立刻清空微任务，所以 Promise.then 必然在 setTimeout 之前输出。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 浏览器事件循环 -->
    <!-- ============================================================ -->
    <section id="s2-browser" class="section-card">
      <h2 class="s-title">二、浏览器事件循环 + async/await</h2>
      <p class="s-desc">
        <code>async/await</code> 本质是 <span class="kw">Promise 的语法糖</span>。<br><br>
	        <strong>❗ 容易误解的地方</strong>：<code>await bar()</code> 这行代码 —— <span class="kw">右边的 <code>bar()</code> 是同步执行的</span>，只有 <span class="kw">await 这一行<em>之后</em>的代码</span>才会被包装成 <code>.then()</code> 丢进微任务队列。<br>
	        也就是说 <code>await</code> 以自身为分界线：<strong>右边同步，下面微任务</strong>。
        这是面试中最容易搞混的地方。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">async-await.js</span>
          <button class="run-btn" @click="runCode('asyncAwait')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.asyncAwait.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.asyncAwait.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.asyncAwait.output || '点击 "运行" 查看 async/await 执行顺序' }}</pre>
        </div>
      </div>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">classic-quiz.js</span>
          <button class="run-btn" @click="runCode('classicQuiz')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.classicQuiz.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.classicQuiz.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.classicQuiz.output || '点击 "运行" 猜输出，再对照答案' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：Event Loop 输出题是最常见的笔试题。分析步骤——先找<span class="kw">同步代码</span> → 再找<span class="kw">微任务</span>（Promise.then / await） → 再找<span class="kw">宏任务</span>（setTimeout）。
        注意 <span class="kw">Promise 构造函数本身是同步执行的</span>，<code>then/catch/finally</code> 才是微任务。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: Node.js 事件循环 -->
    <!-- ============================================================ -->
    <section id="s3-node" class="section-card">
      <h2 class="s-title">三、Node.js 事件循环 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        Node.js 的事件循环分<span class="kw">六个阶段</span>，每个阶段有一个**自己的宏任务队列**，按固定顺序轮转：</p>
	      <div class="phase-diagram">
	        <code class="phase-chain">timers → pending → idle/prepare → <span class="hl">poll</span> → check → close</code>
	      </div>
	      <p class="s-desc">每个阶段都会执行以下操作：<span class="kw">先执行该阶段的宏任务队列</span> → then 清空 <span class="kw">nextTick 队列</span> → then 清空 <span class="kw">微任务队列</span>，然后进入下一阶段。</p>

	      <h3 class="s-subtitle">各阶段详解</h3>
	      <div class="phase-detail">
	        <div class="phase-item">
	          <span class="phase-name">① timers</span>
	          <span class="phase-desc">执行 <code>setTimeout</code> 和 <code>setInterval</code> 的回调。定时器到达指定时间后，回调被放入此阶段的队列。注意：<code>setTimeout(fn, 0)</code> 的 0 不是立即执行，而是"尽快排队"，实际延迟通常有 1-4ms 偏差。</span>
	        </div>
	        <div class="phase-item">
	          <span class="phase-name">② pending</span>
	          <span class="phase-desc">执行上一轮遗留的 I/O 回调。比如 TCP 连接失败时，<code>ECONNREFUSED</code> 等系统错误回调会在这里处理，而不是在 poll 阶段。日常开发基本感知不到这个阶段的存在。</span>
	        </div>
	        <div class="phase-item">
	          <span class="phase-name">③ idle / prepare</span>
	          <span class="phase-desc">Node.js 内部使用的阶段，与外部代码无关。<DefTooltip tip="libuv 是 Node.js 底层的异步 I/O 库，用 C 语言编写。事件循环的六个阶段就是由 libuv 实现的。它负责处理文件读写、网络请求、DNS 查询等底层操作">libuv</DefTooltip> 内部做一些准备工作，比如计算时间、轮询前的初始化等。你写代码永远不会直接碰到这个阶段。</span>
	        </div>
	        <div class="phase-item">
	          <span class="phase-name hl">④ poll（最重要的阶段）</span>
	          <span class="phase-desc">这是 <span class="kw">绝大多数 I/O 回调被执行的地方</span>。处理文件读写、网络请求、数据库查询等异步操作的回调。如果 poll 队列为空，Node 会在这里等待新的事件到达，或者如果检测到有 <code>setImmediate</code> 在排队，就直接跳到 check 阶段。</span>
	        </div>
	        <div class="phase-item">
	          <span class="phase-name">⑤ check</span>
	          <span class="phase-desc">执行 <code>setImmediate</code> 的回调。之所以叫 check，是因为它"检查" poll 阶段过后是否需要立即执行一些操作。当一个 I/O 回调完成后需要立刻做某事时，<code>setImmediate</code> 是比 <code>setTimeout(fn, 0)</code> 更可靠的选择。</span>
	        </div>
	        <div class="phase-item">
	          <span class="phase-name">⑥ close</span>
	          <span class="phase-desc">执行关闭事件的回调，比如 <code>socket.on('close', ...)</code>、<code>stream.destroy()</code> 等。如果一个 socket 或 handle 被突然关闭，它的回调会在这里触发。这也是事件循环的最后一站，处理完就进入下一轮循环。</span>
	        </div>
	      </div>
	      <p class="s-desc">与浏览器最大的区别是多了 <span class="kw">process.nextTick</span> 和 <span class="kw">setImmediate</span>。<br><br>
	        <code>setTimeout(fn, 0)</code> 在 <span class="kw">timers 阶段</span>执行，<code>setImmediate</code> 在 <span class="kw">check 阶段</span>执行。<br><br>
	        <strong>⚠️ 两者的执行顺序取决于调用位置：</strong><br>
	        · <strong>不在 I/O 回调中</strong>（如模块顶层）：顺序<span class="kw">不确定</span>，取决于机器启动速度<br>
	        · <strong>在 I/O 回调中</strong>（如 fs.readFile）：<span class="kw">setImmediate 总是先于 setTimeout</span>，因为事件循环从 poll 阶段出来先到 check 阶段，下一轮才到 timers 阶段
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">node-event-loop.js</span>
          <button class="run-btn" @click="runCode('nodeEventLoop')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.nodeEventLoop.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.nodeEventLoop.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.nodeEventLoop.output || '点击 "运行" 查看 Node.js 事件循环' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <span class="kw">面试加分</span>：<code>process.nextTick</code> 的<span class="kw">优先级高于 Promise 微任务</span>，它不属于事件循环的六个阶段，而是在每个阶段<span class="kw">切换时被清空</span>。<br>
        <code>setImmediate</code> 在 <span class="kw">check 阶段</span>执行，<code>setTimeout(fn, 0)</code> 在 <span class="kw">timers 阶段</span>执行。在 I/O 回调中（如 fs.readFile），<span class="kw">setImmediate 总是先于 setTimeout(fn, 0)</span>；在模块顶层执行时，两者顺序<span class="kw">不确定</span>，取决于机器启动速度。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s4-playground" class="section-card">
      <h2 class="s-title">四、🧪 动手实验区</h2>
      <p class="s-desc">自己设计宏任务/微任务组合，验证执行顺序。</p>
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
        <p><strong>试试修改代码：</strong></p>
        <div class="hint-chips">
          <span class="hint-chip" @click="loadHint(0)">🔹 经典面试输出题</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 async/await 嵌套</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 Promise + setTimeout 混合</span>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s5-qa" class="section-card">
      <h2 class="s-title">五、面试高频问答（⭐→⭐⭐⭐）</h2>
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
  { id: 's1-basics',    label: '事件循环基础' },
  { id: 's2-browser',   label: '浏览器 + async' },
  { id: 's3-node',      label: 'Node.js 事件循环' },
  { id: 's4-playground', label: '动手实验' },
  { id: 's5-qa',        label: '面试问答' },
]

// ─── 安全执行代码 ───
function captureConsole(fn: () => void): string[] {
  const lines: string[] = []
  const origLog = console.log; const origError = console.error; const origWarn = console.warn
  console.log = (...args: unknown[]) => lines.push(args.map(a => formatArg(a)).join(' '))
  console.error = (...args: unknown[]) => lines.push('❌ ' + args.map(a => formatArg(a)).join(' '))
  console.warn = (...args: unknown[]) => lines.push('⚠️ ' + args.map(a => formatArg(a)).join(' '))
  try { fn() } catch (e: unknown) { lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e))) }
  console.log = origLog; console.error = origError; console.warn = origWarn
  return lines
}
function formatArg(arg: unknown): string {
  if (arg === null) return 'null'; if (arg === undefined) return 'undefined'
  if (typeof arg === 'string') return arg
  if (typeof arg === 'object') { try { return JSON.stringify(arg) } catch { return String(arg) } }
  return String(arg)
}

// ─── 代码片段 ───
interface Snippet { code: string; output: string }
const snippets = reactive<Record<string, Snippet>>({
  callStack: {
    code: `// 调用栈：函数调用压栈，返回弹栈
function three() {
  console.log('three')
}
function two() {
  three()
  console.log('two')
}
function one() {
  two()
  console.log('one')
}

console.log('开始')
one()
console.log('结束')
// 调用栈变化：
// 开始 → one → two → three → three弹栈 → two弹栈 → one弹栈 → 结束`,
    output: '',
  },
  macroVsMicro: {
    code: `// 宏任务 vs 微任务执行顺序
console.log('1 同步')

setTimeout(() => {
  console.log('2 setTimeout（宏任务）')
}, 0)

Promise.resolve().then(() => {
  console.log('3 Promise.then（微任务）')
})

queueMicrotask(() => {
  console.log('4 queueMicrotask（微任务）')
})

setTimeout(() => {
  console.log('5 setTimeout（宏任务）')
}, 0)

console.log('6 同步')

// 预期顺序：
// 1 同步 → 6 同步 → 3 微任务 → 4 微任务 → 2 宏任务 → 5 宏任务`,
    output: '',
  },
  asyncAwait: {
    code: `// async/await 执行顺序
console.log('1')

async function foo() {
  console.log('2')
  await bar()           // ★ bar() 同步执行，后面的代码才进微任务
  console.log('5  await 后面的代码是微任务')
}
async function bar() {
  console.log('3')
}

foo()

// 关键：await 右边的 bar() 是同步执行的（输出 3）
// 只有 await 下面的代码（输出 5）才被包装成微任务排队
Promise.resolve().then(() => {
  console.log('6  和上面 await 在同一批微任务中')
})

setTimeout(() => {
  console.log('7  setTimeout（下一轮宏任务）')
}, 0)

console.log('4')

// 关键：await bar()
//   ├─ bar()        ← 同步执行！立即输出
//   └─ 后面的代码    ← 包装成微任务，排队等待`,
    output: '',
  },
  classicQuiz: {
    code: `// ===== 经典面试输出题 =====
// 先自己猜输出，再运行对照

console.log('a')

setTimeout(() => console.log('b'), 0)

Promise.resolve().then(() => {
  console.log('c')
})

setTimeout(() => console.log('d'), 0)

Promise.resolve().then(() => {
  console.log('e')
})

console.log('f')

// 你猜的顺序：_____
// 正确答案在下面（先别偷看）
//
// a → f → c → e → b → d
// 分析：
// 1. 同步：a, f
// 2. 微任务：c, e（Promise.then）
// 3. 宏任务：b, d（setTimeout）`,
    output: '',
  },
  nodeEventLoop: {
    code: `// ===== 场景一：不在 I/O 回调中（顺序不确定）=====
console.log('1 同步')

setTimeout(() => {
  console.log('? setTimeout（timers 阶段）')
}, 0)

setImmediate(() => {
  console.log('? setImmediate（check 阶段）')
})

process.nextTick(() => {
  console.log('2 nextTick（阶段切换前清空）')
})

Promise.resolve().then(() => {
  console.log('3 Promise.then（微任务）')
})

// 此场景下 timeout 和 immediate 谁先不确定！
// 因为 0ms 延迟不一定在 timers 阶段前到期
//
// 稳定部分：1 同步 → 2 nextTick → 3 Promise.then
//
// ===== 场景二：在 I/O 回调中（immediate 稳赢）=====
// const fs = require('fs')
// fs.readFile(__filename, () => {
//   setTimeout(() => console.log('4 timeout'), 0)
//   setImmediate(() => console.log('5 immediate'))
// })
// // 输出：5 immediate → 4 timeout
// // 原因：readFile 回调在 poll 阶段执行，
// //      出来先到 check 阶段（immediate），下一轮才到 timers（timeout）
//
// 六个阶段：timers → pending → idle/prepare → poll → check → close`,
    output: '',
  },
  playground: {
    code: `// 自己设计宏任务/微任务组合
console.log('开始')

setTimeout(() => console.log('setTimeout'), 0)

Promise.resolve()
  .then(() => console.log('then 1'))
  .then(() => console.log('then 2'))

queueMicrotask(() => console.log('queueMicrotask'))

console.log('结束')
// 你能说出输出顺序吗？`,
    output: '',
  },
})

// ─── 异步运行代码（支持 setTimeout） ───
function runCode(key: string) {
  if (key === 'playground') {
    snippets.playground.output = ''
    const lines: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => lines.push(args.map(a => formatArg(a)).join(' '))
    try {
      const func = new Function('setTimeout', 'Promise', 'queueMicrotask', playgroundCode.value)
      func(setTimeout, Promise, queueMicrotask)
    } catch (e: unknown) { lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e))) }
    // 延迟收集异步输出
    setTimeout(() => {
      console.log = origLog
      const snapshot = lines.splice(0)
      if (snapshot.length) {
        snippets.playground.output = (snippets.playground.output || '') + snapshot.join('\n')
      }
    }, 100)
    snippets.playground.output = '⏳ 执行中（异步结果将在 100ms 后显示）...\n' + lines.join('\n')
    return
  }
  if (key === 'nodeEventLoop') {
    // Node.js 特有 API 在浏览器中不可用，显示说明
    snippets[key].output = '⚠️ process.nextTick 和 setImmediate 是 Node.js 特有 API，浏览器不支持。\n在 Node.js 环境中：\n\n📌 场景一（模块顶层，顺序不确定）：\n1 同步 → 2 nextTick → 3 Promise.then → ? setTimeout/? setImmediate\n（谁先看机器启动速度，每次可能不同）\n\n📌 场景二（I/O 回调中，immediate 稳赢）：\n1 同步 → 2 nextTick → 3 Promise.then → 5 immediate → 4 timeout\n\n（代码已保留，放到 .js 文件里用 node 运行测试）'
    return
  }

  const snippet = snippets[key]
  if (!snippet) return

  if (key === 'asyncAwait' || key === 'classicQuiz' || key === 'macroVsMicro') {
    snippet.output = '⏳ 执行中...'
    const captured: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
    setTimeout(() => {
      console.log = origLog
      snippet.output = captured.join('\n')
    }, 200)
    try {
      const func = new Function(snippet.code)
      func()
    } catch (e: unknown) {
      console.log = origLog
      snippet.output = '💥 错误: ' + (e instanceof Error ? e.message : String(e))
    }
    return
  }

  const lines = captureConsole(() => { const func = new Function(snippet.code); func() })
  snippet.output = lines.join('\n')
}

// ─── 动手实验区 ───
const playgroundCode = ref(snippets.playground.code)
function resetPlayground() {
  playgroundCode.value = snippets.playground.code
  snippets.playground.output = ''
}
const hints = [
  `// 经典面试题：说出下面代码的输出
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
Promise.resolve().then(() => {
  console.log('4')
  setTimeout(() => console.log('5'), 0)
})
setTimeout(() => console.log('6'), 0)
console.log('7')
// 先自己猜，再运行验证`,
  `// async/await 嵌套执行顺序
async function a() {
  console.log('a1')
  await b()
  console.log('a2')
}
async function b() {
  console.log('b1')
  await c()
  console.log('b2')
}
async function c() {
  console.log('c1')
}
console.log('start')
a()
console.log('end')
// 你能说出完整输出吗？`,
  `// Promise + setTimeout 混合
console.log(1)
new Promise((resolve) => {
  console.log(2)
  resolve(3)
  console.log(4)
}).then(console.log)
setTimeout(() => console.log(5), 0)
console.log(6)
// 注意：Promise 构造函数是同步执行的！
// then 里面的回调才是微任务`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]; snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 1,
    q: '什么是事件循环？说说浏览器事件循环的机制。',
    a: '<span class="kw">事件循环</span>是 JS 的异步调度机制。因为 JS 是单线程，异步任务需要排队执行，事件循环就是管理这个队列的机制。<br><br><span class="kw">浏览器事件循环流程</span>：<br>① 执行<span class="kw">一个宏任务</span>（最初是整段脚本）<br>② 检查微任务队列，<span class="kw">全部清空</span><br>③ 必要时候<span class="kw">渲染 UI</span><br>④ 取<span class="kw">下一个宏任务</span>，重复<br><br><span class="kw">宏任务</span>：<code>setTimeout</code>、<code>setInterval</code>、<code>I/O</code>、<code>UI 渲染</code><br><span class="kw">微任务</span>：<code>Promise.then/catch/finally</code>、<code>MutationObserver</code>、<code>queueMicrotask</code><br><br><span class="kw">面试回答框架</span>：单线程背景 → 调用栈 → 宏任务队列 → 微任务队列 → "一个宏任务一筐微任务" → 举例说明。',
  },
  {
    level: 2,
    q: 'async/await 在事件循环中如何工作？await 后面的代码什么时候执行？',
    a: '<code>async/await</code> 本质是 <span class="kw">Promise 的语法糖</span>。<br><br><strong>关键理解</strong>：<br>· <code>await</code> 右边的表达式会<span class="kw">同步执行</span><br>· <code>await</code> 下面的代码被包装成 <code>.then()</code> 回调，属于<span class="kw">微任务</span><br><br><strong>例如</strong>：<br><code>async function foo() {</code><br><code>&nbsp;&nbsp;console.log(1)</code><br><code>&nbsp;&nbsp;await bar()  // 同步执行 bar</code><br><code>&nbsp;&nbsp;console.log(2)  // 被包装成微任务</code><br><code>}</code><br><br>等价于：<br><code>function foo() {</code><br><code>&nbsp;&nbsp;console.log(1)</code><br><code>&nbsp;&nbsp;return Promise.resolve(bar()).then(() => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;console.log(2)</code><br><code>&nbsp;&nbsp;})</code><br><code>}</code><br><br><span class="kw">面试技巧</span>：遇到 async/await 的输出题，先把 <code>await</code> 拆成 <code>Promise.resolve().then()</code> 再看执行顺序。',
  },
  {
    level: 3,
    q: '宏任务和微任务有哪些？微任务会阻塞渲染吗？',
    a: '<span class="kw">宏任务</span>：<code>script（整体代码）</code>、<code>setTimeout</code>、<code>setInterval</code>、<code>I/O</code>、<code>UI 渲染</code>、<code>requestAnimationFrame</code>、<code>setImmediate（Node）</code><br><br><span class="kw">微任务</span>：<code>Promise.then/catch/finally</code>、<code>MutationObserver</code>、<code>queueMicrotask</code>、<code>process.nextTick（Node，优先级更高）</code><br><br><span class="kw">微任务会阻塞渲染吗？</span><br><span class="kw">会</span>。浏览器执行渲染的时机是在"清空微任务队列之后，取下一个宏任务之前"。如果你在微任务中不断添加新的微任务，渲染就会被<span class="kw">无限推迟</span>。<br><br><code>function block() {</code><br><code>&nbsp;&nbsp;Promise.resolve().then(block)  // 无限添加微任务，页面卡死</code><br><code>}</code><br><br><span class="kw">面试加分</span>：<span class="kw">requestAnimationFrame</span> 既不是宏任务也不是微任务，它在<span class="kw">渲染之前</span>执行，属于<span class="kw">动画帧回调队列</span>。所以 requestAnimationFrame 的优先级高于宏任务但低于微任务。',
  },
]
</script>

<style scoped>
.js-page { max-width: 960px; margin: 0 auto; padding-bottom: 3rem; }
.hero { text-align: center; padding: 2.5rem 1rem 2rem; border-bottom: 1px solid var(--color-border); margin-bottom: 1.5rem; }
.hero h1 { font-size: 1.8rem; color: var(--color-heading); margin-bottom: 0.5rem; }
.hero-sub { color: var(--color-text); opacity: 0.6; font-size: 0.95rem; }
.kw { color: hsla(160, 100%, 37%, 1); font-weight: 600; }
.kw-tag { font-size: 0.82rem; }
.toc { display: flex; gap: 6px; flex-wrap: wrap; padding: 0.8rem 0; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); position: sticky; top: 0; background: var(--color-background); z-index: 10; }
.toc-link { font-size: 0.8rem; padding: 4px 12px; border-radius: 20px; background: var(--color-background-soft); color: var(--color-text); text-decoration: none; border: 1px solid var(--color-border); transition: all 0.2s; }
.toc-link:hover { background: var(--color-background-mute); color: var(--color-heading); border-color: var(--color-heading); }
.section-card { background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.8rem; margin-bottom: 1.5rem; }
.s-title { font-size: 1.3rem; color: var(--color-heading); margin-bottom: 0.5rem; }
.s-badge { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 10px; background: #8b5cf622; color: #8b5cf6; vertical-align: middle; margin-left: 8px; }
.s-subtitle { font-size: 1.05rem; color: var(--color-heading); margin: 1.5rem 0 0.5rem; padding-left: 0.5rem; border-left: 3px solid hsla(160, 100%, 37%, 1); }
.s-desc { font-size: 0.92rem; line-height: 1.6; color: var(--color-text); opacity: 0.8; margin-bottom: 0.8rem; }
.s-desc code { background: color-mix(in srgb, var(--color-border) 40%, transparent); padding: 1px 6px; border-radius: 4px; font-size: 0.85em; }
.phase-diagram { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; text-align: center; margin-bottom: 1rem; }
.phase-chain { font-size: 0.95rem; font-family: 'Cascadia Code', 'Fira Code', monospace; color: var(--color-text); }
.phase-chain .hl { color: hsla(160, 100%, 37%, 1); font-weight: 700; }
.phase-detail { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.phase-item { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.7rem 1rem; }
.phase-name { display: block; font-weight: 700; color: var(--color-heading); font-size: 0.9rem; margin-bottom: 2px; }
.phase-name.hl { color: hsla(160, 100%, 37%, 1); }
.phase-desc { font-size: 0.85rem; line-height: 1.6; color: var(--color-text); opacity: 0.8; }
.phase-desc code { font-size: 0.82em; }
.s-tip { background: color-mix(in srgb, hsla(160, 100%, 37%, 1) 10%, transparent); border-left: 3px solid hsla(160, 100%, 37%, 1); padding: 0.8rem 1rem; border-radius: 0 6px 6px 0; font-size: 0.88rem; line-height: 1.6; color: var(--color-text); margin-top: 1rem; }
.s-tip-warn { background: color-mix(in srgb, #f0c040 12%, transparent); border-left-color: #f0c040; }
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
