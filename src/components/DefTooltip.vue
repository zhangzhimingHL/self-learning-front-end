<template>
  <span class="def" @mouseenter="show" @mouseleave="hide">
    <slot />
    <span v-if="visible" class="def-popup" :style="popupStyle">
      <span class="def-arrow" />
      {{ tip }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{ tip: string }>()

const visible = ref(false)
const x = ref(0)
const y = ref(0)

function show(e: MouseEvent) {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  x.value = rect.left + rect.width / 2
  y.value = rect.top - 8
  visible.value = true
}
function hide() {
  visible.value = false
}

const popupStyle = computed(() => ({
  left: x.value + 'px',
  top: y.value + 'px',
}))
</script>

<style scoped>
.def {
  color: hsla(160, 100%, 37%, 1);
  cursor: help;
  border-bottom: 1px dashed hsla(160, 100%, 37%, 0.4);
  font-weight: 600;
  position: relative;
}
.def-popup {
  position: fixed;
  transform: translate(-50%, -100%);
  background: #1c1c30;
  color: #d0d0d0;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #3a3a50;
  max-width: 300px;
  width: max-content;
  white-space: normal;
  text-align: left;
  box-shadow: 0 6px 20px rgba(0,0,0,0.5);
  z-index: 9999;
  pointer-events: none;
}
.def-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #3a3a50;
}
</style>
