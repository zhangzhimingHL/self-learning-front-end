<template>
  <div class="js-page">
    <header class="hero">
      <h1>Generator / Iterator / 模块化</h1>
      <p class="hero-sub">面试必考 · <span class="kw">可迭代协议</span> · <span class="kw">Generator</span> · <span class="kw">ESM vs CJS</span></p>
    </header>

    <nav class="toc">
      <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" class="toc-link">{{ item.label }}</a>
    </nav>

    <section id="s1-iterator" class="section-card">
      <h2 class="s-title">一、Iterator 可迭代协议 <span class="s-badge">进阶</span></h2>
      <p class="s-desc">建设中，敬请期待...</p>
    </section>

    <section id="s2-generator" class="section-card">
      <h2 class="s-title">二、Generator 与自动执行器 <span class="s-badge">字节/阿里进阶</span></h2>
      <p class="s-desc">建设中，敬请期待...</p>
    </section>

    <section id="s3-module" class="section-card">
      <h2 class="s-title">三、ES Module vs CommonJS <span class="s-badge">腾讯/字节高频</span></h2>
      <p class="s-desc">建设中，敬请期待...</p>
    </section>
  </div>
</template>

<script setup lang="ts">
const toc = [
  { id: 's1-iterator',  label: 'Iterator' },
  { id: 's2-generator', label: 'Generator' },
  { id: 's3-module',    label: '模块化' },
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
.s-desc { font-size: 0.92rem; line-height: 1.6; color: var(--color-text); opacity: 0.8; margin-bottom: 0.8rem; }
</style>
