<template>
  <div v-if="componentData">

    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1.5 text-xs mb-6" style="color: var(--color-text-subtle)" aria-label="Breadcrumb">
      <NuxtLink to="/components" style="color: var(--color-text-muted); text-decoration: none" class="hover:underline">Components</NuxtLink>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
      <span style="color: var(--color-text)">{{ componentData.name }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-base border border-token flex-shrink-0"
            style="background-color: var(--color-surface-raised)"
          >{{ componentData.icon }}</div>
          <h1 class="page-title truncate">{{ componentData.name }}</h1>
          <UiBadge :label="componentData.category" variant="info" size="sm" class="flex-shrink-0" />
        </div>
        <!-- Prev / Next — hidden on mobile, visible sm+ -->
        <div class="hidden sm:flex items-center gap-2 flex-shrink-0">
          <NuxtLink v-if="prevComponent" :to="`/components/${prevComponent.slug}`">
            <UiButton variant="outline" size="sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              {{ prevComponent.name }}
            </UiButton>
          </NuxtLink>
          <NuxtLink v-if="nextComponent" :to="`/components/${nextComponent.slug}`">
            <UiButton variant="outline" size="sm">
              {{ nextComponent.name }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)"/>
              </svg>
            </UiButton>
          </NuxtLink>
        </div>
      </div>
      <p class="text-sm leading-relaxed" style="color: var(--color-text-muted); max-width: 560px">
        {{ componentData.description }}
      </p>
      <!-- Prev / Next — mobile only, below description -->
      <div class="flex items-center gap-2 mt-3 sm:hidden">
        <NuxtLink v-if="prevComponent" :to="`/components/${prevComponent.slug}`" class="flex-1">
          <UiButton variant="outline" size="sm" :full-width="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {{ prevComponent.name }}
          </UiButton>
        </NuxtLink>
        <NuxtLink v-if="nextComponent" :to="`/components/${nextComponent.slug}`" class="flex-1">
          <UiButton variant="outline" size="sm" :full-width="true">
            {{ nextComponent.name }}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)"/>
            </svg>
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- ── Mobile Tab Bar ──────────────────────────────────────────── -->
    <div class="flex xl:hidden gap-0 mb-5 rounded-xl overflow-hidden border border-token" style="background-color: var(--color-surface)">
      <button
        v-for="tab in mobileTabs"
        :key="tab.id"
        class="flex-1 py-2.5 text-xs font-medium transition-colors"
        :style="{
          color: mobileTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
          backgroundColor: mobileTab === tab.id ? 'var(--color-primary-subtle)' : 'transparent',
          borderRight: tab.id !== 'props' ? '1px solid var(--color-border)' : 'none',
        }"
        @click="mobileTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ── Playground ──────────────────────────────────────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-5 mb-12">

      <!-- Preview + Code (left 3/5) -->
      <div class="xl:col-span-3 flex flex-col gap-4" :class="{ 'hidden xl:flex': mobileTab !== 'preview' && mobileTab !== 'code' }">

        <!-- Live Preview — hidden on mobile when not on preview tab -->
        <div :class="{ 'hidden xl:block': mobileTab === 'code' }">
          <p class="section-title">Preview</p>
          <PlaygroundPreviewBox>
            <template v-if="slug === 'modal'">
              <UiButton variant="primary" @click="modalOpen = true">Open Modal</UiButton>
              <UiModal v-bind="filteredProps" :model-value="modalOpen" @update:model-value="modalOpen = $event" />
            </template>
            <template v-else-if="slug === 'toggle'">
              <UiToggle v-bind="filteredProps" :model-value="toggleValue" @update:model-value="toggleValue = $event" />
            </template>
            <template v-else-if="slug === 'tooltip'">
              <UiTooltip
                :content="currentProps.content as string"
                :position="currentProps.position as any"
                :delay="currentProps.delay as string"
                :trigger-label="currentProps.triggerLabel as string"
              />
            </template>
            <template v-else-if="slug === 'button'">
              <UiButton v-bind="filteredProps">{{ currentProps.label }}</UiButton>
            </template>
            <template v-else-if="slug === 'badge'">
              <UiBadge v-bind="filteredProps">{{ currentProps.label }}</UiBadge>
            </template>
            <template v-else-if="slug === 'avatar'">
              <div class="flex items-center gap-4">
                <UiAvatar v-bind="filteredProps" />
                <div>
                  <p class="text-sm font-medium" style="color: var(--color-text)">{{ currentProps.name }}</p>
                  <p class="text-xs" style="color: var(--color-text-muted)">{{ currentProps.status !== 'none' ? currentProps.status : 'No status' }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="slug === 'input'">
              <div class="w-full max-w-xs">
                <UiInput v-bind="filteredProps" />
              </div>
            </template>
            <template v-else-if="slug === 'select'">
              <div class="w-full max-w-xs">
                <UiSelect v-bind="filteredProps" :options="selectDemoOptions" />
              </div>
            </template>
            <template v-else-if="slug === 'tabs'">
              <div class="w-full max-w-sm">
                <UiTabs
                  :model-value="tabsValue"
                  :tabs="tabsDemoItems"
                  v-bind="filteredProps"
                  @update:model-value="tabsValue = $event"
                />
              </div>
            </template>
            <template v-else-if="slug === 'accordion'">
              <div class="w-full max-w-sm">
                <UiAccordion :items="accordionDemoItems" v-bind="filteredProps" />
              </div>
            </template>
            <template v-else-if="slug === 'toast'">
              <UiButton variant="primary" @click="triggerToast">Show Toast</UiButton>
              <UiToastContainer />
            </template>
            <template v-else-if="slug === 'skeleton'">
              <div class="w-full max-w-xs space-y-3">
                <UiSkeleton v-bind="filteredProps" />
                <UiSkeleton width="75%" :height="filteredProps.height as string" :variant="filteredProps.variant as any" />
                <UiSkeleton width="50%" :height="filteredProps.height as string" :variant="filteredProps.variant as any" />
              </div>
            </template>
            <template v-else-if="slug === 'pagination'">
              <UiPagination v-bind="filteredProps" :model-value="paginationPage" @update:model-value="paginationPage = $event" />
            </template>
            <template v-else>
              <component :is="resolvedComponent" v-bind="filteredProps" />
            </template>
          </PlaygroundPreviewBox>
        </div>

        <!-- Code Snippet — hidden on mobile when not on code tab -->
        <div :class="{ 'hidden xl:block': mobileTab === 'preview' }">
          <p class="section-title">Code</p>
          <PlaygroundCodeViewer :code="codeSnippet" />
        </div>
      </div>

      <!-- Prop Editor (right 2/5) — hidden on mobile unless props tab active -->
      <div class="xl:col-span-2" :class="{ 'hidden xl:block': mobileTab !== 'props' }">
        <div class="flex items-center justify-between mb-2.5">
          <p class="section-title mb-0">Props</p>
          <button
            class="text-xs font-medium transition-colors"
            style="color: var(--color-text-subtle)"
            @click="resetProps"
          >
            Reset
          </button>
        </div>
        <div
          class="rounded-xl border border-token p-4"
          style="background-color: var(--color-surface)"
        >
          <PlaygroundPropEditor
            :prop-defs="componentData.props"
            :model-value="currentProps"
            @update:model-value="currentProps = $event"
          />
        </div>
      </div>
    </div>

    <!-- ── Props Reference ──────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Props API</h2>
      <!-- Scrollable wrapper for mobile -->
      <div class="rounded-xl border border-token overflow-hidden">
        <div class="overflow-x-auto">
          <table class="props-table" style="min-width: 560px">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th class="hidden sm:table-cell">Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in componentData.props" :key="prop.name">
                <td><code>{{ prop.name }}</code></td>
                <td>
                  <code>{{ prop.type }}</code>
                  <span v-if="prop.options" class="block text-xs mt-0.5" style="color: var(--color-text-subtle); font-family: var(--font-mono); font-size: 0.7rem">
                    {{ prop.options.map(o => `"${o}"`).join(' | ') }}
                  </span>
                </td>
                <td><code v-if="prop.default !== undefined">{{ JSON.stringify(prop.default) }}</code><span v-else style="color: var(--color-text-subtle)">—</span></td>
                <td class="hidden sm:table-cell">
                  <UiBadge v-if="prop.required" label="required" variant="error" size="sm" />
                  <span v-else style="color: var(--color-text-subtle)">—</span>
                </td>
                <td style="color: var(--color-text-muted)">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ── Usage Notes ──────────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Usage</h2>
      <div class="callout callout-tip">
        {{ componentData.usageNotes }}
      </div>
    </section>

    <!-- ── Accessibility ────────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Accessibility</h2>
      <div class="rounded-xl border border-token overflow-hidden" style="background-color: var(--color-surface)">
        <ul>
          <li
            v-for="(note, i) in componentData.accessibilityNotes"
            :key="i"
            class="flex items-start gap-3 px-4 sm:px-5 py-3.5"
            :style="i < componentData.accessibilityNotes.length - 1 ? 'border-bottom: 1px solid var(--color-border)' : ''"
          >
            <svg class="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-success)">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ note }}</p>
          </li>
        </ul>
      </div>
    </section>

  </div>

  <!-- 404 state -->
  <div v-else class="flex flex-col items-center justify-center py-24 text-center">
    <div
      class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-token"
      style="background-color: var(--color-surface-raised)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted)">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    </div>
    <h1 class="text-lg font-bold mb-1.5" style="color: var(--color-text)">Component not found</h1>
    <p class="text-sm mb-6" style="color: var(--color-text-muted)">No component named <code class="token-mono">{{ slug }}</code> exists in this library.</p>
    <NuxtLink to="/components">
      <UiButton variant="primary">Back to components</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, resolveComponent } from 'vue'
import { allComponents } from '~/data/components'
import { generateCode } from '~/utils/codeGen'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const componentData = computed(() =>
  allComponents.find(c => c.slug === slug.value),
)

useHead(computed(() => ({
  title: componentData.value ? `${componentData.value.name} — Forma` : 'Not Found — Forma',
  meta: [{ name: 'description', content: componentData.value?.description ?? 'Component not found.' }],
})))

// Mobile tab state
type MobileTab = 'preview' | 'code' | 'props'
const mobileTab = ref<MobileTab>('preview')
const mobileTabs: { id: MobileTab; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'props', label: 'Props' },
]

// Reset mobile tab when component changes
watch(slug, () => { mobileTab.value = 'preview' })

// Prop state
const currentProps = ref<Record<string, string | boolean | number>>({})

watch(componentData, (data) => {
  if (data) currentProps.value = { ...data.defaultProps }
}, { immediate: true })

const resetProps = () => {
  if (componentData.value) currentProps.value = { ...componentData.value.defaultProps }
}

// Special states
const modalOpen = ref(false)
const toggleValue = ref(false)
const tabsValue = ref('tab1')
const paginationPage = ref(1)

// Toast trigger
const { addToast } = useToast()
const triggerToast = () => {
  addToast({
    message: currentProps.value.message as string || 'Action completed successfully',
    variant: (currentProps.value.variant as any) || 'success',
    duration: 3000,
  })
}

// Demo data for complex components
const selectDemoOptions = [
  { value: 'design', label: 'Design System' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
]

const tabsDemoItems = [
  { value: 'tab1', label: 'Overview' },
  { value: 'tab2', label: 'Props' },
  { value: 'tab3', label: 'Examples' },
]

const accordionDemoItems = [
  { title: 'What is a design token?', content: 'Design tokens are named entities that store visual design attributes. They help maintain consistency and scalability across your design system.' },
  { title: 'How does theming work?', content: 'Themes are applied via CSS custom properties on the html element. Switching themes swaps the token values, repainting the entire UI.' },
  { title: 'Is it accessible?', content: 'Yes. All components follow WCAG 2.1 AA guidelines, with proper ARIA attributes and keyboard navigation support.' },
]

// Filtered props (exclude slot-mapped props)
const filteredProps = computed(() => {
  if (!componentData.value) return {}
  const result: Record<string, string | boolean | number> = {}
  for (const prop of componentData.value.props) {
    if (prop.name === 'label' || prop.name === 'triggerLabel') continue
    result[prop.name] = currentProps.value[prop.name]
  }
  return result
})

// Code generation
const codeSnippet = computed(() => {
  if (!componentData.value) return ''
  return generateCode(
    componentData.value.name,
    currentProps.value,
    componentData.value.props,
    componentData.value.defaultProps,
  )
})

// Component map
const componentMap: Record<string, ReturnType<typeof resolveComponent>> = {
  button: resolveComponent('UiButton'),
  badge: resolveComponent('UiBadge'),
  card: resolveComponent('UiCard'),
  alert: resolveComponent('UiAlert'),
  avatar: resolveComponent('UiAvatar'),
  input: resolveComponent('UiInput'),
  toggle: resolveComponent('UiToggle'),
  tooltip: resolveComponent('UiTooltip'),
  modal: resolveComponent('UiModal'),
  spinner: resolveComponent('UiSpinner'),
  select: resolveComponent('UiSelect'),
  tabs: resolveComponent('UiTabs'),
  accordion: resolveComponent('UiAccordion'),
  toast: resolveComponent('UiToast'),
  skeleton: resolveComponent('UiSkeleton'),
  pagination: resolveComponent('UiPagination'),
}

const resolvedComponent = computed(() => componentMap[slug.value])

// Prev / Next nav
const currentIndex = computed(() => allComponents.findIndex(c => c.slug === slug.value))
const prevComponent = computed(() => currentIndex.value > 0 ? allComponents[currentIndex.value - 1] : null)
const nextComponent = computed(() => currentIndex.value < allComponents.length - 1 ? allComponents[currentIndex.value + 1] : null)
</script>
