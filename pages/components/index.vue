<template>
  <div>
    <!-- Page header -->
    <div class="mb-8">
      <h1 class="page-title mb-2">Components</h1>
      <p class="text-sm" style="color: var(--color-text-muted)">
        {{ allComponents.length }} components across {{ componentCategories.length }} categories
      </p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <div class="relative flex-1">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="color: var(--color-text-subtle)"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="search"
          type="search"
          placeholder="Search components…"
          class="prop-input pl-9"
          aria-label="Search components"
        />
      </div>
      <div class="flex gap-2 flex-wrap">
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
          <div class="flex items-center gap-3 mb-4">
            <h2 class="text-sm font-semibold" style="color: var(--color-text-muted)">{{ category.name }}</h2>
            <span class="text-xs font-medium" style="color: var(--color-text-subtle)">{{ category.components.length }}</span>
            <hr class="flex-1 border-token" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NuxtLink
              v-for="comp in category.components"
              :key="comp.slug"
              :to="`/components/${comp.slug}`"
              class="group flex gap-4 p-5 rounded-xl border border-token transition-all hover:shadow-token-md"
              style="background-color: var(--color-surface); text-decoration: none"
            >
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style="background-color: var(--color-surface-raised)"
              >
                {{ comp.icon }}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <p class="font-semibold text-sm" style="color: var(--color-text)">{{ comp.name }}</p>
                  <UiBadge :label="comp.category" variant="default" size="sm" />
                </div>
                <p class="text-xs leading-relaxed line-clamp-2" style="color: var(--color-text-muted)">
                  {{ comp.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-center">
      <p class="text-3xl mb-3">🔍</p>
      <p class="font-semibold mb-1" style="color: var(--color-text)">No results for "{{ search }}"</p>
      <p class="text-sm" style="color: var(--color-text-muted)">Try a different search term or clear the filter.</p>
      <UiButton variant="ghost" size="sm" class="mt-4" @click="search = ''; activeCategory = 'All'">Clear filters</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allComponents, componentCategories } from '~/data/components'

useHead({
  title: 'Components — UIKit',
  meta: [{ name: 'description', content: 'Browse all available UI components in the UIKit library.' }],
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

const visibleCategories = computed(() => {
  return componentCategories
    .map(cat => ({
      ...cat,
      components: filteredComponents.value.filter(c => c.category === cat.name),
    }))
    .filter(cat => cat.components.length > 0)
})
</script>
