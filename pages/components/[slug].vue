<template>
  <div v-if="componentData">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs mb-6" style="color: var(--color-text-muted)" aria-label="Breadcrumb">
      <NuxtLink to="/components" style="color: var(--color-text-muted); text-decoration: none" class="hover:underline">Components</NuxtLink>
      <span>/</span>
      <span style="color: var(--color-text)">{{ componentData.name }}</span>
    </nav>

    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <span class="text-2xl">{{ componentData.icon }}</span>
          <h1 class="page-title">{{ componentData.name }}</h1>
          <UiBadge :label="componentData.category" variant="info" size="sm" />
        </div>
        <p class="text-sm leading-relaxed max-w-2xl" style="color: var(--color-text-muted)">
          {{ componentData.description }}
        </p>
      </div>
      <!-- Prev / Next navigation -->
      <div class="flex items-center gap-2">
        <NuxtLink v-if="prevComponent" :to="`/components/${prevComponent.slug}`">
          <UiButton variant="outline" size="sm">← {{ prevComponent.name }}</UiButton>
        </NuxtLink>
        <NuxtLink v-if="nextComponent" :to="`/components/${nextComponent.slug}`">
          <UiButton variant="outline" size="sm">{{ nextComponent.name }} →</UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- ── Playground ──────────────────────────────────────────── -->
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-10">
      <!-- Preview + Code (left 3/5) -->
      <div class="xl:col-span-3 flex flex-col gap-4">
        <!-- Live Preview -->
        <div>
          <p class="section-title">Preview</p>
          <PlaygroundPreviewBox>
            <!-- Modal: special rendering with trigger button -->
            <template v-if="slug === 'modal'">
              <UiButton variant="primary" @click="modalOpen = true">Open Modal</UiButton>
              <UiModal
                v-bind="filteredProps"
                :model-value="modalOpen"
                @update:model-value="modalOpen = $event"
              />
            </template>

            <!-- Toggle: needs v-model -->
            <template v-else-if="slug === 'toggle'">
              <UiToggle
                v-bind="filteredProps"
                :model-value="toggleValue"
                @update:model-value="toggleValue = $event"
              />
            </template>

            <!-- Tooltip: wraps a trigger button -->
            <template v-else-if="slug === 'tooltip'">
              <UiTooltip
                :content="currentProps.content as string"
                :position="currentProps.position as any"
                :delay="currentProps.delay as string"
                :trigger-label="currentProps.triggerLabel as string"
              />
            </template>

            <!-- Button: uses label as slot content -->
            <template v-else-if="slug === 'button'">
              <UiButton v-bind="filteredProps">{{ currentProps.label }}</UiButton>
            </template>

            <!-- Badge: uses label as slot content -->
            <template v-else-if="slug === 'badge'">
              <UiBadge v-bind="filteredProps">{{ currentProps.label }}</UiBadge>
            </template>

            <!-- Avatar -->
            <template v-else-if="slug === 'avatar'">
              <div class="flex items-center gap-4">
                <UiAvatar v-bind="filteredProps" />
                <div>
                  <p class="text-sm font-medium" style="color: var(--color-text)">{{ currentProps.name }}</p>
                  <p class="text-xs" style="color: var(--color-text-muted)">{{ currentProps.status !== 'none' ? currentProps.status : 'No status' }}</p>
                </div>
              </div>
            </template>

            <!-- Input -->
            <template v-else-if="slug === 'input'">
              <div class="w-full max-w-xs">
                <UiInput v-bind="filteredProps" />
              </div>
            </template>

            <!-- Default: dynamic component with all props -->
            <template v-else>
              <component :is="resolvedComponent" v-bind="filteredProps" />
            </template>
          </PlaygroundPreviewBox>
        </div>

        <!-- Code Snippet -->
        <div>
          <p class="section-title">Code</p>
          <PlaygroundCodeViewer :code="codeSnippet" />
        </div>
      </div>

      <!-- Prop Editor (right 2/5) -->
      <div class="xl:col-span-2">
        <p class="section-title">Props</p>
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

    <!-- ── Props Table ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Props reference</h2>
      <div class="rounded-xl border border-token overflow-hidden">
        <table class="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in componentData.props" :key="prop.name">
              <td><code>{{ prop.name }}</code></td>
              <td>
                <code>{{ prop.type }}</code>
                <span v-if="prop.options" class="block text-xs mt-0.5" style="color: var(--color-text-subtle)">
                  {{ prop.options.map(o => `"${o}"`).join(' | ') }}
                </span>
              </td>
              <td><code>{{ JSON.stringify(prop.default) }}</code></td>
              <td>
                <UiBadge v-if="prop.required" label="required" variant="error" size="sm" />
                <span v-else style="color: var(--color-text-subtle)">—</span>
              </td>
              <td style="color: var(--color-text-muted)">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Usage Notes ─────────────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Usage</h2>
      <div
        class="p-5 rounded-xl border border-token text-sm leading-relaxed"
        style="background-color: var(--color-surface); color: var(--color-text-muted)"
      >
        {{ componentData.usageNotes }}
      </div>
    </section>

    <!-- ── Accessibility Notes ─────────────────────────────────── -->
    <section class="mb-10">
      <h2 class="page-title text-lg mb-4">Accessibility</h2>
      <div class="rounded-xl border border-token overflow-hidden" style="background-color: var(--color-surface)">
        <ul class="divide-y" style="border-color: var(--color-border)">
          <li
            v-for="(note, i) in componentData.accessibilityNotes"
            :key="i"
            class="flex items-start gap-3 px-5 py-4"
          >
            <svg class="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-success)">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ note }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>

  <!-- 404 state -->
  <div v-else class="flex flex-col items-center justify-center py-24 text-center">
    <p class="text-4xl mb-4">404</p>
    <h1 class="text-xl font-bold mb-2" style="color: var(--color-text)">Component not found</h1>
    <p class="text-sm mb-6" style="color: var(--color-text-muted)">No component with slug "{{ slug }}" exists.</p>
    <NuxtLink to="/components">
      <UiButton variant="primary">Back to components</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { allComponents } from '~/data/components'
import { generateCode } from '~/utils/codeGen'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const componentData = computed(() =>
  allComponents.find(c => c.slug === slug.value),
)

// SEO
useHead(computed(() => ({
  title: componentData.value ? `${componentData.value.name} — UIKit` : 'Not Found — UIKit',
  meta: [
    {
      name: 'description',
      content: componentData.value?.description ?? 'Component not found.',
    },
  ],
})))

// Current prop values — initialized from defaults
const currentProps = ref<Record<string, string | boolean | number>>({})

watch(componentData, (data) => {
  if (data) {
    currentProps.value = { ...data.defaultProps }
  }
}, { immediate: true })

// Modal-specific state
const modalOpen = ref(false)
// Toggle-specific state
const toggleValue = ref(false)

// Props to pass to the component (excluding "label" which is slot content)
const filteredProps = computed(() => {
  if (!componentData.value) return {}
  const result: Record<string, string | boolean | number> = {}
  for (const prop of componentData.value.props) {
    if (prop.name === 'label' || prop.name === 'triggerLabel') continue
    result[prop.name] = currentProps.value[prop.name]
  }
  return result
})

// Code snippet generation
const codeSnippet = computed(() => {
  if (!componentData.value) return ''
  return generateCode(
    componentData.value.name,
    currentProps.value,
    componentData.value.props,
    componentData.value.defaultProps,
  )
})

// Dynamic component resolution for generic cases
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
}

const resolvedComponent = computed(() => componentMap[slug.value])

// Prev / Next navigation
const currentIndex = computed(() => allComponents.findIndex(c => c.slug === slug.value))
const prevComponent = computed(() => currentIndex.value > 0 ? allComponents[currentIndex.value - 1] : null)
const nextComponent = computed(() => currentIndex.value < allComponents.length - 1 ? allComponents[currentIndex.value + 1] : null)
</script>
