<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40"
        style="background-color: var(--color-surface-overlay)"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="modelValue"
        class="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto shadow-token-xl"
        style="background-color: var(--color-bg)"
      >
        <div class="flex items-center justify-between px-4 h-14 border-b border-token">
          <span class="font-semibold text-sm" style="color: var(--color-text)">Navigation</span>
          <button
            class="p-1.5 rounded-md"
            style="color: var(--color-text-muted)"
            aria-label="Close navigation"
            @click="$emit('update:modelValue', false)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <AppSidebar @navigate="$emit('update:modelValue', false)" />
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
