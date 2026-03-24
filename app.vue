<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

// Prevent FOUC: inject theme script before hydration
useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`,
      tagPosition: 'head',
    },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

onMounted(() => {
  initTheme()
})
</script>
