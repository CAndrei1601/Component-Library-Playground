<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40"
        style="background-color: var(--color-surface-overlay); backdrop-filter: blur(4px)"
        aria-hidden="true"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="modelValue"
        class="fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col overflow-hidden shadow-token-xl"
        style="background-color: var(--color-bg); border-right: 1px solid var(--color-border)"
        role="dialog"
        aria-label="Navigation"
        aria-modal="true"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 h-14 border-b border-token flex-shrink-0">
          <div class="flex items-center gap-2">
            <div
              class="w-5 h-5 rounded-md flex items-center justify-center"
              style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="font-semibold text-sm tracking-tight" style="color: var(--color-text)">Forma</span>
          </div>
          <button
            class="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
            style="color: var(--color-text-muted)"
            aria-label="Close navigation"
            @click="$emit('update:modelValue', false)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Nav content -->
        <div class="flex-1 overflow-y-auto">
          <AppSidebar @navigate="$emit('update:modelValue', false)" />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>
