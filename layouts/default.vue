<template>
  <div class="flex min-h-screen bg-token">
    <!-- Desktop Sidebar -->
    <aside class="sidebar hidden lg:flex">
      <AppSidebar />
    </aside>

    <!-- Mobile Drawer -->
    <MobileDrawer v-model="drawerOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar (mobile only header + global controls) -->
      <header
        class="sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b border-token bg-token"
        style="backdrop-filter: blur(8px); background-color: color-mix(in srgb, var(--color-bg) 85%, transparent);"
      >
        <!-- Mobile menu button -->
        <button
          class="lg:hidden flex items-center gap-2 text-muted"
          aria-label="Open navigation"
          @click="drawerOpen = true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span class="font-semibold text-sm" style="color: var(--color-text)">UIKit</span>
        </button>

        <!-- Desktop spacer -->
        <div class="hidden lg:block" />

        <!-- Right: Theme Switcher -->
        <ThemeSwitcher />
      </header>

      <!-- Page Content -->
      <main class="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawerOpen = ref(false)
</script>
