<template>
  <div class="relative inline-flex" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
    <!-- Trigger slot -->
    <slot>
      <button
        type="button"
        class="px-3 py-1.5 text-sm rounded-md border"
        :style="{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)',
        }"
      >
        {{ triggerLabel }}
      </button>
    </slot>

    <!-- Tooltip popup -->
    <Transition name="fade">
      <div
        v-if="visible"
        role="tooltip"
        :id="tooltipId"
        :class="['absolute z-50 pointer-events-none whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-token-lg', positionClasses]"
        :style="tooltipStyle"
      >
        {{ content }}
        <!-- Arrow -->
        <span :class="['absolute w-2 h-2 rotate-45', arrowClasses]" :style="{ backgroundColor: 'var(--color-text)' }" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  triggerLabel?: string
  delay?: string
}>(), {
  content: 'Tooltip',
  position: 'top',
  triggerLabel: 'Hover me',
  delay: '200',
})

const tooltipId = useId()
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const show = () => {
  if (timer) clearTimeout(timer)
  const d = parseInt(props.delay) || 0
  timer = setTimeout(() => { visible.value = true }, d)
}

const hide = () => {
  if (timer) clearTimeout(timer)
  visible.value = false
}

const positionClasses = computed(() => ({
  top: '-translate-x-1/2 left-1/2 bottom-[calc(100%+8px)]',
  bottom: '-translate-x-1/2 left-1/2 top-[calc(100%+8px)]',
  left: '-translate-y-1/2 top-1/2 right-[calc(100%+8px)]',
  right: '-translate-y-1/2 top-1/2 left-[calc(100%+8px)]',
}[props.position]))

const arrowClasses = computed(() => ({
  top: '-bottom-1 left-1/2 -translate-x-1/2',
  bottom: '-top-1 left-1/2 -translate-x-1/2',
  left: '-right-1 top-1/2 -translate-y-1/2',
  right: '-left-1 top-1/2 -translate-y-1/2',
}[props.position]))

const tooltipStyle = computed(() => ({
  backgroundColor: 'var(--color-text)',
  color: 'var(--color-bg)',
}))
</script>
