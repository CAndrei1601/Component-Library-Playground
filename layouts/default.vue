<template>
  <div class="flex min-h-screen bg-token">
    <!-- Desktop Sidebar -->
    <aside class="sidebar hidden lg:flex lg:flex-col" aria-label="Main navigation">
      <AppSidebar />
    </aside>

    <!-- Mobile Drawer -->
    <MobileDrawer v-model="drawerOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header
        class="sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-token"
        style="backdrop-filter: blur(12px) saturate(180%); background-color: color-mix(in srgb, var(--color-bg) 80%, transparent);"
      >
        <!-- Mobile: hamburger + logo -->
        <button
          class="lg:hidden flex items-center gap-2.5 min-w-0"
          aria-label="Open navigation"
          @click="drawerOpen = true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted); flex-shrink: 0">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="color: white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="font-semibold text-sm tracking-tight" style="color: var(--color-text)">Forma</span>
          </div>
        </button>

        <!-- Desktop: breadcrumb placeholder -->
        <div class="hidden lg:block" />

        <!-- Right side controls -->
        <div class="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 px-4 py-6 sm:px-6 sm:py-10 max-w-5xl mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawerOpen = ref(false)
</script>
