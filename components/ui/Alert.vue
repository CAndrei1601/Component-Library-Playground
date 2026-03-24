<template>
  <Transition name="fade">
    <div
      v-if="!dismissed"
      role="alert"
      :class="['flex gap-3 p-4 rounded-xl border', sizeClass]"
      :style="alertStyle"
    >
      <!-- Icon -->
      <div v-if="showIcon" class="flex-shrink-0 mt-0.5">
        <component :is="iconComponent" :style="{ color: iconColor }" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-semibold text-sm mb-0.5">{{ title }}</p>
        <p class="text-sm leading-relaxed opacity-90">
          <slot>{{ message }}</slot>
        </p>
      </div>

      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        class="flex-shrink-0 -mt-0.5 -mr-1 p-1 rounded-md transition-colors hover:opacity-70"
        aria-label="Dismiss alert"
        @click="dismissed = true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  message?: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
  showIcon?: boolean
}>(), {
  variant: 'info',
  dismissible: false,
  showIcon: true,
})

const dismissed = ref(false)

// Reset dismissed state when props change (for playground)
watch(() => [props.variant, props.title, props.message], () => {
  dismissed.value = false
})

const sizeClass = ''

const variantMap = {
  info: { bg: 'var(--color-info-subtle)', text: 'var(--color-info)', border: 'var(--color-info-muted)' },
  success: { bg: 'var(--color-success-subtle)', text: 'var(--color-success)', border: 'var(--color-success-muted)' },
  warning: { bg: 'var(--color-warning-subtle)', text: 'var(--color-warning)', border: 'var(--color-warning-muted)' },
  error: { bg: 'var(--color-error-subtle)', text: 'var(--color-error)', border: 'var(--color-error-muted)' },
}

const alertStyle = computed(() => {
  const v = variantMap[props.variant]
  return {
    backgroundColor: v.bg,
    color: v.text,
    borderColor: v.border,
  }
})

const iconColor = computed(() => variantMap[props.variant].text)

const InfoIcon = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: 12, cy: 12, r: 10 }),
    h('line', { x1: 12, y1: 8, x2: 12, y2: 12 }),
    h('line', { x1: 12, y1: 16, x2: 12.01, y2: 16 }),
  ]),
})

const SuccessIcon = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
    h('polyline', { points: '22 4 12 14.01 9 11.01' }),
  ]),
})

const WarningIcon = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
    h('line', { x1: 12, y1: 9, x2: 12, y2: 13 }),
    h('line', { x1: 12, y1: 17, x2: 12.01, y2: 17 }),
  ]),
})

const ErrorIcon = defineComponent({
  render: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: 12, cy: 12, r: 10 }),
    h('line', { x1: 15, y1: 9, x2: 9, y2: 15 }),
    h('line', { x1: 9, y1: 9, x2: 15, y2: 15 }),
  ]),
})

const iconComponent = computed(() => ({
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}[props.variant]))
</script>
