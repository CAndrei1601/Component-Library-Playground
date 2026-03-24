<template>
  <div class="preview-box" :style="bgOverride ? { backgroundColor: bgOverride } : {}">
    <div class="relative z-10 flex flex-col items-center justify-center gap-4 w-full max-w-md">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bgOverride?: string
}>()
</script>
