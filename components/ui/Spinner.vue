<template>
  <div
    role="status"
    :aria-label="label || 'Loading'"
    class="inline-flex flex-col items-center gap-2"
  >
    <svg
      :class="['animate-spin', sizeClass]"
      :style="{ color: spinnerColor }"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <span v-if="showLabel && label" class="text-sm" :style="{ color: spinnerColor }">
      {{ label }}
    </span>

    <!-- Visually hidden label for screen readers when label not shown -->
    <span v-else-if="label" class="sr-only">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'muted' | 'white'
  label?: string
  showLabel?: boolean
}>(), {
  size: 'md',
  variant: 'primary',
  label: 'Loading…',
  showLabel: false,
})

const sizeClass = computed(() => ({
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}[props.size]))

const spinnerColor = computed(() => ({
  primary: 'var(--color-primary)',
  muted: 'var(--color-text-muted)',
  white: '#ffffff',
}[props.variant]))
</script>
