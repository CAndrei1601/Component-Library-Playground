<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        :style="{ backgroundColor: 'var(--color-surface-overlay)' }"
        @click.self="closeOnOverlay && $emit('update:modelValue', false)"
      >
        <Transition name="scale">
          <div
            v-if="modelValue"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="descId"
            :class="['relative flex flex-col rounded-2xl overflow-hidden w-full max-h-[90vh]', sizeClass]"
            :style="{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xl)',
            }"
            @keydown.esc="$emit('update:modelValue', false)"
          >
            <!-- Header -->
            <div class="flex items-start justify-between px-6 py-5 border-b border-token flex-shrink-0">
              <div>
                <h2 :id="titleId" class="text-base font-semibold" style="color: var(--color-text)">
                  <slot name="title">{{ title }}</slot>
                </h2>
              </div>
              <button
                class="ml-4 -mt-0.5 -mr-1.5 p-1.5 rounded-lg transition-colors flex-shrink-0"
                :style="{ color: 'var(--color-text-muted)' }"
                aria-label="Close dialog"
                @click="$emit('update:modelValue', false)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div :id="descId" class="px-6 py-5 overflow-y-auto flex-1">
              <slot>
                <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ description }}</p>
              </slot>
            </div>

            <!-- Footer -->
            <div v-if="showFooter" class="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-token flex-shrink-0" style="background-color: var(--color-bg-secondary)">
              <slot name="footer">
                <UiButton variant="secondary" size="sm" @click="$emit('update:modelValue', false)">Cancel</UiButton>
                <UiButton variant="primary" size="sm" @click="$emit('update:modelValue', false)">Confirm</UiButton>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  showFooter?: boolean
  closeOnOverlay?: boolean
}>(), {
  modelValue: false,
  title: 'Dialog',
  description: '',
  size: 'md',
  showFooter: true,
  closeOnOverlay: true,
})

defineEmits<{ 'update:modelValue': [value: boolean] }>()

const titleId = useId()
const descId = useId()

const sizeClass = computed(() => ({
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-full h-full rounded-none',
}[props.size]))
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>
