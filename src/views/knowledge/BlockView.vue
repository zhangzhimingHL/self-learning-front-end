<template>
  <div class="block-learning">
    <!-- ============ HERO ============ -->
    <header class="hero">
      <h1>块级元素 vs 行内元素 vs 行内块级元素</h1>
      <p class="hero-sub">面试高频考点 · 交互式 Demo · 原理深度解析</p>
    </header>

    <!-- ============ TOC ============ -->
    <nav class="toc">
      <a
        v-for="item in toc"
        :key="item.id"
        :href="`#${item.id}`"
        class="toc-link"
      >{{ item.label }}</a>
    </nav>

    <!-- ============================================================ -->
    <!-- Section 1: 三大类型核心对比 -->
    <!-- ============================================================ -->
    <section id="s1-types" class="section-card">
      <h2 class="s-title">一、三大元素类型核心区别</h2>
      <p class="s-desc">浏览器将 HTML 元素按默认 <code>display</code> 分为三类，这是布局与盒模型差异的根本来源。</p>

      <div class="comparison-grid">
        <div class="comp-card" v-for="t in types" :key="t.name">
          <div class="comp-label" :style="{ background: t.color }">{{ t.name }}</div>
          <div class="comp-demo" :style="{ display: t.display, width: '140px', height: '50px', background: t.color + '33', border: '2px solid ' + t.color, borderRadius: '6px', padding: '4px 8px' }">
            {{ t.display === 'inline' ? '宽度/高度无效' : '宽高可设' }}
          </div>
          <div class="comp-items">
            <span v-for="el in t.elements" :key="el">{{ el }}</span>
          </div>
          <table class="comp-table">
            <tr><td>独占一行</td><td>{{ t.blockLine ? '✅' : '❌' }}</td></tr>
            <tr><td>width/height</td><td>{{ t.wh ? '✅ 生效' : '❌ 无效' }}</td></tr>
            <tr><td>margin padding</td><td>{{ t.mp }}</td></tr>
          </table>
        </div>
      </div>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：直接问"块级、行内、行内块级三者的区别"是基础题，进阶会问"行内元素设置 margin-top 为什么无效"或"如何让行内元素支持宽高"（答：<code>display: block | inline-block</code>）
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 2: display 属性切换实战 -->
    <!-- ============================================================ -->
    <section id="s2-switch" class="section-card">
      <h2 class="s-title">二、display 属性切换实战</h2>
      <p class="s-desc">点击按钮动态切换元素的 <code>display</code> 值，直观感受三种模式的差异。</p>

      <div class="controls">
        <button
          v-for="mode in displayModes"
          :key="mode.value"
          class="ctrl-btn"
          :class="{ active: displayMode === mode.value }"
          @click="displayMode = mode.value"
        >{{ mode.label }}</button>
      </div>

      <div class="demo-area">
        <div class="demo-box" :class="displayMode === 'none' ? 'd-none' : ''">
          <div class="live-item" :style="{ display: displayMode }">
            display: <strong>{{ displayMode }}</strong>
          </div>
          <span class="neighbor">相邻元素 A</span>
          <span class="neighbor">相邻元素 B</span>
        </div>
      </div>

      <pre class="code-block"><code v-text="switchCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：<code>display: none</code> 会让元素<strong>脱离文档流</strong>，不占空间；<code>visibility: hidden</code> 只是不可见但占位。考题："用 JS 判断元素是否隐藏"——<code>offsetParent === null</code> 可判定 <code>display: none</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 3: 盒模型行为差异 -->
    <!-- ============================================================ -->
    <section id="s3-box" class="section-card">
      <h2 class="s-title">三、盒模型行为差异</h2>
      <p class="s-desc">块级元素与行内元素在 margin / padding / width / height 上的关键差异，是面试手写布局题的底层基础。</p>

      <div class="demo-area row">
        <div class="demo-half">
          <div class="demo-label">块级元素（block）</div>
          <div class="box-demo block-demo">
            <div class="box-child">width/height ✅</div>
          </div>
          <p class="box-note">上下左右 margin 全部生效，撑开父容器</p>
        </div>
        <div class="demo-half">
          <div class="demo-label">行内元素（inline）</div>
          <div class="box-demo inline-demo">
            <span class="box-child-inline">宽高 ❌</span>
            <span class="box-child-inline">上下 margin ❌</span>
          </div>
          <p class="box-note">左右 margin 生效，上下 margin <strong>不生效</strong>，宽高<strong>无效</strong></p>
        </div>
      </div>

      <pre class="code-block"><code v-text="boxModelCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：问"inline 元素设置 margin-top 为什么没效果？"——答：行内元素垂直方向的 margin 不影响布局流，只影响自身渲染位置。解决方案：改为 <code>inline-block</code> 或 <code>block</code>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 4: 行内元素空白间隙 -->
    <!-- ============================================================ -->
    <section id="s4-gap" class="section-card">
      <h2 class="s-title">四、行内元素空白间隙问题</h2>
      <p class="s-desc">
        <code>display: inline-block</code> 元素之间的换行符会被渲染为 <code>#text " "</code> 节点，
        其宽度由 <code>font-size</code> 决定。但 <strong>Vue 模板编译器</strong>默认会移除元素间的空白文本节点，
        因此下方用 <code>v-html</code> 注入原始 HTML 来演示真实效果。
      </p>

      <div class="controls" style="margin-bottom: 12px;">
        <button class="ctrl-btn" :class="{ active: !gapFixed }" @click="gapFixed = false">
          ❌ 有间隙（font-size: 28px）
        </button>
        <button class="ctrl-btn" :class="{ active: gapFixed }" @click="gapFixed = true">
          ✅ 无间隙（font-size: 0）
        </button>
      </div>

      <div class="demo-area" style="padding: 16px;">
        <p style="font-size:0.82rem; opacity:0.6; margin-bottom:8px;">容器背景为条纹图案，间隙处会透出条纹</p>
        <div class="gap-row">
          <!-- 两个版本同时展示，一目了然 -->
          <div class="gap-col">
            <div class="gap-col-label">有间隙（inline-block）</div>
            <div class="gap-demo" v-html="gapHtml"></div>
          </div>
          <div class="gap-col">
            <div class="gap-col-label">无间隙（font-size: 0）</div>
            <div class="gap-demo gap-fixed" v-html="gapHtml"></div>
          </div>
        </div>
      </div>

      <pre class="code-block"><code>&lt;!-- 原始 HTML 中，inline-block 元素间的换行会产生产生间隙 --&gt;
&lt;div class="box" style="font-size: 28px"&gt;
  &lt;span style="display: inline-block;"&gt;Item 1&lt;/span&gt;
  &lt;span style="display: inline-block;"&gt;Item 2&lt;/span&gt;
  &lt;span style="display: inline-block;"&gt;Item 3&lt;/span&gt;
  &lt;span style="display: inline-block;"&gt;Item 4&lt;/span&gt;
&lt;/div&gt;

/* ✅ 解决方案：父元素 font-size: 0（子元素重设字号） */
.box { font-size: 0; }
.box span { font-size: 1rem; }</code></pre>

      <details class="gap-detail">
        <summary>🔍 Vue 中为什么看不到这个间隙？</summary>
        <p>Vue 3 模板编译器默认 <code>whitespace: 'condense'</code>，会<strong>自动删除元素间只包含空白符的文本节点</strong>。这是 Vue 的优化行为，与 CSS 规范无关。在 <code>.html</code> 文件中直接编写或用 <code>v-html</code> 注入时，空白字符被保留，间隙就会出现。</p>
      </details>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：消除间隙的 4 种方案——① 父元素 <code>font-size: 0</code>（子元素重新设置字号）；② 使用 <code>flex</code> 布局；③ 删除 HTML 中的换行；④ 使用 <code>float</code>。其中 <code>flex</code> 是最推荐的现代方案。
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 5: margin 塌陷与合并 -->
    <!-- ============================================================ -->
    <section id="s5-collapse" class="section-card">
      <h2 class="s-title">五、margin 塌陷与合并</h2>
      <p class="s-desc">
        块级元素的<strong>垂直 margin</strong> 会发生合并（取较大值），父子 margin-top 会传递到父元素。
        这是 CSS 规范行为，面试常考"如何解决"。
      </p>

      <h3 class="s-subtitle">① 兄弟 margin 合并</h3>
      <div class="demo-area">
        <div class="collapse-demo" style="padding:12px;">
          <div class="c-box-a" style="margin-bottom:30px;">div A<br>margin-bottom: 30px</div>
          <div class="c-box-b" style="margin-top:20px;">div B<br>margin-top: 20px</div>
        </div>
        <p class="box-note">
          实际间距 = <strong>30px</strong>（取 max(30,20)），<s>不是 30+20=50px</s>
          —— 垂直方向相邻 margin 会合并，取较大值
        </p>
      </div>

      <h3 class="s-subtitle">② 父子 margin-top 传递</h3>
      <div class="demo-area">
        <div class="collapse-row">
          <div class="collapse-col">
            <div class="collapse-label">无 BFC ❌ margin 传递</div>
            <div class="collapse-demo" style="padding:0;">
              <div class="c-ref-line">↑ 参照物</div>
              <div class="c-parent-no-bfc">
                <div class="c-child" style="margin-top: 30px;">子 margin-top: 30px</div>
              </div>
              <p class="box-note" style="padding: 3px 8px;">子 margin 穿透 → <strong>父元素被推下</strong>，子元素与父顶边紧贴</p>
            </div>
          </div>
          <div class="collapse-col">
            <div class="collapse-label">有 BFC ✅ margin 未传递</div>
            <div class="collapse-demo" style="padding:0;">
              <div class="c-ref-line">↑ 参照物</div>
              <div class="c-parent-bfc">
                <div class="c-child" style="margin-top: 30px;">子 margin-top: 30px</div>
              </div>
              <p class="box-note" style="padding: 3px 8px;"><code>overflow: hidden</code> 触发 BFC → 子 margin <strong>在父内部生效</strong>，有 30px 间距</p>
            </div>
          </div>
        </div>
      </div>

      <pre class="code-block"><code v-text="marginCollapseCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：解决 margin 塌陷的 3 种方案——① 父元素 <code>overflow: hidden</code>（触发 BFC）；② 父元素加 <code>border</code> 或 <code>padding</code>；③ <code>display: flow-root</code>（现代方案）。注意：只有<strong>垂直</strong>方向 margin 合并，水平方向不会
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 6: BFC 块级格式化上下文 -->
    <!-- ============================================================ -->
    <section id="s6-bfc" class="section-card">
      <h2 class="s-title">六、BFC（块级格式化上下文）</h2>
      <p class="s-desc">BFC 是 CSS 中一个<strong>独立的渲染区域</strong>，内部元素不会影响外部。它是解决 margin 塌陷、清除浮动、阻止元素被浮动覆盖的核心机制。</p>

      <details class="bfc-trigger">
        <summary>⚡ 点击查看 BFC 触发条件（面试必背）</summary>
        <ul>
          <li><code>overflow: hidden / auto / scroll</code>（非 visible）</li>
          <li><code>display: flow-root</code>（最干净的触发方式）</li>
          <li><code>display: flex / inline-flex / grid / inline-grid</code></li>
          <li><code>position: absolute / fixed</code></li>
          <li><code>float</code> 不为 none</li>
        </ul>
      </details>

      <div class="demo-area">
        <div class="demo-label">BFC 清除浮动演示</div>
        <div class="bfc-row">
          <div class="bfc-card">
            <div class="bfc-label">无 BFC ❌</div>
            <div class="bfc-container">
              <div class="bfc-float">浮动</div>
              <div class="bfc-text">容器未触发 BFC，高度塌陷</div>
            </div>
          </div>
          <div class="bfc-card">
            <div class="bfc-label">有 BFC ✅</div>
            <div class="bfc-container" style="overflow: hidden;">
              <div class="bfc-float">浮动</div>
              <div class="bfc-text">容器触发 BFC，包裹浮动</div>
            </div>
          </div>
        </div>
      </div>

      <pre class="code-block"><code v-text="bfcCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：BFC 的三大应用——① <strong>清除浮动</strong>（容器包裹浮动子元素）；② <strong>防止 margin 传递</strong>（父子 margin 不溢出）；③ <strong>两栏自适应</strong>（BFC 元素不与浮动元素重叠）。推荐使用 <code>display: flow-root</code>，无副作用
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Section 7: display:none vs visibility vs opacity -->
    <!-- ============================================================ -->
    <section id="s7-vis" class="section-card">
      <h2 class="s-title">七、display:none / visibility:hidden / opacity:0 对比</h2>
      <p class="s-desc">三者都能"隐藏"元素，但对布局、事件、过渡动画的影响截然不同，是面试必考选择题。</p>

      <div class="controls">
        <button class="ctrl-btn" :class="{ active: visDemo === 'all' }" @click="visDemo = 'all'">全部显示</button>
        <button class="ctrl-btn" :class="{ active: visDemo === 'demo' }" @click="visDemo = 'demo'">执行隐藏</button>
      </div>

      <div class="vis-grid">
        <div class="vis-card" :class="{ 'vis-hidden': visDemo !== 'all' }">
          <div class="vis-badge" style="background:#e74c3c">display: none</div>
          <div class="vis-box display-none-box" v-show="visDemo === 'all'">内容</div>
          <div class="vis-status">不占空间 ❌</div>
          <div class="vis-status">不可交互 ❌</div>
          <div class="vis-status">无过渡动画 ❌</div>
        </div>
        <div class="vis-card">
          <div class="vis-badge" style="background:#f39c12">visibility: hidden</div>
          <div class="vis-box" :style="{ visibility: visDemo === 'all' ? 'visible' : 'hidden' }">内容</div>
          <div class="vis-status">占位空间 ✅</div>
          <div class="vis-status">不可交互 ❌</div>
          <div class="vis-status">无过渡动画 ❌</div>
        </div>
        <div class="vis-card">
          <div class="vis-badge" style="background:#3498db">opacity: 0</div>
          <div class="vis-box" :style="{ opacity: visDemo === 'all' ? 1 : 0 }">内容</div>
          <div class="vis-status">占位空间 ✅</div>
          <div class="vis-status">可交互 ✅</div>
          <div class="vis-status">有过渡动画 ✅</div>
        </div>
      </div>

      <pre class="code-block"><code v-text="visCode"></code></pre>

      <div class="s-tip">
        💡 <strong>面试高频</strong>：创建一个"淡出后不可点击"的动画——只能用 <code>opacity</code> 做过渡，结束后用 <code>pointer-events: none</code> 禁止交互。纯 <code>display</code> / <code>visibility</code> 无法实现平滑动画
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
          v-for="(item, idx) in blockQuestions"
          :key="idx"
          class="qa-item"
          :class="{ 'qa-open': blockOpenIdx === idx }"
        >
          <button class="qa-question" @click="blockOpenIdx = blockOpenIdx === idx ? -1 : idx">
            <span class="qa-level" :class="'qa-lv' + item.level">{{ '⭐'.repeat(item.level) }}</span>
            <span class="qa-text">{{ item.q }}</span>
            <span class="qa-arrow">{{ blockOpenIdx === idx ? '▾' : '▸' }}</span>
          </button>
          <div class="qa-answer" v-if="blockOpenIdx === idx">
            <div class="qa-answer-inner" v-html="item.a"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- Footer -->
    <!-- ============================================================ -->
    <footer class="page-footer">
      <p>💪 掌握以上知识点，你就能从容应对大部分 CSS 盒模型与布局相关的面试题</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ─── TOC ───
const toc = [
  { id: 's1-types',      label: '三大类型对比' },
  { id: 's2-switch',     label: 'display切换' },
  { id: 's3-box',        label: '盒模型差异' },
  { id: 's4-gap',        label: '空白间隙' },
  { id: 's5-collapse',   label: 'margin塌陷' },
  { id: 's6-bfc',        label: 'BFC' },
  { id: 's7-vis',        label: '隐藏对比' },
  { id: 's8-qa',         label: '面试问答' },
]

// ─── Section 1 types data ───
const types = [
  {
    name: '块级元素 block',
    color: '#e74c3c',
    display: 'block',
    elements: ['div', 'h1~h6', 'p', 'ul', 'ol', 'li', 'section', 'article', 'header', 'footer'],
    blockLine: true,
    wh: true,
    mp: '全部方向生效',
  },
  {
    name: '行内元素 inline',
    color: '#3498db',
    display: 'inline',
    elements: ['a', 'span', 'strong', 'em', 'label', 'i', 'b', 'code'],
    blockLine: false,
    wh: false,
    mp: '左右生效，上下无效',
  },
  {
    name: '行内块级 inline-block',
    color: '#42b883',
    display: 'inline-block',
    elements: ['img', 'input', 'button', 'select', 'textarea'],
    blockLine: false,
    wh: true,
    mp: '全部方向生效',
  },
]

// ─── Section 2: display switch ───
const displayMode = ref('block')
const displayModes = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'none', value: 'none' },
]
const switchCode = `<div style="display: block | inline | inline-block | none">
  当前 display 值
</div>
<span>相邻元素</span>`

// ─── Section 4: gap ───
const gapFixed = ref(false)
// 注意！v-html 注入的内容中，<span> 之间的换行会被保留为 #text " " 节点
const gapHtml = `  <span class="gap-item">Item 1</span>
  <span class="gap-item">Item 2</span>
  <span class="gap-item">Item 3</span>
  <span class="gap-item">Item 4</span>`

// ─── Section 7: visibility demo ───
const visDemo = ref('all')
const visCode = `.hidden {
  display: none;        /* 不占位，不可交互，无动画 */
}
.hidden {
  visibility: hidden;   /* 占位，不可交互，无动画 */
}
.hidden {
  opacity: 0;           /* 占位，可交互，有动画 */
}`

// ─── Code snippets for static sections ───
const boxModelCode = `/* 块级元素：宽高 margin padding 全部生效 */
.block { display: block; width: 200px; margin: 20px; }

/* 行内元素：宽高无效，上下 margin 无效 */
.inline { display: inline; width: 200px; /* ❌ 无效 */ margin-top: 20px; /* ❌ 无效 */ }`

const marginCollapseCode = `/* 兄弟 margin 合并：取较大值 */
.box-a { margin-bottom: 30px; }
.box-b { margin-top: 20px; }
/* 实际间距 = 30px，不是 50px */

/* 父子 margin 传递：子 margin-top 溢出到父 */
.parent { /* 无 BFC 时，子 margin 会穿透 */ }
.child { margin-top: 30px; /* 父元素跟着下移 */ }

/* 解决：触发父元素 BFC */
.parent { overflow: hidden; }`

const bfcCode = `/* ❌ 无 BFC：容器无法包裹浮动子元素 */
.container { background: #f0f0f0; }
.float { float: left; width: 100px; height: 100px; }

/* ✅ 有 BFC：容器包裹浮动元素 */
.container { overflow: hidden; /* 触发 BFC */ display: flow-root; /* 现代方案 */ }`

// ─── Section 8: Interview Q&A ───
const blockOpenIdx = ref(-1)
const blockQuestions = [
  { level: 1, q: '块级元素和行内元素的核心区别是什么？',
    a: '<strong>块级元素</strong>：独占一行，width/height 生效，margin/padding 全部方向生效。<br><strong>行内元素</strong>：不独占一行，width/height 无效，垂直方向 margin 无效。<br><br>转换方式：<code>display: block | inline | inline-block</code>' },
  { level: 1, q: '列举常用的块级元素和行内元素。',
    a: '<strong>块级</strong>：<code>div, h1~h6, p, ul, ol, li, section, article, header, footer, nav, aside, main</code><br><strong>行内</strong>：<code>span, a, strong, em, label, i, b, code, small</code><br><strong>行内块</strong>：<code>img, input, button, select, textarea</code>' },
  { level: 2, q: '行内元素设置 margin-top 为什么没效果？如何解决？',
    a: 'CSS 规范规定：行内元素的<strong>垂直 margin</strong> 不影响布局流，只影响自身渲染位置。左右 margin 正常生效。<br><br><strong>解决方案</strong>：<br>① <code>display: block</code> — 转成块级<br>② <code>display: inline-block</code> — 不独占一行但 margin 全部生效' },
  { level: 2, q: 'inline-block 和 block 有什么区别？',
    a: '<strong>inline-block</strong>：元素不独占一行，可以设置 width/height，margin/padding 全部方向生效，多个 inline-block 会在同一行排列。<br><br><strong>block</strong>：元素独占一行，width 默认 100%，可以设置 width/height。<br><br>共同点：都可以设置宽高。不同点：inline-block 不换行。' },
  { level: 2, q: '多个 inline-block 元素之间的间隙是怎么产生的？如何消除？',
    a: '<strong>原因</strong>：HTML 中元素之间的换行和缩进被渲染为一个空白字符（U+0020），其宽度取决于 font-size，默认约 4px。<br><br><strong>4 种消除方案</strong>：<br>① 父元素 <code>font-size: 0</code>（子元素重设字号）<br>② 使用 <code>flex</code> 布局（推荐）<br>③ 删除 HTML 中的换行标签之间的空白<br>④ 使用 <code>float</code> 浮动' },
  { level: 2, q: 'display: none、visibility: hidden、opacity: 0 三者的区别？',
    a: '<table style="font-size:0.85rem;border-collapse:collapse;width:100%;margin-top:6px;"><tr><th style="border:1px solid #ccc;padding:6px;text-align:left">特性</th><th style="border:1px solid #ccc;padding:6px;text-align:left">display:none</th><th style="border:1px solid #ccc;padding:6px;text-align:left">visibility:hidden</th><th style="border:1px solid #ccc;padding:6px;text-align:left">opacity:0</th></tr><tr><td style="border:1px solid #ccc;padding:6px">占位空间</td><td style="border:1px solid #ccc;padding:6px">❌ 不占</td><td style="border:1px solid #ccc;padding:6px">✅ 占位</td><td style="border:1px solid #ccc;padding:6px">✅ 占位</td></tr><tr><td style="border:1px solid #ccc;padding:6px">可交互</td><td style="border:1px solid #ccc;padding:6px">❌ 不可</td><td style="border:1px solid #ccc;padding:6px">❌ 不可</td><td style="border:1px solid #ccc;padding:6px">✅ 可</td></tr><tr><td style="border:1px solid #ccc;padding:6px">过渡动画</td><td style="border:1px solid #ccc;padding:6px">❌ 无</td><td style="border:1px solid #ccc;padding:6px">❌ 无</td><td style="border:1px solid #ccc;padding:6px">✅ 有</td></tr></table>' },
  { level: 3, q: '什么是 margin 塌陷？发生在什么条件下？如何解决？',
    a: '<strong>定义</strong>：块级元素的<strong>垂直 margin</strong> 相遇时不会相加，而是取较大值合并。<br><br><strong>两种场景</strong>：<br>① <strong>兄弟合并</strong>：div A (margin-bottom:30px) + div B (margin-top:20px) → 实际间距 30px，不是 50px<br>② <strong>父子传递</strong>：子元素 margin-top 穿透父元素，整个父元素被推下<br><br><strong>触发条件</strong>：垂直方向、块级元素、无 border/padding/BFC 阻隔<br><br><strong>解决方案</strong>：<br>① 父元素 <code>overflow: hidden</code>（触发 BFC）<br>② 父元素加 <code>border</code> 或 <code>padding</code><br>③ <code>display: flow-root</code>（现代方案，无副作用）' },
  { level: 3, q: '什么是 BFC？怎么触发？有什么应用？',
    a: '<strong>BFC（块级格式化上下文）</strong>是 CSS 中的独立渲染区域，内部元素不影响外部，外部元素不影响内部。<br><br><strong>触发条件</strong>：<br>① <code>overflow: hidden / auto / scroll</code>（非 visible）<br>② <code>display: flow-root</code>（最干净的触发方式）<br>③ <code>display: flex / grid / inline-flex</code><br>④ <code>position: absolute / fixed</code><br>⑤ <code>float</code> 不为 none<br><br><strong>三大应用</strong>：<br>① <strong>清除浮动</strong>：容器包裹浮动子元素<br>② <strong>防止 margin 传递</strong>：父子 margin 不溢出<br>③ <strong>两栏自适应</strong>：BFC 元素不与浮动元素重叠' },
  { level: 3, q: '如何让一个行内元素支持宽高？',
    a: '行内元素默认不支持设置 width/height，但有以下方案：<br><br>① <code>display: inline-block</code> — 不换行，支持宽高，推荐<br>② <code>display: block</code> — 换行，支持宽高<br>③ <code>display: flex</code> — 父元素设为 flex，子元素自动成为 flex item 支持宽高<br><br>最常用的是 <code>display: inline-block</code>，常用于 <code>&lt;a&gt;</code> 标签制作按钮、<code>&lt;span&gt;</code> 制作卡片等场景。' },
]
</script>

<style scoped>
/* ============================================
   Block Learning Page Styles
   ============================================ */
.block-learning {
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
.s-desc code,
.s-tip code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

/* ─── Comparison Grid (Section 1) ─── */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}
.comp-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
}
.comp-label {
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 8px 12px;
}
.comp-demo {
  margin: 12px auto 6px;
}
.comp-items {
  padding: 8px 12px;
  font-size: 0.78rem;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.comp-items span {
  background: var(--color-background-mute);
  padding: 1px 6px;
  border-radius: 3px;
  color: var(--color-text);
}
.comp-table {
  width: 100%;
  font-size: 0.82rem;
  border-collapse: collapse;
}
.comp-table td {
  padding: 5px 12px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text);
}
.comp-table td:last-child {
  text-align: right;
  font-weight: 500;
}

/* ─── Controls ─── */
.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.ctrl-btn {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
.ctrl-btn:hover {
  border-color: var(--color-heading);
  color: var(--color-heading);
}
.ctrl-btn.active {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border-color: hsla(160, 100%, 37%, 1);
}

/* ─── Demo Area ─── */
.demo-area {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  min-height: 80px;
}
.demo-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}
.demo-area.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.demo-half {
  min-width: 0;
}
.box-note {
  font-size: 0.82rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-top: 0.5rem;
  line-height: 1.5;
}

/* ─── Section 2: Display switch ─── */
.demo-box {
  padding: 0.5rem;
  background: var(--color-background-mute);
  border-radius: 6px;
}
.demo-box.d-none .live-item {
  display: none;
}
.live-item {
  background: #42b883;
  color: #fff;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 8px;
  transition: all 0.3s;
}
.neighbor {
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.82rem;
  display: inline-block;
  margin: 2px;
}

/* ─── Section 3: Box model ─── */
.box-demo {
  padding: 12px;
  background: var(--color-background-soft);
  border-radius: 6px;
}
.block-demo {
  border: 1px dashed #e74c3c;
}
.inline-demo {
  border: 1px dashed #3498db;
}
.box-child,
.box-child-inline {
  background: #42b88333;
  border: 2px solid #42b883;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.85rem;
}
.box-child {
  display: block;
  margin: 12px 0;
}
.box-child-inline {
  display: inline;
  margin: 20px 0;
}

/* ─── Section 4: Gap ─── */
.gap-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.gap-col {
  flex: 1;
  min-width: 240px;
}
.gap-col-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 6px;
}
.gap-demo {
  background: repeating-linear-gradient(
    45deg,
    #ffd5d5 0px,
    #ffd5d5 10px,
    #fff5f5 10px,
    #fff5f5 20px
  );
  padding: 20px 16px;
  border-radius: 8px;
  border: 2px solid #e74c3c44;
  font-size: 28px;
}
.gap-fixed {
  font-size: 0;
  background: repeating-linear-gradient(
    45deg,
    #d5ffe0 0px,
    #d5ffe0 10px,
    #f0fff4 10px,
    #f0fff4 20px
  );
  border-color: #42b88344;
}
.gap-demo :deep(.gap-item) {
  display: inline-block;
  background: #2c3e50;
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
}
.gap-analysis {
  margin-top: 12px;
  padding: 10px 14px;
  background: var(--color-background);
  border-radius: 6px;
  font-size: 0.88rem;
  line-height: 1.6;
}
.gap-stat {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.gap-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
}
.gap-detail {
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 0.88rem;
}
.gap-detail summary {
  font-weight: 600;
  color: var(--color-heading);
  cursor: pointer;
  padding: 6px 0;
}
.gap-detail p {
  margin-top: 6px;
  padding: 10px 14px;
  background: var(--color-background);
  border-radius: 6px;
  line-height: 1.6;
  opacity: 0.85;
}
.gap-detail code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
}

/* ─── Section 5: Margin collapse ─── */
.s-subtitle {
  font-size: 1.05rem;
  color: var(--color-heading);
  margin: 1.2rem 0 0.6rem;
}
.collapse-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.collapse-col {
  flex: 1;
  min-width: 220px;
}
.collapse-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 6px;
}
.collapse-demo {
  background: var(--color-background-mute);
  border-radius: 6px;
  padding: 8px;
  position: relative;
}
.c-box-a {
  background: #e74c3c33;
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.82rem;
  text-align: center;
}
.c-box-b {
  background: #3498db33;
  border: 1px solid #3498db;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.82rem;
  text-align: center;
}
.c-ref-line {
  font-size: 0.75rem;
  padding: 6px 10px;
  background: var(--color-background);
  border-left: 3px solid #f39c12;
  border-radius: 3px;
  margin-bottom: 6px;
  color: var(--color-text);
}
.c-parent-no-bfc {
  background: rgba(231, 76, 60, 0.08);
  border-radius: 4px;
  margin: 0;
}
.c-parent-bfc {
  background: rgba(66, 184, 131, 0.08);
  border-radius: 4px;
  margin: 0;
  overflow: hidden;
}
.c-child {
  background: #42b883;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.82rem;
  text-align: center;
}

/* ─── Section 6: BFC ─── */
.bfc-trigger {
  margin-bottom: 1rem;
  cursor: pointer;
}
.bfc-trigger summary {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading);
  cursor: pointer;
  padding: 8px 0;
}
.bfc-trigger ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.8;
}
.bfc-trigger code {
  background: color-mix(in srgb, var(--color-border) 40%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
}
.bfc-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.bfc-card {
  flex: 1;
  min-width: 200px;
}
.bfc-label {
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}
.bfc-container {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 6px;
}
.bfc-float {
  float: left;
  width: 60px;
  height: 60px;
  background: #e74c3c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border-radius: 4px;
  margin-right: 8px;
}
.bfc-text {
  font-size: 0.82rem;
  padding: 4px 0;
}

/* ─── Section 7: Visibility comparison ─── */
.vis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
.vis-card {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  transition: all 0.3s;
}
.vis-card.vis-hidden .display-none-box {
  display: none;
}
.vis-badge {
  color: #fff;
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 600;
}
.vis-box {
  background: #f0f0f0;
  border: 2px dashed var(--color-border);
  border-radius: 6px;
  padding: 20px 8px;
  margin-bottom: 8px;
  font-size: 0.85rem;
  transition: all 0.3s;
}
.vis-status {
  font-size: 0.78rem;
  color: var(--color-text);
  opacity: 0.7;
  padding: 2px 0;
}

/* ─── Code Block ─── */
.code-block {
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  overflow-x: auto;
  font-size: 0.82rem;
  line-height: 1.6;
  margin: 0 0 1rem;
  tab-size: 2;
}
.code-block code {
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  white-space: pre;
}

/* ─── Tip ─── */
.s-tip {
  background: color-mix(in srgb, hsla(160, 100%, 37%, 1) 10%, transparent);
  border-left: 3px solid hsla(160, 100%, 37%, 1);
  padding: 0.8rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--color-text);
}

/* ─── Footer ─── */
.page-footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.9rem;
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
  .comparison-grid { grid-template-columns: 1fr; }
  .demo-area.row { grid-template-columns: 1fr; }
  .vis-grid { grid-template-columns: 1fr; }
  .bfc-row { flex-direction: column; }
}
</style>
