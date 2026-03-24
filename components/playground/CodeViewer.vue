<template>
  <div class="code-block">
    <!-- Header bar -->
    <div class="code-block-header">
      <div class="flex items-center gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full" style="background: #ff5f57" />
        <div class="w-2.5 h-2.5 rounded-full" style="background: #febc2e" />
        <div class="w-2.5 h-2.5 rounded-full" style="background: #28c840" />
      </div>
      <div class="flex items-center gap-3">
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-text-subtle)">{{ language.toUpperCase() }}</span>
        <button
          class="flex items-center gap-1.5 px-2 py-1 rounded-md transition-all text-xs font-medium"
          :style="{
            color: copied ? 'var(--color-success)' : 'var(--color-text-muted)',
            backgroundColor: copied ? 'var(--color-success-subtle)' : 'transparent',
            border: '1px solid',
            borderColor: copied ? 'var(--color-success-muted)' : 'transparent',
          }"
          aria-label="Copy code to clipboard"
          @click="copyCode"
        >
          <svg v-if="!copied" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <!-- Code content -->
    <pre class="overflow-x-auto" style="padding: 1.25rem 1.5rem; margin: 0"><code
      ref="codeEl"
      class="hljs language-xml"
      v-html="highlighted"
    /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
}>()

const language = computed(() => props.language ?? 'Vue')

const codeEl = ref<HTMLElement | null>(null)
const copied = ref(false)
const highlighted = ref('')

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// SSR-safe manual highlighter for Vue/HTML
const highlightVue = (code: string): string => {
  const escaped = escapeHtml(code)
  return escaped
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hljs-comment">$1</span>')
    .replace(/(&lt;\/)([\w-]+)(&gt;)/g, '<span class="hljs-tag">$1<span class="hljs-name">$2</span>$3</span>')
    .replace(/(&lt;)([\w-]+)((?:\s[^&]*?)?)(\/?)(&gt;)/g, (_, open, name, attrs, selfClose, close) => {
      const highlightedAttrs = attrs.replace(/([\w:-]+)(=)(&quot;[^&]*?&quot;)/g,
        '<span class="hljs-attr">$1</span>$2<span class="hljs-string">$3</span>',
      )
      return `<span class="hljs-tag">${open}<span class="hljs-name">${name}</span>${highlightedAttrs}${selfClose}${close}</span>`
    })
    .replace(/\s([\w-]+)(?=\s|&gt;|\/)/g, ' <span class="hljs-attr">$1</span>')
}

const updateHighlight = () => {
  highlighted.value = highlightVue(props.code)
}

watch(() => props.code, updateHighlight, { immediate: true })

onMounted(async () => {
  try {
    const { default: hljs } = await import('highlight.js')
    if (!hljs.getLanguage('xml')) {
      const { default: xml } = await import('highlight.js/lib/languages/xml')
      hljs.registerLanguage('xml', xml)
    }
    highlighted.value = hljs.highlight(props.code, { language: 'xml' }).value
  } catch {
    updateHighlight()
  }
})

watch(() => props.code, async (newCode) => {
  try {
    const { default: hljs } = await import('highlight.js')
    if (hljs.getLanguage('xml')) {
      highlighted.value = hljs.highlight(newCode, { language: 'xml' }).value
      return
    }
  } catch { /* empty */ }
  updateHighlight()
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    const el = document.createElement('textarea')
    el.value = props.code
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
