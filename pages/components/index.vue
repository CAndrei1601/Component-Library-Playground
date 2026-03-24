<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <h1 class="page-title mb-1.5">Components</h1>
      <p class="text-sm" style="color: var(--color-text-muted)">
        {{ allComponents.length }} components across {{ componentCategories.length }} categories — each with live preview, prop controls, and full documentation.
      </p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <div class="relative flex-1">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="color: var(--color-text-subtle)"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="search"
          type="search"
          placeholder="Search components…"
          class="prop-input pl-9"
          aria-label="Search components"
        />
      </div>
      <div class="flex gap-1.5 flex-wrap">
        <button
          v-for="cat in ['All', ...componentCategories.map(c => c.name)]"
          :key="cat"
          :class="['theme-btn', { active: activeCategory === cat }]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-if="filteredComponents.length > 0" class="space-y-10">
      <template v-for="category in visibleCategories" :key="category.name">
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <span class="text-xs font-semibold" style="color: var(--color-text-muted)">{{ category.name }}</span>
            <span
              class="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-xs font-medium"
              style="background-color: var(--color-surface-raised); color: var(--color-text-subtle); font-size: 0.625rem"
            >{{ category.components.length }}</span>
            <hr class="flex-1 border-token" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <NuxtLink
              v-for="comp in category.components"
              :key="comp.slug"
              :to="`/components/${comp.slug}`"
              class="group flex gap-3.5 p-4 rounded-xl border border-token transition-all hover:border-primary-muted hover:shadow-token-md"
              style="background-color: var(--color-surface); text-decoration: none; --border-primary-muted: var(--color-primary-muted)"
            >
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 border border-token"
                style="background-color: var(--color-surface-raised)"
              >
                {{ comp.icon }}
              </div>
              <div class="min-w-0 flex flex-col justify-center">
                <div class="flex items-center gap-2 mb-0.5">
                  <p class="font-semibold text-sm" style="color: var(--color-text)">{{ comp.name }}</p>
                </div>
                <p class="text-xs leading-relaxed line-clamp-2" style="color: var(--color-text-muted)">
                  {{ comp.description }}
                </p>
              </div>
              <svg
                class="ml-auto flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                style="color: var(--color-text-subtle)"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-token"
        style="background-color: var(--color-surface-raised)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <p class="font-semibold text-sm mb-1" style="color: var(--color-text)">No results for "{{ search }}"</p>
      <p class="text-sm mb-4" style="color: var(--color-text-muted)">Try a different search term or clear the filter.</p>
      <UiButton variant="outline" size="sm" @click="search = ''; activeCategory = 'All'">Clear filters</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allComponents, componentCategories } from '~/data/components'

useHead({
  title: 'Components — Forma',
  meta: [{ name: 'description', content: 'Browse all UI components in the Forma design system. Each component includes live prop editing and full accessibility documentation.' }],
})

const search = ref('')
const activeCategory = ref('All')

const filteredComponents = computed(() => {
  let comps = allComponents
  if (activeCategory.value !== 'All') {
    comps = comps.filter(c => c.category === activeCategory.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    comps = comps.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q),
    )
  }
  return comps
})

const visibleCategories = computed(() =>
  componentCategories
    .map(cat => ({
      ...cat,
      components: filteredComponents.value.filter(c => c.category === cat.name),
    }))
    .filter(cat => cat.components.length > 0),
)
</script>
