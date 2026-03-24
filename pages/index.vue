<template>
  <div>
    <!-- Hero Section -->
    <section class="mb-16">
      <div class="mb-3">
        <UiBadge variant="info" dot label="v1.0 — Vue 3 + Nuxt 3" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight mb-4" style="color: var(--color-text); letter-spacing: -0.03em">
        A design system for<br />
        <span style="color: var(--color-primary)">modern interfaces</span>
      </h1>
      <p class="text-lg max-w-2xl mb-8 leading-relaxed" style="color: var(--color-text-muted)">
        Explore, configure, and copy production-ready Vue components. Live prop editing, syntax-highlighted snippets, and full accessibility documentation — all in one place.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <NuxtLink to="/components">
          <UiButton variant="primary" size="lg">
            Browse components
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/components/button">
          <UiButton variant="outline" size="lg">Quick start</UiButton>
        </NuxtLink>
      </div>
    </section>

    <!-- Feature grid -->
    <section class="mb-16">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-5 rounded-xl border border-token"
          style="background-color: var(--color-surface)"
        >
          <div class="text-2xl mb-3">{{ feature.icon }}</div>
          <h3 class="font-semibold text-sm mb-1.5" style="color: var(--color-text)">{{ feature.title }}</h3>
          <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Component Categories -->
    <section class="mb-16">
      <h2 class="text-xl font-bold mb-6 tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">Components</h2>
      <div class="space-y-8">
        <div v-for="category in componentCategories" :key="category.name">
          <div class="flex items-center gap-3 mb-4">
            <h3 class="text-sm font-semibold" style="color: var(--color-text-muted)">{{ category.name }}</h3>
            <hr class="flex-1 border-token" />
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <NuxtLink
              v-for="comp in category.components"
              :key="comp.slug"
              :to="`/components/${comp.slug}`"
              class="flex flex-col items-center gap-2 p-4 rounded-xl border border-token text-center group transition-all hover:shadow-token-md"
              style="background-color: var(--color-surface); text-decoration: none"
            >
              <span class="text-2xl">{{ comp.icon }}</span>
              <span class="text-sm font-medium" style="color: var(--color-text)">{{ comp.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech stack section -->
    <section>
      <h2 class="text-xl font-bold mb-6 tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">Built with</h2>
      <div class="flex flex-wrap gap-2">
        <UiBadge v-for="tech in techStack" :key="tech" variant="default" size="md" :label="tech" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { componentCategories } from '~/data/components'

useHead({
  title: 'UIKit — Component Library Playground',
  meta: [
    { name: 'description', content: 'A developer-focused component library playground built with Vue 3 and Nuxt 3.' },
  ],
})

const features = [
  {
    icon: '⚡',
    title: 'Live prop editing',
    description: 'Change any prop and see the component update in real time. The code snippet stays in sync.',
  },
  {
    icon: '🎨',
    title: 'Multi-theme support',
    description: 'Light, dark, and a custom brand theme — all powered by CSS custom properties.',
  },
  {
    icon: '♿',
    title: 'Accessibility first',
    description: 'Every component ships with ARIA roles, keyboard navigation, and documented accessibility notes.',
  },
]

const techStack = ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'CSS Custom Properties', 'SSR', 'Composition API']
</script>
