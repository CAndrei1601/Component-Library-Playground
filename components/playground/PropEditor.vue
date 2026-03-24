<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div
      v-for="prop in propDefs"
      :key="prop.name"
      class="prop-control"
    >
      <!-- Boolean: Toggle switch -->
      <template v-if="prop.type === 'boolean'">
        <UiToggle
          :label="formatLabel(prop.name)"
          :model-value="modelValue[prop.name] as boolean"
          size="sm"
          @update:model-value="update(prop.name, $event)"
        />
      </template>

      <!-- Select: Dropdown -->
      <template v-else-if="prop.type === 'select'">
        <label>{{ formatLabel(prop.name) }}</label>
        <select
          :value="modelValue[prop.name]"
          class="prop-input"
          @change="update(prop.name, ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in prop.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </template>

      <!-- Number: Range/number input -->
      <template v-else-if="prop.type === 'number'">
        <label>{{ formatLabel(prop.name) }}</label>
        <input
          type="number"
          :value="modelValue[prop.name]"
          class="prop-input"
          @input="update(prop.name, Number(($event.target as HTMLInputElement).value))"
        />
      </template>

      <!-- String: Text input -->
      <template v-else>
        <label>{{ formatLabel(prop.name) }}</label>
        <input
          type="text"
          :value="modelValue[prop.name]"
          class="prop-input"
          @input="update(prop.name, ($event.target as HTMLInputElement).value)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropDef } from '~/data/components'

const props = defineProps<{
  propDefs: PropDef[]
  modelValue: Record<string, string | boolean | number>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string | boolean | number>]
}>()

const update = (key: string, value: string | boolean | number) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const formatLabel = (name: string) =>
  name.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
</script>
