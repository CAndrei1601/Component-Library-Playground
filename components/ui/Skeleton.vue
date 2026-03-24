<template>
  <div
    role="status"
    :aria-label="ariaLabel"
    :style="{
      width: width,
      height: computedHeight,
      borderRadius: computedRadius,
      display: 'block',
    }"
    class="skeleton-shimmer"
  >
    <span class="sr-only">{{ ariaLabel }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string
  height?: string
  variant?: 'text' | 'circle' | 'rect' | 'button'
  ariaLabel?: string
}>(), {
  width: '100%',
  height: '1rem',
  variant: 'rect',
  ariaLabel: 'Loading…',
})

const computedHeight = computed(() => {
  if (props.variant === 'text') return props.height || '0.875rem'
  if (props.variant === 'circle') return props.width || '2.5rem'
  if (props.variant === 'button') return '2.25rem'
  return props.height
})

const computedRadius = computed(() => {
  if (props.variant === 'circle') return 'var(--radius-full)'
  if (props.variant === 'text') return 'var(--radius-sm)'
  if (props.variant === 'button') return 'var(--radius-lg)'
  return 'var(--radius-md)'
})
</script>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-surface-raised) 25%,
    var(--color-border) 50%,
    var(--color-surface-raised) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer {
    animation: none;
    background: var(--color-surface-raised);
  }
}
</style>
