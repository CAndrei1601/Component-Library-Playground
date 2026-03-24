<template>
  <div class="relative inline-flex flex-shrink-0" :style="{ width: sizePx, height: sizePx }">
    <!-- Avatar image or initials -->
    <div
      :class="['overflow-hidden flex items-center justify-center font-semibold select-none w-full h-full', shapeClass]"
      :style="avatarStyle"
    >
      <img
        v-if="src && !imgError"
        :src="src"
        :alt="name"
        class="w-full h-full object-cover"
        @error="imgError = true"
      />
      <span v-else :style="{ fontSize: initialsSize, color: 'var(--color-text-inverse)' }">
        {{ initials }}
      </span>
    </div>

    <!-- Status badge -->
    <span
      v-if="status !== 'none'"
      :class="['absolute bottom-0 right-0 rounded-full border-2', statusSize]"
      :style="{
        backgroundColor: statusColor,
        borderColor: 'var(--color-bg)',
      }"
      :aria-label="`Status: ${status}`"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'none' | 'online' | 'offline' | 'busy' | 'away'
}>(), {
  name: '',
  src: '',
  size: 'md',
  shape: 'circle',
  status: 'none',
})

const imgError = ref(false)

watch(() => props.src, () => { imgError.value = false })

const initials = computed(() => {
  if (!props.name) return '?'
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

const sizePx = computed(() => ({ xs: '24px', sm: '32px', md: '40px', lg: '56px', xl: '72px' }[props.size]))
const initialsSize = computed(() => ({ xs: '10px', sm: '12px', md: '14px', lg: '20px', xl: '24px' }[props.size]))
const statusSize = computed(() => ({ xs: 'w-2 h-2', sm: 'w-2.5 h-2.5', md: 'w-3 h-3', lg: 'w-3.5 h-3.5', xl: 'w-4 h-4' }[props.size]))
const shapeClass = computed(() => props.shape === 'circle' ? 'rounded-full' : 'rounded-lg')

// Deterministic color from name
const avatarStyle = computed(() => {
  const colors = [
    ['#6366f1', '#4f46e5'], // indigo
    ['#8b5cf6', '#7c3aed'], // violet
    ['#ec4899', '#db2777'], // pink
    ['#f59e0b', '#d97706'], // amber
    ['#10b981', '#059669'], // emerald
    ['#3b82f6', '#2563eb'], // blue
    ['#ef4444', '#dc2626'], // red
    ['#14b8a6', '#0d9488'], // teal
  ]
  const idx = props.name
    ? props.name.charCodeAt(0) % colors.length
    : 0
  const [from, to] = colors[idx]
  return {
    background: `linear-gradient(135deg, ${from}, ${to})`,
  }
})

const statusColor = computed(() => ({
  online: '#10b981',
  offline: '#6b7280',
  busy: '#ef4444',
  away: '#f59e0b',
  none: 'transparent',
}[props.status]))
</script>
