<template>
  <div :class="cardClasses" :style="cardStyle">
    <!-- Header slot -->
    <div v-if="title || $slots.header" class="px-5 py-4 border-b border-token">
      <slot name="header">
        <h3 class="font-semibold text-sm" style="color: var(--color-text)">{{ title }}</h3>
      </slot>
    </div>

    <!-- Body -->
    <div class="px-5 py-4">
      <slot>
        <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ description }}</p>
      </slot>
    </div>

    <!-- Footer slot -->
    <div
      v-if="footer || $slots.footer"
      class="px-5 py-3 border-t border-token"
      style="background-color: var(--color-bg-secondary)"
    >
      <slot name="footer">
        <p class="text-xs" style="color: var(--color-text-subtle)">{{ footer }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  footer?: string
  shadow?: boolean
  bordered?: boolean
  hoverable?: boolean
}>(), {
  shadow: true,
  bordered: true,
  hoverable: false,
})

const cardClasses = computed(() => [
  'rounded-xl overflow-hidden transition-all',
  props.hoverable ? 'cursor-pointer' : '',
])

const cardStyle = computed(() => ({
  backgroundColor: 'var(--color-surface)',
  border: props.bordered ? '1px solid var(--color-border)' : 'none',
  boxShadow: props.shadow ? 'var(--shadow-md)' : 'none',
}))
</script>

<style scoped>
div[class*="hoverable"]:hover,
div:has(.cursor-pointer):hover {
  box-shadow: var(--shadow-lg) !important;
  transform: translateY(-1px);
}
</style>
