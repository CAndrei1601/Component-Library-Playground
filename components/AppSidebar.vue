<template>
  <div class="flex flex-col h-full py-4">
    <!-- Logo -->
    <div class="px-4 mb-6">
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div
          class="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))"
        >
          U
        </div>
        <div>
          <div class="font-semibold text-sm" style="color: var(--color-text)">UIKit</div>
          <div class="text-xs" style="color: var(--color-text-muted)">Component Library</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-2 space-y-0.5">
      <NuxtLink to="/" class="sidebar-nav-link" active-class="active" exact>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </NuxtLink>

      <NuxtLink to="/components" class="sidebar-nav-link" active-class="active" exact>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        All Components
        <span class="nav-chip">{{ allComponents.length }}</span>
      </NuxtLink>

      <div v-for="category in categories" :key="category.name">
        <div class="sidebar-section-label">{{ category.name }}</div>
        <NuxtLink
          v-for="comp in category.components"
          :key="comp.slug"
          :to="`/components/${comp.slug}`"
          class="sidebar-nav-link"
          active-class="active"
        >
          <span class="text-base leading-none" style="width:15px; display:inline-block; text-align:center">{{ comp.icon }}</span>
          {{ comp.name }}
        </NuxtLink>
      </div>
    </nav>

    <!-- Bottom: Theme Switcher -->
    <div class="px-3 pt-4 border-t border-token mt-4">
      <div class="text-xs font-medium mb-2" style="color: var(--color-text-subtle)">Theme</div>
      <ThemeSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import { allComponents, componentCategories } from '~/data/components'

const categories = componentCategories
</script>
