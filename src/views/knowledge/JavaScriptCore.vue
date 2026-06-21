<template>
  <div class="js-page">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <h1>JavaScript 核心：作用域与闭包</h1>
      <p class="hero-sub">面试必考 · 交互式 Demo · 逐行理解 JS 运行机制</p>
    </header>

    <!-- ============ TOC ============ -->
    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 作用域 -->
    <!-- ============================================================ -->
    <section id="s1-scope" class="section-card">
      <h2 class="s-title">一、作用域（Scope）</h2>
      <p class="s-desc">
        作用域决定了变量在代码中的<strong>可访问范围</strong>。JS 有三种作用域：全局、函数、块级。
      </p>

      <!-- 1.1 全局作用域 -->
      <h3 class="s-subtitle">① 全局作用域</h3>
      <p class="s-desc">在所有函数之外声明的变量，任何地方都可访问。<strong>弊端</strong>：全局变量会挂在 <code>window</code> 上，命名冲突风险大。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">global-scope.js</span>
          <button class="run-btn" @click="runCode('globalScope')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.globalScope.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.globalScope.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.globalScope.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 1.2 函数作用域 -->
      <h3 class="s-subtitle">② 函数作用域</h3>
      <p class="s-desc">用 <code>var</code> 声明的变量在<strong>整个函数内</strong>可访问。<code>var</code> 存在<strong>变量提升</strong>（hoisting），声明提升到函数顶部，但初始化不提升。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">function-scope.js</span>
          <button class="run-btn" @click="runCode('functionScope')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.functionScope.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.functionScope.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.functionScope.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 1.3 块级作用域 -->
      <h3 class="s-subtitle">③ 块级作用域</h3>
      <p class="s-desc"><code>let</code> / <code>const</code> 只在 <code>{}</code> 内有效。<strong>不存在变量提升</strong>（有暂时性死区 TDZ），在声明前访问会报错。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">block-scope.js</span>
          <button class="run-btn" @click="runCode('blockScope')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.blockScope.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.blockScope.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.blockScope.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 1.4 作用域链 -->
      <h3 class="s-subtitle">④ 作用域链（Scope Chain）</h3>
      <p class="s-desc">访问变量时，JS 从<strong>当前作用域</strong>开始查找，逐级向上，直到全局作用域。这就像"向父级要钱"——自己没钱找爹，爹没钱找爷爷。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">scope-chain.js</span>
          <button class="run-btn" @click="runCode('scopeChain')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.scopeChain.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.scopeChain.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.scopeChain.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>var</code> vs <code>let</code> / <code>const</code> 的核心区别——
        函数作用域 vs 块级作用域、变量提升、暂时性死区、重复声明。面试 80% 的概率会问到。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 闭包 -->
    <!-- ============================================================ -->
    <section id="s2-closure" class="section-card">
      <h2 class="s-title">二、闭包（Closure）</h2>
      <p class="s-desc">
        闭包是<strong>函数 + 它声明时所在的作用域</strong>的组合。闭包让你可以在内层函数中<strong>访问到外层函数的作用域</strong>。
      </p>

      <!-- 2.1 闭包的形成 -->
      <h3 class="s-subtitle">① 闭包的形成条件</h3>
      <p class="s-desc">闭包 = <strong>函数嵌套</strong> + <strong>内层函数引用外层变量</strong> + <strong>内层函数被外部引用</strong>。缺一不可吗？实际上只要前两个条件就能形成闭包，但第三个条件让闭包"存活"下来不被回收。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">closure-basic.js</span>
          <button class="run-btn" @click="runCode('closureBasic')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.closureBasic.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.closureBasic.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.closureBasic.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 2.2 闭包应用：私有变量 -->
      <h3 class="s-subtitle">② 闭包应用：私有变量</h3>
      <p class="s-desc">闭包常用来创建<strong>私有变量</strong>——外部无法直接访问，只能通过闭包函数操作。这就是模块模式的基础。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">private-variable.js</span>
          <button class="run-btn" @click="runCode('privateVar')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.privateVar.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.privateVar.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.privateVar.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 2.3 闭包陷阱 -->
      <h3 class="s-subtitle">③ 经典陷阱：循环中的闭包</h3>
      <p class="s-desc"><strong>面试必考题</strong>：用 <code>var</code> 在循环中创建闭包，所有闭包共享同一个变量。下方用 var 打印的全是 3，用 let 才正常。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">closure-loop.js</span>
          <button class="run-btn" @click="runCode('closureLoop')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.closureLoop.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.closureLoop.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.closureLoop.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 2.4 闭包应用：柯里化 -->
      <h3 class="s-subtitle">④ 面试加分：柯里化（Currying）</h3>
      <p class="s-desc">柯里化是将<strong>多参数函数</strong>转换为<strong>嵌套的单参数函数</strong>。面试中常考"实现 add(1)(2)(3)"，底层就是闭包。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">currying.js</span>
          <button class="run-btn" @click="runCode('currying')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.currying.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.currying.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.currying.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <!-- 2.5 闭包与内存 -->
      <h3 class="s-subtitle">⑤ 闭包与内存泄漏</h3>
      <p class="s-desc">闭包会<strong>持续持有外层变量</strong>的引用，即使外层函数已执行完毕。如果不当使用（比如 DOM 事件绑定但未解绑），可能导致<strong>内存泄漏</strong>。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">closure-memory.js</span>
          <button class="run-btn" @click="runCode('closureMemory')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.closureMemory.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.closureMemory.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.closureMemory.output || '点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：闭包是 JS 面试<strong>最核心</strong>的考点之一。常见考题——"什么是闭包"、"闭包的优缺点"、"循环闭包问题及解决方案"、"用闭包实现私有变量"、"实现 add(1)(2)(3)"。一定要理解闭包的底层原理：作用域链 + 函数对象持有了外层作用域的引用。
      </div>

      <!-- 2.6 闭包应用：防抖 -->
      <h3 class="s-subtitle">⑥ 闭包应用：防抖（Debounce）</h3>
      <p class="s-desc">
        <span class="kw">字节跳动</span> <span class="s-badge-sm">高频</span>
        <span class="kw">腾讯</span> <span class="s-badge-sm">高频</span>
        <span class="kw">阿里巴巴</span> <span class="s-badge-sm">中频</span><br>
        防抖的核心就是闭包：<span class="kw">在闭包中保存 timer 变量</span>，每次调用时先清除上一次的定时器再重新设置。
        触发 <code>fn()</code> 后等待 N 毫秒才执行，如果 N 毫秒内又被触发则重新计时。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">debounce.js</span>
          <button class="run-btn" @click="runCode('debounce')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.debounce.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.debounce.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.debounce.output || '点击 "运行" 查看防抖实现' }}</pre>
        </div>
      </div>

      <!-- 2.7 闭包应用：节流 -->
      <h3 class="s-subtitle">⑦ 闭包应用：节流（Throttle）</h3>
      <p class="s-desc">
        节流也是闭包的典型应用：在闭包中保存 <span class="kw">上次执行时间</span>（或 <span class="kw">timer</span>），每次触发时判断是否达到间隔时间。
        保证在 N 秒内只执行一次，即使被连续触发。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">throttle.js</span>
          <button class="run-btn" @click="runCode('throttle')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.throttle.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.throttle.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.throttle.output || '点击 "运行" 查看节流实现' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分</strong>：防抖和节流的核心区别是——<span class="kw">防抖是等用户停下来才执行</span>（适合输入搜索），<span class="kw">节流是限制执行频率</span>（适合滚动事件）。
        两者都是闭包的经典应用——在闭包中保存 timer/时间戳。如果面试官让你手写，先写出基础版，再主动加上 <code>immediate</code> 参数或 <code>cancel</code> 方法就是满分。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 执行上下文与调用栈 -->
    <!-- ============================================================ -->
    <section id="s3-execution" class="section-card">
      <h2 class="s-title">三、执行上下文与调用栈 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        执行上下文是 JS 引擎在执行代码前创建的<strong>内部运行环境</strong>。作用域、变量提升、闭包——这些概念的底层机制都藏在执行上下文中。
      </p>

      <!-- 3.1 创建阶段 vs 执行阶段 -->
      <h3 class="s-subtitle">① 创建阶段 vs 执行阶段</h3>
      <p class="s-desc">
        每个执行上下文分两个阶段：<strong>创建阶段</strong>（创建词法环境、处理变量/函数声明）和<strong>执行阶段</strong>（逐行执行代码）。
        <code>var</code> 在创建阶段被提升并初始化为 <code>undefined</code>，函数声明整体提升并初始化，
        而 <code>let</code>/<code>const</code> 仅提升但<strong>不初始化</strong>（进入 TDZ）。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">creation-phase.js</span>
          <button class="run-btn" @click="runCode('creationPhase')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.creationPhase.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.creationPhase.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.creationPhase.output || '点击 "运行" 查看创建阶段 VS 执行阶段的区别' }}</pre>
        </div>
      </div>

      <!-- 3.2 词法环境与变量环境 -->
      <h3 class="s-subtitle">② 词法环境 vs 变量环境</h3>
      <p class="s-desc">
        ES6 规范将执行上下文的环境分为两层：<strong>词法环境（LexicalEnvironment）</strong>存放 <code>let</code>/<code>const</code> 声明，
        <strong>变量环境（VariableEnvironment）</strong>存放 <code>var</code> 声明。
        这也是 <code>let</code> 和 <code>var</code> 行为差异的底层原因——它们存在于规范层面的<strong>不同环境记录</strong>中。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">lex-vs-var-env.js</span>
          <button class="run-btn" @click="runCode('lexVsVar')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.lexVsVar.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.lexVsVar.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.lexVsVar.output || '点击 "运行" 查看词法环境与变量环境的差异' }}</pre>
        </div>
      </div>

      <!-- 3.3 调用栈与 [[Environment]] -->
      <h3 class="s-subtitle">③ 调用栈与 <code>[[Environment]]</code></h3>
      <p class="s-desc">
        函数调用时会创建新的执行上下文并被<strong>压入调用栈</strong>，执行完毕弹出。而闭包的关键——每个函数对象内部都有一个 <code>[[Environment]]</code> 属性，
        在函数<strong>定义时</strong>被设置为当前正在执行的词法环境。这就是闭包能"记住"外层变量的底层原因。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">call-stack.js</span>
          <button class="run-btn" @click="runCode('callStack')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.callStack.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.callStack.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.callStack.output || '点击 "运行" 查看调用栈执行顺序' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分</strong>：当被问到"闭包为什么能记住外层变量"时，回答 <code>[[Environment]]</code> + 词法环境引用就是满分答案。
        当被问到"var 和 let 的区别"时，提到词法环境与变量环境两条记录线——面试官会眼睛一亮。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 综合动手 -->
    <!-- ============================================================ -->
    <section id="s4-playground" class="section-card">
      <h2 class="s-title">四、🧪 动手实验区</h2>
      <p class="s-desc">自己修改代码，运行看看结果。理解闭包和作用域的最佳方式是亲手调试。</p>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-code.js</span>
          <button class="run-btn" @click="runCode('playground')">▶ 运行你的代码</button>
          <button class="run-btn reset-btn" @click="resetPlayground">↺ 重置</button>
        </div>
        <textarea
          v-model="playgroundCode"
          class="code-editor"
          spellcheck="false"
          rows="10"
        ></textarea>
        <div class="output-panel" :class="{ 'has-content': snippets.playground.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.playground.output || '修改上方代码，点击 "运行" 查看输出' }}</pre>
        </div>
      </div>

      <div class="playground-hints">
        <p><strong>试试修改代码：</strong></p>
        <div class="hint-chips">
          <span class="hint-chip" @click="loadHint(0)">🔹 试着把 var 改成 let</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 加一个私有变量</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 试试闭包+循环</span>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s5-qa" class="section-card">
      <h2 class="s-title">五、面试高频问答（⭐→⭐⭐⭐）</h2>
      <p class="s-desc">点击问题展开答案，先思考再看解析。</p>

      <div class="qa-list">
        <div
          v-for="(item, idx) in questions"
          :key="idx"
          class="qa-item"
          :class="{ 'qa-open': openIdx === idx }"
        >
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

const toc = [
  { id: 's1-scope',       label: '作用域' },
  { id: 's2-closure',     label: '闭包' },
  { id: 's3-execution',   label: '执行上下文' },
  { id: 's4-playground',  label: '动手实验' },
  { id: 's5-qa',          label: '面试问答' },
]

// ─── 安全执行代码（拦截 console.log） ───
function captureConsole(fn: () => void): string[] {
  const lines: string[] = []
  const origLog = console.log
  const origError = console.error
  const origWarn = console.warn

  console.log = (...args: unknown[]) => {
    lines.push(args.map(a => formatArg(a)).join(' '))
  }
  console.error = (...args: unknown[]) => {
    lines.push('❌ ' + args.map(a => formatArg(a)).join(' '))
  }
  console.warn = (...args: unknown[]) => {
    lines.push('⚠️ ' + args.map(a => formatArg(a)).join(' '))
  }

  try {
    fn()
  } catch (e: unknown) {
    lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e)))
  }

  console.log = origLog
  console.error = origError
  console.warn = origWarn
  return lines
}

function formatArg(arg: unknown): string {
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'
  if (typeof arg === 'string') return arg
  if (typeof arg === 'object') {
    try { return JSON.stringify(arg) } catch { return String(arg) }
  }
  return String(arg)
}

// ─── 代码片段 ───
interface Snippet {
  code: string
  output: string
}

const snippets = reactive<Record<string, Snippet>>({
  globalScope: {
    code: `// 全局作用域 vs 函数作用域
var globalVar = '全局变量'

function test() {
  var fnVar = '函数变量'
  console.log(globalVar) // 可以访问 → '全局变量'
  console.log(fnVar)     // 可以访问 → '函数变量'
}
test()
// console.log(fnVar) // → ❌ ReferenceError（外部访问不到）
console.log(globalVar) // → '全局变量'（全局可访问）

// ★ 注意：var 在全局声明会挂到 window 上
// 但这个代码框是函数作用域，var 不会挂 window
// 真正的全局 var 应该在 .html 的 script 标签中声明`,
    output: '',
  },
  functionScope: {
    code: `// 函数作用域 + 变量提升
function test() {
  console.log(msg)   // → undefined（变量提升，但未初始化）
  var msg = 'hello'
  console.log(msg)   // → hello
}
test()
// console.log(msg)  // → ❌ ReferenceError: msg is not defined`,
    output: '',
  },
  blockScope: {
    code: `// 块级作用域 + TDZ
if (true) {
  let x = 10
  const y = 20
  var z = 30       // var 跳出块级作用域
  console.log(x, y) // → 10 20
}
console.log(z)      // → 30（var 逃逸了）
// console.log(x)   // → ❌ ReferenceError
// console.log(y)   // → ❌ ReferenceError

// 暂时性死区（TDZ）
console.log(typeof undeclaredVar) // → undefined（不存在的变量）
// console.log(typeof myLet)       // → ❌ ReferenceError（TDZ）
let myLet = 1`,
    output: '',
  },
  scopeChain: {
    code: `// 作用域链：内 → 外 → 全局
const a = '全局-a'

function outer() {
  const b = 'outer-b'

  function inner() {
    const c = 'inner-c'
    console.log(c)   // → inner-c（自己作用域）
    console.log(b)   // → outer-b（父级作用域）
    console.log(a)   // → 全局-a（全局作用域）
  }
  inner()
}
outer()`,
    output: '',
  },
  closureBasic: {
    code: `// 闭包：内层函数 + 外层作用域
function createCounter() {
  let count = 0       // 外层变量

  return function() { // 内层函数
    count++           // 引用外层变量 → 闭包
    return count
  }
}

const counter = createCounter()
console.log(counter()) // → 1
console.log(counter()) // → 2
console.log(counter()) // → 3
// count 变量没有被回收！`,
    output: '',
  },
  privateVar: {
    code: `// 闭包实现私有变量
function createBank(initial) {
  let balance = initial  // 私有变量

  return {
    deposit(amount) {
      balance += amount
      console.log('存入 ' + amount + '，余额: ' + balance)
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log('余额不足！')
        return
      }
      balance -= amount
      console.log('取出 ' + amount + '，余额: ' + balance)
    },
    getBalance() {
      return balance
    }
  }
}

var bank = createBank(100)
bank.deposit(50)   // → 存入 50，余额: 150
bank.withdraw(30)  // → 取出 30，余额: 120
bank.withdraw(200) // → 余额不足！
// console.log(bank.balance) // → undefined（无法直接访问）
console.log('当前余额:', bank.getBalance())`,
    output: '',
  },
  closureLoop: {
    code: `// 经典闭包陷阱
console.log('=== var（错误示范）===')

var funcs = []
for (var i = 0; i < 3; i++) {
  funcs.push(function() {
    console.log('var i =', i)  // 全是 3！
  })
}
funcs.forEach(function(f) { f() })  // → 3, 3, 3

// 解决方案 1: 用 let
console.log('=== let（正确示范）===')

var funcs2 = []
for (let j = 0; j < 3; j++) {
  funcs2.push(function() {
    console.log('let j =', j)  // 0, 1, 2
  })
}
funcs2.forEach(function(f) { f() })

// 解决方案 2: IIFE（传统方案）
console.log('=== IIFE（传统方案）===')

var funcs3 = []
for (var k = 0; k < 3; k++) {
  funcs3.push((function(n) {
    return function() {
      console.log('IIFE k =', n)  // 0, 1, 2
    }
  })(k))
}
funcs3.forEach(function(f) { f() })`,
    output: '',
  },
  currying: {
    code: `// 柯里化：闭包实现 add(1)(2)(3)
function add(x) {
  return function(y) {
    return function(z) {
      return x + y + z
    }
  }
}
console.log('add(1)(2)(3) =', add(1)(2)(3)) // → 6

// 进阶：通用柯里化函数
function curry(fn) {
  var args = []
  function curried() {
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    if (args.length >= fn.length) {
      var result = fn.apply(null, args)
      args = [] // 重置以便复用
      return result
    }
    return curried
  }
  return curried
}

function sum(a, b, c) {
  return a + b + c
}

var curriedSum = curry(sum)
console.log('curriedSum(1)(2)(3) =', curriedSum(1)(2)(3))
console.log('curriedSum(1, 2)(3) =', curriedSum(1, 2)(3))`,
    output: '',
  },
  closureMemory: {
    code: `// 闭包内存泄漏示例
function createLargeData() {
  const large = new Array(1000000).fill('📦')

  return function() {
    console.log('large 的长度:', large.length)
    // large 数组被闭包引用，无法被 GC 回收
  }
}

const leak = createLargeData()
leak() // → large 的长度: 1000000

// ✅ 解决方案：不用时解除引用
// leak = null  // 让闭包可被 GC 回收

console.log('闭包持有 large 引用，无法释放！')
console.log('解决办法: 用完后将闭包置为 null')`,
    output: '',
  },
  debounce: {
    code: `// ===== 防抖（Debounce） =====
// 闭包保存 timer，连续触发只执行最后一次
function debounce(fn, delay, immediate = false) {
  let timer = null  // 闭包变量

  const debounced = function(...args) {
    const callNow = immediate && !timer

    clearTimeout(timer)  // 每次触发清除上次的定时器

    timer = setTimeout(() => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }, delay)

    if (callNow) fn.apply(this, args)
  }

  // 添加取消功能
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

// 模拟连续触发
console.log('=== 防抖测试（delay=300ms, immediate=true） ===')
const log = debounce(function(msg) {
  console.log('执行:', msg, '| this.data:', this.data)
}, 300, true)

// 模拟连续调用
log.call({ data: 1 }, 'A')  // immediate 立即执行
log.call({ data: 2 }, 'B')  // 被取消
log.call({ data: 3 }, 'C')  // 被取消
// 300ms 后 "D" 是最后一次，被执行
setTimeout(() => log.call({ data: 4 }, 'E'), 400)
// 额外：1200ms 后再次执行
setTimeout(() => {
  log.call({ data: 5 }, 'F')  // immediate 再次立即执行
}, 1200)

console.log('注意：防抖的本质就是闭包保存 timer')
console.log('每次调用先清除再设置——只有"最后一个人"能执行')`,
    output: '',
  },
  throttle: {
    code: `// ===== 节流（Throttle） =====
// 闭包保存 last（上次执行时间），保证 N 秒内只执行一次

// 时间戳版（立即执行）
function throttle(fn, delay) {
  let last = 0  // 闭包变量：上次执行时间

  return function(...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
    // 如果时间没到，什么都不做
  }
}

// 定时器版（延迟执行）
function throttleTimer(fn, delay) {
  let timer = null  // 闭包变量

  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
    // 如果 timer 还在，说明还没到时间，跳过
  }
}

// 测试时间戳版
console.log('=== 节流测试（delay=500ms） ===')
let count = 0
const throttled = throttle(function() {
  console.log('执行次数:', ++count, '| time:', Date.now())
}, 500)

// 模拟连续快速触发
const start = Date.now()
const interval = setInterval(() => {
  throttled()
  if (Date.now() - start > 2000) {
    clearInterval(interval)
    console.log('\\n结论：节流保证每隔 500ms 最多执行一次')
    console.log('防抖和节流的共同点：都是闭包保存状态')
    console.log('不同点：防抖"只执行最后一次"，节流"定期执行"')
  }
}, 50)  // 每 50ms 触发一次`,
    output: '',
  },
  playground: {
    code: `// 来试试自己写闭包！
// 例：实现一个点赞计数器

function createLikes() {
  let likes = 0

  return {
    add() {
      likes++
      console.log('👍 点赞! 总计: ' + likes)
    },
    cancel() {
      if (likes > 0) likes--
      console.log('👎 取消点赞. 总计: ' + likes)
    },
    getLikes() {
      return likes
    }
  }
}

const post = createLikes()
post.add()     // → 👍 点赞! 总计: 1
post.add()     // → 👍 点赞! 总计: 2
post.cancel()  // → 👎 取消点赞. 总计: 1
console.log('最终点赞数:', post.getLikes())`,
    output: '',
  },
  creationPhase: {
    code: `// 执行上下文：创建阶段 vs 执行阶段
console.log('--- 创建阶段结束后 ---')
console.log('varName:', varName)       // undefined（已提升+初始化）
console.log('fnName:', fnName)         // 函数整体已提升
// console.log(letName)                // ❌ 报错（TDZ，仅提升未初始化）

var varName = 'var 声明'
let letName = 'let 声明'

function fnName() {
  return '函数声明已整体提升'
}

console.log('--- 执行阶段结束后 ---')
console.log('varName:', varName)       // 'var 声明'
console.log('letName:', letName)       // 'let 声明'
console.log('fnName():', fnName())     // '函数声明已整体提升'`,
    output: '',
  },
  lexVsVar: {
    code: `// 词法环境（let/const） vs 变量环境（var）
var globalVar = '我在 VariableEnvironment'
let globalLet = '我在 LexicalEnvironment'

function demo() {
  var var1 = 'var-1'
  var var2 = 'var-2'
  let let1 = 'let-1'
  const const1 = 'const-1'

  console.log('var 声明去 VariableEnvironment')
  console.log('let/const 声明去 LexicalEnvironment')
  console.log('')
  console.log('表现差异：')
  console.log('1. var 挂 window：', 'globalVar' in window)
  console.log('2. let 不挂 window：', 'globalLet' in window)
  console.log('3. var 可重复声明')
  console.log('4. let/const 不可重复声明')
  console.log('')
  console.log('var1:', var1, '| let1:', let1, '| const1:', const1)
}
demo()`,
    output: '',
  },
  callStack: {
    code: `// 调用栈与 [[Environment]]
console.log('① 全局执行上下文')

function a() {
  console.log('  ② 进入 a 的执行上下文')
  b()
  console.log('  ⑤ a 弹出')
}

function b() {
  console.log('    ③ 进入 b 的执行上下文')
  c()
  console.log('    ⑥ b 弹出')
}

function c() {
  console.log('      ④ 进入 c（栈顶）')
  console.log('      调用栈深度: global → a → b → c')
  console.log('      ⑦ c 弹出')
}

a()
console.log('⑧ 回到全局')`,
    output: '',
  },
})

// ─── 运行代码 ───
function runCode(key: string) {
  if (key === 'playground') {
    const lines = captureConsole(() => {
      const func = new Function(playgroundCode.value)
      func()
    })
    snippets.playground.output = lines.join('\n')
    return
  }

  const snippet = snippets[key]
  if (!snippet) return

  // 异步代码（含 setTimeout 的）
  const asyncKeys = ['debounce', 'throttle']
  if (asyncKeys.includes(key)) {
    snippet.output = '⏳ 执行中...'
    const captured: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
    setTimeout(() => {
      console.log = origLog
      snippet.output = captured.join('\n')
    }, 600)
    try {
      const func = new Function('setTimeout', 'clearInterval', 'setInterval', snippet.code)
      func(setTimeout, clearInterval, setInterval)
    } catch (e: unknown) {
      console.log = origLog
      snippet.output = '💥 错误: ' + (e instanceof Error ? e.message : String(e))
    }
    return
  }

  const lines = captureConsole(() => {
    const func = new Function(snippet.code)
    func()
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
  `// 把 var 改成 let 试试
var funcs = []
console.log('使用 let:')
for (let i = 0; i < 3; i++) {
  funcs.push(function() { console.log('let:', i) })
}
funcs.forEach(function(f) { f() })

var funcs2 = []
console.log('使用 var:')
for (var j = 0; j < 3; j++) {
  funcs2.push(function() { console.log('var:', j) })
}
funcs2.forEach(function(f) { f() })`,
  `// 加一个 "重置" 功能
function createCounter() {
  var count = 0

  return {
    increment: function() {
      count++
      console.log('count:', count)
    },
    decrement: function() {
      count--
      console.log('count:', count)
    },
    reset: function() {
      count = 0
      console.log('已重置')
    }
  }
}

var c = createCounter()
c.increment()  // 1
c.increment()  // 2
c.reset()      // 已重置
c.increment()  // 1`,
  `// 闭包 + 循环 + 按钮
// 模拟给多个按钮绑定点击事件
var buttons = []
for (var i = 0; i < 5; i++) {
  (function(n) {
    buttons.push(function() {
      console.log('按钮 ' + n + ' 被点击')
    })
  })(i)
}
buttons[0]()  // 按钮 0 被点击
buttons[4]()  // 按钮 4 被点击
console.log('如果用 var 且没有 IIFE，所有按钮都会显示 "按钮 5"')`,
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
    q: '什么是作用域？JS 有哪几种作用域？',
    a: '<strong>作用域</strong>是变量可访问的范围。<br><br>JS 有三种作用域：<br>① <strong>全局作用域</strong>：任何地方都能访问<br>② <strong>函数作用域</strong>：函数内部可访问（<code>var</code>）<br>③ <strong>块级作用域</strong>：代码块 <code>{}</code> 内可访问（<code>let</code> / <code>const</code>）<br><br>作用域是<strong>静态</strong>的——在代码编写阶段就确定了，不随运行时改变。注意：<code>var</code> 没有块级作用域，会跳出 <code>{}</code>。',
  },
  {
    level: 1,
    q: '什么是变量提升（hoisting）？暂时性死区（TDZ）又是什么？',
    a: '<strong>变量提升</strong>：<code>var</code> 声明的变量会被提升到作用域顶部（只提升声明，不提升赋值）。<br><br><strong>暂时性死区（TDZ）</strong>：<code>let</code> / <code>const</code> 声明的变量从进入作用域到声明完成之间不可访问。<br><br><code>console.log(a)  // undefined（var 提升，但未赋值）</code><br><code>var a = 1</code><br><br><code>console.log(b)  // ❌ ReferenceError（TDZ）</code><br><code>let b = 2</code><br><br><strong>面试技巧</strong>：说出"<code>let</code> 也有提升，但存在 TDZ 不能访问"就超过了 90% 的面试者。',
  },
  {
    level: 2,
    q: '什么是闭包？闭包有什么实际应用？',
    a: '<strong>闭包</strong>是指函数连同它声明时所处的作用域链一起保存的组合。简单说：<strong>内层函数引用了外层函数的变量</strong>。<br><br><strong>实际应用</strong>：<br>① <strong>私有变量</strong>：封装数据，外部无法直接修改<br>② <strong>柯里化</strong>：<code>add(1)(2)(3)</code><br>③ <strong>防抖/节流</strong>：保存定时器 ID<br>④ <strong>模块模式</strong>：IIFE 返回对象，隐藏内部实现<br>⑤ <strong>React Hooks</strong>：useState 底层也是闭包<br><br><strong>面试回答框架</strong>：定义 + 形成条件（函数嵌套 + 内层引用外层 + 被外部引用）+ 用途 + 内存注意。',
  },
  {
    level: 2,
    q: '闭包的经典陷阱是什么？怎么解决？',
    a: '<strong>陷阱</strong>：用 <code>var</code> 在循环中创建闭包，所有闭包共享同一个变量。<br><br><code>for (var i = 0; i < 3; i++) {</code><br><code>&nbsp;&nbsp;setTimeout(() => console.log(i), 100)  // 全部输出 3</code><br><code>}</code><br><br><strong>原因</strong>：<code>var</code> 无块级作用域，循环结束后 <code>i</code> 为 3，所有回调都引用同一个 <code>i</code>。<br><br><strong>3 种解决方案</strong>：<br>① <strong>用 let</strong>（最简单）：<code>for (let i = 0; ...)</code> — 每个循环创建一个新的绑定<br>② <strong>IIFE</strong>（传统方案）：<code>(function(n) { ... })(i)</code><br>③ <strong>用闭包函数包裹</strong>：将 <code>i</code> 作为参数传入内部函数',
  },
  {
    level: 2,
    q: 'var、let、const 三者的区别是什么？',
    a: '<table style="font-size:0.85rem;border-collapse:collapse;width:100%;margin-top:6px;"><tr><th style="border:1px solid #ccc;padding:6px;text-align:left">特性</th><th style="border:1px solid #ccc;padding:6px;text-align:left">var</th><th style="border:1px solid #ccc;padding:6px;text-align:left">let</th><th style="border:1px solid #ccc;padding:6px;text-align:left">const</th></tr><tr><td style="border:1px solid #ccc;padding:6px">作用域</td><td style="border:1px solid #ccc;padding:6px">函数</td><td style="border:1px solid #ccc;padding:6px">块级</td><td style="border:1px solid #ccc;padding:6px">块级</td></tr><tr><td style="border:1px solid #ccc;padding:6px">变量提升</td><td style="border:1px solid #ccc;padding:6px">✅ 提升为 undefined</td><td style="border:1px solid #ccc;padding:6px">✅ 但不初始化（TDZ）</td><td style="border:1px solid #ccc;padding:6px">✅ 但不初始化（TDZ）</td></tr><tr><td style="border:1px solid #ccc;padding:6px">重复声明</td><td style="border:1px solid #ccc;padding:6px">✅ 可以</td><td style="border:1px solid #ccc;padding:6px">❌ 不可以</td><td style="border:1px solid #ccc;padding:6px">❌ 不可以</td></tr><tr><td style="border:1px solid #ccc;padding:6px">重新赋值</td><td style="border:1px solid #ccc;padding:6px">✅ 可以</td><td style="border:1px solid #ccc;padding:6px">✅ 可以</td><td style="border:1px solid #ccc;padding:6px">❌ 不可以</td></tr><tr><td style="border:1px solid #ccc;padding:6px">挂载 window</td><td style="border:1px solid #ccc;padding:6px">✅ 会</td><td style="border:1px solid #ccc;padding:6px">❌ 不会</td><td style="border:1px solid #ccc;padding:6px">❌ 不会</td></tr></table><br>口诀：<strong>var 函数、let 块、const 块且不能改</strong>。',
  },
  {
    level: 2,
    q: '什么是作用域链？如何查找变量？',
    a: '当访问一个变量时，JS 引擎从<strong>当前作用域</strong>开始查找：<br><br>① 当前作用域 → 找到 → 使用<br>② 没找到 → 上一级作用域<br>③ 还没找到 → 继续向上<br>④ 到全局作用域还没找到 → <code>ReferenceError</code><br><br><strong>面试关键词</strong>：<br>· 作用域链在<strong>定义时</strong>确定（静态作用域/词法作用域），不是调用时<br>· 嵌套函数的作用域链包含自身 → 父函数 → 全局<br>· 这是闭包能访问外层变量的根本原因',
  },
  {
    level: 3,
    q: '闭包会导致内存泄漏吗？如何避免？',
    a: '<strong>会</strong>。闭包会持续持有外层变量的引用，导致这些变量<strong>不会被垃圾回收</strong>。<br><br><strong>典型场景</strong>：<br>① 大数组/对象被闭包引用，函数执行完毕但数组无法释放<br>② DOM 事件绑定闭包后未解绑，DOM 已移除但监听器仍存活<br><br><strong>解决方案</strong>：<br>① <strong>用完置 null</strong>：<code>leak = null</code> — 解除闭包引用，让 GC 回收<br>② <strong>及时解绑事件</strong>：<code>element.removeEventListener(...)</code><br>③ <strong>仅保留需要的数据</strong>：不要在整个闭包作用域中保留大对象<br><br><strong>注意</strong>：不是所有闭包都会导致内存泄漏。合理使用闭包（私有变量、模块模式）是正常且推荐的。问题在于<strong>不需要时仍然持有引用</strong>。',
  },
  {
    level: 3,
    q: '实现一个 add(1)(2)(3) 返回 6 的函数。',
    a: '<strong>基础版</strong>：<br><code>function add(a) {</code><br><code>&nbsp;&nbsp;return function(b) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return function(c) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return a + b + c</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>进阶版</strong>（无限调用 + 求值）：<br><code>function add(x) {</code><br><code>&nbsp;&nbsp;const fn = (y) => add(x + y)</code><br><code>&nbsp;&nbsp;fn.valueOf = () => x</code><br><code>&nbsp;&nbsp;return fn</code><br><code>}</code><br><code>console.log(add(1)(2)(3).valueOf())  // 6</code><br><br><strong>原理</strong>：每次调用返回一个新函数（闭包持有累加值），利用 <code>valueOf</code> 在隐式转换时求值。',
  },
  {
    level: 3,
    q: '什么是 IIFE？它和闭包有什么关系？',
    a: '<strong>IIFE（立即执行函数表达式）</strong>：定义完后立即执行的函数。<br><br><code>(function() {</code><br><code>&nbsp;&nbsp;var privateVar = "别人碰不到"</code><br><code>})()</code><br><br><strong>和闭包的关系</strong>：<br>① IIFE 创建独立作用域，外部无法访问内部变量<br>② IIFE 内部可以返回函数形成闭包<br>③ 经典用法：循环闭包问题中用 IIFE 捕获每次循环的值<br><br><strong>现代替代</strong>：<code>{ let x = 1 }</code> 块级作用域已经能代替大部分 IIFE 的用途。但 IIFE 在模块模式中仍有用。',
  },
  {
    level: 3,
    q: '请解释"闭包是静态作用域的产物"这句话。',
    a: '<strong>静态作用域（词法作用域）</strong>：变量的作用域在<strong>代码编写时</strong>就确定了，不由运行时决定。<br><br>闭包之所以能"记住"外层变量，就是因为 JS 采用静态作用域：<br><br>① 函数定义时，它的作用域链已经确定<br>② 函数对象内部保存了 <code>[[Environment]]</code> 属性，指向定义时的作用域<br>③ 函数被调用时，创建新的执行上下文，作用域链 = 当前作用域 + <code>[[Environment]]</code><br>④ 即使外部函数执行完毕，内部函数仍持有外部作用域的引用<br><br><strong>对比：动态作用域</strong>（Bash、Perl 的部分特性）——变量的值由调用者决定。JS 不是动态作用域。',
  },
  {
    level: 1,
    q: 'const 声明对象后，能修改对象的属性吗？',
    a: '<strong>可以</strong>。<code>const</code> 保证的是<strong>引用不可变</strong>，不是值不可变。<br><br><code>const obj = { name: "张三" }</code><br><code>obj.name = "李四"  // ✅ 可以修改属性</code><br><code>obj.age = 18      // ✅ 可以添加属性</code><br><code>obj = {}          // ❌ TypeError: 不能重新赋值</code><br><br>要冻结对象用 <code>Object.freeze()</code>：<br><code>const frozen = Object.freeze({ name: "张三" })</code><br><code>frozen.name = "李四"  // 严格模式下报错，非严格模式静默失败</code><br><br>注意：<code>Object.freeze</code> 是<strong>浅冻结</strong>，嵌套对象仍需递归冻结。',
  },
  {
    level: 2,
    q: '箭头函数的 this 和普通函数的 this 有什么区别？和作用域/闭包有关吗？',
    a: '<strong>关键区别</strong>：<br>① <strong>普通函数</strong>：<code>this</code> 在<strong>调用时</strong>决定（谁调用指向谁）<br>② <strong>箭头函数</strong>：<code>this</code> 在<strong>定义时</strong>决定（继承父作用域的 this）<br><br>箭头函数的 this 机制本质就是<strong>闭包</strong>——箭头函数没有自己的 this，它捕获<strong>声明时所在作用域</strong>的 this 值，就像闭包捕获外层变量一样。<br><br><code>const obj = {</code><br><code>&nbsp;&nbsp;name: "obj",</code><br><code>&nbsp;&nbsp;fn1: function() {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;console.log(this.name)  // obj（调用时决定）</code><br><code>&nbsp;&nbsp;},</code><br><code>&nbsp;&nbsp;fn2: () => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;console.log(this.name)  // undefined（继承外部的 this）</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>结论</strong>：箭头函数 = 闭包 + 继承 this。这也是面试中把箭头函数和闭包放在一起考的原因。',
  },
  {
    level: 1,
    q: 'let 和 const 声明的变量到底有没有变量提升？',
    a: '<strong>有提升，但你不能访问</strong>。<br><br>这是面试中最容易混淆的点——很多人说"let/const 没有变量提升"，这是<strong>不准确</strong>的。<br><br><strong>真相</strong>：<br>· <code>let</code> / <code>const</code> 也会被提升到作用域顶部<br>· 但是它们处于"<strong>暂时性死区（TDZ）</strong>"中，在声明完成之前访问会抛出 <code>ReferenceError</code><br>· <code>var</code> 提升后被初始化为 <code>undefined</code>，所以可访问<br>· <code>let</code> / <code>const</code> 提升后<strong>尚未初始化</strong>，所以不可访问<br><br>证据：<br><code>let x = 1</code><br><code>{</code><br><code>&nbsp;&nbsp;console.log(x)  // ❌ ReferenceError（不是读取全局的 x！说明变量已提升）</code><br><code>&nbsp;&nbsp;let x = 2</code><br><code>}</code><br><br>如果 let 没有提升，上面的 <code>console.log(x)</code> 应该输出全局的 <code>1</code>。实际上报错了——说明 <code>let x</code> 被提升到了块级顶部，形成了 TDZ。',
  },
  {
    level: 2,
    q: '手写一个防抖函数（debounce），说说它和闭包的关系。【字节/腾讯 高频】',
    a: '<strong>防抖</strong>：在事件被触发 N 秒后再执行回调，如果 N 秒内又被触发，则重新计时。<br><br><code>function debounce(fn, delay) {</code><br><code>&nbsp;&nbsp;let timer = null  // 闭包变量</code><br><br><code>&nbsp;&nbsp;return function(...args) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;clearTimeout(timer)  // 每次调用清除上一次的定时器</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;timer = setTimeout(() => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn.apply(this, args)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;}, delay)</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>和闭包的关系</strong>：<code>timer</code> 变量被内部函数引用，每次调用返回的函数时，都能访问到上一次的 <code>timer</code> 值。这就是闭包的典型应用——<strong>保存状态</strong>。<br><br><strong>面试技巧</strong>：说完实现后加一句"防抖的核心是闭包保存定时器 ID，每次触发先清除再重新计时"，面试官会点头。',
  },
  {
    level: 2,
    q: '手写一个节流函数（throttle），它和防抖有什么区别？【字节/腾讯 高频】',
    a: '<strong>节流</strong>：连续触发事件时，保证在 N 秒内<strong>只执行一次</strong>回调。<br><br><strong>时间戳版</strong>（立即执行）：<br><code>function throttle(fn, delay) {</code><br><code>&nbsp;&nbsp;let last = 0  // 闭包保存上次执行时间</code><br><br><code>&nbsp;&nbsp;return function(...args) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;const now = Date.now()</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (now - last &gt;= delay) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last = now</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn.apply(this, args)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>定时器版</strong>（延迟执行）：<br><code>function throttle(fn, delay) {</code><br><code>&nbsp;&nbsp;let timer = null</code><br><br><code>&nbsp;&nbsp;return function(...args) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (!timer) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer = setTimeout(() => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer = null</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn.apply(this, args)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, delay)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>和防抖的区别</strong>：<br>· 防抖是<strong>等待空闲</strong>——连续触发只执行最后一次<br>· 节流是<strong>限制频率</strong>——连续触发也保证每隔 N 秒执行一次<br>· 防抖适合输入搜索、窗口 resize；节流适合滚动加载、鼠标移动<br><br><strong>和闭包的关系</strong>：和防抖一样，节流也是通过闭包<strong>保存持久状态</strong>（时间戳版保存 <code>last</code>，定时器版保存 <code>timer</code>）。两者本质都是"闭包 + 定时器/时间戳"的组合。',
  },
  {
    level: 3,
    q: 'JS 代码执行时，内部发生了什么？（什么是执行上下文）',
    a: '这是面试中区分"会用"和"懂原理"的经典问题。<br><br><strong>执行上下文</strong>是 JS 引擎在执行代码前创建的内部运行环境。分为三类：<br>① <strong>全局执行上下文</strong>：首次加载时创建<br>② <strong>函数执行上下文</strong>：每次调用函数时创建<br>③ <strong>eval 执行上下文</strong>：eval 执行时创建<br><br><strong>创建阶段做的事</strong>：<br>· 创建<strong>词法环境（LexicalEnvironment）</strong>：存 <code>let</code> / <code>const</code>、函数声明<br>· 创建<strong>变量环境（VariableEnvironment）</strong>：存 <code>var</code> 声明<br>· 确定 <code>this</code> 绑定<br><br><strong>执行阶段</strong>：逐行执行代码，变量赋值，函数调用。<br><br><strong>面试回答框架</strong>：JS 引擎遇到脚本/函数调用时，创建执行上下文 → 分创建阶段（词法/变量环境 + this）和执行阶段 → 上下文压入调用栈 → 执行完毕弹出 → 栈空则程序结束。',
  },
  {
    level: 3,
    q: '闭包能"记住"外层变量的底层原理是什么？',
    a: '核心是<strong>[[Environment]]</strong> 内部属性 + 词法环境引用链。<br><br><strong>原理分步</strong>：<br>① 每个函数对象都有一个内部属性 <code>[[Environment]]</code><br>② 函数<strong>定义时</strong>，<code>[[Environment]]</code> 被设置为<strong>当前正在执行的执行上下文</strong>的词法环境<br>③ 函数被调用时，新执行上下文的作用域链 = 当前词法环境 + <code>[[Environment]]</code>（即外层词法环境）<br>④ 因此内部函数始终能通过 <code>[[Environment]]</code> 访问到外层变量——<strong>即使外层函数已经执行完毕</strong><br><br><strong>和 GC 的关系</strong>：<br>· 当内层函数被外部变量引用时，<code>[[Environment]]</code> 引用的外层词法环境<strong>不会被垃圾回收</strong><br>· 这就是闭包可能导致内存泄漏的根本原因——词法环境被持续持有<br><br><strong>面试技巧</strong>：提到 <code>[[Environment]]</code> 和词法环境引用链，面试官就能确认你对 V8 底层有理解。可以补一句"Chrome 的 Coverage 面板可以检测未释放的闭包变量"。',
  },
]
</script>

<style scoped>
/* ============================================
   JavaScript Core Page
   ============================================ */
.js-page {
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
.s-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  background: #8b5cf622;
  color: #8b5cf6;
  vertical-align: middle;
  margin-left: 8px;
}
.s-badge-sm {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 8px;
  background: #8b5cf622;
  color: #8b5cf6;
  vertical-align: middle;
  margin-left: 4px;
}
.s-subtitle {
  font-size: 1.05rem;
  color: var(--color-heading);
  margin: 1.5rem 0 0.5rem;
  padding-left: 0.5rem;
  border-left: 3px solid hsla(160, 100%, 37%, 1);
}
.s-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 0.8rem;
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
  margin-top: 1rem;
}

/* ─── Demo Area ─── */
.demo-area {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}
.demo-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
}
.demo-code-filename {
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.5;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
}
.run-btn {
  padding: 4px 14px;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 4px;
  background: hsla(160, 100%, 37%, 0.1);
  color: hsla(160, 100%, 37%, 1);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}
.run-btn:hover {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
}
.run-btn.reset-btn {
  border-color: var(--color-border);
  color: var(--color-text);
  background: transparent;
  margin-left: 6px;
}
.run-btn.reset-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
  background: transparent;
}

/* ─── Code Block ─── */
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 1rem 1.2rem;
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.6;
  margin: 0;
  tab-size: 2;
}
.code-block code {
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  white-space: pre;
}

/* ─── Code Editor (Playground) ─── */
.code-editor {
  width: 100%;
  min-height: 220px;
  padding: 1rem 1.2rem;
  background: #1e1e2e;
  color: #cdd6f4;
  border: none;
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  tab-size: 2;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
}
.code-editor:focus {
  outline: 1px solid hsla(160, 100%, 37%, 0.4);
}

/* ─── Output Panel ─── */
.output-panel {
  border-top: 1px solid var(--color-border);
  padding: 10px 14px;
  background: #1a1a2e;
  min-height: 48px;
}
.output-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.output-content {
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  font-size: 0.82rem;
  color: #a0e0a0;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.5;
  min-height: 1.2em;
}
.output-panel.has-content .output-content {
  color: #a0e0a0;
}
.output-panel:not(.has-content) .output-content {
  color: #666;
  font-style: italic;
}

/* ─── Playground ─── */
.playground-hints {
  margin-top: 1rem;
}
.playground-hints p {
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: var(--color-heading);
}
.hint-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.hint-chip {
  font-size: 0.8rem;
  padding: 5px 12px;
  border-radius: 20px;
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}
.hint-chip:hover {
  border-color: hsla(160, 100%, 37%, 1);
  color: hsla(160, 100%, 37%, 1);
  background: hsla(160, 100%, 37%, 0.05);
}

/* ─── Q&A ─── */
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
}
</style>
