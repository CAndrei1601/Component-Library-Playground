<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="['text-sm font-medium', required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : '']"
      :style="{ color: 'var(--color-text)' }"
    >
      {{ label }}
    </label>

    <!-- Input wrapper -->
    <div class="relative">
      <!-- Prefix icon slot -->
      <div v-if="$slots.prefix" class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style="color: var(--color-text-muted)">
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-describedby="hint || error ? descId : undefined"
        :aria-invalid="!!error"
        :aria-required="required"
        :class="[
          'w-full px-3 py-2 text-sm rounded-lg outline-none transition-all',
          $slots.prefix ? 'pl-9' : '',
          $slots.suffix ? 'pr-9' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ]"
        :style="inputStyle"
      />

      <!-- Suffix icon slot -->
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style="color: var(--color-text-muted)">
        <slot name="suffix" />
      </div>
    </div>

    <!-- Hint / Error message -->
    <p
      v-if="error || hint"
      :id="descId"
      class="text-xs"
      :style="{ color: error ? 'var(--color-error)' : 'var(--color-text-muted)' }"
    >
      {{ error || hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  type?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  modelValue?: string
}>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = useId()
const descId = useId()

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: (v) => emit('update:modelValue', v),
})

const inputStyle = computed(() => ({
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  border: `1px solid ${props.error ? 'var(--color-error)' : 'var(--color-border)'}`,
  boxShadow: props.error ? '0 0 0 2px var(--color-error-subtle)' : 'var(--shadow-sm)',
}))
</script>

<style scoped>
input:focus {
  border-color: v-bind('props.error ? "var(--color-error)" : "var(--color-primary)"') !important;
  box-shadow: 0 0 0 2px v-bind('props.error ? "var(--color-error-subtle)" : "var(--color-primary-subtle)"') !important;
}
input::placeholder {
  color: var(--color-text-subtle);
}
</style>
