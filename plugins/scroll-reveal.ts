export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    nuxtApp.vueApp.directive('reveal', { getSSRProps: () => ({}) })
    return
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: { value?: number }) {
      const delay = binding.value ?? 0
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom >= 0) return

      el.setAttribute('data-reveal', '')

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-revealed'), delay)
            observer.unobserve(el)
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
      )

      observer.observe(el)
    },
  })
})
