<template>
  <div
    role="alert"
    :aria-live="variant === 'error' ? 'assertive' : 'polite'"
    class="flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-token-lg max-w-sm w-full"
    :style="{
      backgroundColor: 'var(--color-surface)',
      border: `1px solid ${borderColor}`,
      boxShadow: 'var(--shadow-lg)',
    }"
  >
    <!-- Icon -->
    <div
      class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
      :style="{ backgroundColor: iconBg, color: iconColor }"
    >
      <svg v-if="variant === 'success'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <svg v-else-if="variant === 'error'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <svg v-else-if="variant === 'warning'" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p v-if="title" class="text-sm font-semibold mb-0.5" style="color: var(--color-text)">{{ title }}</p>
      <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ message }}</p>
    </div>

    <!-- Close -->
    <button
      type="button"
      class="flex-shrink-0 p-0.5 rounded transition-colors"
      style="color: var(--color-text-subtle)"
      aria-label="Dismiss notification"
      @click="$emit('dismiss')"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ToastVariant } from '~/composables/useToast'

const props = withDefaults(defineProps<{
  title?: string
  message: string
  variant?: ToastVariant
}>(), {
  variant: 'info',
})

defineEmits<{ dismiss: [] }>()

const colorMap: Record<ToastVariant, { border: string; iconBg: string; iconColor: string }> = {
  success: { border: 'var(--color-success-muted)', iconBg: 'var(--color-success-subtle)', iconColor: 'var(--color-success)' },
  error:   { border: 'var(--color-error-muted)',   iconBg: 'var(--color-error-subtle)',   iconColor: 'var(--color-error)' },
  warning: { border: 'var(--color-warning-muted)', iconBg: 'var(--color-warning-subtle)', iconColor: 'var(--color-warning)' },
  info:    { border: 'var(--color-info-muted)',    iconBg: 'var(--color-info-subtle)',    iconColor: 'var(--color-info)' },
}

const borderColor = computed(() => colorMap[props.variant].border)
const iconBg      = computed(() => colorMap[props.variant].iconBg)
const iconColor   = computed(() => colorMap[props.variant].iconColor)
</script>
