<template>
  <div>
    <!-- Header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-3">
        <UiBadge label="Foundation" variant="info" size="sm" />
      </div>
      <h1 class="page-title mb-2">Design Tokens</h1>
      <p class="text-sm leading-relaxed max-w-2xl" style="color: var(--color-text-muted)">
        The single source of truth for every visual decision in Forma. Tokens are CSS custom properties applied on the <code class="token-mono">html</code> element — changing the theme swaps the entire set, repainting the UI consistently.
      </p>
    </div>

    <!-- Usage callout -->
    <div class="callout callout-tip mb-10">
      <p class="font-medium text-sm mb-1" style="color: var(--color-text)">Using tokens in your styles</p>
      <p class="text-sm" style="color: var(--color-text-muted)">Reference tokens via <code class="token-mono">var(--token-name)</code> in any CSS or inline style. They automatically update when the theme changes, with no JavaScript required.</p>
    </div>

    <!-- ── Colors ───────────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Colors</h2>
        <hr class="flex-1 border-token" />
      </div>

      <div class="space-y-8">
        <div v-for="group in colorGroups" :key="group.name">
          <h3 class="label-xs mb-3">{{ group.name }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div
              v-for="token in group.tokens"
              :key="token.name"
              class="rounded-xl border border-token overflow-hidden"
              style="background-color: var(--color-surface)"
            >
              <div
                class="h-14 w-full border-b border-token"
                :style="{ backgroundColor: `var(${token.name})` }"
              />
              <div class="p-3">
                <p class="text-xs font-mono font-medium mb-0.5 truncate" style="color: var(--color-text); font-family: var(--font-mono); font-size: 0.7rem">{{ token.name }}</p>
                <p class="text-xs truncate" style="color: var(--color-text-subtle); font-size: 0.7rem">{{ token.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Typography ───────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Typography</h2>
        <hr class="flex-1 border-token" />
      </div>

      <!-- Font families -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div
          v-for="font in fontFamilies"
          :key="font.name"
          class="p-5 rounded-xl border border-token"
          style="background-color: var(--color-surface)"
        >
          <p class="label-xs mb-2">{{ font.name }}</p>
          <p class="text-2xl font-medium mb-2" :style="{ fontFamily: font.value, color: 'var(--color-text)' }">{{ font.sample }}</p>
          <code class="token-mono text-xs">{{ font.var }}</code>
        </div>
      </div>

      <!-- Type scale -->
      <h3 class="label-xs mb-4">Scale</h3>
      <div
        class="rounded-xl border border-token overflow-hidden divide-y"
        style="background-color: var(--color-surface); --tw-divide-opacity: 1; border-color: var(--color-border)"
      >
        <div
          v-for="size in typeScale"
          :key="size.name"
          class="flex items-baseline gap-4 px-5 py-3"
          style="border-bottom: 1px solid var(--color-border)"
        >
          <div class="w-24 flex-shrink-0">
            <p class="text-xs font-mono" style="color: var(--color-text-subtle); font-family: var(--font-mono); font-size: 0.7rem">{{ size.name }}</p>
            <p class="text-xs" style="color: var(--color-text-subtle); font-size: 0.65rem">{{ size.value }}</p>
          </div>
          <p :style="{ fontSize: size.value, lineHeight: '1.4', color: 'var(--color-text)' }" class="truncate">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    </section>

    <!-- ── Spacing ───────────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Spacing</h2>
        <hr class="flex-1 border-token" />
      </div>
      <div class="space-y-2">
        <div
          v-for="space in spacingScale"
          :key="space.name"
          class="flex items-center gap-4"
        >
          <div class="w-28 flex-shrink-0">
            <p class="text-xs font-mono" style="color: var(--color-text-subtle); font-family: var(--font-mono); font-size: 0.7rem">{{ space.name }}</p>
            <p class="text-xs" style="color: var(--color-text-subtle); font-size: 0.65rem">{{ space.value }}</p>
          </div>
          <div
            :style="{ width: space.value, height: '1.25rem', backgroundColor: 'var(--color-primary-subtle)', border: '1px solid var(--color-primary-muted)', borderRadius: 'var(--radius-sm)', flexShrink: '0', minWidth: '4px' }"
          />
        </div>
      </div>
    </section>

    <!-- ── Radius ────────────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Border Radius</h2>
        <hr class="flex-1 border-token" />
      </div>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="r in radii"
          :key="r.name"
          class="flex flex-col items-center gap-2"
        >
          <div
            :style="{
              width: '3rem',
              height: '3rem',
              borderRadius: r.value,
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid var(--color-primary-muted)',
            }"
          />
          <div class="text-center">
            <p class="text-xs font-mono" style="color: var(--color-text-muted); font-family: var(--font-mono); font-size: 0.7rem">{{ r.name }}</p>
            <p class="text-xs" style="color: var(--color-text-subtle); font-size: 0.65rem">{{ r.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Shadows ───────────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Shadows</h2>
        <hr class="flex-1 border-token" />
      </div>
      <div class="flex flex-wrap gap-5">
        <div
          v-for="shadow in shadows"
          :key="shadow.name"
          class="flex flex-col items-center gap-3"
        >
          <div
            :style="{
              width: '5rem',
              height: '5rem',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface)',
              boxShadow: `var(${shadow.name})`,
              border: '1px solid var(--color-border)',
            }"
          />
          <code class="text-xs font-mono" style="color: var(--color-text-subtle); font-family: var(--font-mono); font-size: 0.7rem">{{ shadow.name }}</code>
        </div>
      </div>
    </section>

    <!-- ── Motion ────────────────────────────────────────────────────── -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Motion</h2>
        <hr class="flex-1 border-token" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="t in transitions"
          :key="t.name"
          class="p-4 rounded-xl border border-token"
          style="background-color: var(--color-surface)"
        >
          <code class="token-mono text-xs block mb-2">{{ t.name }}</code>
          <p class="text-xs mb-2" style="color: var(--color-text-muted)">{{ t.value }}</p>
          <p class="text-xs" style="color: var(--color-text-subtle)">{{ t.usage }}</p>
        </div>
      </div>
      <div class="mt-4 callout callout-info text-xs">
        All transitions respect <code class="token-mono">prefers-reduced-motion</code> — durations collapse to 0.01ms for users who prefer reduced motion.
      </div>
    </section>

    <!-- ── Theme system ──────────────────────────────────────────────── -->
    <section class="mb-4">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="heading-3 text-base">Theme System</h2>
        <hr class="flex-1 border-token" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="theme in themes"
          :key="theme.name"
          class="p-5 rounded-xl border"
          :style="{
            backgroundColor: theme.bg,
            borderColor: theme.border,
          }"
        >
          <div class="flex items-center gap-2 mb-3">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: theme.primary }" />
            <p class="text-sm font-semibold" :style="{ color: theme.text }">{{ theme.name }}</p>
          </div>
          <p class="text-xs leading-relaxed" :style="{ color: theme.muted }">{{ theme.description }}</p>
          <code class="text-xs mt-3 block" :style="{ color: theme.muted, fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }">{{ theme.selector }}</code>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Design Tokens — Forma',
  meta: [{ name: 'description', content: 'Explore the full design token system powering Forma — colors, typography, spacing, radius, shadows, and motion.' }],
})

const colorGroups = [
  {
    name: 'Backgrounds & Surfaces',
    tokens: [
      { name: '--color-bg', description: 'Page background' },
      { name: '--color-bg-secondary', description: 'Secondary background' },
      { name: '--color-surface', description: 'Card / panel surface' },
      { name: '--color-surface-raised', description: 'Raised surface (hover, tag)' },
    ],
  },
  {
    name: 'Text',
    tokens: [
      { name: '--color-text', description: 'Primary text' },
      { name: '--color-text-muted', description: 'Secondary text' },
      { name: '--color-text-subtle', description: 'Disabled / placeholder' },
      { name: '--color-text-inverse', description: 'On dark backgrounds' },
    ],
  },
  {
    name: 'Brand / Primary',
    tokens: [
      { name: '--color-primary', description: 'Primary accent' },
      { name: '--color-primary-hover', description: 'Hover state' },
      { name: '--color-primary-subtle', description: 'Subtle bg tint' },
      { name: '--color-primary-muted', description: 'Muted border / ring' },
    ],
  },
  {
    name: 'Semantic',
    tokens: [
      { name: '--color-success', description: 'Success state' },
      { name: '--color-warning', description: 'Warning state' },
      { name: '--color-error', description: 'Error / destructive' },
      { name: '--color-info', description: 'Informational' },
    ],
  },
  {
    name: 'Borders',
    tokens: [
      { name: '--color-border', description: 'Default border' },
      { name: '--color-border-strong', description: 'Prominent border' },
    ],
  },
]

const fontFamilies = [
  { name: 'Sans-serif', var: '--font-sans', value: 'Inter, system-ui, sans-serif', sample: 'Inter' },
  { name: 'Monospace', var: '--font-mono', value: 'JetBrains Mono, monospace', sample: 'JetBrains Mono' },
]

const typeScale = [
  { name: 'xs',   value: '0.75rem' },
  { name: 'sm',   value: '0.875rem' },
  { name: 'base', value: '1rem' },
  { name: 'lg',   value: '1.125rem' },
  { name: 'xl',   value: '1.25rem' },
  { name: '2xl',  value: '1.5rem' },
  { name: '3xl',  value: '1.875rem' },
  { name: '4xl',  value: '2.25rem' },
]

const spacingScale = [
  { name: '--space-1',  value: '0.25rem' },
  { name: '--space-2',  value: '0.5rem' },
  { name: '--space-3',  value: '0.75rem' },
  { name: '--space-4',  value: '1rem' },
  { name: '--space-6',  value: '1.5rem' },
  { name: '--space-8',  value: '2rem' },
  { name: '--space-12', value: '3rem' },
  { name: '--space-16', value: '4rem' },
]

const radii = [
  { name: '--radius-sm',   value: '0.25rem' },
  { name: '--radius-md',   value: '0.375rem' },
  { name: '--radius-lg',   value: '0.5rem' },
  { name: '--radius-xl',   value: '0.75rem' },
  { name: '--radius-2xl',  value: '1rem' },
  { name: '--radius-3xl',  value: '1.5rem' },
  { name: '--radius-full', value: '9999px' },
]

const shadows = [
  { name: '--shadow-xs' },
  { name: '--shadow-sm' },
  { name: '--shadow-md' },
  { name: '--shadow-lg' },
  { name: '--shadow-xl' },
]

const transitions = [
  { name: '--transition-fast',   value: '100ms cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Micro-interactions, hover states' },
  { name: '--transition-base',   value: '150ms cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Default: buttons, inputs, links' },
  { name: '--transition-slow',   value: '250ms cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Modals, drawers, overlays' },
  { name: '--transition-slower', value: '350ms cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Theme transitions, page changes' },
]

const themes = [
  {
    name: 'Light',
    selector: "[data-theme='light']",
    bg: '#fafafa',
    border: '#e4e4e7',
    primary: '#6366f1',
    text: '#09090b',
    muted: '#71717a',
    description: 'Clean whites and subtle zinc grays. Default theme for most interfaces.',
  },
  {
    name: 'Dark',
    selector: "[data-theme='dark']",
    bg: '#0a0a0a',
    border: '#2a2a2a',
    primary: '#818cf8',
    text: '#ededed',
    muted: '#a1a1aa',
    description: 'Near-black neutral dark, inspired by Vercel. High contrast with minimal eye strain.',
  },
  {
    name: 'Brand',
    selector: "[data-theme='brand']",
    bg: '#09050f',
    border: '#2a2252',
    primary: '#a78bfa',
    text: '#ede9fe',
    muted: '#c4b5fd',
    description: 'Deep violet brand expression. Full surface coverage with violet-shifted values.',
  },
]
</script>
