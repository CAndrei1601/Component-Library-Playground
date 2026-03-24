<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToastContainer />
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`,
      tagPosition: 'head',
    },
  ],
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>" },
  ],
})

onMounted(() => {
  initTheme()
})
</script>
