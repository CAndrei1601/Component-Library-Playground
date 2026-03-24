<template>
  <div class="flex items-start gap-3">
    <button
      :id="toggleId"
      role="switch"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
      :disabled="disabled"
      :class="['relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', trackSize, disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']"
      :style="{
        backgroundColor: modelValue ? 'var(--color-primary)' : 'var(--color-surface-raised)',
        border: `1px solid ${modelValue ? 'var(--color-primary)' : 'var(--color-border)'}`,
        '--tw-ring-color': 'var(--color-primary)',
      }"
      @click="!disabled && $emit('update:modelValue', !modelValue)"
    >
      <span
        :class="['inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out flex-shrink-0', thumbSize, modelValue ? thumbTranslate : 'translate-x-0']"
      />
    </button>

    <div v-if="label" class="flex flex-col">
      <label
        :for="toggleId"
        class="text-sm font-medium cursor-pointer select-none"
        :style="{ color: disabled ? 'var(--color-text-muted)' : 'var(--color-text)' }"
        @click="!disabled && $emit('update:modelValue', !modelValue)"
      >
        {{ label }}
      </label>
      <span v-if="description" class="text-xs mt-0.5" style="color: var(--color-text-muted)">{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  description?: string
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>(), {
  modelValue: false,
  size: 'md',
  disabled: false,
})

defineEmits<{ 'update:modelValue': [value: boolean] }>()

const toggleId = useId()

const trackSize = computed(() => ({
  sm: 'w-8 h-4',
  md: 'w-10 h-5',
  lg: 'w-12 h-6',
}[props.size]))

const thumbSize = computed(() => ({
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4.5 h-4.5',
}[props.size]))

const thumbTranslate = computed(() => ({
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
}[props.size]))
</script>
