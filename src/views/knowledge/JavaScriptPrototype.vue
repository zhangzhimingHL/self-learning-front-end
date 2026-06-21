<template>
  <div class="js-page">
    <header class="hero">
      <h1>JavaScript 原型与原型链</h1>
      <p class="hero-sub">面试必考 · 原型链查找 · 继承方式 · class 本质 · instanceof 原理</p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 原型基础 -->
    <!-- ============================================================ -->
    <section id="s1-basics" class="section-card">
      <h2 class="s-title">一、原型基础</h2>
      <p class="s-desc">
        每个 JS 对象都有一个内部属性 <code>[[Prototype]]</code>（可通过 <code>__proto__</code> 访问），指向它的<strong>原型对象</strong>。
        当访问对象属性时，如果自身没有，就沿着 <code>__proto__</code> 一路向上找——这就是<strong>原型链</strong>。
      </p>

      <h3 class="s-subtitle">① <code>__proto__</code> vs <code>prototype</code></h3>
      <p class="s-desc">
        <code>__proto__</code> 是每个<strong>实例对象</strong>都有的属性，指向构造函数的 <code>prototype</code>。
        <code>prototype</code> 是<strong>函数</strong>才有的属性，存放所有实例共享的属性和方法。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">proto-vs-prototype.js</span>
          <button class="run-btn" @click="runCode('protoVsPrototype')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.protoVsPrototype.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.protoVsPrototype.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.protoVsPrototype.output || '点击 "运行" 查看 __proto__ 和 prototype 的关系' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 原型链查找</h3>
      <p class="s-desc">对象访问属性时：<strong>自身 → __proto__ → __proto__.__proto__ → ... → null</strong>。这也是所有对象都能用 <code>toString()</code>、<code>hasOwnProperty()</code> 的原因。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">prototype-chain.js</span>
          <button class="run-btn" @click="runCode('prototypeChain')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.prototypeChain.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.prototypeChain.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.prototypeChain.output || '点击 "运行" 查看原型链查找' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：原型链的尽头是 <code>Object.prototype.__proto__ === null</code>。
        <code>Function</code> 和 <code>Object</code> 的三角关系是加分考点——<code>Function instanceof Object</code> 和 <code>Object instanceof Function</code> 都是 <code>true</code>。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 原型链与 instanceof -->
    <!-- ============================================================ -->
    <section id="s2-instanceof" class="section-card">
      <h2 class="s-title">二、instanceof 原理 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        <code>instanceof</code> 检查<strong>构造函数的 prototype 是否出现在实例的原型链上</strong>。
        手写 instanceof 是面试高频题——本质就是沿着 <code>__proto__</code> 一直走，看能不能找到目标。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">instanceof-demo.js</span>
          <button class="run-btn" @click="runCode('instanceofDemo')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.instanceofDemo.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.instanceofDemo.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.instanceofDemo.output || '点击 "运行" 查看 instanceof 原理' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>加分点</strong>：<code>Object.create(null)</code> 创建的对象没有原型链，<code>instanceof Object</code> 返回 <code>false</code>。<code>[] instanceof Array</code>
        也可以用 <code>Array.isArray()</code> 替代——后者更可靠（跨 iframe 场景）。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 继承方式 -->
    <!-- ============================================================ -->
    <section id="s3-inheritance" class="section-card">
      <h2 class="s-title">三、继承方式的演变 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        JS 的继承方式经历了多次演进，每种方案解决了上一个方案的问题。面试中能讲清楚这四种继承的优缺点，就是满分回答。
      </p>

      <h3 class="s-subtitle">① 原型链继承 → ② 构造函数继承 → ③ 组合继承 → ④ 寄生组合继承</h3>
      <p class="s-desc">下方 Demo 展示了最终方案（寄生组合继承）以及 class 语法的等效实现。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">inheritance.js</span>
          <button class="run-btn" @click="runCode('inheritance')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.inheritance.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.inheritance.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.inheritance.output || '点击 "运行" 查看继承实现' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：寄生组合继承是最佳方案——用 <code>Object.create(Super.prototype)</code> 切断了子类构造函数和父类原型的直接引用，
        既调用了父类构造函数（解决原型链继承的引用共享问题），又避免了组合继承中调用两次父类构造函数的性能浪费。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: class 本质 -->
    <!-- ============================================================ -->
    <section id="s4-class" class="section-card">
      <h2 class="s-title">四、class 语法本质</h2>
      <p class="s-desc">
        ES6 <code>class</code> 本质是<strong>构造函数的语法糖</strong>。<code>class extends</code> 的底层就是寄生组合继承。
        但 class 和函数构造有<strong>三大区别</strong>：必须 <code>new</code> 调用、不可提升、方法不可枚举。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">class-sugar.js</span>
          <button class="run-btn" @click="runCode('classSugar')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.classSugar.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.classSugar.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.classSugar.output || '点击 "运行" 查看 class 本质' }}</pre>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: 手写 new -->
    <!-- ============================================================ -->
    <section id="s5-handwrite" class="section-card">
      <h2 class="s-title">五、手写 new 操作符 <span class="s-badge">高频手写</span></h2>
      <p class="s-desc">
        <span class="kw">腾讯</span> <span class="s-badge-sm">必考</span>
        <span class="kw">字节跳动</span> <span class="s-badge-sm">高频</span><br>
        <code>new</code> 操作符是 JS 中最核心的机制之一。手写 <code>new</code> 能考察你<span class="kw">原型链</span>、<span class="kw">this 绑定</span>、<span class="kw">构造函数返回值处理</span>的综合能力。
      </p>

      <p class="s-desc">
        <strong>new 操作符的四步</strong>：<br>
        ① 创建一个<span class="kw">空对象</span><br>
        ② 空对象的 <code>__proto__</code> 指向构造函数的 <code>prototype</code>（原型连接）<br>
        ③ 将 <code>this</code> 指向这个空对象，执行构造函数<br>
        ④ 如果构造函数返回了<span class="kw">对象</span>则用它，否则返回步骤①创建的空对象
      </p>
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
        💡 <strong>面试技巧</strong>：手写 new 的核心就是 <code>Object.create(ctor.prototype)</code> 这一步。很多面试者会忘记第四步——<strong>构造函数返回对象时要优先用它</strong>。
        记住这个口诀："创建空对象 → 连原型 → 执行构造函数 → 对象优先"。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s6-playground" class="section-card">
      <h2 class="s-title">六、🧪 动手实验区</h2>
      <p class="s-desc">自己改代码，验证原型链的各种行为。</p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-code.js</span>
          <button class="run-btn" @click="runCode('playground')">▶ 运行你的代码</button>
          <button class="run-btn reset-btn" @click="resetPlayground">↺ 重置</button>
        </div>
        <textarea v-model="playgroundCode" class="code-editor" spellcheck="false" rows="10"></textarea>
        <div class="output-panel" :class="{ 'has-content': snippets.playground.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.playground.output || '修改上方代码，点击 "运行" 查看输出' }}</pre>
        </div>
      </div>
      <div class="playground-hints">
        <p><strong>试试修改代码：</strong></p>
        <div class="hint-chips">
          <span class="hint-chip" @click="loadHint(0)">🔹 验证原型链的终点</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 用 Object.create 实现继承</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 手写 instanceof</span>
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

const toc = [
  { id: 's1-basics',      label: '原型基础' },
  { id: 's2-instanceof',  label: 'instanceof' },
  { id: 's3-inheritance', label: '继承方式' },
  { id: 's4-class',       label: 'class 本质' },
  { id: 's5-handwrite',   label: '手写 new' },
  { id: 's6-playground',  label: '动手实验' },
  { id: 's7-qa',          label: '面试问答' },
]

// ─── 安全执行代码 ───
function captureConsole(fn: () => void): string[] {
  const lines: string[] = []
  const origLog = console.log
  const origError = console.error
  const origWarn = console.warn
  console.log = (...args: unknown[]) => lines.push(args.map(a => formatArg(a)).join(' '))
  console.error = (...args: unknown[]) => lines.push('❌ ' + args.map(a => formatArg(a)).join(' '))
  console.warn = (...args: unknown[]) => lines.push('⚠️ ' + args.map(a => formatArg(a)).join(' '))
  try { fn() } catch (e: unknown) { lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e))) }
  console.log = origLog; console.error = origError; console.warn = origWarn
  return lines
}
function formatArg(arg: unknown): string {
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'
  if (typeof arg === 'string') return arg
  if (typeof arg === 'object') { try { return JSON.stringify(arg) } catch { return String(arg) } }
  return String(arg)
}

// ─── 代码片段 ───
interface Snippet { code: string; output: string }

const snippets = reactive<Record<string, Snippet>>({
  protoVsPrototype: {
    code: `// __proto__ vs prototype
function Animal(name) {
  this.name = name
}
Animal.prototype.sayHi = function() {
  console.log(this.name + ' 打了招呼')
}

const cat = new Animal('猫')

// 实例的 __proto__ 指向构造函数的 prototype
console.log('cat.__proto__ === Animal.prototype:', cat.__proto__ === Animal.prototype)
console.log('Animal.prototype:', Animal.prototype)
console.log('cat.__proto__:', cat.__proto__)

// 实例方法查找：自身 → __proto__
cat.sayHi()  // 在 prototype 上找到的

// 函数才有 prototype，普通对象只有 __proto__
const obj = {}
console.log('obj.prototype:', obj.prototype)  // undefined
console.log('obj.__proto__:', obj.__proto__)  // Object.prototype`,
    output: '',
  },
  prototypeChain: {
    code: `// 原型链查找
const grandparent = { grand: '爷爷' }
const parent = Object.create(grandparent)
parent.father = '爸爸'
const child = Object.create(parent)
child.me = '我'

// 查找 child.me → 自身找到
// 查找 child.father → 自身没有 → __proto__ (parent) → 找到
// 查找 child.grand → 自身没有 → parent 没有 → parent.__proto__ (grandparent) → 找到
// 查找 child.toString → 一路到 Object.prototype → 找到
// 查找 child.xyz → 一路到 null → undefined

console.log('child.me:', child.me)
console.log('child.father:', child.father)
console.log('child.grand:', child.grand)
console.log('child.toString:', typeof child.toString)
console.log('child.xyz:', child.xyz)

// 原型链结构
console.log('child.__proto__ === parent:', child.__proto__ === parent)
console.log('parent.__proto__ === grandparent:', parent.__proto__ === grandparent)
console.log('grandparent.__proto__ === Object.prototype:', grandparent.__proto__ === Object.prototype)
console.log('Object.prototype.__proto__:', Object.prototype.__proto__)  // null，终点`,
    output: '',
  },
  instanceofDemo: {
    code: `// instanceof 原理：找原型链
function Car(make) {
  this.make = make
}
Car.prototype.start = function() {
  console.log(this.make + ' 启动了')
}

const tesla = new Car('Tesla')

// 内置 instanceof 检查
console.log('tesla instanceof Car:', tesla instanceof Car)
console.log('tesla instanceof Object:', tesla instanceof Object)
console.log('tesla instanceof Array:', tesla instanceof Array)

// 面试题：手写 instanceof（去动手实验区自己实现）
// 思路：沿着 obj.__proto__ 走，看能不能找到 ctor.prototype

// 特殊：Object.create(null) 没有原型链
const naked = Object.create(null)
console.log('naked instanceof Object:', naked instanceof Object)  // false`,
    output: '',
  },
  inheritance: {
    code: `// 寄生组合继承（最优方案）
function Animal(name) {
  this.name = name
  this.foods = []  // 引用类型
}
Animal.prototype.eat = function(food) {
  this.foods.push(food)
  console.log(this.name + ' 吃 ' + food)
}

function Dog(name, breed) {
  Animal.call(this, name)   // 调用父类构造函数（解决引用共享）
  this.breed = breed
}

// 关键一步：子类原型 = Object.create(父类原型)
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog  // 修复构造函数指向

Dog.prototype.bark = function() {
  console.log(this.name + ' 汪汪!')
}

const d1 = new Dog('小黑', '拉布拉多')
const d2 = new Dog('小白', '博美')

d1.eat('骨头')
d2.eat('狗粮')
d1.bark()
console.log('d1.foods:', d1.foods)
console.log('d2.foods:', d2.foods)  // 不共享！
console.log('d1 instanceof Dog:', d1 instanceof Dog)
console.log('d1 instanceof Animal:', d1 instanceof Animal)

// class 等效语法（语法糖）
class Cat extends Animal {
  constructor(name, color) {
    super(name)
    this.color = color
  }
  meow() {
    console.log(this.name + ' 喵喵')
  }
}
const c = new Cat('橘猫', '橙色')
c.eat('鱼')
c.meow()`,
    output: '',
  },
  classSugar: {
    code: `// class 本质是函数
class Foo {
  constructor(x) {
    this.x = x
  }
  bar() {
    console.log('bar:', this.x)
  }
}
console.log('typeof Foo:', typeof Foo)  // function

// 和 ES5 构造函数的区别：
// 1. class 必须用 new 调用
// Foo()  // ❌ TypeError: Class constructor Foo cannot be invoked without 'new'

// 2. class 不存在提升
// console.log(Baz)  // ❌ ReferenceError（没有提升）
// class Baz {}

// 3. class 的方法不可枚举
console.log('Foo.prototype 的可枚举属性:', Object.keys(Foo.prototype))

// 对比普通函数
function OldFoo(x) {
  this.x = x
}
OldFoo.prototype.bar = function() {
  console.log('bar:', this.x)
}
console.log('OldFoo.prototype 的可枚举属性:', Object.keys(OldFoo.prototype))

// 4. class 的继承 extends
class Parent {
  constructor(v) { this.v = v }
  parentMethod() { return 'parent:' + this.v }
}
class Child extends Parent {
  constructor(v, w) {
    super(v)  // 必须先调用 super 才能用 this
    this.w = w
  }
  childMethod() { return 'child:' + this.w }
}
const ch = new Child(1, 2)
console.log(ch.parentMethod())
console.log(ch.childMethod())
console.log('ch instanceof Child:', ch instanceof Child)
console.log('ch instanceof Parent:', ch instanceof Parent)`,
    output: '',
  },
  myNew: {
    code: `// ===== 手写 new 操作符 =====
function myNew(ctor, ...args) {
  // 第 1-2 步：创建空对象，原型连接到 ctor.prototype
  const obj = Object.create(ctor.prototype)

  // 第 3 步：执行构造函数，this 指向 obj
  const result = ctor.apply(obj, args)

  // 第 4 步：如果构造函数返回了对象，优先用它
  // 否则返回创建的新对象
  return (result !== null && typeof result === 'object')
    ? result
    : obj
}

// ===== 测试 =====
function Person(name, age) {
  this.name = name
  this.age = age
  // 默认不返回，会使用创建的新对象
}

Person.prototype.sayHi = function() {
  console.log('你好，我是 ' + this.name + '，' + this.age + '岁')
}

const p1 = myNew(Person, '张三', 25)
console.log('p1.name:', p1.name)       // 张三
console.log('p1.age:', p1.age)         // 25
console.log('instanceof:', p1 instanceof Person)  // true
p1.sayHi()  // 你好，我是张三，25岁

// 测试：构造函数返回对象的情况
function Badge(name) {
  this.name = name
  return { custom: true }  // 返回一个对象
}
const b = myNew(Badge, '测试')
console.log('\\n返回对象测试:')
console.log('b.custom:', b.custom)     // true（优先使用返回的对象）
console.log('b.name:', b.name)         // undefined（name 被丢弃）

// 测试：构造函数返回原始值
function Badge2(name) {
  this.name = name
  return 123  // 原始值——被忽略
}
const b2 = myNew(Badge2, '测试2')
console.log('\\n返回原始值测试:')
console.log('b2.name:', b2.name)       // 测试2（原始值被忽略）`,
    output: '',
  },
  playground: {
    code: `// 试试自己验证原型链！
function Person(name) {
  this.name = name
}
Person.prototype.greet = function() {
  console.log('你好, 我是 ' + this.name)
}

const p = new Person('小明')
p.greet()

// 试试：
// 1. p.__proto__ 是什么？
// 2. Person.prototype.__proto__ 呢？
// 3. 如果给 p 动态加一个 greet，会覆盖原型的吗？
// 4. Object.create(null) 能调用 toString 吗？`,
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
  `// 验证原型链的终点
console.log('Object.prototype.__proto__:', Object.prototype.__proto__)
console.log('Function.prototype.__proto__:', Function.prototype.__proto__)
console.log('Function.prototype === Object.__proto__:', Function.prototype === Object.__proto__)

// 函数和对象的三角关系
console.log('Object instanceof Function:', Object instanceof Function)
console.log('Function instanceof Object:', Function instanceof Object)
console.log('Function instanceof Function:', Function instanceof Function)

// 创建没有原型的对象
const naked = Object.create(null)
console.log('裸对象:', naked)
// console.log(naked.toString)  // ❌ 没有 toString`,
  `// 用 Object.create 实现继承
const animal = {
  eat(food) {
    console.log(this.name + ' 吃 ' + food)
  }
}

const dog = Object.create(animal)
dog.name = '小狗'
dog.eat('骨头')

// 扩展子类方法
dog.bark = function() {
  console.log(this.name + ' 汪汪')
}
dog.bark()

// 一行实现继承
function createChild(parent, props) {
  return Object.assign(Object.create(parent), props)
}
const cat = createChild(animal, { name: '小猫' })
cat.eat('鱼')`,
  `// 手写 instanceof
function myInstanceof(obj, ctor) {
  let proto = Object.getPrototypeOf(obj)
  while (proto !== null) {
    if (proto === ctor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

class A {}
class B extends A {}
class C {}

const b = new B()
console.log('b instanceof B:', myInstanceof(b, B))  // true
console.log('b instanceof A:', myInstanceof(b, A))  // true
console.log('b instanceof C:', myInstanceof(b, C))  // false
console.log('b instanceof Object:', myInstanceof(b, Object))  // true`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]; snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 2,
    q: 'new 操作符执行时内部做了什么？手写一个 new。',
    a: '<strong>new 的四步</strong>：<br><br>① <strong>创建空对象</strong><br>② <strong>原型连接</strong>：空对象的 <code>__proto__</code> 指向构造函数的 <code>prototype</code><br>③ <strong>执行构造函数</strong>：<code>this</code> 指向新对象<br>④ <strong>判断返回值</strong>：如果构造函数返回了对象则用它，否则返回新对象<br><br><strong>手写实现</strong>：<br><code>function myNew(ctor, ...args) {</code><br><code>&nbsp;&nbsp;const obj = Object.create(ctor.prototype)</code><br><code>&nbsp;&nbsp;const result = ctor.apply(obj, args)</code><br><code>&nbsp;&nbsp;return (result !== null && typeof result === "object")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;? result : obj</code><br><code>}</code><br><br><strong>面试关键点</strong>：<br>· 用 <code>Object.create()</code> 而非 <code>{}</code> 来创建对象（保持原型链）<br>· 记得处理构造函数返回对象的情况<br>· 构造函数返回原始值（如 <code>return 123</code>）会被忽略<br><br><strong>口诀</strong>："建空对象 → 连原型 → 执行构造 → 对象优先"。',
  },
  {
    level: 1,
    q: '__proto__ 和 prototype 有什么区别？',
    a: '<strong>面试回答框架</strong>：先说定义，再说关系。<br><br><code>__proto__</code> 是每个<strong>对象</strong>都有的属性，指向创建它的构造函数的 <code>prototype</code>。<br><code>prototype</code> 是<strong>函数</strong>才有的属性，存放所有实例共享的方法。<br><br><strong>关键关系</strong>：<br>① <code>new Foo()</code> 创建的实例的 <code>__proto__</code> === <code>Foo.prototype</code><br>② <code>Foo.prototype.constructor</code> === <code>Foo</code><br>③ 函数本身也是对象，所以 <code>Foo.__proto__ === Function.prototype</code><br><br><strong>口诀</strong>：实例的 <code>__proto__</code> 指向构造函数的 <code>prototype</code>。',
  },
  {
    level: 2,
    q: '原型链的终点是什么？手写 instanceof。',
    a: '<strong>终点</strong>：<code>Object.prototype.__proto__ === null</code>。<br><br>当沿着 <code>__proto__</code> 一直往上找，找到 <code>Object.prototype</code> 时，它的 <code>__proto__</code> 是 <code>null</code>，链结束。<br><br><strong>手写 instanceof</strong>：<br><code>function myInstanceof(obj, ctor) {</code><br><code>&nbsp;&nbsp;let proto = Object.getPrototypeOf(obj)</code><br><code>&nbsp;&nbsp;while (proto) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;if (proto === ctor.prototype) return true</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;proto = Object.getPrototypeOf(proto)</code><br><code>&nbsp;&nbsp;}</code><br><code>&nbsp;&nbsp;return false</code><br><code>}</code><br><br><strong>注意</strong>：<code>Object.create(null)</code> 创建的对象没有原型链，<code>instanceof Object</code> 为 <code>false</code>。<br><br><strong>加分点</strong>：<code>[] instanceof Array</code> 在跨 iframe 时可能失效，推荐用 <code>Array.isArray()</code>。',
  },
  {
    level: 2,
    q: 'JS 有哪些继承方式？哪种最好？',
    a: '继承方式经历了四代演进：<br><br>① <strong>原型链继承</strong>：<code>Child.prototype = new Parent()</code><br> ❌ 父类引用类型被所有实例共享<br><br>② <strong>构造函数继承</strong>：<code>Parent.call(this)</code><br> ❌ 方法都在构造函数里定义，无法复用<br><br>③ <strong>组合继承</strong>：原型链 + 构造函数<br> ❌ 父类构造函数被调用了两次（<code>new Parent()</code> + <code>Parent.call(this)</code>）<br><br>④ <strong>寄生组合继承 ✅ 最优</strong>：<br> <code>Child.prototype = Object.create(Parent.prototype)</code><br> <code>Child.prototype.constructor = Child</code><br> <code>Parent.call(this)</code><br><br><strong>现代方案</strong>：ES6 <code>class extends</code> 底层就是寄生组合继承，直接用就行。',
  },
  {
    level: 3,
    q: 'ES6 class 和 ES5 构造函数有什么区别？',
    a: '<strong>class 本质是语法糖</strong>，<code>typeof Foo === "function"</code>。但有三大区别：<br><br>① <strong>必须 new 调用</strong>：<code>class</code> 不能当作普通函数调用（<code>Class()</code> 报错），ES5 构造函数可以<br>② <strong>不存在提升</strong>：<code>class</code> 存在 TDZ，必须先声明后使用<br>③ <strong>方法不可枚举</strong>：<code>class</code> 的原型方法 <code>enumerable === false</code>，ES5 构造函数的原型方法默认可枚举<br><br><strong>此外</strong>：<br>· <code>class</code> 内部默认严格模式<br>· <code>extends</code> 继承中，子类 <code>constructor</code> 必须先调用 <code>super()</code> 才能用 <code>this</code><br>· class 的静态方法（<code>static</code>）定义在构造函数自身上<br><br><strong>面试回答框架</strong>：class 是语法糖 + 三点区别 + extends 底层就是寄生组合继承 + super 本质是 <code>Parent.call(this)</code>。',
  },
  {
    level: 3,
    q: 'Function 和 Object 的三角关系怎么理解？',
    a: '这是 JS 原型链最绕的一点，但说出来就是加分项。<br><br><strong>三个关键事实</strong>：<br>① <code>Object.__proto__ === Function.prototype</code>（Object 本身是构造函数，由 Function 创建）<br>② <code>Function.__proto__ === Function.prototype</code>（Function 自己也是函数！）<br>③ <code>Function.prototype.__proto__ === Object.prototype</code>（Function.prototype 也是对象）<br><br><strong>推导结果</strong>：<br>· <code>Object instanceof Function // true</code>（沿着 Object.__proto__ → Function.prototype 找到了）<br>· <code>Function instanceof Object // true</code>（沿着 Function.__proto__ → Function.prototype → Object.prototype 找到了）<br>· <code>Function instanceof Function // true</code>（Function.__proto__ → Function.prototype）<br><br><strong>口诀</strong>：<code>Function.prototype</code> 是所有函数的原型，<code>Object.prototype</code> 是所有对象的原型。<code>Object</code> 本身是函数（由 Function 创建），<code>Function.prototype</code> 本身是对象（<code>__proto__</code> 指向 <code>Object.prototype</code>）。',
  },
]
</script>

<style scoped>
.js-page { max-width: 960px; margin: 0 auto; padding-bottom: 3rem; }
.hero { text-align: center; padding: 2.5rem 1rem 2rem; border-bottom: 1px solid var(--color-border); margin-bottom: 1.5rem; }
.hero h1 { font-size: 1.8rem; color: var(--color-heading); margin-bottom: 0.5rem; }
.hero-sub { color: var(--color-text); opacity: 0.6; font-size: 0.95rem; }
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
