<template>
  <div class="flex flex-col h-full py-4 gap-0">

    <!-- Logo -->
    <div class="px-3 mb-5">
      <NuxtLink to="/" class="flex items-center gap-2.5 group py-1 px-1 rounded-xl hover:bg-surface-raised transition-colors" style="text-decoration: none">
        <div
          class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover)); box-shadow: 0 2px 8px var(--color-primary-muted)"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div class="min-w-0">
          <div class="font-semibold text-sm tracking-tight leading-tight" style="color: var(--color-text)">Forma</div>
          <div class="text-xs leading-tight" style="color: var(--color-text-subtle); font-size: 0.7rem">Design System</div>
        </div>
        <UiBadge label="v1.0" variant="default" size="sm" class="ml-auto opacity-60" />
      </NuxtLink>
    </div>

    <!-- Main Nav -->
    <nav class="flex-1 px-2 overflow-y-auto" aria-label="Sidebar navigation">
      <div class="space-y-0.5">
        <NuxtLink to="/" class="sidebar-nav-link" active-class="active" exact>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </NuxtLink>

        <NuxtLink to="/components" class="sidebar-nav-link" active-class="active" exact>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Components
          <span class="nav-chip">{{ allComponents.length }}</span>
        </NuxtLink>

        <NuxtLink to="/tokens" class="sidebar-nav-link" active-class="active">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
          Design Tokens
        </NuxtLink>
      </div>

      <!-- Component Categories -->
      <div v-for="category in categories" :key="category.name" class="mt-1">
        <div class="sidebar-section-label">{{ category.name }}</div>
        <div class="space-y-0.5">
          <NuxtLink
            v-for="comp in category.components"
            :key="comp.slug"
            :to="`/components/${comp.slug}`"
            class="sidebar-nav-link"
            active-class="active"
            @click="$emit('navigate')"
          >
            <span class="text-sm leading-none flex-shrink-0" style="width: 14px; text-align: center; display: inline-block">{{ comp.icon }}</span>
            {{ comp.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Footer: Theme Switcher -->
    <div class="px-3 pt-3 mt-3 border-t border-token">
      <div class="label-xs mb-2">Theme</div>
      <ThemeSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import { allComponents, componentCategories } from '~/data/components'

const categories = componentCategories

defineEmits<{ navigate: [] }>()
</script>
