<template>
  <div class="js-page">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <h1>JavaScript this 指向规则</h1>
      <p class="hero-sub">面试必考 · 四种绑定规则 · 优先级 · 箭头函数 · 手写 call/apply/bind</p>
    </header>

    <!-- ============ TOC ============ -->
    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 四种绑定规则 -->
    <!-- ============================================================ -->
    <section id="s1-rules" class="section-card">
      <h2 class="s-title">一、四种绑定规则</h2>
      <p class="s-desc">
        <code>this</code> 的值在<strong>调用时</strong>确定，由调用方式决定。一共四种规则，按优先级从低到高是：<strong>默认 → 隐式 → 显式 → new</strong>。
      </p>

      <!-- 1.1 默认绑定 -->
      <h3 class="s-subtitle">① 默认绑定</h3>
      <p class="s-desc">直接调用函数（无任何修饰），<code>this</code> 指向全局对象（浏览器为 <code>window</code>）。但在<strong>严格模式</strong>下为 <code>undefined</code>——这是面试中"让你猜 this 输出"最常见的坑。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">default-binding.js</span>
          <button class="run-btn" @click="runCode('defaultBind')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.defaultBind.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.defaultBind.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.defaultBind.output || '点击 "运行" 查看默认绑定' }}</pre>
        </div>
      </div>
      <div class="s-tip">
        💡 <strong>严格模式小课堂</strong>：<code>'use strict'</code> 让 JS 以更严格的方式运行。除了让默认绑定的 <code>this</code> 从 <code>window</code> 变为 <code>undefined</code>，还会阻止未声明变量赋值、禁止 <code>with</code> 语句等。
        注意：<strong>Vue 3 / Vite 项目中 <code>&lt;script setup&gt;</code> 默认就是严格模式</strong>，不需手动写 <code>'use strict'</code>。
      </div>

      <!-- 1.2 隐式绑定 -->
      <h3 class="s-subtitle">② 隐式绑定</h3>
      <p class="s-desc">函数作为对象的方法被调用时，<code>this</code> 指向<strong>调用该方法的对象</strong>（<code>obj.fn()</code> → <code>this = obj</code>）。<strong>隐式丢失</strong>是最常见的面试坑——把方法赋值给变量后再调用，<code>this</code> 会回到默认绑定。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">implicit-binding.js</span>
          <button class="run-btn" @click="runCode('implicitBind')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.implicitBind.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.implicitBind.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.implicitBind.output || '点击 "运行" 查看隐式绑定与丢失' }}</pre>
        </div>
      </div>

      <!-- 1.3 显式绑定 -->
      <h3 class="s-subtitle">③ 显式绑定</h3>
      <p class="s-desc">通过 <code>call</code> / <code>apply</code> / <code>bind</code> 手动指定 <code>this</code>。<code>call</code> 传参列表，<code>apply</code> 传参数组，<code>bind</code> 返回新函数（不立即执行）。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">explicit-binding.js</span>
          <button class="run-btn" @click="runCode('explicitBind')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.explicitBind.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.explicitBind.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.explicitBind.output || '点击 "运行" 查看显式绑定' }}</pre>
        </div>
      </div>

      <!-- 1.4 new 绑定 -->
      <h3 class="s-subtitle">④ new 绑定</h3>
      <p class="s-desc">用 <code>new</code> 调用函数时，引擎内部会<strong>创建一个新对象</strong>，将 <code>this</code> 指向它，并<strong>连接原型</strong>。这是优先级最高的绑定规则——<code>new</code> 连 <code>bind</code> 都能覆盖。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">new-binding.js</span>
          <button class="run-btn" @click="runCode('newBind')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.newBind.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.newBind.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.newBind.output || '点击 "运行" 查看 new 绑定' }}</pre>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 优先级与总结 -->
    <!-- ============================================================ -->
    <section id="s2-priority" class="section-card">
      <h2 class="s-title">二、优先级与总结 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        四种绑定规则同时出现时，优先级：<strong>new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定</strong>。
        注意 <code>bind</code> 绑定的 <code>this</code> 不能被 <code>call</code>/<code>apply</code> 覆盖（除非用 new）。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">priority.js</span>
          <button class="run-btn" @click="runCode('priority')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.priority.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.priority.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.priority.output || '点击 "运行" 查看优先级对决' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：必问场景题——"下面代码输出什么？"几乎都是考隐式丢失和优先级。记住：<code>new</code> 框出了 <code>bind</code>（<code>new</code> 在任何绑定的最顶层）。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 箭头函数 -->
    <!-- ============================================================ -->
    <section id="s3-arrow" class="section-card">
      <h2 class="s-title">三、箭头函数与 this</h2>
      <p class="s-desc">
        箭头函数<strong>没有自己的 this</strong>，它捕获<strong>定义时所在作用域</strong>的 this 值，且一经绑定<strong>不可更改</strong>（call/apply/bind 无效）。
        本质就是闭包——箭头函数的 this 继承自外层作用域。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">arrow-this.js</span>
          <button class="run-btn" @click="runCode('arrowThis')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.arrowThis.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.arrowThis.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.arrowThis.output || '点击 "运行" 查看箭头函数 this' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：箭头函数和普通函数的 this 区别是 Vue3 面试绕不开的题。特别是面试问到"Vue 3 中为什么 setup() 里用箭头函数不会丢失 this？"答案是 setup 在 created 之前调用，且 options API 的 this 在组件实例上。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s4-playground" class="section-card">
      <h2 class="s-title">四、🧪 动手实验区</h2>
      <p class="s-desc">修改下面的代码，观察 this 的变化。换调用方式、换严格模式、试试箭头和普通函数的相互嵌套。</p>

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
          <span class="hint-chip" @click="loadHint(0)">🔹 把 obj.fn() 改成 const f = obj.fn; f()</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 试试箭头函数 + setTimeout</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 new 和 bind 谁更强</span>
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
  { id: 's1-rules',      label: '四种绑定' },
  { id: 's2-priority',   label: '优先级' },
  { id: 's3-arrow',      label: '箭头函数' },
  { id: 's4-playground', label: '动手实验' },
  { id: 's5-qa',         label: '面试问答' },
]

// ─── 安全执行代码 ───
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
  defaultBind: {
    code: `// 默认绑定：直接调用（非严格模式）
function showThis() {
  console.log('非严格模式 this:', this)
}
showThis()
// → window（浏览器）或 global（Node）

// 严格模式：默认绑定为 undefined
function showThisStrict() {
  'use strict'
  console.log('严格模式 this:', this)
}
showThisStrict()
// → undefined

// 面试陷阱：ES 模块顶层 this 也是 undefined`,
    output: '',
  },
  implicitBind: {
    code: `// 隐式绑定：谁调用指向谁
const obj = {
  name: 'obj',
  fn() {
    console.log('this.name:', this.name)
  }
}
obj.fn()   // → obj ✅ 隐式绑定

// 隐式丢失（核心考点）
const ref = obj.fn
ref()      // → undefined ❌ 丢失了 obj
// 因为 ref() 是直接调用，变成了默认绑定

// 另一个丢失场景：传参
function exec(fn) {
  fn()     // 回调丢失了调用者
}
exec(obj.fn)  // → undefined
// 此时 fn 引用的是原始函数，obj 信息丢失

// 修复：用 bind 绑定 this
exec(obj.fn.bind(obj))  // → obj ✅`,
    output: '',
  },
  explicitBind: {
    code: `// call: 参数列表
// apply: 参数数组
// bind: 返回新函数（不立即执行）

const alice = { name: 'Alice' }
const bob   = { name: 'Bob' }

function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation)
}

// call
greet.call(alice, 'Hello', '!')   // Hello, Alice!
greet.call(bob, 'Hi', '.')        // Hi, Bob.

// apply（参数为数组）
greet.apply(alice, ['Hey', '!!']) // Hey, Alice!!

// bind（返回新函数）
const greetAlice = greet.bind(alice, '你好')
greetAlice('～')                   // 你好, Alice～
greetAlice('呀')                   // 你好, 呀

// 注意：bind 返回的函数 this 不能被 call/apply 改变！
const bound = greet.bind(alice)
bound.call(bob, 'Yo', '?')        // Yo, Alice?（还是 Alice！）`,
    output: '',
  },
  newBind: {
    code: `// ===== new 绑定的四步 =====
function Person(name) {
  // 第 3 步：this 指向新创建的对象
  this.name = name
  this.sayHi = function() {
    console.log('Hi, I\\'m ' + this.name)
  }
  // 第 4 步：默认返回新对象
}

// 第 1 步：创建空对象 {}
// 第 2 步：原型连接（p1.__proto__ = Person.prototype）
const p1 = new Person('张三')
const p2 = new Person('李四')
p1.sayHi()   // Hi, I'm 张三
p2.sayHi()   // Hi, I'm 李四
console.log('p1 的原型:', p1.__proto__ === Person.prototype)

// ===== 陷阱：构造函数返回对象 =====
function Badge(name) {
  this.name = name
  return { custom: true }
}
console.log('返回对象:', new Badge('test'))  // name 丢了！

function Badge2(name) {
  this.name = name
  return 123  // 原始值，被忽略
}
console.log('返回数字:', new Badge2('test')) // { name: 'test' }

// ===== 忘了 new？ =====
function User(name) {
  'use strict'
  this.name = name  // 严格模式 this=undefined，报错
}
// const u = User('小明')  // ❌ TypeError

// ===== 面试题：手写 new（你来写！） =====
// 要求：实现 function myNew(ctor, ...args)
// 1. 创建空对象，原型链接
// 2. 用 ctor.apply(obj, args) 执行构造函数
// 3. 如果构造函数返回了对象则用它，否则返回新对象
// ↓ 去「动手实验区」自己实现吧！
`,
    output: '',
  },
  priority: {
    code: `// 优先级：new > 显式 > 隐式 > 默认

function getThis() {
  console.log('this:', this)
}

const objA = { name: 'A', getThis }
const objB = { name: 'B' }

// 隐式 vs 默认
objA.getThis()                // → A（隐式赢）

// 显式 vs 隐式
objA.getThis.call(objB)       // → B（显式赢）

// new vs 隐式
new objA.getThis()            // → getThis {}（new 赢）

// new vs 显式
function Foo() {
  console.log('this:', this)
}
const bound = Foo.bind(objA)
new bound()                   // → Foo {}（new 赢过 bind！）
console.log('new 的优先级最高，其次是显式，再是隐式')

// bind 的特殊性：一旦 bind 过，call/apply 改不了
const objC = { name: 'C' }
bound.call(objC)              // → A（bind 的 this 锁定，call 无效）`,
    output: '',
  },
  arrowThis: {
    code: `// 箭头函数：没有自己的 this
// this 继承自定义时的外层作用域

const obj = {
  name: 'obj',
  normal: function() {
    console.log('普通函数:', this.name)
  },
  arrow: () => {
    console.log('箭头函数:', this.name)
  },
  nested() {
    // 箭头函数定义在 nested 内部
    // this 继承 nested 的 this
    const inner = () => {
      console.log('嵌套箭头:', this.name)
    }
    inner()
  }
}

obj.normal()   // → obj  （普通函数，调用决定）
obj.arrow()    // → undefined（箭头，定义时捕获的是全局 this）
obj.nested()   // → obj  （箭头，定义时捕获的是 nested 的 this）

// 显式绑定对箭头函数无效
obj.arrow.call({ name: 'other' })  // → undefined（无效）

// setTimeout 中的 this
const timer = {
  name: 'timer',
  bad() {
    setTimeout(function() {  // 普通函数
      console.log('普通 setTimeout:', this.name) // undefined
    }, 10)
  },
  good() {
    setTimeout(() => {       // 箭头函数
      console.log('箭头 setTimeout:', this.name) // timer
    }, 10)
  }
}
timer.bad()
timer.good()`,
    output: '',
  },
  playground: {
    code: `// 来试试 this 的各种场景！
// 试着修改调用方式，观察 this 变化

const demo = {
  name: 'demo对象',
  fn() {
    console.log('this.name:', this.name)
  }
}

// 试试改成这些调用方式：
demo.fn()           // 隐式绑定 → "demo对象"

// const f = demo.fn
// f()               // 默认绑定 → undefined

// demo.fn.call({ name: '其他对象' })  // 显式绑定

// const bound = demo.fn.bind({ name: 'bind目标' })
// bound()           // bind 绑定`,
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
  `// 隐式丢失 vs 保留 this
const obj = {
  name: 'obj对象',
  greet() {
    console.log('你好，我是', this.name)
  }
}

// 直接调用
obj.greet()    // 有 obj，正常

// 赋值后调用（丢失！）
const fn = obj.greet
fn()           // this.name = undefined

// 修复：bind
const bound = obj.greet.bind(obj)
bound()        // 正常了

// Vue 3 中 methods 就是这么绑的`,
  `// 箭头函数 + setTimeout
function Timer() {
  this.seconds = 0

  setInterval(() => {
    this.seconds++
    console.log('第', this.seconds, '秒')
  }, 1000)
}

// 如果 setInterval 里是普通函数，this 会丢失
// 箭头函数捕获了 Timer 的 this
const t = new Timer()
setTimeout(() => clearInterval(), 4000)`,
  `// new 和 bind 的优先级对决
function Foo() {
  console.log('this 是 Foo 的实例:', this instanceof Foo)
}

const obj = { name: 'obj' }
const BoundFoo = Foo.bind(obj)

// bind 的 this 被 new 覆盖！
new BoundFoo()            // true（new 赢了）
BoundFoo()                // this 不是 Foo 实例
console.log('结论: new 绑定 > 显式绑定(bind)')`,
  `// 面试题：手写 new
function myNew(ctor, ...args) {
  // 你来写：
  // 1. 创建空对象，原型链连接到 ctor.prototype
  // 2. 用 ctor.apply(obj, args) 执行
  // 3. 返回对象或新对象
}
function Person(name) { this.name = name }
const p = myNew(Person, '测试')
console.log(p.name, p instanceof Person)
// 预期: 测试 true`,
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
    q: 'this 的四种绑定规则是什么？',
    a: '按优先级从低到高：<br><br>① <strong>默认绑定</strong>：直接调用 <code>fn()</code> → <code>this</code> 指向全局对象（严格模式为 <code>undefined</code>）<br>② <strong>隐式绑定</strong>：对象调用 <code>obj.fn()</code> → <code>this</code> 指向 <code>obj</code><br>③ <strong>显式绑定</strong>：<code>fn.call(obj)</code> / <code>fn.apply(obj)</code> / <code>fn.bind(obj)</code> → <code>this</code> 指向指定的 <code>obj</code><br>④ <strong>new 绑定</strong>：<code>new Fn()</code> → <code>this</code> 指向新创建的对象<br><br><strong>面试回答框架</strong>：先说四种规则 + 优先级顺序（new > 显式 > 隐式 > 默认），再举一个隐式丢失的例子，面试官就会认为你掌握了。',
  },
  {
    level: 2,
    q: 'call、apply、bind 的区别是什么？',
    a: '<strong>共同点</strong>：都用于显式指定 <code>this</code>。<br><br><strong>区别</strong>：<br>· <code>call(this, arg1, arg2, ...)</code> — 参数<strong>列表</strong>，<strong>立即执行</strong><br>· <code>apply(this, [arg1, arg2])</code> — 参数<strong>数组</strong>，<strong>立即执行</strong><br>· <code>bind(this, arg1, arg2)</code> — 返回<strong>新函数</strong>，<strong>不立即执行</strong><br><br><strong>手写 bind 核心</strong>（面试高频）：<br><code>function myBind(fn, thisArg, ...args) {</code><br><code>&nbsp;&nbsp;return function(...rest) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return fn.apply(thisArg, args.concat(rest))</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br><strong>使用场景</strong>：<br>· <code>call</code>：借用方法（如 <code>Array.prototype.slice.call(arguments)</code>）<br>· <code>apply</code>：参数是数组的场景（如 <code>Math.max.apply(null, arr)</code>）<br>· <code>bind</code>：回调函数固定 this、偏函数（预设参数）',
  },
  {
    level: 2,
    q: '什么是隐式丢失？如何避免？',
    a: '<strong>隐式丢失</strong>：当函数被赋值给变量、作为参数传递、或作为回调函数时，丢失了调用者信息，<code>this</code> 回退为默认绑定。<br><br><strong>典型场景</strong>：<br><code>const obj = { name: "obj", fn() { console.log(this.name) } }</code><br><code>const ref = obj.fn; ref()  // ❌ undefined</code><br><code>setTimeout(obj.fn, 100)     // ❌ undefined</code><br><code>(obj.fn)()                  // ❌ undefined（表达式赋值）</code><br><br><strong>3 种解决方案</strong>：<br>① <strong>bind 绑定</strong>：<code>setTimeout(obj.fn.bind(obj), 100)</code><br>② <strong>箭头函数包裹</strong>：<code>setTimeout(() => obj.fn(), 100)</code><br>③ <strong>Vue 3 中 methods</strong>：Vue 内部自动用 bind 绑定了 methods 的 this，所以在模板中直接当事件处理器不会丢失。',
  },
  {
    level: 3,
    q: 'new 绑定和显式绑定同时出现时，谁优先级高？',
    a: '<strong>new 绑定更高</strong>。<br><br>优先级链：<strong>new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定</strong><br><br><strong>关键证据</strong>：<br><code>function Foo() {</code><br><code>&nbsp;&nbsp;console.log(this instanceof Foo)</code><br><code>}</code><br><code>const BoundFoo = Foo.bind({ name: "外部" })</code><br><code>new BoundFoo()  // true（new 赢了 bind）</code><br><br><strong>原理</strong>：<code>new</code> 会覆盖函数内部绑定的 <code>this</code>（包括 <code>bind</code> 绑定的）。但 <code>bind</code> 绑定的函数用 <code>call</code>/<code>apply</code> 改不了——<code>bind</code> 返回的函数的 <code>this</code> 被锁定，只有 <code>new</code> 能覆盖它。<br><br><strong>面试技巧</strong>：说完优先级后加一句"bind 返回的函数的 this 是锁定的，call/apply 改不了它，但 new 可以覆盖"——这就超过了 90% 的面试者。',
  },
  {
    level: 3,
    q: '箭头函数的 this 为什么不能通过 call/apply/bind 改变？',
    a: '<strong>根本原因</strong>：箭头函数<strong>没有自己的 this</strong>。<br><br>箭头函数在定义时，从<strong>外层作用域</strong>捕获 <code>this</code> 值，这个值被保存在函数的 <code>[[ThisMode]]</code> 内部属性中（词法 this 模式）。call/apply/bind 只能修改函数自己的 this，对没有自己 this 的函数无效。<br><br><strong>和闭包的关系</strong>：这和闭包捕获外层变量的原理完全一样——箭头函数的 this 本质就是<strong>一个闭包变量</strong>，在定义时确定，外部无法修改。<br><br><strong>面试回答框架</strong>：箭头函数无自己的 this → 定义时捕获外层 this → call/apply/bind 无效 → 适合用于回调中需要保留外层 this 的场景（如 setTimeout、事件监听）→ Vue 3 中 setup 内谨慎使用。<br><br><strong>注意</strong>：正因为箭头函数 this 不可变，Vue 3 的 <code>methods</code> 中<strong>不要用箭头函数</strong>（否则 this 拿不到组件实例）。',
  },
  {
    level: 1,
    q: '"use strict" 是什么？它对 this 有什么影响？',
    a: '<strong>"use strict"</strong> 是 ES5 引入的指令，让 JS 引擎以<strong>严格模式</strong>解析和执行代码。只需在文件或函数顶部写 <code>"use strict"</code> 即可开启。<br><br><strong>对 this 的核心影响</strong>：<br>· 非严格模式直接调用函数时，<code>this</code> 指向全局对象（<code>window</code>）<br>· 严格模式下直接调用函数，<code>this</code> 为 <code>undefined</code>（防止误操作全局对象）<br><br><strong>其他主要变化</strong>：<br>① 禁止给未声明的变量赋值（必须用 <code>let</code>/<code>const</code>/<code>var</code>）<br>② 禁止 <code>delete</code> 不可删除的属性（非严格模式静默失败）<br>③ 禁止 <code>with</code> 语句<br>④ 禁止函数参数重名<br>⑤ 禁止 <code>arguments.callee</code><br>⑥ 禁止 <code>0</code> 开头的八进制字面量<br><br><strong>面试加分</strong>：Vue 3 的 <code>&lt;script setup&gt;</code> 和 ESM 文件默认启用严格模式，不需要手动写 <code>"use strict"</code>。这也是为什么你在 Vue 项目中直接写 <code>function fn() { console.log(this) }</code> 拿到的是 <code>undefined</code>。',
  },
]
</script>

<style scoped>
/* ============================================
   JavaScript This Page
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
