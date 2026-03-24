<template>
  <div class="flex items-center gap-1.5">
    <button
      v-for="t in themes"
      :key="t.value"
      :class="['theme-btn', { active: theme === t.value }]"
      :aria-label="`Switch to ${t.label} theme`"
      @click="setTheme(t.value)"
    >
      <span :style="{ color: t.value === theme ? 'var(--color-primary)' : 'var(--color-text-muted)' }">
        <component :is="t.icon" />
      </span>
      <span>{{ t.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '~/composables/useTheme'

const { theme, setTheme } = useTheme()

const SunIcon = defineComponent({
  render: () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('circle', { cx: 12, cy: 12, r: 5 }),
      h('line', { x1: 12, y1: 1, x2: 12, y2: 3 }),
      h('line', { x1: 12, y1: 21, x2: 12, y2: 23 }),
      h('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
      h('line', { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78 }),
      h('line', { x1: 1, y1: 12, x2: 3, y2: 12 }),
      h('line', { x1: 21, y1: 12, x2: 23, y2: 12 }),
      h('line', { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36 }),
      h('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }),
    ]),
})

const MoonIcon = defineComponent({
  render: () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' }),
    ]),
})

const SparkleIcon = defineComponent({
  render: () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z' }),
    ]),
})

const themes: Array<{ value: Theme; label: string; icon: ReturnType<typeof defineComponent> }> = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'brand', label: 'Brand', icon: SparkleIcon },
]
</script>
