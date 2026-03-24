<template>
  <nav :aria-label="ariaLabel" class="flex items-center gap-1">
    <!-- Prev -->
    <button
      type="button"
      :aria-label="'Previous page'"
      :disabled="modelValue <= 1"
      class="pagination-btn"
      :style="modelValue <= 1 ? 'opacity: 0.4; cursor: not-allowed' : ''"
      @click="modelValue > 1 && $emit('update:modelValue', modelValue - 1)"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <!-- Pages -->
    <template v-for="page in visiblePages" :key="page">
      <span v-if="page === '…'" class="pagination-ellipsis">…</span>
      <button
        v-else
        type="button"
        :aria-label="`Page ${page}`"
        :aria-current="page === modelValue ? 'page' : undefined"
        :class="['pagination-btn', page === modelValue ? 'pagination-btn-active' : '']"
        @click="$emit('update:modelValue', page as number)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      type="button"
      :aria-label="'Next page'"
      :disabled="modelValue >= total"
      class="pagination-btn"
      :style="modelValue >= total ? 'opacity: 0.4; cursor: not-allowed' : ''"
      @click="modelValue < total && $emit('update:modelValue', modelValue + 1)"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  total: number
  sibling?: number
  ariaLabel?: string
}>(), {
  total: 10,
  sibling: 1,
  ariaLabel: 'Pagination',
})

defineEmits<{ 'update:modelValue': [page: number] }>()

const visiblePages = computed((): (number | '…')[] => {
  const { modelValue: page, total, sibling } = props
  const delta = sibling + 2

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const left  = Math.max(2, page - delta)
  const right = Math.min(total - 1, page + delta)
  const pages: (number | '…')[] = [1]

  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  pages.push(total)

  return pages
})
</script>

<style scoped>
.pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: var(--radius-lg);
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid transparent;
  background-color: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-sans);
}

.pagination-btn:not(:disabled):hover {
  background-color: var(--color-surface-raised);
  color: var(--color-text);
  border-color: var(--color-border);
}

.pagination-btn-active {
  background-color: var(--color-primary-subtle) !important;
  color: var(--color-primary) !important;
  border-color: var(--color-primary-muted) !important;
  font-weight: 600;
}

.pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
}
</style>
