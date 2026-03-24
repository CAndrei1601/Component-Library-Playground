<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end"
      aria-live="polite"
      aria-label="Notifications"
    >
      <TransitionGroup name="slide-up">
        <UiToast
          v-for="toast in toasts"
          :key="toast.id"
          :message="toast.message"
          :variant="toast.variant"
          @dismiss="removeToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>
