<template>
  <div>

    <!-- ── Hero ──────────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pb-16 pt-4">
      <div class="hero-glow" />

      <!-- Badge -->
      <div class="mb-5 relative z-10">
        <UiBadge variant="info" dot label="v1.0 — Vue 3 · Nuxt 3 · TypeScript" />
      </div>

      <!-- Headline -->
      <h1 class="heading-1 mb-5 relative z-10" style="max-width: 680px">
        A design system built for
        <span class="text-gradient">modern Vue apps</span>
      </h1>

      <!-- Sub -->
      <p class="text-base leading-relaxed mb-8 relative z-10" style="color: var(--color-text-muted); max-width: 520px">
        Production-ready components, live prop editing, design tokens, and full accessibility documentation — all built from scratch with Vue 3, Nuxt 3, and Tailwind CSS.
      </p>

      <!-- Stats row -->
      <div class="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 relative z-10">
        <div v-for="(stat, i) in stats" :key="stat.label" class="flex items-center gap-4">
          <div>
            <span class="text-xl font-bold tracking-tight" style="color: var(--color-text)">{{ stat.value }}</span>
            <span class="text-sm ml-1.5" style="color: var(--color-text-muted)">{{ stat.label }}</span>
          </div>
          <div v-if="i < stats.length - 1" class="stat-divider hidden sm:block" />
        </div>
      </div>

      <!-- CTAs -->
      <div class="flex flex-wrap items-center gap-3 relative z-10">
        <NuxtLink to="/components">
          <UiButton variant="primary" size="lg">
            Browse components
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/tokens">
          <UiButton variant="outline" size="lg">Design tokens</UiButton>
        </NuxtLink>
        <a
          href="https://github.com/CAndrei1601/Component-Library-Playground"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UiButton variant="ghost" size="lg">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </UiButton>
        </a>
      </div>
    </section>

    <!-- ── Principles ─────────────────────────────────────────────────────── -->
    <section class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="label-xs">Principles</span>
        <hr class="flex-1 border-token" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="p in principles" :key="p.title" class="feature-card">
          <div class="feature-icon">
            <component :is="p.icon" />
          </div>
          <h3 class="text-sm font-semibold mb-1.5" style="color: var(--color-text)">{{ p.title }}</h3>
          <p class="text-xs leading-relaxed" style="color: var(--color-text-muted)">{{ p.description }}</p>
        </div>
      </div>
    </section>

    <!-- ── Components ────────────────────────────────────────────────────── -->
    <section class="mb-16">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <span class="label-xs">Components</span>
          <hr style="width: 40px; border-color: var(--color-border)" />
        </div>
        <NuxtLink to="/components">
          <UiButton variant="ghost" size="sm">
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </UiButton>
        </NuxtLink>
      </div>

      <div class="space-y-6">
        <div v-for="cat in componentCategories" :key="cat.name">
          <div class="flex items-center gap-2.5 mb-3">
            <span class="text-xs font-medium" style="color: var(--color-text-subtle)">{{ cat.name }}</span>
            <div class="flex-1 h-px" style="background-color: var(--color-border)" />
            <span class="text-xs" style="color: var(--color-text-subtle)">{{ cat.components.length }}</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            <NuxtLink
              v-for="comp in cat.components"
              :key="comp.slug"
              :to="`/components/${comp.slug}`"
              class="comp-card"
            >
              <div class="comp-icon-wrap">
                <span>{{ comp.icon }}</span>
              </div>
              <span class="text-xs font-medium" style="color: var(--color-text)">{{ comp.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Token Preview ──────────────────────────────────────────────────── -->
    <section class="mb-16">
      <div class="flex items-center gap-3 mb-6">
        <span class="label-xs">Design Tokens</span>
        <hr class="flex-1 border-token" />
        <NuxtLink to="/tokens">
          <UiButton variant="ghost" size="sm">Explore tokens →</UiButton>
        </NuxtLink>
      </div>

      <div
        class="rounded-2xl border border-token p-6"
        style="background-color: var(--color-surface)"
      >
        <p class="text-sm font-medium mb-4" style="color: var(--color-text)">Color scale — Primary</p>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
          <div v-for="swatch in colorSwatches" :key="swatch.name" class="space-y-1.5">
            <div
              class="h-8 rounded-lg border border-token"
              :style="{ backgroundColor: swatch.color }"
            />
            <p class="text-center" style="font-size: 0.6rem; color: var(--color-text-subtle); font-family: var(--font-mono)">{{ swatch.name }}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <code
            v-for="token in tokenExamples"
            :key="token"
            class="token-mono text-xs"
          >{{ token }}</code>
        </div>
      </div>
    </section>

    <!-- ── Tech stack ─────────────────────────────────────────────────────── -->
    <section class="pb-4">
      <div class="flex items-center gap-3 mb-5">
        <span class="label-xs">Built with</span>
        <hr class="flex-1 border-token" />
      </div>
      <div class="flex flex-wrap gap-2">
        <UiBadge v-for="tech in techStack" :key="tech" :label="tech" variant="default" size="md" />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { componentCategories } from '~/data/components'



useHead({
  title: 'Forma — Vue Design System',
  meta: [
    { name: 'description', content: 'A production-ready design system playground built with Vue 3, Nuxt 3, and TypeScript. Live prop editing, design tokens, and full accessibility docs.' },
  ],
})

const stats = [
  { value: '17', label: 'components' },
  { value: '3', label: 'themes' },
  { value: '100%', label: 'TypeScript' },
  { value: 'SSR', label: 'ready' },
]

// ── Principle icons (inline SVG via defineComponent) ──────────────────────

const TypeSafeIcon = defineComponent({
  render: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('polyline', { points: '16 18 22 12 16 6' }),
    h('polyline', { points: '8 6 2 12 8 18' }),
  ]),
})

const AccessibleIcon = defineComponent({
  render: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: 12, cy: 12, r: 10 }),
    h('path', { d: 'M12 8v4l3 3' }),
  ]),
})

const TokenIcon = defineComponent({
  render: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: 12, cy: 12, r: 3 }),
    h('path', { d: 'M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83' }),
  ]),
})

const SSRIcon = defineComponent({
  render: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: 2, y: 3, width: 20, height: 14, rx: 2, ry: 2 }),
    h('line', { x1: 8, y1: 21, x2: 16, y2: 21 }),
    h('line', { x1: 12, y1: 17, x2: 12, y2: 21 }),
  ]),
})

const principles = [
  {
    icon: TypeSafeIcon,
    title: 'Type-safe by default',
    description: 'Full TypeScript throughout. Every prop, emit, and composable is strongly typed.',
  },
  {
    icon: AccessibleIcon,
    title: 'Accessible by design',
    description: 'ARIA roles, keyboard navigation, focus management, and screen reader support built in.',
  },
  {
    icon: TokenIcon,
    title: 'Tokens at the root',
    description: 'CSS custom properties power every color, shadow, and transition across all themes.',
  },
  {
    icon: SSRIcon,
    title: 'SSR compatible',
    description: 'No hydration mismatches. All components render cleanly on the server with Nuxt 3.',
  },
]

// ── Token preview ─────────────────────────────────────────────────────────

const colorSwatches = [
  { name: 'subtle', color: '#eef2ff' },
  { name: 'muted', color: '#c7d2fe' },
  { name: '400', color: '#818cf8' },
  { name: '500', color: '#6366f1' },
  { name: '600', color: '#4f46e5' },
  { name: '700', color: '#4338ca' },
]

const tokenExamples = [
  '--color-primary',
  '--color-bg',
  '--color-surface',
  '--color-border',
  '--shadow-md',
  '--radius-xl',
  '--transition-base',
]

const techStack = ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind CSS v3', 'CSS Custom Properties', 'SSR', 'Composition API', 'highlight.js']
</script>
