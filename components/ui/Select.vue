<template>
  <div ref="wrapperRef" class="relative w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="prop-control" style="display: block; font-size: 0.8125rem; font-weight: 500; color: var(--color-text); margin-bottom: 0.375rem">
      {{ label }}
      <span v-if="required" style="color: var(--color-error)">*</span>
    </label>

    <!-- Trigger -->
    <button
      :id="id"
      type="button"
      role="combobox"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-disabled="disabled"
      :disabled="disabled"
      class="w-full flex items-center justify-between gap-2 text-left"
      :style="{
        padding: '0.4375rem 0.75rem',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${error ? 'var(--color-error)' : open ? 'var(--color-primary)' : 'var(--color-border)'}`,
        backgroundColor: 'var(--color-bg)',
        color: selectedLabel ? 'var(--color-text)' : 'var(--color-text-subtle)',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-sans)',
        boxShadow: open ? '0 0 0 3px var(--color-primary-subtle)' : error ? '0 0 0 3px var(--color-error-subtle)' : 'none',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? '0.5' : '1',
      }"
      @click="!disabled && toggleOpen()"
      @keydown="handleKeydown"
    >
      <span class="truncate">{{ selectedLabel || placeholder }}</span>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        :style="{ color: 'var(--color-text-muted)', transition: 'transform var(--transition-fast)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: '0' }"
      >
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <Transition name="scale">
      <div
        v-if="open"
        role="listbox"
        :aria-label="label || 'Options'"
        class="absolute left-0 right-0 z-50 mt-1 overflow-hidden"
        :style="{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-lg)',
          padding: '0.25rem',
        }"
      >
        <button
          v-for="opt in options"
          :key="opt.value"
          role="option"
          :aria-selected="modelValue === opt.value"
          class="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-colors"
          :style="{
            backgroundColor: modelValue === opt.value ? 'var(--color-primary-subtle)' : 'transparent',
            color: modelValue === opt.value ? 'var(--color-primary)' : 'var(--color-text)',
            fontWeight: modelValue === opt.value ? '500' : '400',
            cursor: 'pointer',
          }"
          @click="selectOption(opt.value)"
        >
          <svg v-if="modelValue === opt.value" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span v-else class="inline-block" style="width: 12px" />
          {{ opt.label }}
        </button>
      </div>
    </Transition>

    <!-- Error / Hint -->
    <p v-if="error" class="mt-1 text-xs" style="color: var(--color-error)">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs" style="color: var(--color-text-muted)">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options?: SelectOption[]
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
}>(), {
  options: () => [],
  placeholder: 'Select an option…',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const id = `select-${Math.random().toString(36).slice(2)}`
const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(
  () => props.options.find(o => o.value === props.modelValue)?.label ?? '',
)

const toggleOpen = () => { open.value = !open.value }

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  open.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') { open.value = false; return }
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen() }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!open.value) { open.value = true; return }
    const idx = props.options.findIndex(o => o.value === props.modelValue)
    if (idx < props.options.length - 1) emit('update:modelValue', props.options[idx + 1].value)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const idx = props.options.findIndex(o => o.value === props.modelValue)
    if (idx > 0) emit('update:modelValue', props.options[idx - 1].value)
  }
}

// Close on outside click
const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>
