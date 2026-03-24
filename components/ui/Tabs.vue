<template>
  <div class="tabs-root">
    <!-- Tab List -->
    <div
      role="tablist"
      class="relative flex items-center gap-0.5 p-0.5 rounded-xl"
      :style="{
        backgroundColor: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
      }"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :tabindex="modelValue === tab.value ? 0 : -1"
        class="relative flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2"
        :style="{
          color: modelValue === tab.value ? 'var(--color-text)' : 'var(--color-text-muted)',
          backgroundColor: modelValue === tab.value ? 'var(--color-surface)' : 'transparent',
          boxShadow: modelValue === tab.value ? 'var(--shadow-sm)' : 'none',
          fontWeight: modelValue === tab.value ? '500' : '400',
          transition: 'all var(--transition-base)',
          cursor: 'pointer',
          border: modelValue === tab.value ? '1px solid var(--color-border)' : '1px solid transparent',
        }"
        @click="$emit('update:modelValue', tab.value)"
        @keydown.left="focusPrev(tab.value)"
        @keydown.right="focusNext(tab.value)"
      >
        <component :is="tab.icon" v-if="tab.icon" style="width: 14px; height: 14px" />
        {{ tab.label }}
        <span
          v-if="tab.badge"
          class="inline-flex items-center justify-center rounded-full px-1.5 text-xs"
          :style="{
            backgroundColor: modelValue === tab.value ? 'var(--color-primary-subtle)' : 'var(--color-surface-raised)',
            color: modelValue === tab.value ? 'var(--color-primary)' : 'var(--color-text-subtle)',
            minWidth: '18px',
            height: '18px',
            fontSize: '0.65rem',
            fontWeight: '600',
          }"
        >{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Panel slot -->
    <div class="mt-4">
      <slot :active-tab="modelValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  value: string
  label: string
  badge?: string | number
  icon?: object
}

const props = withDefaults(defineProps<{
  modelValue: string
  tabs: TabItem[]
}>(), {
  tabs: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focusPrev = (current: string) => {
  const idx = props.tabs.findIndex(t => t.value === current)
  if (idx > 0) emit('update:modelValue', props.tabs[idx - 1].value)
}

const focusNext = (current: string) => {
  const idx = props.tabs.findIndex(t => t.value === current)
  if (idx < props.tabs.length - 1) emit('update:modelValue', props.tabs[idx + 1].value)
}
</script>
