<template>
  <span :class="['inline-flex items-center gap-1.5 font-medium', sizeClasses]" :style="badgeStyle">
    <span v-if="dot" :class="['rounded-full flex-shrink-0', dotSize]" :style="{ backgroundColor: dotColor }" />
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md'
  dot?: boolean
}>(), {
  label: 'Badge',
  variant: 'default',
  size: 'md',
  dot: false,
})

const sizeClasses = computed(() => ({
  sm: 'text-xs px-2 py-0.5 rounded-full',
  md: 'text-xs px-2.5 py-1 rounded-full',
}[props.size]))

const dotSize = computed(() => ({
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
}[props.size]))

const variantMap = {
  default: {
    bg: 'var(--color-surface-raised)',
    text: 'var(--color-text-muted)',
    border: 'var(--color-border)',
    dot: 'var(--color-text-subtle)',
  },
  success: {
    bg: 'var(--color-success-subtle)',
    text: 'var(--color-success)',
    border: 'var(--color-success-muted)',
    dot: 'var(--color-success)',
  },
  warning: {
    bg: 'var(--color-warning-subtle)',
    text: 'var(--color-warning)',
    border: 'var(--color-warning-muted)',
    dot: 'var(--color-warning)',
  },
  error: {
    bg: 'var(--color-error-subtle)',
    text: 'var(--color-error)',
    border: 'var(--color-error-muted)',
    dot: 'var(--color-error)',
  },
  info: {
    bg: 'var(--color-info-subtle)',
    text: 'var(--color-info)',
    border: 'var(--color-info-muted)',
    dot: 'var(--color-info)',
  },
  outline: {
    bg: 'transparent',
    text: 'var(--color-text-muted)',
    border: 'var(--color-border-strong)',
    dot: 'var(--color-text-subtle)',
  },
}

const badgeStyle = computed(() => {
  const v = variantMap[props.variant]
  return {
    backgroundColor: v.bg,
    color: v.text,
    border: `1px solid ${v.border}`,
  }
})

const dotColor = computed(() => variantMap[props.variant].dot)
</script>
