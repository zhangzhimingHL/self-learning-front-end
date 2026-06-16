<template>
  <div class="js-page">
    <header class="hero">
      <h1>Promise 与异步编程</h1>
      <p class="hero-sub">面试必考 · <span class="kw">三种状态</span> · <span class="kw">链式调用</span> · <span class="kw">静态方法</span> · <span class="kw">async/await</span> · <span class="kw">手写 Promise</span></p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: Promise 基础 -->
    <!-- ============================================================ -->
    <section id="s1-basics" class="section-card">
      <h2 class="s-title">一、Promise 基础</h2>
      <p class="s-desc">
        Promise 是 JS 中用于处理<span class="kw">异步操作</span>的对象。它代表一个<span class="kw">未来才完成</span>的操作，让你用<span class="kw">链式调用</span>代替嵌套回调（回调地狱）。
      </p>

      <h3 class="s-subtitle">① 三种状态</h3>
      <p class="s-desc">
        Promise 只有三种状态，<span class="kw">一旦改变就不可逆转</span>：
      </p>
      <div class="state-diagram">
        <div class="state-item">
          <span class="state-name state-pending">pending</span>
          <span class="state-arrow">→</span>
          <span class="state-name state-fulfilled">fulfilled</span>
          <span class="state-desc">（操作成功）</span>
        </div>
        <div class="state-item">
          <span class="state-name state-pending">pending</span>
          <span class="state-arrow">→</span>
          <span class="state-name state-rejected">rejected</span>
          <span class="state-desc">（操作失败）</span>
        </div>
      </div>
      <p class="s-desc">
        pending → fulfilled（调用 <code>resolve</code>）或 pending → rejected（调用 <code>reject</code> 或抛出异常）。
        <DefTooltip tip="Promise 的状态一旦从 pending 变为 fulfilled/rejected，就永久锁定。即使后续再调用 resolve/reject 也不会改变。这叫 settled（已决）。为了保证可靠性：一个异步操作要么成功一次，要么失败一次，不存在中间态。">状态不可逆</DefTooltip>是 Promise 可靠性的基石。
      </p>

      <h3 class="s-subtitle">② 构造函数</h3>
      <p class="s-desc">
        <code>new Promise(executor)</code> 创建 Promise。<span class="kw">executor 是同步执行的</span>——这是面试常考的一个坑。executor 接收两个函数参数：
        <code>resolve</code>（将 Promise 变为 fulfilled）和 <code>reject</code>（变为 rejected）。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">promise-constructor.js</span>
          <button class="run-btn" @click="runCode('constructor')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.constructor.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.constructor.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.constructor.output || '点击 "运行" 查看 executor 执行顺序' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<span class="kw">Promise 构造函数是同步执行的</span>——<code>console.log(1); new Promise(() => console.log(2)); console.log(3)</code> 输出 1 → 2 → 3。只有 <code>.then()</code> 里面的回调才是<span class="kw">微任务</span>。
      </div>

      <h3 class="s-subtitle">③ then / catch / finally</h3>
      <p class="s-desc">
        Promise 实例的三个方法：
      </p>
      <div class="method-list">
        <div class="method-item">
          <code>.then(onFulfilled, onRejected?)</code>
          <span>— 注册<span class="kw">成功/失败</span>回调，返回<span class="kw">新的 Promise</span>（链式调用的关键）</span>
        </div>
        <div class="method-item">
          <code>.catch(onRejected)</code>
          <span>— <span class="kw">语法糖</span>，等价于 <code>.then(null, onRejected)</code>，捕获前面的错误</span>
        </div>
        <div class="method-item">
          <code>.finally(fn)</code>
          <span>— <span class="kw">无论成功失败都执行</span>，不接受参数，不改变状态/值（纯粹是"收尾"用的）</span>
        </div>
      </div>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">then-catch-finally.js</span>
          <button class="run-btn" @click="runCode('thenCatchFinally')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.thenCatchFinally.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.thenCatchFinally.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.thenCatchFinally.output || '点击 "运行" 查看 then/catch/finally 执行' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <span class="kw">finally 的特殊性</span>：<code>finally</code> 返回的 Promise 会<span class="kw">沿用上游的状态和值</span>，除非 <code>finally</code> 内部抛出了异常（或返回 rejected Promise），才会改为新状态。<br>
        简单说：<code>finally</code> 不改数据，只管收尾。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: 链式调用 -->
    <!-- ============================================================ -->
    <section id="s2-chain" class="section-card">
      <h2 class="s-title">二、链式调用与值传递</h2>
      <p class="s-desc">
        <code>then/catch/finally</code> 返回<span class="kw">新的 Promise</span>，所以可以 <span class="kw">.then().then().catch()</span> 链式写下去。
        这是 Promise 解决<span class="kw">回调地狱</span>的核心武器。
      </p>

      <h3 class="s-subtitle">① 返回值传递规则</h3>
      <p class="s-desc">
        then/catch 的回调中：
      </p>
      <div class="rule-list">
        <div class="rule-item">
          <span class="rule-tag rv">return 非 Promise 值</span>
          <span>→ 包装为 <span class="kw">Promise.resolve(值)</span>，下一个 then 收到这个值</span>
        </div>
        <div class="rule-item">
          <span class="rule-tag ra">return Promise</span>
          <span>→ <span class="kw">展开该 Promise</span>，下一个 then 等到它 settled 后收到结果</span>
        </div>
        <div class="rule-item">
          <span class="rule-tag rt">throw / return rejected Promise</span>
          <span>→ 跳到 <span class="kw">下一个 catch</span></span>
        </div>
        <div class="rule-item">
          <span class="rule-tag rn">不 return（return undefined）</span>
          <span>→ 下一个 then 收到 <span class="kw">undefined</span></span>
        </div>
      </div>
      <p class="s-desc">
        <DefTooltip tip="Promise 的 then/catch 始终返回一个新的 Promise（不是 this）。即使回调返回一个 already-resolved 的值，它也会被包装成新 Promise。这是链式调用永远有效的保证——每次 .then() 都是一个独立的 Promise 实例。">then 总是返回新 Promise</DefTooltip>，不是原来的那个——这是链式调用能一直传下去的原因。
      </p>

      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">chain.js</span>
          <button class="run-btn" @click="runCode('chain')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.chain.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.chain.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.chain.output || '点击 "运行" 查看链式传递' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 回调地狱 vs 链式调用</h3>
      <div class="code-compare">
        <div class="compare-side">
          <div class="compare-title bad">❌ 回调地狱</div>
          <pre class="code-block-sm"><code>getData((a) => {
  getMore(a, (b) => {
    getMore(b, (c) => {
      console.log(c)
    })
  })
})</code></pre>
        </div>
        <div class="compare-arrow">→</div>
        <div class="compare-side">
          <div class="compare-title good">✅ Promise 链</div>
          <pre class="code-block-sm"><code>getData()
  .then(a => getMore(a))
  .then(b => getMore(b))
  .then(c => console.log(c))
  .catch(console.error)</code></pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试加分</strong>：Promise 链的<span class="kw">错误冒泡</span>——链中任何一个 then 抛出错误或返回 rejected Promise，都会<span class="kw">跳过后续所有 then</span>，直到被 catch 捕获。所以一般只需要在链末尾写一个 <code>.catch()</code> 就够了。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 静态方法大全 -->
    <!-- ============================================================ -->
    <section id="s3-static" class="section-card">
      <h2 class="s-title">三、静态方法大全 <span class="s-badge">核心</span></h2>
      <p class="s-desc">
        Promise 上有 6 个重要的静态方法，面试常问它们的区别和使用场景。
      </p>

      <h3 class="s-subtitle">① Promise.resolve / Promise.reject</h3>
      <p class="s-desc">
        快速创建指定状态的 Promise：
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">resolve-reject.js</span>
          <button class="run-btn" @click="runCode('resolveReject')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.resolveReject.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.resolveReject.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.resolveReject.output || '点击 "运行" 查看' }}</pre>
        </div>
      </div>
      <p class="s-desc">
        <DefTooltip tip="如果一个对象有 .then 方法（thenable），Promise.resolve() 会将其展开——调用它的 .then 方法并等待其决定最终状态。例如 Promise.resolve({ then: (r) => r(42) }) 最终会 resolve 42。这保证了 Promise 生态的互操作性。">Promise.resolve 能展开 thenable 对象</DefTooltip>，不仅仅是 Promise。
      </p>

      <h3 class="s-subtitle">② Promise.all</h3>
      <p class="s-desc">
        接收一个 Promise 数组，<span class="kw">全部成功</span>才成功（返回结果数组），<span class="kw">一个失败就整体失败</span>（返回第一个错误）。<br>
        <DefTooltip tip="Promise.all 遵循 fail-fast 策略——只要其中一个 Promise rejected，Promise.all 就会立即 rejected，不会等待其他 Promise 完成。注意：即使整体失败了，其他 Promise 仍然会继续执行（不会被取消），只是结果被忽略了。ES2025 的 Promise.try 和 Promise.withResolvers 是新增强的 API。">注意：即便整体失败，其他 Promise 也不会取消</DefTooltip>。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">promise-all.js</span>
          <button class="run-btn" @click="runCode('promiseAll')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.promiseAll.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.promiseAll.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.promiseAll.output || '点击 "运行" 查看 Promise.all' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ Promise.allSettled</h3>
      <p class="s-desc">
        接收 Promise 数组，<span class="kw">等待所有 Promise 完成</span>（无论成功/失败），返回每个 Promise 的 <code>{ status, value / reason }</code> 数组。<br>
        它和 <code>Promise.all</code> 最大的区别是：<span class="kw">不关心成败，只等结束</span>。适合"批量发请求，各自处理结果"的场景。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">promise-allSettled.js</span>
          <button class="run-btn" @click="runCode('promiseAllSettled')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.promiseAllSettled.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.promiseAllSettled.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.promiseAllSettled.output || '点击 "运行" 查看' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">④ Promise.race</h3>
      <p class="s-desc">
        <span class="kw">第一个完成的</span> Promise 获胜（无论是 fulfilled 还是 rejected）。即"谁先到用谁"。常用于<span class="kw">超时控制</span>——把请求和 <code>setTimeout reject</code> 放一起 race。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">promise-race.js</span>
          <button class="run-btn" @click="runCode('promiseRace')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.promiseRace.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.promiseRace.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.promiseRace.output || '点击 "运行" 查看' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">⑤ Promise.any <span class="s-badge">ES2021</span></h3>
      <p class="s-desc">
        <span class="kw">第一个成功</span>的获胜。如果所有 Promise 都 rejected，则抛出一个 <span class="kw">AggregateError</span>（包含所有错误）。<br>
        和 <code>Promise.race</code> 的区别：race 是"第一个完成"（不管成功失败），any 是"第一个成功"（失败了继续等）。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">promise-any.js</span>
          <button class="run-btn" @click="runCode('promiseAny')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.promiseAny.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.promiseAny.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.promiseAny.output || '点击 "运行" 查看' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>五者对比</strong>：<br>
        · <code>Promise.all</code> → 等所有成功，或第一个失败（<span class="kw">全通过或全挂</span>）<br>
        · <code>Promise.allSettled</code> → 等所有结束，不关心成败（<span class="kw">只等结果</span>）<br>
        · <code>Promise.race</code> → 第一个结束的胜出（<span class="kw">谁快谁赢</span>）<br>
        · <code>Promise.any</code> → 第一个成功的胜出（<span class="kw">只要有一个成功就行</span>）<br>
        · <code>Promise.resolve/reject</code> → 快速包装值/错误
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 错误处理 -->
    <!-- ============================================================ -->
    <section id="s4-error" class="section-card">
      <h2 class="s-title">四、错误处理</h2>
      <p class="s-desc">
        Promise 链的错误处理有几个关键细节容易踩坑。
      </p>

      <h3 class="s-subtitle">① catch 的位置</h3>
      <p class="s-desc">
        catch 放在链尾可以捕获前面所有 then 的错误。它的位置决定了它能"救"到哪些错误。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">catch-position.js</span>
          <button class="run-btn" @click="runCode('catchPosition')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.catchPosition.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.catchPosition.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.catchPosition.output || '点击 "运行" 查看 catch 位置的影响' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② throw vs reject</h3>
      <p class="s-desc">
        在 executor 或 then 回调中 <code>throw new Error(...)</code> 等价于 <code>reject(new Error(...))</code>。<br>
        但要注意：<span class="kw">异步 throw 不会被 Promise 捕获</span>——在 setTimeout 里 throw 会崩掉程序，因为 executor 已经执行完了，try/catch 已经离开了。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">throw-vs-reject.js</span>
          <button class="run-btn" @click="runCode('throwVsReject')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.throwVsReject.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.throwVsReject.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.throwVsReject.output || '点击 "运行" 查看' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ 未捕获的 Promise 错误</h3>
      <p class="s-desc">
        如果一个 Promise 被 rejected 但<span class="kw">没有对应的 catch 处理</span>，浏览器会触发 <code>unhandledrejection</code> 事件（Node.js 中是 <code>unhandledRejection</code>），在控制台打印警告。<br>
        <span class="kw">始终在 Promise 链末尾加一个 catch</span> 是好习惯。
      </p>
      <div class="s-tip s-tip-warn">
        ⚠️ <strong>常见陷阱</strong>：<code>.catch()</code> 后面还可以继续 <code>.then()</code>——因为 catch 也返回新 Promise。如果在 catch 里没有 rethrow 错误，链会变成<span class="kw">已恢复</span>状态，下一个 then 会正常执行。这叫做"<span class="kw">catch 吞错误</span>"。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: async/await 详解 -->
    <!-- ============================================================ -->
    <section id="s5-async" class="section-card">
      <h2 class="s-title">五、async/await 语法详解</h2>
      <p class="s-desc">
        <code>async/await</code> 是 <span class="kw">Promise 的语法糖</span>，让异步代码看起来像同步代码。底层是 <DefTooltip tip="async/await 本质上是 Generator（生成器函数）+ Promise 的组合。async 函数内部可以被看作一个 generator，await 是 yield，而引擎在背后自动执行这个 generator。ES2017 把这种模式标准化为 async/await，开发者不需要手动编写 generator runner（如 co 库）了。">Generator + 自动执行器</DefTooltip>。
      </p>

      <h3 class="s-subtitle">① async 函数</h3>
      <p class="s-desc">
        <code>async function</code> 的返回值<span class="kw">永远是 Promise</span>。即使你 return 一个普通值，也会被 <code>Promise.resolve()</code> 包装。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">async-basics.js</span>
          <button class="run-btn" @click="runCode('asyncBasics')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.asyncBasics.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.asyncBasics.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.asyncBasics.output || '点击 "运行" 查看 async 函数' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② await 的本质</h3>
      <p class="s-desc">
        <code>await</code> 会暂停 async 函数的执行，等待后面的 Promise settled 后恢复。<br>
        关键理解：<code>await</code> <span class="kw">以自身为分界线</span>——<strong>右边同步执行，下面代码被包装成微任务</strong>。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">await-mechanics.js</span>
          <button class="run-btn" @click="runCode('awaitMechanics')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.awaitMechanics.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.awaitMechanics.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.awaitMechanics.output || '点击 "运行" 查看 await 机制' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ 错误处理：try/catch</h3>
      <p class="s-desc">
        用 <span class="kw">try/catch</span> 包裹 await 来捕获异步错误，和同步代码的错误处理方式完全一致。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">async-try-catch.js</span>
          <button class="run-btn" @click="runCode('asyncTryCatch')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.asyncTryCatch.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.asyncTryCatch.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.asyncTryCatch.output || '点击 "运行" 查看 try/catch 错误处理' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">④ 串行 vs 并行</h3>
      <p class="s-desc">
        <span class="kw">串行</span>：多个 await 逐个等待——<code>const a = await fetchA(); const b = await fetchB();</code>（B 等 A 完成再开始，速度慢）<br>
        <span class="kw">并行</span>：用 <code>Promise.all</code> 同时发起——<code>const [a, b] = await Promise.all([fetchA(), fetchB()])</code>（同时进行，速度快）<br><br>
        <span class="kw">核心原则</span>：<strong>没有依赖关系的异步操作一定要并行</strong>，这是最常见的性能优化点。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">serial-vs-parallel.js</span>
          <button class="run-btn" @click="runCode('serialVsParallel')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.serialVsParallel.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.serialVsParallel.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.serialVsParallel.output || '点击 "运行" 对比串行和并行的时间' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>for 循环 + await</code> 是串行——每次循环会等上一次 await 完成。如果你需要循环并行请求，用 <code>Promise.all(arr.map(fn))</code>。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: 手写实现（进阶）-->
    <!-- ============================================================ -->
    <section id="s6-implement" class="section-card">
      <h2 class="s-title">六、手写实现 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">
        手写 Promise 是进大厂绕不开的题。下面从简单到复杂，一步步实现。
      </p>

      <h3 class="s-subtitle">① 手写简易 Promise</h3>
      <p class="s-desc">
        实现核心：状态管理、then 链式调用、异步支持。
        <DefTooltip tip="Promise A+ 规范是社区制定的 Promise 互操作性标准。ES6 的 Promise 就是基于这个规范的。核心要求：then 必须返回新 Promise、异步执行 onFulfilled/onRejected、支持 thenable 展开等。这里手写的是一个简化版本，省略了 Promise A+ 规定的 thenable 展开等细节。">Promise A+ 规范</DefTooltip>是 Promise 的标准参考。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">mini-promise.js</span>
          <button class="run-btn" @click="runCode('miniPromise')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.miniPromise.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.miniPromise.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.miniPromise.output || '点击 "运行" 测试手写 Promise' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">② 手写 Promise.all</h3>
      <p class="s-desc">
        面试手写题中出现频率最高的 Promise 静态方法。
      </p>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-promise-all.js</span>
          <button class="run-btn" @click="runCode('myPromiseAll')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myPromiseAll.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myPromiseAll.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myPromiseAll.output || '点击 "运行" 测试手写 Promise.all' }}</pre>
        </div>
      </div>

      <h3 class="s-subtitle">③ 手写 Promise.race</h3>
      <div class="demo-area">
        <div class="demo-code-header">
          <span class="demo-code-filename">my-promise-race.js</span>
          <button class="run-btn" @click="runCode('myPromiseRace')">▶ 运行</button>
        </div>
        <pre class="code-block"><code>{{ snippets.myPromiseRace.code }}</code></pre>
        <div class="output-panel" :class="{ 'has-content': snippets.myPromiseRace.output }">
          <div class="output-label">Console Output</div>
          <pre class="output-content">{{ snippets.myPromiseRace.output || '点击 "运行" 测试手写 Promise.race' }}</pre>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试技巧</strong>：手写 Promise.all 比手写完整 Promise 更常考。写出 <code>Promise.all = (promises) => new Promise((resolve, reject) => { ... })</code> 的框架，然后处理结果收集和错误捕获，面试官基本就满意了。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 7: 动手实验区 -->
    <!-- ============================================================ -->
    <section id="s7-playground" class="section-card">
      <h2 class="s-title">七、🧪 动手实验区</h2>
      <p class="s-desc">修改代码，观察 Promise 链的执行顺序、静态方法行为、async/await 的串行/并行。</p>

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
          <span class="hint-chip" @click="loadHint(0)">🔹 链式调用的值传递</span>
          <span class="hint-chip" @click="loadHint(1)">🔹 Promise.all 与错误处理</span>
          <span class="hint-chip" @click="loadHint(2)">🔹 async/await 串行 vs 并行</span>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 8: 面试问答 -->
    <!-- ============================================================ -->
    <section id="s8-qa" class="section-card">
      <h2 class="s-title">八、面试高频问答（⭐→⭐⭐⭐）</h2>
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
  { id: 's1-basics',     label: 'Promise 基础' },
  { id: 's2-chain',      label: '链式调用' },
  { id: 's3-static',     label: '静态方法' },
  { id: 's4-error',      label: '错误处理' },
  { id: 's5-async',      label: 'async/await' },
  { id: 's6-implement',  label: '手写实现' },
  { id: 's7-playground', label: '动手实验' },
  { id: 's8-qa',         label: '面试问答' },
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

// ─── 异步运行（支持 setTimeout / Promise） ───
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
  }, 300)
  try { fn() } catch (e: unknown) {
    console.log = origLog
    snippet.output = '💥 错误: ' + (e instanceof Error ? e.message : String(e))
  }
}

// ─── 代码片段 ───
interface Snippet { code: string; output: string }
const snippets = reactive<Record<string, Snippet>>({
  constructor: {
    code: `// Promise 构造函数是同步执行的！
console.log('1 同步')

const p = new Promise((resolve, reject) => {
  console.log('2 executor 同步执行')
  resolve('成功值')
})

console.log('3 同步')

p.then(value => {
  console.log('4 then 回调是微任务:', value)
})

console.log('5 同步')

// 输出顺序：1 → 2 → 3 → 5 → 4
// 关键：executor 中的 console.log(2) 是同步的！
// 只有 .then() 的回调才是微任务`,
    output: '',
  },
  thenCatchFinally: {
    code: `// then / catch / finally
const p = new Promise((resolve) => {
  resolve('Hello')
})

p
  .then(val => {
    console.log('then:', val)
    return val + ' World'
  })
  .then(val => {
    console.log('then 链:', val)
    throw new Error('出错了！')
  })
  .catch(err => {
    console.log('catch:', err.message)
    return '从错误中恢复'
  })
  .then(val => {
    console.log('catch 后的 then:', val)
  })
  .finally(() => {
    console.log('finally：无论怎样都执行')
  })

// 输出：
// then: Hello
// then 链: Hello World
// catch: 出错了！
// catch 后的 then: 从错误中恢复
// finally：无论怎样都执行

// 注意：catch 后面还能接 then！因为 catch 也返回新 Promise`,
    output: '',
  },
  chain: {
    code: `// 链式调用的值传递
Promise.resolve(1)
  .then(val => {
    console.log('1️⃣ 收到:', val)     // 1
    return val + 1                    // return 普通值 → 包装成 Promise.resolve(2)
  })
  .then(val => {
    console.log('2️⃣ 收到:', val)     // 2
    return Promise.resolve(val + 1)   // return Promise → 展开
  })
  .then(val => {
    console.log('3️⃣ 收到:', val)     // 3
    return new Promise(r => setTimeout(() => r(val + 1), 100))  // return 异步 Promise
  })
  .then(val => {
    console.log('4️⃣ 异步后收到:', val) // 4
    // 不 return → 下一个 then 收到 undefined
  })
  .then(val => {
    console.log('5️⃣ 没 return:', val) // undefined
  })

// 输出顺序：
// 1️⃣ 收到: 1
// 2️⃣ 收到: 2
// 3️⃣ 收到: 3
// 4️⃣ 异步后收到: 4
// 5️⃣ 没 return: undefined`,
    output: '',
  },
  resolveReject: {
    code: `// Promise.resolve / Promise.reject

// 快速创建成功 Promise
Promise.resolve(42).then(v => console.log('resolve:', v))

// 快速创建失败 Promise
Promise.reject('错误信息').catch(e => console.log('reject:', e))

// Promise.resolve 展开 thenable 对象
const thenable = {
  then(resolve) {
    resolve('来自 thenable 的值')
  }
}
Promise.resolve(thenable).then(v => console.log('thenable:', v))

// 输出：
// resolve: 42
// thenable: 来自 thenable 的值
// reject: 错误信息`,
    output: '',
  },
  promiseAll: {
    code: `// Promise.all —— 全部成功
const p1 = Promise.resolve('A')
const p2 = new Promise(r => setTimeout(() => r('B'), 50))
const p3 = 'C'  // 非 Promise 值自动包装

Promise.all([p1, p2, p3]).then(results => {
  console.log('全部成功:', results)  // ['A', 'B', 'C']
})

// Promise.all —— 一个失败
const p4 = Promise.reject('出错了！')
const p5 = Promise.resolve('正常')

Promise.all([p1, p4, p5])
  .then(r => console.log('不会走到这里'))
  .catch(e => console.log('捕获到:', e))  // '出错了！'

// 注意：p5 仍然会执行！Promise.all 失败时不会取消其他 Promise`,
    output: '',
  },
  promiseAllSettled: {
    code: `// Promise.allSettled —— 等所有结束
const p1 = Promise.resolve('成功')
const p2 = Promise.reject('失败')
const p3 = new Promise(r => setTimeout(() => r('慢成功'), 50))

Promise.allSettled([p1, p2, p3]).then(results => {
  console.log('所有结果:')
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(\`  第\${i+1}个: ✅ 成功 → \${r.value}\`)
    } else {
      console.log(\`  第\${i+1}个: ❌ 失败 → \${r.reason}\`)
    }
  })
})
// 输出：
// 所有结果:
//   第1个: ✅ 成功 → 成功
//   第2个: ❌ 失败 → 失败
//   第3个: ✅ 成功 → 慢成功`,
    output: '',
  },
  promiseRace: {
    code: `// Promise.race —— 谁快谁赢
const slow = new Promise(r => setTimeout(() => r('慢的'), 100))
const fast = new Promise(r => setTimeout(() => r('快的'), 50))

Promise.race([slow, fast]).then(v => {
  console.log('获胜者:', v)  // '快的'（50ms 先到）
})

// 实用场景：超时控制
function fetchWithTimeout(url, ms) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('请求超时')), ms)
    )
  ])
}
console.log('fetchWithTimeout 已定义，可用于超时控制')
// 如果请求超过 ms 毫秒，Promise.race 就会 reject 超时错误`,
    output: '',
  },
  promiseAny: {
    code: `// Promise.any —— 只要有一个成功就行
const p1 = Promise.reject('失败1')
const p2 = Promise.reject('失败2')
const p3 = new Promise(r => setTimeout(() => r('成功！'), 50))

Promise.any([p1, p2, p3]).then(v => {
  console.log('第一个成功的:', v)  // '成功！'
})

// 全部失败的情况
const allFail = [Promise.reject('err1'), Promise.reject('err2')]
Promise.any(allFail)
  .then(v => console.log('不会到这里'))
  .catch(e => {
    console.log('全部失败:', e instanceof AggregateError)
    console.log('错误列表:', e.errors)
    // AggregateError，包含所有错误
  })

// 输出：
// 第一个成功的: 成功！
// 全部失败: true
// 错误列表: ['err1', 'err2']`,
    output: '',
  },
  catchPosition: {
    code: `// catch 的位置决定它能捕获多少错误
// 场景 1：catch 在链尾，捕获所有前面的错误
Promise.resolve(1)
  .then(v => { throw new Error('错误A') })
  .then(v => console.log('跳过'))     // 被跳过
  .catch(e => console.log('1️⃣ 链尾捕获:', e.message))

// 场景 2：catch 在中间，后面的 then 正常执行
Promise.resolve(1)
  .then(v => { throw new Error('错误B') })
  .catch(e => {
    console.log('2️⃣ 中间捕获:', e.message)
    return '我恢复了'  // 没有 rethrow，链恢复正常
  })
  .then(v => console.log('2️⃣ catch 后恢复:', v))

// 场景 3：catch 吞错误
Promise.resolve(1)
  .then(v => { throw new Error('错误C') })
  .catch(e => {
    console.log('3️⃣ catch 但不处理:', e.message)
    // 没有 rethrow，错误被静默吞掉
  })
  .then(v => console.log('3️⃣ 吞掉后:', v))  // undefined 而不是报错

// 输出：
// 2️⃣ 中间捕获: 错误B
// 2️⃣ catch 后恢复: 我恢复了
// 1️⃣ 链尾捕获: 错误A
// 3️⃣ catch 但不处理: 错误C
// 3️⃣ 吞掉后: undefined`,
    output: '',
  },
  throwVsReject: {
    code: `// throw vs reject — 同步时等价
const p1 = new Promise((_, reject) => {
  reject(new Error('reject 方式'))
})
const p2 = new Promise((_, reject) => {
  throw new Error('throw 方式')  // 等价于上面的 reject
})
p1.catch(e => console.log('p1:', e.message))
p2.catch(e => console.log('p2:', e.message))

// 异步 throw 无法被 Promise 捕获！
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('异步 throw')  // ❌ 不会被 catch 捕获！
    // 此时 executor 已经执行完了，try/catch 早已离开
    // 这个错误会变成未捕获异常，直接崩掉程序
  }, 10)
})
p3.catch(e => console.log('收不到:', e.message))

console.log('注意：上面的异步 throw 会报 Uncaught Error')
console.log('结论：在 Promise 中，异步代码要 reject 而不是 throw')

// 正确做法：
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('异步 reject'))  // ✅ 正确！
  }, 20)
})
p4.catch(e => console.log('正确捕获:', e.message))`,
    output: '',
  },
  asyncBasics: {
    code: `// async 函数总是返回 Promise
async function foo() {
  return 42  // 等同于 return Promise.resolve(42)
}

const result = foo()
console.log('async 返回值:', result instanceof Promise)  // true

result.then(v => console.log('拿到值:', v))  // 42

// async 函数内部抛出异常 → 返回 rejected Promise
async function bar() {
  throw new Error('async 内错误')
}
bar().catch(e => console.log('async 错误:', e.message))

// async 和普通函数的区别
async function greet() {
  return 'Hello'
}
function greetNormal() {
  return 'Hello'
}

console.log('async:', greet() instanceof Promise)       // true
console.log('普通:', greetNormal() instanceof Promise)   // false`,
    output: '',
  },
  awaitMechanics: {
    code: `// await 的机制：右边同步执行，下面代码是微任务
async function foo() {
  console.log('2 foo 开始')
  const result = await bar()  // bar() 同步执行！
  console.log('5 await 后面的代码是微任务', result)
}

async function bar() {
  console.log('3 bar 同步执行')
  return 'bar的结果'
}

console.log('1 同步开始')
foo()
console.log('4 同步结束')

// 输出顺序：
// 1 同步开始
// 2 foo 开始
// 3 bar 同步执行
// 4 同步结束
// 5 await 后面的代码是微任务 bar的结果

// await bar() 这行等价于：
//   const promise = bar()      ← 同步执行
//   promise.then(result => {   ← 后面代码进微任务
//     const result = result
//     ...
//   })`,
    output: '',
  },
  asyncTryCatch: {
    code: `// try/catch 捕获 await 错误
async function fetchData() {
  try {
    const data = await new Promise((_, reject) => {
      setTimeout(() => reject(new Error('网络错误')), 50)
    })
    console.log('成功:', data)  // 不会执行
  } catch (error) {
    console.log('捕获到:', error.message)  // 网络错误
  }
}

fetchData()

// 多个 await 一起 try 包裹
async function multiFetch() {
  try {
    const a = await Promise.resolve('A')
    const b = await Promise.reject('B 出错了')
    const c = await Promise.resolve('C')  // 被跳过
    console.log(a, b, c)
  } catch (e) {
    console.log('某个请求失败了:', e)
  }
}
multiFetch()

// 不用 try/catch 的替代写法：链式 catch
async function fetchOrFallback() {
  const data = await fetch('/api/data').catch(() => '默认值')
  console.log('有保底:', data)
}
// 注意：这种写法要谨慎——catch 只捕获 fetch 的错误
// 如果后面还有 await 出错就抓不到了`,
    output: '',
  },
  serialVsParallel: {
    code: `// 模拟异步请求
function fetchUser(id) {
  return new Promise(r => {
    console.log(\`  📡 开始请求用户 \${id}\`)
    setTimeout(() => {
      console.log(\`  ✅ 用户 \${id} 完成\`)
      r({ id, name: \`用户\${id}\` })
    }, 200)
  })
}

// ❌ 串行：总耗时 600ms
async function serial() {
  console.time('串行')
  const a = await fetchUser(1)    // 等 200ms
  const b = await fetchUser(2)    // 再等 200ms
  const c = await fetchUser(3)    // 再等 200ms
  console.log('串行结果:', [a, b, c])
  console.timeEnd('串行')
}

// ✅ 并行：总耗时 ~200ms
async function parallel() {
  console.time('并行')
  const [a, b, c] = await Promise.all([
    fetchUser(1),  // 同时开始
    fetchUser(2),
    fetchUser(3),
  ])
  console.log('并行结果:', [a, b, c])
  console.timeEnd('并行')
}

// 先串行再并行对比
serial().then(() => {
  console.log('--- 分割线 ---')
  parallel()
})

// 核心：没有依赖关系的请求一定要并行！`,
    output: '',
  },
  miniPromise: {
    code: `// ===== 手写简易 Promise =====
class MyPromise {
  #state = 'pending'    // pending / fulfilled / rejected
  #value = undefined
  #callbacks = []       // 存储 then 回调（支持异步 resolve）

  constructor(executor) {
    const resolve = (value) => this.#settle('fulfilled', value)
    const reject = (reason) => this.#settle('rejected', reason)
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  #settle(state, value) {
    if (this.#state !== 'pending') return  // 状态不可逆
    this.#state = state
    this.#value = value
    this.#runCallbacks()
  }

  #runCallbacks() {
    if (this.#state === 'pending') return
    // 微任务调度（简化为 setTimeout）
    const cb = this.#callbacks.shift()
    if (cb) setTimeout(() => cb())
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#callbacks.push(() => {
        try {
          if (this.#state === 'fulfilled') {
            const result = onFulfilled ? onFulfilled(this.#value) : this.#value
            resolve(result)
          } else if (this.#state === 'rejected') {
            if (onRejected) {
              const result = onRejected(this.#value)
              resolve(result)  // catch 恢复
            } else {
              reject(this.#value)  // 继续抛
            }
          }
        } catch (e) {
          reject(e)
        }
      })
      // 如果已经 settled，立即执行
      if (this.#state !== 'pending') this.#runCallbacks()
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}

// ===== 测试 =====
console.log('--- 测试手写 MyPromise ---')
const mp = new MyPromise((resolve) => {
  console.log('executor 同步')
  resolve('手动实现！')
})

mp.then(v => {
  console.log('then 拿到:', v)
  return '链式'
}).then(v => {
  console.log('链式:', v)
})

console.log('同步结束')
// 输出：
// executor 同步
// 同步结束
// then 拿到: 手动实现！
// 链式: 链式`,
    output: '',
  },
  myPromiseAll: {
    code: `// ===== 手写 Promise.all =====
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('参数必须可迭代'))
    }

    const results = []
    let completed = 0
    const len = promises.length

    if (len === 0) return resolve(results)

    promises.forEach((p, i) => {
      // 非 Promise 值用 Promise.resolve 包装
      Promise.resolve(p).then(
        value => {
          results[i] = value    // 保持顺序！
          completed++
          if (completed === len) resolve(results)
        },
        reason => {
          reject(reason)        // 一个失败，整体失败
        }
      )
    })
  })
}

// ===== 测试 =====
const p1 = Promise.resolve('A')
const p2 = new Promise(r => setTimeout(() => r('B'), 50))
const p3 = 'C'

myPromiseAll([p1, p2, p3]).then(r => {
  console.log('myPromiseAll 结果:', r)  // ['A', 'B', 'C']
})

// 失败测试
myPromiseAll([p1, Promise.reject('失败!'), p3])
  .then(r => console.log('不会到这里'))
  .catch(e => console.log('捕获失败:', e))  // 失败!`,
    output: '',
  },
  myPromiseRace: {
    code: `// ===== 手写 Promise.race =====
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('参数必须可迭代'))
    }

    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject)
      // 谁先触发，Promise 的状态就锁定为谁
    }
  })
}

// ===== 测试 =====
const slow = new Promise(r => setTimeout(() => r('慢的'), 100))
const fast = new Promise(r => setTimeout(() => r('快的'), 50))

myPromiseRace([slow, fast]).then(v => {
  console.log('myPromiseRace 获胜者:', v)  // 快的
})

// 超时控制测试
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('超时')), 60)
)
myPromiseRace([slow, timeout]).catch(e => {
  console.log('超时捕获:', e.message)  // 超时（因为 slow 需要 100ms > 60ms）
})`,
    output: '',
  },
  playground: {
    code: `// 自己设计 Promise 组合
console.log('开始')

// 试试修改下面的代码
const p = new Promise((resolve) => {
  console.log('executor')
  resolve('A')
})

p.then(v => {
  console.log('then:', v)
  return 'B'
}).then(v => {
  console.log('then:', v)
})

Promise.resolve('C').then(v => console.log('直接 then:', v))

console.log('结束')
// 你能说出完整输出顺序吗？`,
    output: '',
  },
})

// ─── 运行代码 ───
function runCode(key: string) {
  if (key === 'playground') {
    snippets.playground.output = ''
    const lines: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => lines.push(args.map(a => formatArg(a)).join(' '))
    try {
      const func = new Function('Promise', 'setTimeout', playgroundCode.value)
      func(Promise, setTimeout)
    } catch (e: unknown) { lines.push('💥 错误: ' + (e instanceof Error ? e.message : String(e))) }
    setTimeout(() => {
      console.log = origLog
      const snapshot = lines.splice(0)
      if (snapshot.length) {
        snippets.playground.output = (snippets.playground.output || '') + snapshot.join('\n')
      }
    }, 200)
    snippets.playground.output = '⏳ 执行中（异步结果将在 200ms 后显示）...\n' + lines.join('\n')
    return
  }

  // 异步代码段
  const asyncKeys = ['chain', 'catchPosition', 'throwVsReject', 'asyncBasics', 'asyncTryCatch']
  if (asyncKeys.includes(key)) {
    runAsync(() => {
      const func = new Function(snippets[key].code)
      func()
    }, key)
    return
  }

  // miniPromise/myPromiseAll/myPromiseRace 需要自己的实现，用特殊方式
  if (key === 'miniPromise' || key === 'myPromiseAll' || key === 'myPromiseRace') {
    const snippet = snippets[key]
    if (!snippet) return
    snippet.output = '⏳ 执行中...'
    const captured: string[] = []
    const origLog = console.log
    console.log = (...args: unknown[]) => captured.push(args.map(a => formatArg(a)).join(' '))
    setTimeout(() => {
      console.log = origLog
      snippet.output = captured.join('\n')
    }, 400)
    try {
      const func = new Function('Promise', 'setTimeout', 'setInterval', snippet.code)
      func(Promise, setTimeout, setInterval)
    } catch (e: unknown) {
      console.log = origLog
      snippet.output = '💥 错误: ' + (e instanceof Error ? e.message : String(e))
    }
    return
  }

  // 异步 + setTimeout 的代码段
  const delayKeys = ['promiseAll', 'promiseAllSettled', 'promiseRace', 'promiseAny', 'serialVsParallel', 'awaitMechanics']
  if (delayKeys.includes(key)) {
    runAsync(() => {
      const func = new Function('Promise', 'setTimeout', snippets[key].code)
      func(Promise, setTimeout)
    }, key)
    return
  }

  // 同步代码
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
  `// 链式调用值传递练习
// 猜猜每个 then 收到什么？
Promise.resolve(10)
  .then(v => {
    console.log('then 1:', v)
    return v * 2
  })
  .then(v => {
    console.log('then 2:', v)
    return Promise.resolve(v + 5)
  })
  .then(v => {
    console.log('then 3:', v)
    // 没 return
  })
  .then(v => {
    console.log('then 4:', v)
  })`,
  `// Promise.all 与错误处理
const success = (val, ms) => new Promise(r => setTimeout(() => {
  console.log('✅', val, '完成')
  r(val)
}, ms))

const fail = (val, ms) => new Promise((_, rej) => setTimeout(() => {
  console.log('❌', val, '失败')
  rej(val)
}, ms))

// 如果把 fail 换成 success，结果会怎样？
Promise.all([
  success('A', 100),
  fail('B', 50),
  success('C', 150),
]).then(r => console.log('all 结果:', r))
  .catch(e => console.log('all 错误:', e))`,
  `// async/await 串行 vs 并行
function delay(ms, label) {
  return new Promise(r => {
    console.log(\`  ▶ 开始 \${label}\`)
    setTimeout(() => { console.log(\`  ✔ \${label} 完成\`); r(label) }, ms)
  })
}

async function serial() {
  console.log('--- 串行 ---')
  console.time('串行')
  const a = await delay(200, 'A')
  const b = await delay(200, 'B')
  console.timeEnd('串行')
  return [a, b]
}

async function parallel() {
  console.log('--- 并行 ---')
  console.time('并行')
  const [a, b] = await Promise.all([
    delay(200, 'A'),
    delay(200, 'B'),
  ])
  console.timeEnd('并行')
  return [a, b]
}

serial().then(() => { console.log(''); return parallel() })`,
]
function loadHint(idx: number) {
  playgroundCode.value = hints[idx]; snippets.playground.output = ''
}

// ─── 面试问答 ───
const openIdx = ref(-1)
const questions = [
  {
    level: 1,
    q: 'Promise 的三种状态是什么？状态可以逆转吗？',
    a: '<span class="kw">pending</span>（等待中）、<span class="kw">fulfilled</span>（已成功）、<span class="kw">rejected</span>（已失败）。<br><br><span class="kw">状态不可逆</span>：一旦从 pending 变为 fulfilled 或 rejected，就永久锁定。之后再调用 resolve/reject 都没用了。这是 Promise 可靠性的基石——保证回调最多被调用一次。<br><br><span class="kw">面试回答框架</span>：三态描述（pending → fulfilled/rejected）→ 状态不可逆 → executor 同步执行 → then/catch/finally 注册回调。',
  },
  {
    level: 1,
    q: 'Promise 构造函数中的 executor 是同步还是异步执行？',
    a: '<span class="kw">同步执行</span>。<br><br>这是面试中最常见的陷阱之一：<br><code>console.log(1)</code><br><code>new Promise(() => console.log(2))</code><br><code>console.log(3)</code><br><br>输出：<span class="kw">1 → 2 → 3</span>（不是 1 → 3 → 2！）<br><br>只有 <code>.then()</code> / <code>.catch()</code> / <code>.finally()</code> 里面的回调才是<span class="kw">微任务</span>，异步执行。executor 是构造 Promise 时<span class="kw">立即执行</span>的。',
  },
  {
    level: 2,
    q: 'Promise 链式调用中，then 返回值和下一个 then 的关系是什么？',
    a: '规则如下：<br><br>① <span class="kw">return 非 Promise 值</span> → 包装为 <code>Promise.resolve(值)</code>，下一个 then 收到该值<br>② <span class="kw">return Promise</span> → 展开该 Promise，下一个 then 等待它 settled<br>③ <span class="kw">throw / return rejected Promise</span> → 跳到下一个 catch<br>④ <span class="kw">不 return</span> → 下一个 then 收到 <code>undefined</code><br><br><span class="kw">关键</span>：then 总是返回<span class="kw">新的 Promise</span>（不是原来的那个），所以链式调用可以无限延续。<br><br><span class="kw">面试加分</span>：then 返回值的"展开"机制——如果返回值是一个 thenable 对象（有 then 方法），Promise 会把它展开，直到取到最终的非 thenable 值。',
  },
  {
    level: 2,
    q: 'Promise.all、Promise.allSettled、Promise.race、Promise.any 的区别是什么？',
    a: '四者的区别：<br><br>· <span class="kw">Promise.all</span>：等<span class="kw">所有成功</span>，或<span class="kw">第一个失败</span>。返回结果数组。适合"所有请求都成功才能继续"的场景。<br><br>· <span class="kw">Promise.allSettled</span>：等<span class="kw">所有结束</span>（不管成功失败）。返回 <code>{ status, value/reason }</code> 数组。适合"批量请求各自处理结果"的场景（如批量上传，每个文件各自显示结果）。<br><br>· <span class="kw">Promise.race</span>：<span class="kw">第一个完成</span>的胜出（成功或失败都算）。适合超时控制。<br><br>· <span class="kw">Promise.any</span>：<span class="kw">第一个成功</span>的胜出。全部失败返回 AggregateError。适合"多个备用资源，谁先成功用谁"的场景。<br><br><span class="kw">一句话记忆</span>：all = 全过 / allSettled = 等完 / race = 谁快 / any = 第一个成功。',
  },
  {
    level: 3,
    q: 'async/await 的本质是什么？await 到底做了什么？',
    a: '<code>async/await</code> 是 <span class="kw">Promise 的语法糖</span>，底层基于 <span class="kw">Generator + 自动执行器</span>。<br><br><span class="kw">await 的机制</span>：<br>· <code>await</code> <span class="kw">右边的表达式同步执行</span><br>· <code>await</code> 下面的代码被包装成 <code>.then()</code> 回调，放入<span class="kw">微任务队列</span><br><br><span class="kw">等价转换</span>：<br><code>async function foo() {</code><br><code>&nbsp;&nbsp;const x = await bar()</code><br><code>&nbsp;&nbsp;console.log(x)</code><br><code>}</code><br><br>等价于：<br><code>function foo() {</code><br><code>&nbsp;&nbsp;return Promise.resolve(bar()).then(x => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;console.log(x)</code><br><code>&nbsp;&nbsp;})</code><br><code>}</code><br><br><span class="kw">面试回答框架</span>：async 返回 Promise → await 右侧同步执行、下方进微任务 → await 串行要改 Promise.all 并行 → 错误用 try/catch 捕获。',
  },
  {
    level: 3,
    q: '手写 Promise.all 的核心思路是什么？',
    a: '核心思路：<br><br>① 返回一个新 <code>Promise</code><br>② 遍历传入的 Promise 数组，用 <code>Promise.resolve(p)</code> 统一包装（处理非 Promise 值）<br>③ 每个 Promise 成功后，<span class="kw">按索引位置</span>保存结果（不能 push，要保证顺序）<br>④ 用一个计数器追踪完成数量，当 <span class="kw">completed === len</span> 时 resolve 结果数组<br>⑤ 任何一个 Promise 失败，<span class="kw">立即 reject</span>（fail-fast）<br>⑥ 处理空数组边界情况<br><br><span class="kw">核心代码</span>：<br><code>function myPromiseAll(promises) {</code><br><code>&nbsp;&nbsp;return new Promise((resolve, reject) => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;const results = []</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;let completed = 0</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;promises.forEach((p, i) => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Promise.resolve(p).then(v => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;results[i] = v</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (++completed === promises.length) resolve(results)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, reject)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;})</code><br><code>&nbsp;&nbsp;})</code><br><code>}</code>',
  },
  {
    level: 2,
    q: 'catch 和 then 的第二个参数（onRejected）有什么区别？',
    a: '两者都能处理 Promise 的错误。主要区别：<br><br>① <span class="kw">语法糖关系</span>：<code>.catch(onRejected)</code> 等价于 <code>.then(null, onRejected)</code><br><br>② <span class="kw">捕获范围不同</span>：<br>· <code>.then(onFulfilled, onRejected)</code> — onRejected 只捕获 <span class="kw">前面 Promise 的错误</span>，<span class="kw">不捕获 onFulfilled 中抛出的错误</span><br>· <code>.catch(onRejected)</code> — 捕获 <span class="kw">前面所有 then 的错误</span>，包括 onFulfilled 里的错误<br><br>③ <span class="kw">链式位置不同</span>：<br>· <code>.then(onFulfilled, onRejected)</code> 在同一层，无法捕获 onFulfilled 的异常<br>· <code>.catch()</code> 通常放在链尾，捕获链上所有错误<br><br><span class="kw">推荐用法</span>：始终用 <code>.catch()</code> 而不是 then 的第二个参数，因为更符合直觉且不易出错。',
  },
  {
    level: 2,
    q: 'for 循环中使用 await 是串行还是并行？如何改为并行？',
    a: '<span class="kw">串行</span>。<br><br><code>for (const id of ids) {</code><br><code>&nbsp;&nbsp;const data = await fetch(id)  // 每次等上一次完成</code><br><code>}</code><br><br>上面每次循环会等前一次 await 完成才继续，所以 ids 越多，总耗时越长（逐个累加）。<br><br><span class="kw">改为并行</span>：<br><code>const results = await Promise.all(ids.map(id => fetch(id)))</code><br><br>所有请求<span class="kw">同时发起</span>，总耗时 = 最慢的那个请求的耗时。<br><br><span class="kw">注意</span>：如果循环中的请求有<span class="kw">依赖关系</span>（B 需要 A 的结果），用串行是对的。只有<span class="kw">无依赖</span>时才应该并行。<br><br><span class="kw">面试加分</span>：如果并发数太多（如 1000 个请求），用 <code>Promise.all</code> 直接并行会耗尽系统资源。需要做<span class="kw">并发限制</span>——用一个计数器的 pool，限制同时最多 N 个请求（如浏览器同域名并发限制通常是 6 个）。',
  },
  {
    level: 3,
    q: 'async/await 和 Generator 的关系是什么？为什么说 async/await 是 Generator 的语法糖？',
    a: '<span class="kw">历史背景</span>：在 async/await 出现之前（ES2017），开发者用 <span class="kw">Generator + co 库</span>来实现同样的效果。<br><br><span class="kw">对比</span>：<br><br><code>// Generator + co（ES2015 时代的写法）</code><br><code>co(function* () {</code><br><code>&nbsp;&nbsp;const a = yield fetchA()</code><br><code>&nbsp;&nbsp;const b = yield fetchB(a)</code><br><code>&nbsp;&nbsp;console.log(a, b)</code><br><code>})</code><br><br><code>// async/await（ES2017 标准化写法）</code><br><code>async function () {</code><br><code>&nbsp;&nbsp;const a = await fetchA()</code><br><code>&nbsp;&nbsp;const b = await fetchB(a)</code><br><code>&nbsp;&nbsp;console.log(a, b)</code><br><code>}</code><br><br>可以看到 <code>*</code> → <code>async</code>，<code>yield</code> → <code>await</code>，结构和语义一一对应。<br><br><span class="kw">底层机制</span>：<br>· Generator 可以暂停执行（yield），下次再恢复（next()）<br>· co 库就是 Generator 的自动执行器——每次 yield 返回 Promise，co 等待 Promise 完成后再调用 next() 恢复执行<br>· async/await 内置了这个自动执行器，不需要外部库<br><br><span class="kw">面试回答框架</span>：async/await 就是 Generator + Promise + 自动执行器的语法糖 → 对比 yield 和 await → 历史上是 co 库实现的 → ES2017 标准化内置。',
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

/* ─── 状态图 ─── */
.state-diagram { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
.state-item { display: flex; align-items: center; gap: 8px; }
.state-name { font-weight: 700; font-size: 0.9rem; padding: 4px 12px; border-radius: 6px; }
.state-pending { background: #f39c1222; color: #f39c12; }
.state-fulfilled { background: #42b88322; color: #42b883; }
.state-rejected { background: #e74c3c22; color: #e74c3c; }
.state-arrow { color: var(--color-text); opacity: 0.4; font-size: 1.1rem; }
.state-desc { font-size: 0.8rem; color: var(--color-text); opacity: 0.6; }

/* ─── 方法列表 ─── */
.method-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.method-item { background: var(--color-background); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.6rem 1rem; font-size: 0.88rem; line-height: 1.6; }
.method-item code { font-weight: 700; color: var(--color-heading); margin-right: 6px; }
.method-item span { color: var(--color-text); opacity: 0.8; }

/* ─── 规则列表 ─── */
.rule-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.rule-item { display: flex; align-items: baseline; gap: 8px; background: var(--color-background); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.6rem 1rem; font-size: 0.88rem; }
.rule-item span { color: var(--color-text); opacity: 0.8; }
.rule-tag { flex-shrink: 0; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.rv { background: #42b88322; color: #42b883; }
.ra { background: #8b5cf622; color: #8b5cf6; }
.rt { background: #e74c3c22; color: #e74c3c; }
.rn { background: #88888822; color: #888; }

/* ─── 代码对比 ─── */
.code-compare { display: flex; align-items: stretch; gap: 12px; margin-bottom: 1rem; }
.compare-side { flex: 1; min-width: 0; }
.compare-title { font-size: 0.82rem; font-weight: 700; padding: 6px 12px; border-radius: 6px 6px 0 0; }
.compare-title.bad { background: #e74c3c22; color: #e74c3c; }
.compare-title.good { background: #42b88322; color: #42b883; }
.compare-arrow { display: flex; align-items: center; font-size: 1.5rem; color: var(--color-text); opacity: 0.3; flex-shrink: 0; }
.code-block-sm { background: #1e1e2e; color: #cdd6f4; padding: 0.8rem 1rem; overflow-x: auto; font-size: 0.78rem; line-height: 1.5; margin: 0; border-radius: 0 0 6px 6px; }
.code-block-sm code { font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace; white-space: pre; }

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
@media (max-width: 700px) { .hero h1 { font-size: 1.3rem; } .section-card { padding: 1.2rem; } .code-compare { flex-direction: column; } .compare-arrow { transform: rotate(90deg); justify-content: center; } }
</style>
