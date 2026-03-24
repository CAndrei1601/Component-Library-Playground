<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none whitespace-nowrap',
      sizeClasses,
      variantClasses,
      fullWidth ? 'w-full' : '',
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :style="focusRingStyle"
  >
    <!-- Spinner (loading state) -->
    <UiSpinner v-if="loading" size="sm" :variant="spinnerVariant" label="" />

    <!-- Slot -->
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  label: 'Button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
})

const sizeClasses = computed(() => ({
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-9 px-4 text-sm rounded-md',
  lg: 'h-11 px-6 text-base rounded-lg',
}[props.size]))

const variantClasses = computed(() => ({
  primary: 'text-white rounded-md',
  secondary: 'rounded-md',
  ghost: 'rounded-md',
  destructive: 'text-white rounded-md',
  outline: 'rounded-md',
}[props.variant]))

const variantStyle = computed(() => ({
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    '--hover-bg': 'var(--color-primary-hover)',
  },
  secondary: {
    backgroundColor: 'var(--color-surface-raised)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    '--hover-bg': 'var(--color-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)',
    '--hover-bg': 'var(--color-surface-raised)',
  },
  destructive: {
    backgroundColor: 'var(--color-error)',
    color: '#ffffff',
    '--hover-bg': '#dc2626',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    '--hover-bg': 'var(--color-primary-subtle)',
  },
}[props.variant]))

const focusRingStyle = computed(() => ({
  ...variantStyle.value,
  '--ring-color': 'var(--color-primary)',
}))

const spinnerVariant = computed(() =>
  props.variant === 'primary' || props.variant === 'destructive' ? 'white' : 'muted',
)
</script>

<style scoped>
button:not(:disabled):hover {
  background-color: var(--hover-bg) !important;
}
button:active:not(:disabled) {
  opacity: 0.9;
  transform: translateY(1px);
}
button:focus-visible {
  ring-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-primary);
}
</style>
