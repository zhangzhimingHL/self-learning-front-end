<template>
  <div class="js-page">
    <header class="hero">
      <h1>JavaScript 类型转换</h1>
      <p class="hero-sub">面试必考 · <span class="kw">显式转换</span> · <span class="kw">隐式转换</span> · <span class="kw">== vs ===</span> · <span class="kw">ToPrimitive</span> · <span class="kw">经典面试题</span></p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 显式 vs 隐式转换 -->
    <!-- ============================================================ -->
    <section id="s1-basics" class="section-card">
      <h2 class="s-title">一、显式转换 vs 隐式转换</h2>
      <p class="s-desc">
        JS 中有两种类型转换：<span class="kw">显式转换</span>（开发者主动调用）和 <span class="kw">隐式转换</span>（JS 引擎自动执行）。
        隐式转换是面试中最容易出错的点。
      </p>

      <h3 class="s-subtitle">① 显式转换</h3>
      <p class="s-desc">
        手动调用 <code>String()</code> / <code>Number()</code> / <code>Boolean()</code> 将值转为目标类型。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">explicit-conversion.js</span>
          <button class="run-btn" @click="runCode('explicitConv')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.explicitConv.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.explicitConv.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.explicitConv.output || '点击 "运行" 查看显式转换规则' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 隐式转换</h3>
      <p class="s-desc">
        隐式转换发生在运算符操作时：<code>+</code> 偏向字符串拼接，<code>-</code>/<code>*</code>/<code>/</code> 偏向数字运算。
        这是面试题最爱考的地方。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">implicit-conversion.js</span>
          <button class="run-btn" @click="runCode('implicitConv')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.implicitConv.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.implicitConv.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.implicitConv.output || '点击 "运行" 查看隐式转换陷阱' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>口诀</strong>：<code>+</code> 遇字符串变拼接，<code>-</code>/<code>*</code>/<code>/</code> 一律转数字。
        面试最常见的陷阱：<code>'5' - 3 = 2</code>（数字运算），而 <code>'5' + 3 = '53'</code>（字符串拼接）。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: == 和 === -->
    <!-- ============================================================ -->
    <section id="s2-equality" class="section-card">
      <h2 class="s-title">二、<code>==</code> vs <code>===</code> <span class="s-badge">超高频</span></h2>
      <p class="s-desc">
        <span class="kw">字节跳动</span> <span class="s-badge-sm">几乎必考</span>
        <span class="kw">腾讯</span> <span class="s-badge-sm">高频</span><br>
        <code>===</code> 先判断类型，类型不同直接 false。而 <code>==</code> 允许类型转换——这是面试题的题库来源。
      </p>

      <h3 class="s-subtitle">① 严格相等 <code>===</code></h3>
      <p class="s-desc">
        不经过任何类型转换，类型不同就是 false。推荐日常开发始终使用 <code>===</code>。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">strict-equality.js</span>
          <button class="run-btn" @click="runCode('strictEq')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.strictEq.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.strictEq.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.strictEq.output || '点击 "运行" 查看 === 的行为' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 抽象相等 <code>==</code> 的转换规则</h3>
      <p class="s-desc">
        <code>==</code> 有一套复杂的转换规则——面试常考的就是这些规则下的推导题。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">abstract-equality.js</span>
          <button class="run-btn" @click="runCode('abstractEq')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.abstractEq.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.abstractEq.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.abstractEq.output || '点击 "运行" 查看 == 的转换规则' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>== 的判断规则</strong>：<br>
        ① <span class="kw">null == undefined</span> → true，其他任何值和 null/undefined 用 == 都是 false<br>
        ② 字符串 vs 数字 → 字符串转数字<br>
        ③ 布尔 vs 其他 → 布尔转数字（<code>true → 1, false → 0</code>）<br>
        ④ 对象 vs 字符串/数字 → 对象用 <code>ToPrimitive</code> 转原始值<br>
        <br>
        <strong>面试建议</strong>：平时全用 <code>===</code>，只在判断 <code>null/undefined</code> 时用 <code>==</code>，<code>if (x == null)</code> 同时匹配 null 和 undefined。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: ToPrimitive -->
    <!-- ============================================================ -->
    <section id="s3-toprimitive" class="section-card">
      <h2 class="s-title">三、ToPrimitive 与对象转原始值 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        当对象参与 <code>==</code> 或 <code>+</code> 运算时，JS 会调用 <span class="kw">ToPrimitive</span> 抽象操作将对象转为原始值。
        这个过程涉及到 <code>valueOf</code> 和 <code>toString</code> 的调用顺序，以及 <code>Symbol.toPrimitive</code>。
      </p>

      <h3 class="s-subtitle">① valueOf vs toString 的执行顺序</h3>
      <p class="s-desc">
        <span class="kw">转数字</span>（<code>-</code>/<code>*</code>/<code>/</code>）：先调 <code>valueOf</code>，如果返回的不是原始值则调 <code>toString</code>。<br>
        <span class="kw">转字符串</span>（<code>String()</code>/模板字符串）：先调 <code>toString</code>，再调 <code>valueOf</code>。<br>
        <span class="kw">无偏好</span>（<code>+</code>/<code>==</code>）：Date 优先转字符串，其他优先转数字。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">toprimitive-demo.js</span>
          <button class="run-btn" @click="runCode('toprimitiveDemo')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.toprimitiveDemo.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.toprimitiveDemo.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.toprimitiveDemo.output || '点击 "运行" 查看 ToPrimitive 的执行顺序' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分</strong>：<code>Symbol.toPrimitive</code> 的优先级最高，如果对象定义了 <code>[Symbol.toPrimitive]</code> 方法，<code>valueOf</code> 和 <code>toString</code> 都被跳过。
        这是面试中"如何自定义对象转原始值"的答案。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 经典面试题 -->
    <!-- ============================================================ -->
    <section id="s4-classic" class="section-card">
      <h2 class="s-title">四、经典面试题大集合 <span class="s-badge">必看</span></h2>
      <p class="s-desc">
        <span class="kw">字节跳动</span> <span class="s-badge-sm">高频</span>
        <span class="kw">腾讯</span> <span class="s-badge-sm">高频</span>
        <span class="kw">阿里巴巴</span> <span class="s-badge-sm">中频</span><br>
        大厂面试中与类型转换相关的经典题，先猜再运行验证。
      </p>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">classic-quiz.js</span>
          <button class="run-btn" @click="runCode('classicQuiz')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.classicQuiz.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.classicQuiz.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.classicQuiz.output || '点击 "运行" 猜结果，再看解析' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>解题技巧</strong>：遇到 <code>==</code> 的题，按以下步骤分析：<br>
        ① 看两边的类型是否相同 → 相同直接比<br>
        ② 类型不同 → 按规则转换：<code>NaN === NaN? </code> false<br>
        ③ <code>null/undefined</code> 只能互相等<br>
        ④ 布尔值转数字（true → 1, false → 0）<br>
        ⑤ 对象调 ToPrimitive → 再比较
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s5-playground" class="section-card">
      <h2 class="s-title">五、🧪 动手实验区</h2>
      <p class="s-desc">自己写各种类型转换，验证结果。遇到不确定的，运行看看！</p>

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
          <span class="hint-chip" @click="loadHint(0)">🔹 对象 + 对象的坑</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 自定义 ToPrimitive</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 == 的边界题</span>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s6-qa" class="section-card">
      <h2 class="s-title">六、面试高频问答（⭐→⭐⭐⭐）</h2>
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

const toc = [
  { id: 's1-basics',    label: '显式 vs 隐式' },
  { id: 's2-equality',  label: '== vs ===' },
  { id: 's3-toprimitive', label: 'ToPrimitive' },
  { id: 's4-classic',   label: '经典面试题' },
  { id: 's5-playground', label: '动手实验' },
  { id: 's6-qa',        label: '面试问答' },
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
  explicitConv: {
    code: `// ===== 显式类型转换 =====

// String() 转字符串
console.log('=== String() ===')
console.log('String(123):', String(123))       // '123'
console.log('String(true):', String(true))     // 'true'
console.log('String(null):', String(null))      // 'null'
console.log('String(undefined):', String(undefined))  // 'undefined'
console.log('String([1,2]):', String([1,2]))   // '1,2'
console.log('String({}):', String({}))          // '[object Object]'

// Number() 转数字
console.log('\\n=== Number() ===')
console.log('Number("123"):', Number('123'))   // 123
console.log('Number("12.3"):', Number('12.3')) // 12.3
console.log('Number("abc"):', Number('abc'))   // NaN
console.log('Number(true):', Number(true))     // 1
console.log('Number(false):', Number(false))   // 0
console.log('Number(null):', Number(null))     // 0
console.log('Number(undefined):', Number(undefined))  // NaN

// Boolean() 转布尔
console.log('\\n=== Boolean() ===')
console.log('Boolean(1):', Boolean(1))         // true
console.log('Boolean(0):', Boolean(0))         // false
console.log('Boolean(""):', Boolean(''))       // false
console.log('Boolean("abc"):', Boolean('abc')) // true
console.log('Boolean([]):', Boolean([]))       // true （空数组是对象！）
console.log('Boolean({}):', Boolean({}))       // true （空对象也是 true！）

// 假值列表：false, 0, '', null, undefined, NaN
// 除了这 6 个，其他全是 true`,
    output: '',
  },
  implicitConv: {
    code: `// ===== 隐式类型转换陷阱 =====

// + 运算符：遇字符串变拼接
console.log('=== + 运算符 ===')
console.log('"5" + 3:', '5' + 3)       // '53'
console.log('3 + "5":', 3 + '5')       // '35'
console.log('1 + 2 + "3":', 1 + 2 + '3')  // '33'（先算 1+2=3，再拼 "3"）
console.log('"1" + 2 + 3:', '1' + 2 + 3)  // '123'（先拼 "12"，再拼 "3"）

// - * / 运算符：一律转数字
console.log('\\n=== - * / 运算符 ===')
console.log('"5" - 3:', '5' - 3)       // 2
console.log('"10" / "2":', '10' / '2')  // 5
console.log('"5" * "2":', '5' * '2')   // 10
console.log('"abc" - 1:', 'abc' - 1)   // NaN

// 奇怪的加法
console.log('\\n=== 奇怪的 + 场景 ===')
console.log('+ "123":', + '123')        // 123（一元正号转数字）
console.log('+ "":', + '')            // 0

// 比较运算符的隐式转换
console.log('\\n=== 比较运算符 ===')
console.log('"5" > 3:', '5' > '3')    // true（字符串比较：'5' > '3'）
console.log('"5" > 3:', '5' > 3)      // true（转数字：5 > 3）
console.log('"ab" > "aa":', 'ab' > 'aa')  // true（字符串逐位比较）
console.log('"2" > "12":', '2' > '12')    // true（字符串比较：'2' > '1'）`,
    output: '',
  },
  strictEq: {
    code: `// ===== 严格相等 ==== 的规则 =====
// 类型不同直接 false，不转换

console.log('"1" === 1:', "1" === 1)       // false（类型不同）
console.log('true === 1:', true === 1)     // false
console.log('null === undefined:', null === undefined)  // false
console.log('NaN === NaN:', NaN === NaN)   // false（唯一不等于自身的值）
console.log('0 === -0:', 0 === -0)         // true（特例）
console.log('"abc" === "abc":', "abc" === "abc")  // true

// 对象比较的是引用
console.log('\\n=== 对象比较 ===')
console.log('{} === {}:', {} === {})       // false（不同内存地址）
console.log('[] === []:', [] === [])       // false
const a = { x: 1 }; const b = a
console.log('b = a 后 a === b:', a === b)  // true

// 日常推荐
console.log('\\n建议：始终使用 ===')
console.log('只在判断 null/undefined 时用 ==')
console.log('if (x == null) 等价于 x === null || x === undefined')`,
    output: '',
  },
  abstractEq: {
    code: `// ===== 抽象相等 == 的转换规则 =====

// 规则 1: null == undefined → 永远 true
console.log('null == undefined:', null == undefined)    // true
console.log('null == 0:', null == 0)                    // false（特例！）
console.log('undefined == false:', undefined == false)  // false
console.log('undefined == "":', undefined == '')        // false

// 规则 2: 字符串 vs 数字 → 字符串转数字
console.log('\\n=== 字符串 vs 数字 ===')
console.log('"123" == 123:', "123" == 123)   // true
console.log('"" == 0:', "" == 0)             // true（Number("") = 0）
console.log('" " == 0:', " " == 0)           // true（Number(" ") = 0）
console.log('"abc" == NaN:', "abc" == NaN)   // false（NaN 永远不等于任何值）

// 规则 3: 布尔 vs 其他 → 布尔转数字
console.log('\\n=== 布尔 vs 其他 ===')
console.log('true == 1:', true == 1)         // true
console.log('false == 0:', false == 0)       // true
console.log('true == "1":', true == "1")     // true（true→1, "1"→1）
console.log('false == "":', false == "")     // true（false→0, ""→0）
console.log('!![] == true:', !![], '==', true)  // !![] = true

// 规则 4: 对象 vs 字符串/数字 → 对象 ToPrimitive
console.log('\\n=== 对象 vs 原始值 ===')
console.log('[1,2] == "1,2":', [1,2] == "1,2")  // true（[1,2].toString() = "1,2"）
console.log('[1] == 1:', [1] == 1)               // true（[1].toString()="1", "1"→1）
console.log('[] == ![]:', [] == ![])             // true？思考题！`,
    output: '',
  },
  toprimitiveDemo: {
    code: `// ===== ToPrimitive 的执行顺序 =====

// 自定义对象查看调用顺序
const obj = {
  valueOf() {
    console.log('  -> 调用了 valueOf')
    return 42
  },
  toString() {
    console.log('  -> 调用了 toString')
    return 'hello'
  }
}

// 隐式转数字（如 - * /）：先 valueOf
console.log('obj - 10 （先 valueOf）:')
console.log('  结果:', obj - 10)    // valueOf → 42 - 10 = 32

// 隐式转字符串：先 toString
console.log('\\nString(obj) （先 toString）:')
console.log('  结果:', String(obj))  // toString → "hello" 然后返回

// + 运算符（无偏好）：先 valueOf
console.log('\\n+ obj （+ 运算符，先 valueOf）:')
console.log('  结果:', + obj)        // valueOf → 42

// Date 的特殊性
console.log('\\n=== Date 的特殊性 ===')
const date = new Date()
console.log('date - 0:', date - 0)  // 时间戳（数字）
console.log('date + ""', date + "") // 字符串（Date 的 + 偏好字符串！）

// Symbol.toPrimitive 优先级最高
const obj2 = {
  valueOf() { return 1 },
  toString() { return 'str' },
  [Symbol.toPrimitive](hint) {
    console.log('  调用了 Symbol.toPrimitive, hint:', hint)
    return hint === 'string' ? '我是字符串' : 999
  }
}
console.log('\\nSymbol.toPrimitive 优先级最高:')
console.log('String(obj2):', String(obj2))
console.log('obj2 - 0:', obj2 - 0)`,
    output: '',
  },
  classicQuiz: {
    code: `// ===== 经典面试题 =====
// 先猜结果，再看运行输出

console.log('=== 题 1: [] == ![] ===')
console.log('[] == ![]:', [] == ![])   // ??
// 分析：![]
// ① ![] = false（对象转布尔始终 true，取反为 false）
// ② false == [] = 0 == []（false 转 0）
// ③ 0 == [].toString() = 0 == "" = 0 == 0 → true!

console.log('\\n=== 题 2: [] == 0 ===')
console.log('[] == 0:', [] == 0)       // ??

console.log('\\n=== 题 3: {} + [] ===')
console.log('{} + []:', {} + [])       // ??

console.log('\\n=== 题 4: [] + {} ===')
console.log('[] + {}:', [] + {})       // ??

console.log('\\n=== 题 5: "5" - - "3" ===')
console.log('"5" - - "3":', "5" - - "3")  // ??

console.log('\\n=== 题 6: !!"" == !![] ===')
console.log('!!"" == !![]:', !!"" == !![])  // ??

console.log('\\n=== 题 7: null == 0 ===')
console.log('null == 0:', null == 0)    // ??

console.log('\\n=== 题 8: 1 < 2 < 3 ===')
console.log('1 < 2 < 3:', 1 < 2 < 3)   // ??

console.log('\\n=== 题 9: 3 < 2 < 1 ===')
console.log('3 < 2 < 1:', 3 < 2 < 1)   // ??

console.log('\\n=== 题 10: typeof typeof null ===')
console.log('typeof typeof null:', typeof typeof null)  // ??
// typeof null === "object"（JS 的历史 bug）
// typeof "object" === "string"`,
    output: '',
  },
  playground: {
    code: `// 自己设计类型转换的实验
// 试试各种奇怪的组合

// 试试：
// console.log([] + [])     // ?
// console.log({} + {})     // ?
// console.log([] == false) // ?
// console.log([1,2] + [3,4]) // ?
// console.log(!!'false' == !!'true') // ?

console.log('来，试试你的组合！')

// 提示：如果遇到 {} 被解释为代码块的情况
// 用 ({}) + [] 来避免歧义`,
    output: '',
  },
})

// ─── 运行代码 ───
function runCode(key: string) {
  if (key === 'playground') {
    const lines = captureConsole(() => { const func = new Function(playgroundCode.value); func() })
    snippets.playground.output = lines.join('\n')
    return
  }

  const snippet = snippets[key]
  if (!snippet) return
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
  `// 对象 + 对象 的奇怪结果
console.log('[] + [] =', [] + [])
console.log('[] + {} =', [] + {})
console.log('{} + [] =', {} + [])
console.log('{} + {} =', {} + {})

// 解析：
// [] + [] → "" + "" → ""（空字符串）
// [] + {} → "" + "[object Object]" → "[object Object]"
// {} + [] → 这里 {} 被解释为代码块！相当于 +[] → 0
// {} + {} → {} 被当做代码块，+{} → NaN`,
  `// 自定义 Symbol.toPrimitive
const amount = {
  value: 100,
  currency: '¥',
  [Symbol.toPrimitive](hint) {
    console.log('hint:', hint)
    if (hint === 'string') {
      return this.currency + this.value
    }
    return this.value
  }
}

console.log('String:', String(amount))   // ¥100
console.log('数字:', +amount)            // 100
console.log('拼接:', amount + '元')      // hint=default → 100 然后拼 "元"
console.log('减法:', amount - 50)        // hint=number → 50`,
  `// == 的边界题
console.log('[] == 0:', [] == 0)
console.log('![] == 0:', ![] == 0)
console.log('[] == ![]:', [] == ![])

console.log('\\nNaN == NaN:', NaN == NaN)
console.log('NaN === NaN:', NaN === NaN)

console.log('\\nnull == 0:', null == 0)
console.log('null >= 0:', null >= 0)  // 这个有意思！

console.log('\\nundefined == undefined:', undefined == undefined)
console.log('undefined == null:', undefined == null)`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]; snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 1,
    q: '== 和 === 的区别是什么？【字节/腾讯 几乎必考】',
    a: '<strong>===</strong>（严格相等）：类型不同直接返回 false，不做类型转换。<br><strong>==</strong>（抽象相等）：允许类型转换，有一套复杂的转换规则。<br><br><strong>实践建议</strong>：日常开发始终使用 <code>===</code>。唯一可以用 <code>==</code> 的场景是判断 <code>null</code> 和 <code>undefined</code>——<code>x == null</code> 等价于 <code>x === null || x === undefined</code>。<br><br><strong>面试回答框架</strong>：先说区别（类型转换）→ 再说推荐做法（全用 ===）→ 再说唯一例外（== null）→ 举一个隐式转换的坑。',
  },
  {
    level: 2,
    q: 'JS 中哪些值是 falsy（假值）？【基础必会】',
    a: '<strong>6 个 falsy 值</strong>：<br>① <code>false</code><br>② <code>0</code><br>③ <code>""</code>（空字符串）<br>④ <code>null</code><br>⑤ <code>undefined</code><br>⑥ <code>NaN</code><br><br><strong>注意</strong>：<code>[]</code>（空数组）和 <code>{}</code>（空对象）是 <strong>truthy</strong>！<br><code>!![] // true</code><br><code>!!{} // true</code><br><br>这个经常在面试中出现：<code>if([]) { ... }</code> 是会进入的。<br><br><strong>一句话</strong>：除了 <code>false / 0 / "" / null / undefined / NaN</code>，其余全是 true。',
  },
  {
    level: 2,
    q: '"1" + 2 + "3" + 4 的结果是什么？【腾讯/字节 高频】',
    a: '结果是 <code>"1234"</code>。<br><br><strong>执行顺序</strong>（从左到右）：<br>① <code>"1" + 2</code> → <code>"12"</code>（字符串和数字 + → 字符串拼接）<br>② <code>"12" + "3"</code> → <code>"123"</code><br>③ <code>"123" + 4</code> → <code>"1234"</code><br><br><strong>变体题</strong>：<code>1 + 2 + "3" + 4</code> → <code>"334"</code>（1+2=3，然后开始拼接）<br><br><strong>规律</strong>：<code>+</code> 从左到右计算，只要遇到字符串就变拼接。',
  },
  {
    level: 3,
    q: '为什么 [] == ![] 的结果是 true？【腾讯/字节 超高频】',
    a: '这是 JS 类型转换最经典的面试题，一步步推导：<br><br><strong>第一步</strong>：<code>![]</code> → <code>false</code><br>因为 <code>[]</code> 是对象，对象是 truthy，取反为 false<br>此时表达式变为：<code>[] == false</code><br><br><strong>第二步</strong>：<code>[] == false</code> → <code>[] == 0</code><br>规则：布尔值先转数字。<code>false → 0</code><br><br><strong>第三步</strong>：<code>[] == 0</code> → <code>"" == 0</code><br>规则：对象 vs 数字，对象 ToPrimitive（转数字偏好）<br><code>[].valueOf()</code> 返回 <code>[]</code>（不是原始值）→ 回退到 <code>[].toString()</code> → <code>""</code><br><br><strong>第四步</strong>：<code>"" == 0</code> → <code>0 == 0</code><br>规则：字符串 vs 数字，字符串 <code>""</code> 转数字 → <code>0</code><br><br><strong>结果</strong>：<code>0 == 0</code> → <strong>true</strong> ✅<br><br><strong>面试技巧</strong>：能把这四步完整推导出来，面试官就会确认你对类型转换的掌握非常扎实。',
  },
  {
    level: 3,
    q: 'null >= 0 为什么是 true，但 null == 0 是 false？【字节/腾讯 进阶】',
    a: '这个问题很经典，关键在于 <code>==</code> 和 <code>>=</code> 使用不同的转换规则：<br><br><strong><code>null == 0</code> → false</strong><br>== 对 null 和 undefined 有特殊处理：<code>null == undefined</code> 是 true，但 <code>null</code> 和 <strong>任何其他值</strong> 用 == 都是 false。<br>这是规范显式规定的——即使 <code>Number(null) === 0</code>，但 == 不会对 null 做数字转换。<br><br><strong><code>null >= 0</code> → true</strong><br>>= 属于关系运算符（<code>< > <= >=</code>），不是相等运算符。<br>关系运算符的规则：<strong>null 被转为数字 0</strong>。<br><code>null >= 0</code> → <code>0 >= 0</code> → <strong>true</strong><br><br><strong>同样</strong>：<code>null <= 0</code> → <code>0 <= 0</code> → <strong>true</strong><br><code>null > 0</code> → <code>0 > 0</code> → <strong>false</strong><br><code>null < 0</code> → <code>0 < 0</code> → <strong>false</strong><br><br><strong>一句话总结</strong>：<code>==</code> 对 null 有特殊保护（不转数字），但 <code>>=</code> 没有——直接转数字 0。',
  },
  {
    level: 2,
    q: 'typeof null 的结果是什么？为什么？【腾讯/字节 高频】',
    a: '<code>typeof null</code> 返回 <code>"object"</code>。<br><br>这是 JS 从诞生以来就存在的 <strong>bug</strong>（官方都承认是 bug，但不修复了，因为太多代码依赖这个行为）。<br><br><strong>历史原因</strong>：<br>JS 最初的设计中，类型的<strong>低位标记</strong>决定了值的类型。<br>· 000 → 对象<br>· 1 → 整数<br>· 010 → 浮点数<br>· 100 → 字符串<br>· 110 → 布尔<br><br><code>null</code> 的二进制表示是 <strong>全 0</strong>（0x00），被 <code>typeof</code> 的低位检查误判为对象。<br><br><strong>面试技巧</strong>：说出"历史遗留 bug + 二进制表示全 0 被误判为对象"就是满分答案。<br><br><strong>判断 null 的正确方式</strong>：<code>Object.prototype.toString.call(null) // "[object Null]"</code> 或者 <code>x === null</code>。',
  },
  {
    level: 2,
    q: '1 < 2 < 3 和 3 < 2 < 1 的结果分别是什么？【字节/腾讯 高频】',
    a: '<strong><code>1 < 2 < 3</code> → true</strong><br>① <code>1 < 2</code> → <code>true</code><br>② <code>true < 3</code> → <code>1 < 3</code>（true 转 1）→ <code>true</code> ✅<br><br><strong><code>3 < 2 < 1</code> → true</strong>（没错，也是 true！）<br>① <code>3 < 2</code> → <code>false</code><br>② <code>false < 1</code> → <code>0 < 1</code>（false 转 0）→ <code>true</code> ✅<br><br><strong>规律</strong>：连续比较是<strong>从左到右</strong>依次运算的，每个步骤的结果被转为布尔，然后参与下一次比较。<br><strong>结论</strong>：JS 不支持像数学那样的 <code>1 < x < 3</code> 连写。正确的写法是 <code>1 < x && x < 3</code>。',
  },
  {
    level: 3,
    q: '{} + [] 和 [] + {} 的结果为什么不一样？【字节/腾讯 进阶】',
    a: '这两者的结果不同是因为 <code>{}</code> 在行首时被解释为<strong>代码块</strong>而不是空对象。<br><br><strong><code>[] + {}</code> → <code>"[object Object]"</code></strong><br><code>[]</code> 在行首，是数组，参与 <code>+</code> 运算。<br><code>[]</code> → ToPrimitive → <code>""</code>（空字符串）<br><code>{}</code> → ToPrimitive → <code>"[object Object]"</code><br><code>"" + "[object Object]"</code> → <code>"[object Object]"</code><br><br><strong><code>{} + []</code> → <code>0</code></strong><br><code>{}</code> 在行首，被解析为<strong>空的代码块</strong>，直接忽略。<br>剩下的 <code>+[]</code> → <code>0</code>（一元正号将空数组转为数字）<br><br><strong>验证</strong>：用括号包裹可以验证——<code>({}) + []</code> 结果是 <code>"[object Object]"</code><br><br><strong>面试技巧</strong>：能提到"{} 在行首被解析为代码块"就超过了 90% 的面试者。',
  },
  {
    level: 1,
    q: '"5" - - "3" 的结果是什么？【面试陷阱题】',
    a: '结果是 <strong>8</strong>（数字）。<br><br>推导过程：<br>① <code>"5"</code> → 5（隐式转数字）<br>② <code>- "3"</code> → <code>-3</code>（一元负号将 "3" 转为数字并取负）<br>③ <code>5 - (-3)</code> → <code>5 + 3</code> → <strong>8</strong><br><br><strong>注意</strong>：这里的 <code>-</code> 有两个角色——中间的 <code>-</code> 是<strong>二元减法运算符</strong>，后面的 <code>-</code> 是<strong>一元取负运算符</strong>。<br><br><strong>变体</strong>：<code>"5" + - "3"</code> → <code>"5-3"</code>（因为 <code>+</code> 遇到字符串变拼接，<code>- "3"</code> 得 <code>-3</code> 然后拼成 <code>"5-3"</code>）',
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
.s-badge-sm { display: inline-block; font-size: 0.65rem; font-weight: 600; padding: 1px 6px; border-radius: 8px; background: #8b5cf622; color: #8b5cf6; vertical-align: middle; margin-left: 4px; }
.s-subtitle { font-size: 1.05rem; color: var(--color-heading); margin: 1.5rem 0 0.5rem; padding-left: 0.5rem; border-left: 3px solid hsla(160, 100%, 37%, 1); }
.s-desc { font-size: 0.92rem; line-height: 1.6; color: var(--color-text); opacity: 0.8; margin-bottom: 0.8rem; }
.s-desc code { background: color-mix(in srgb, var(--color-border) 40%, transparent); padding: 1px 6px; border-radius: 4px; font-size: 0.85em; }
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
