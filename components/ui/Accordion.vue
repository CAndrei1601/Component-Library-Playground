<template>
  <div class="w-full rounded-xl overflow-hidden border border-token">
    <div
      v-for="(item, i) in items"
      :key="i"
      :style="i < items.length - 1 ? 'border-bottom: 1px solid var(--color-border)' : ''"
    >
      <!-- Trigger -->
      <button
        type="button"
        :id="`accordion-trigger-${i}`"
        :aria-expanded="openItems.includes(i)"
        :aria-controls="`accordion-panel-${i}`"
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
        :style="{
          backgroundColor: openItems.includes(i) ? 'var(--color-surface-raised)' : 'var(--color-surface)',
          cursor: 'pointer',
        }"
        @click="toggle(i)"
      >
        <span class="text-sm font-medium" style="color: var(--color-text)">{{ item.title }}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
          :style="{
            color: 'var(--color-text-muted)',
            flexShrink: '0',
            transform: openItems.includes(i) ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform var(--transition-base)',
          }"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <!-- Panel -->
      <Transition name="accordion">
        <div
          v-if="openItems.includes(i)"
          :id="`accordion-panel-${i}`"
          role="region"
          :aria-labelledby="`accordion-trigger-${i}`"
          class="px-5 pb-4 text-sm leading-relaxed"
          style="color: var(--color-text-muted); background-color: var(--color-surface)"
        >
          {{ item.content }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AccordionItem {
  title: string
  content: string
}

const props = withDefaults(defineProps<{
  items?: AccordionItem[]
  multiple?: boolean
  defaultOpen?: number[]
}>(), {
  items: () => [],
  multiple: false,
  defaultOpen: () => [],
})

const openItems = ref<number[]>([...props.defaultOpen])

const toggle = (i: number) => {
  const idx = openItems.value.indexOf(i)
  if (idx === -1) {
    if (props.multiple) {
      openItems.value.push(i)
    } else {
      openItems.value = [i]
    }
  } else {
    openItems.value.splice(idx, 1)
  }
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all var(--transition-base);
  overflow: hidden;
  max-height: 500px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
