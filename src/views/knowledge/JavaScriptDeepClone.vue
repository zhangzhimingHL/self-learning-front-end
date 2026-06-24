<template>
  <div class="js-page">
    <header class="hero">
      <h1>JavaScript 深拷贝</h1>
      <p class="hero-sub">面试必考 · <span class="kw">浅拷贝 vs 深拷贝</span> · <span class="kw">JSON 局限性</span> · <span class="kw">手写深拷贝</span> · <span class="kw">循环引用</span> · <span class="kw">WeakMap</span></p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 浅拷贝 vs 深拷贝 -->
    <!-- ============================================================ -->
    <section id="s1-basics" class="section-card">
      <h2 class="s-title">一、浅拷贝 vs 深拷贝</h2>
      <p class="s-desc">
        <span class="kw">浅拷贝</span>只复制对象的第一层属性，嵌套的对象仍然是<span class="kw">引用共享</span>。
        <span class="kw">深拷贝</span>递归复制所有层级，新旧对象完全独立。
      </p>

      <h3 class="s-subtitle">① 展开运算符 <code>...</code> 是浅拷贝</h3>
      <p class="s-desc">
        <code>{...obj}</code> 或 <code>[...arr]</code> 都只复制一层。嵌套对象修改后会互相影响——这是面试最常见的陷阱。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">shallow-vs-deep.js</span>
          <button class="run-btn" @click="runCode('shallowVsDeep')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.shallowVsDeep.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.shallowVsDeep.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.shallowVsDeep.output || '点击 "运行" 查看浅拷贝 vs 深拷贝的区别' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② Object.assign 也是浅拷贝</h3>
      <p class="s-desc">
        <code>Object.assign({}, obj)</code> 和展开运算符一样，只做一层复制。很多面试题会让你判断 <code>Object.assign</code> 是浅还是深。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">object-assign.js</span>
          <button class="run-btn" @click="runCode('objectAssign')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.objectAssign.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.objectAssign.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.objectAssign.output || '点击 "运行" 验证 Object.assign 是浅拷贝' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：展开运算符和 <code>Object.assign</code> 都是<span class="kw">浅拷贝</span>。
        如果你听到有人说"展开运算符是深拷贝"，这是错的。验证方法很简单：改嵌套对象的值，看原对象是否跟着变。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: JSON.parse(JSON.stringify()) 局限性 -->
    <!-- ============================================================ -->
    <section id="s2-json" class="section-card">
      <h2 class="s-title">二、JSON.parse(JSON.stringify()) 的局限性 <span class="s-badge">必知</span></h2>
      <p class="s-desc">
        很多人会用 <code>JSON.parse(JSON.stringify(obj))</code> 做深拷贝。但它有<span class="kw">五个致命局限</span>，面试必考。
      </p>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">json-limits.js</span>
          <button class="run-btn" @click="runCode('jsonLimits')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.jsonLimits.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.jsonLimits.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.jsonLimits.output || '点击 "运行" 查看 JSON 深拷贝的五个坑' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>五个局限速记</strong>：<br>
        ① <code>undefined</code> / 函数 / <code>Symbol</code> → 被<span class="kw">忽略</span>（或转 null）<br>
        ② <code>Date</code> → 变成<span class="kw">字符串</span>（不是 Date 对象了）<br>
        ③ <code>RegExp</code> / <code>Error</code> / <code>Map</code> / <code>Set</code> → 变成<span class="kw">空对象</span><br>
        ④ <code>Infinity</code> / <code>NaN</code> → 变成 <code>null</code><br>
        ⑤ <span class="kw">循环引用</span> → 直接报错
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 手写深拷贝 -->
    <!-- ============================================================ -->
    <section id="s3-handwrite" class="section-card">
      <h2 class="s-title">三、手写完美深拷贝 <span class="s-badge">超高频</span></h2>
      <p class="s-desc">
        <span class="kw">阿里巴巴</span> <span class="s-badge-sm">几乎必考</span>
        <span class="kw">字节跳动</span> <span class="s-badge-sm">高频</span>
        <span class="kw">腾讯</span> <span class="s-badge-sm">高频</span><br>
        大厂面试几乎必考深拷贝。从基础版本逐步进阶到完美版本。
      </p>

      <h3 class="s-subtitle">① 基础递归版本</h3>
      <p class="s-desc">最简单的深拷贝：判断对象类型，递归复制。这版不考虑循环引用。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">deep-clone-basic.js</span>
          <button class="run-btn" @click="runCode('deepCloneBasic')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.deepCloneBasic.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.deepCloneBasic.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.deepCloneBasic.output || '点击 "运行" 测试基础版深拷贝' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 解决循环引用：WeakMap</h3>
      <p class="s-desc">
        基础版在遇到<span class="kw">循环引用</span>时会栈溢出。用 <code>WeakMap</code> 保存已拷贝过的对象，遇到重复直接返回。
        <span class="kw">为什么用 WeakMap 不用 Map？</span> WeakMap 的键是<span class="kw">弱引用</span>，不影响垃圾回收。深拷贝完成后，WeakMap 可以被 GC 回收，不会造成内存泄漏。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">deep-clone-weakmap.js</span>
          <button class="run-btn" @click="runCode('deepCloneWeakMap')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.deepCloneWeakMap.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.deepCloneWeakMap.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.deepCloneWeakMap.output || '点击 "运行" 测试 WeakMap 版' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ 完美版：处理 Map/Set/Date/RegExp/Symbol + 保原型 + 保 getter/setter</h3>
      <p class="s-desc">
        面试满分版本：处理所有特殊类型 + 循环引用 + Symbol key + Error + Object.create(null) + <span class="kw">getter/setter</span> + 原型保留。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">deep-clone-perfect.js</span>
          <button class="run-btn" @click="runCode('deepClonePerfect')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.deepClonePerfect.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.deepClonePerfect.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.deepClonePerfect.output || '点击 "运行" 测试完美版深拷贝' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试回答框架</strong>：当被问到"实现一个深拷贝函数"时：<br>
        ① 先说浅拷贝的问题（引用共享）→ ② 说 JSON 方案的局限性（5点）→ ③ 给出手写递归方案（用 WeakMap 解决循环引用）→ ④ 补充特殊类型处理（Date/RegExp/Map/Set/Error）→ ⑤ 进阶：<span class="kw">Object.create 保原型</span> + <span class="kw">描述符保 getter/setter</span>。
        按照这个顺序讲，面试官会认为你思路清晰、考虑全面。第⑤点是区分"优秀"和"卓越"的关键。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s4-playground" class="section-card">
      <h2 class="s-title">四、🧪 动手实验区</h2>
      <p class="s-desc">自己写深拷贝，测试各种边界情况。</p>

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
          <span class="hint-chip" @click="loadHint(0)">🔹 测试 JSON 方案</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 测试循环引用</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 测试 Map 和 Set</span>
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

const toc = [
  { id: 's1-basics',     label: '浅拷贝 vs 深拷贝' },
  { id: 's2-json',       label: 'JSON 局限性' },
  { id: 's3-handwrite',  label: '手写深拷贝' },
  { id: 's4-playground', label: '动手实验' },
  { id: 's5-qa',         label: '面试问答' },
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
  shallowVsDeep: {
    code: `// 展开运算符是浅拷贝！
const original = {
  name: '张三',
  address: { city: '北京', district: '海淀' }
}

const copy = { ...original }  // 浅拷贝

console.log('修改前:')
console.log('original.city:', original.address.city)
console.log('copy.city:', copy.address.city)

// 修改拷贝的嵌套对象
copy.address.city = '上海'

console.log('\\n修改 copy.address.city = "上海" 后:')
console.log('original.city:', original.address.city)  // '上海'！跟着变了
console.log('copy.city:', copy.address.city)

// 验证第一层是独立的
copy.name = '李四'
console.log('\\n修改 copy.name 后:')
console.log('original.name:', original.name)  // '张三'，不受影响
console.log('copy.name:', copy.name)

console.log('\\n结论：展开运算符是浅拷贝')
console.log('第一层独立，嵌套对象共享引用')`,
    output: '',
  },
  objectAssign: {
    code: `// Object.assign 也是浅拷贝
const original = {
  name: '张三',
  address: { city: '北京' },
  hobbies: ['篮球', '游泳']
}

const copy = Object.assign({}, original)

console.log('第一层是独立的:')
copy.name = '李四'
console.log('original.name:', original.name)  // 张三
console.log('copy.name:', copy.name)          // 李四

console.log('\\n但嵌套对象共享引用:')
copy.address.city = '上海'
copy.hobbies.push('跑步')
console.log('original.address.city:', original.address.city)  // 上海
console.log('original.hobbies:', original.hobbies)            // ['篮球', '游泳', '跑步']

// 数组的展开运算符同理
const arr = [1, 2, { x: 10 }]
const arrCopy = [...arr]
arrCopy[2].x = 99
console.log('\\n数组展开运算符:')
console.log('arr[2].x:', arr[2].x)  // 99（共享）`,
    output: '',
  },
  jsonLimits: {
    code: `// JSON.parse(JSON.stringify()) 的五个局限
console.log('=== 局限 1: undefined / 函数 / Symbol 被忽略 ===')
const obj1 = {
  a: undefined,
  b: function() { return 1 },
  c: Symbol('key'),
  d: '正常值'
}
console.log('原对象:', obj1)
console.log('JSON后:', JSON.parse(JSON.stringify(obj1)))
// 只有 "正常值" 保留下来

console.log('\\n=== 局限 2: Date 变成字符串 ===')
const obj2 = { date: new Date() }
const json2 = JSON.parse(JSON.stringify(obj2))
console.log('原 date 类型:', obj2.date instanceof Date)  // true
console.log('JSON后类型:', json2.date instanceof Date)   // false
console.log('JSON后值:', json2.date)                     // 字符串

console.log('\\n=== 局限 3: RegExp / Map / Set 变空对象 ===')
const obj3 = { re: /test/gi, map: new Map([['a', 1]]), set: new Set([1,2,3]) }
console.log('原对象:', obj3)
console.log('JSON后:', JSON.parse(JSON.stringify(obj3)))

console.log('\\n=== 局限 4: Infinity / NaN 变 null ===')
const obj4 = { inf: Infinity, nan: NaN }
console.log('原对象:', obj4)
console.log('JSON后:', JSON.parse(JSON.stringify(obj4)))

console.log('\\n=== 局限 5: 循环引用报错 ===')
const obj5 = { name: '循环' }
obj5.self = obj5
try {
  JSON.parse(JSON.stringify(obj5))
} catch (e) {
  console.log('报错:', e.message)  // Converting circular structure to JSON
}`,
    output: '',
  },
  deepCloneBasic: {
    code: `// 基础版深拷贝（不考虑循环引用）
function deepCloneBasic(obj) {
  // 非对象或 null，直接返回
  if (obj === null || typeof obj !== 'object') return obj

  // 数组或对象
  const result = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCloneBasic(obj[key])
    }
  }
  return result
}

// 测试
const original = {
  name: '张三',
  address: { city: '北京', district: '海淀' },
  hobbies: ['篮球', '游泳'],
  birth: new Date('2000-01-01')
}

const cloned = deepCloneBasic(original)

// 修改克隆对象
cloned.address.city = '上海'
cloned.hobbies.push('跑步')

console.log('original.address.city:', original.address.city)  // 北京
console.log('original.hobbies:', original.hobbies)            // ['篮球', '游泳']
console.log('cloned.hobbies:', cloned.hobbies)                // ['篮球', '游泳', '跑步']
console.log('\\n深拷贝成功！嵌套对象完全独立')

// 但基础版有缺陷：Date 变成了字符串
console.log('\\n问题：Date 变成了字符串')
console.log('original.birth:', original.birth)
console.log('cloned.birth:', cloned.birth)
console.log('birth instanceof Date:', cloned.birth instanceof Date)  // false!`,
    output: '',
  },
  deepCloneWeakMap: {
    code: `// 进阶版：用 WeakMap 解决循环引用
function deepCloneWM(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj

  // 如果已经拷贝过这个对象，直接返回
  if (hash.has(obj)) return hash.get(obj)

  const result = Array.isArray(obj) ? [] : {}
  hash.set(obj, result)  // 记录拷贝映射

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCloneWM(obj[key], hash)
    }
  }
  return result
}

// 测试：循环引用
const obj = { name: '循环测试' }
obj.self = obj        // obj.self 指向自己

const cloned = deepCloneWM(obj)
console.log('cloned.name:', cloned.name)
console.log('cloned.self === cloned:', cloned.self === cloned)  // true
console.log('循环引用正确处理！不报错')

// 验证是深拷贝
obj.name = '改原对象'
console.log('cloned.name 不受影响:', cloned.name)  // '循环测试'

console.log('\\n为什么用 WeakMap？')
console.log('1. WeakMap 的 key 是弱引用，拷贝完可被 GC 回收')
console.log('2. 如果用 Map，即使拷贝结束，Map 仍持有对象引用')
console.log('3. 如果是大对象深拷贝，WeakMap 更省内存')`,
    output: '',
  },
  deepClonePerfect: {
    code: `// 完美版深拷贝（真正保原型 + 保 getter/setter）
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (hash.has(obj)) return hash.get(obj)

  // 处理 Date
  if (obj instanceof Date) return new Date(obj)
  // 处理 RegExp
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  // 处理 Map
  if (obj instanceof Map) {
    const map = new Map()
    hash.set(obj, map)
    obj.forEach((val, key) => map.set(key, deepClone(val, hash)))
    return map
  }
  // 处理 Set
  if (obj instanceof Set) {
    const set = new Set()
    hash.set(obj, set)
    obj.forEach(val => set.add(deepClone(val, hash)))
    return set
  }
  // 处理 Error（message/stack/cause 都是自身属性）
  if (obj instanceof Error) {
    const err = new obj.constructor()
    for (const key of Object.getOwnPropertyNames(obj)) {
      Object.defineProperty(err, key, Object.getOwnPropertyDescriptor(obj, key))
    }
    return err
  }

  // 保原型：用 Object.create 代替 new constructor
  const result = Object.create(Object.getPrototypeOf(obj))
  hash.set(obj, result)

  // 保 getter/setter：用属性描述符拷贝，不是简单赋值
  const descriptors = Object.getOwnPropertyDescriptors(obj)
  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key]
    if (desc.hasOwnProperty('value')) {
      desc.value = deepClone(desc.value, hash)
    }
    // 访问器属性（getter/setter）：保持原函数，不拷贝
  }
  Object.defineProperties(result, descriptors)

  return result
}

// ===== 全面测试 =====
const original = {
  name: '最终版',
  num: 42,
  arr: [1, 2, { nested: 'ok' }],
  address: { city: '北京', zip: 100000 },
  birth: new Date('2000-06-01'),
  pattern: /test/gi,
  map: new Map([['key1', 'value1'], ['key2', { deep: 'map-value' }]]),
  set: new Set([1, 2, { deep: 'set-value' }]),
  [Symbol('secret')]: 'symbol-value',
  error: new Error('出错了'),
  get city() { return this.address.city },
}
original.self = original

// 无原型的对象
const nullProto = Object.create(null)
nullProto.data = 42
original.nullProto = nullProto

const cloned = deepClone(original)

console.log('=== 完美版测试 ===')
console.log('name:', cloned.name)
console.log('birth isDate:', cloned.birth instanceof Date)
console.log('pattern isRegExp:', cloned.pattern instanceof RegExp)
console.log('map 内容:', cloned.map.get('key1'))
console.log('循环引用:', cloned.self === cloned)
console.log('Symbol key 保留:', Object.getOwnPropertySymbols(cloned).length > 0)
console.log('nullProto 无原型:', Object.getPrototypeOf(cloned.nullProto) === null)
console.log('Error 保留:', cloned.error instanceof Error, cloned.error.message)

// 验证 getter 保住了
console.log('getter city:', cloned.city)
// 改深层验证 getter 跟随
cloned.address.city = '上海'
console.log('getter 跟随变化:', cloned.city)

// 验证不影响原对象
console.log('\\n原对象不受影响:', original.address.city)

console.log('\\n✅ 完美版通过')`,
    output: '',
  },
  playground: {
    code: `// 试试自己写深拷贝
// 从基础版开始，逐步完善

function myDeepClone(obj) {
  // 你的实现
  return obj
}

// 测试数据
const test = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }]
}

const cloned = myDeepClone(test)
cloned.b.c = 99
cloned.d[2].e = 88

console.log('test.b.c:', test.b.c)    // 应该还是 2
console.log('test.d[2].e:', test.d[2].e)  // 应该还是 3
console.log('被影响了吗？')`,
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

  // 特殊处理需要传递参数的代码
  const needSelf = ['deepCloneWeakMap', 'deepClonePerfect']
  const snippet = snippets[key]
  if (!snippet) return

  if (key === 'deepCloneBasic' || key === 'deepClonePerfect' || key === 'deepCloneWeakMap') {
    snippet.output = '⏳ 执行中...'
    const captured: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
    setTimeout(() => {
      console.log = origLog
      snippet.output = captured.join('\n')
    }, 100)
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
  `// 测试 JSON 方案的坑
const obj = {
  undef: undefined,
  fn: () => 1,
  sym: Symbol('x'),
  date: new Date(),
  re: /test/gi
}
console.log('原对象:', obj)
console.log('JSON后:', JSON.parse(JSON.stringify(obj)))

// 思考：如果你的项目用 JSON 做深拷贝
// 遇到 Date 字段要注意！它会变成字符串
// 遇到函数/undefined 会直接消失`,
  `// 测试循环引用
const a = { name: 'A', child: null }
const b = { name: 'B' }
a.child = b
b.parent = a  // 双向循环引用

console.log('a 和 b 互相引用')

// 试试用你的深拷贝
// function safeClone(obj, cache = new WeakMap()) { ... }
// 用 WeakMap 可以解决这个问题`,
  `// 测试 Map 和 Set 的深拷贝
const original = {
  map: new Map([
    ['user', { name: '张三', scores: [90, 85] }]
  ]),
  set: new Set([
    { id: 1, tags: ['a', 'b'] }
  ])
}

// JSON.parse(JSON.stringify(original))
// → map 和 set 都变成了空对象 {}

// 深拷贝需要特殊处理 Map 和 Set
// 递归遍历它们的元素`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]; snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 1,
    q: '浅拷贝和深拷贝有什么区别？【基础必会】',
    a: '<strong>浅拷贝</strong>：只复制对象的第一层属性。嵌套对象仍然是<strong>引用共享</strong>的——修改拷贝的嵌套对象会影响原对象。<br>常用方法：展开运算符 <code>...</code>、<code>Object.assign()</code>、<code>Array.prototype.slice()</code>。<br><br><strong>深拷贝</strong>：递归复制所有层级，生成一个<strong>完全独立</strong>的新对象。修改拷贝的任意层级都不会影响原对象。<br>常用方法：<code>JSON.parse(JSON.stringify())</code>（有局限）、<code>structuredClone()</code>（现代浏览器内置）、手写递归。<br><br><strong>一句话</strong>：浅拷贝共享嵌套对象，深拷贝完全独立。',
  },
  {
    level: 1,
    q: 'JSON.parse(JSON.stringify(obj)) 做深拷贝有什么局限性？【阿里/字节/腾讯 高频】',
    a: '<strong>五个局限</strong>：<br><br>① <strong>undefined / 函数 / Symbol</strong> → 被忽略（或转为 null）<br>② <strong>Date</strong> → 变成字符串（不再是 Date 对象）<br>③ <strong>RegExp / Map / Set / Error</strong> → 变成空对象 <code>{}</code><br>④ <strong>Infinity / NaN</strong> → 变成 <code>null</code><br>⑤ <strong>循环引用</strong> → 直接报错 <code>Converting circular structure to JSON</code><br><br><strong>面试技巧</strong>：说出前面3点能过70%面试者，说出5点就是满分。',
  },
  {
    level: 2,
    q: '手写深拷贝的关键步骤是什么？（阿里/字节高频）',
    a: '<strong>基础版（3步）</strong>：<br>① 判断 <code>null</code> 或非对象 → 直接返回<br>② 区分数组和对象，创建结果容器<br>③ 递归复制每个属性<br><br><strong>进阶版（+3步）</strong>：<br>④ 用 <code>WeakMap</code> 缓存已拷贝对象，解决循环引用<br>⑤ 特殊处理 <code>Date</code> / <code>RegExp</code> / <code>Map</code> / <code>Set</code><br>⑥ 用 <code>Reflect.ownKeys()</code> 遍历（包含 Symbol key）<br><br><strong>评分标准</strong>：能写出基础递归版 = 70分，加上循环引用处理 = 85分，加上特殊类型和 Symbol = 100分。',
  },
  {
    level: 2,
    q: '为什么用 WeakMap 而不是 Map 来解决循环引用？【字节/阿里 进阶】',
    a: '<strong>核心原因：弱引用</strong>。<br><br><code>WeakMap</code> 的 key 是<strong>弱引用</strong>——不阻止垃圾回收。深拷贝完成后，如果原对象不再被其他地方引用，<code>WeakMap</code> 不会阻止它被 GC 回收。<br><br><code>Map</code> 的 key 是<strong>强引用</strong>——即使原对象不再使用，<code>Map</code> 仍然持有它的引用，导致<strong>内存泄漏</strong>。<br><br><code>// WeakMap — 拷贝完可被 GC 回收 ✅</code><br><code>function clone(obj, wm = new WeakMap()) { ... }</code><br><br><code>// Map — 即使拷贝结束，对象引用仍被持有 ❌</code><br><code>function clone(obj, m = new Map()) { ... }</code><br><br><strong>面试加分</strong>：能说出 WeakMap 的弱引用特性 + 内存泄漏场景，面试官会确认你真正理解深拷贝。',
  },
  {
    level: 3,
    q: 'structuredClone 是什么？它的局限性和优势？【加分项】',
    a: '<strong><code>structuredClone()</code></strong> 是浏览器内置的深拷贝 API（2022 年标准化），Node 17+ 也支持。<br><br><strong>优势</strong>：<br>· 原生实现，性能比手写递归好<br>· 支持循环引用<br>· 支持 Date / RegExp / Map / Set / ArrayBuffer 等类型<br>· 支持 <code>Transferable</code> 对象（可转移所有权）<br><br><strong>局限性</strong>：<br>· ❌ 不支持<strong>函数</strong><br>· ❌ 不支持 <strong>Symbol</strong>（被忽略）<br>· ❌ 不支持 <strong>DOM 节点</strong><br>· ❌ 不支持 <strong>原型链</strong>（原型会被丢掉）<br>· ❌ 不支持 <strong>getter/setter/Proxy</strong><br>· 某些旧浏览器不支持<br><br><strong>结论</strong>：手写深拷贝在面试中仍然要考，但工作中能用 structuredClone 就用它。手写方案作为兜底。',
  },
  {
    level: 2,
    q: '深拷贝时如何处理 Symbol 类型的 key？【阿里/字节 进阶】',
    a: '普通的 <code>for...in</code> 或 <code>Object.keys()</code> 遍历<strong>拿不到 Symbol 类型的 key</strong>。<br><br><strong>解决方案</strong>：用 <code>Reflect.ownKeys()</code> 替代。<br><br><code>Reflect.ownKeys(obj)</code> 返回所有 key：<br>· 字符串 key<br>· Symbol key<br>· 与 <code>Object.getOwnPropertyNames()</code> + <code>Object.getOwnPropertySymbols()</code> 等价<br><br><code>function deepClone(obj, hash) {</code><br><code>&nbsp;&nbsp;... 前面的逻辑 ...</code><br><code>&nbsp;&nbsp;Reflect.ownKeys(obj).forEach(key => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;result[key] = deepClone(obj[key], hash)</code><br><code>&nbsp;&nbsp;})</code><br><code>&nbsp;&nbsp;return result</code><br><code>}</code><br><br><strong>面试加分</strong>：主动说出 <code>Reflect.ownKeys</code> 包含 Symbol key，面试官会确认你处理过边界情况。',
  },
  {
    level: 3,
    q: '深拷贝时如何保持原型链？【进阶加分】',
    a: '<strong>问题</strong>：普通递归创建的空对象 <code>{}</code> 原型是 <code>Object.prototype</code>，如果原对象有自定义原型，拷贝后会丢失。<br><br><strong>解决方案</strong>：用 <code>new obj.constructor()</code> 创建结果对象。<br><br><code>const result = new obj.constructor()</code><br><br>这样创建的结果对象会<strong>保持原对象的构造函数和原型链</strong>。例如：<br>· 如果 <code>obj</code> 是 <code>new Person()</code> 创建的，<code>result instanceof Person === true</code><br>· 如果 <code>obj</code> 是数组，<code>result instanceof Array === true</code><br><br><strong>注意</strong>：<code>Object.create(Object.getPrototypeOf(obj))</code> 也可以，但 <code>new obj.constructor()</code> 更简洁。<br><br><strong>但也要注意</strong>：如果构造函数有特殊逻辑（如自增 ID），<code>new obj.constructor()</code> 会有副作用。完美的方案是 <code>Object.create(Object.getPrototypeOf(obj))</code>。',
  },
  {
    level: 1,
    q: 'Object.assign 是浅拷贝还是深拷贝？【基础必会】',
    a: '<strong>浅拷贝</strong>。<br><br><code>Object.assign(target, ...sources)</code> 只复制 <strong>自有可枚举属性</strong> 的<strong>值</strong>。如果属性的值是对象引用，复制的是引用本身。<br><br><code>const a = { nested: { x: 1 } }</code><br><code>const b = Object.assign({}, a)</code><br><code>b.nested.x = 99</code><br><code>console.log(a.nested.x)  // 99（被改了！）</code><br><br><strong>面试陷阱</strong>：面试官说"Object.assign 能做深拷贝"是错的，需要纠正到"它只做一层浅拷贝"。',
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
