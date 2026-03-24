<template>
  <div class="code-block">
    <!-- Header bar -->
    <div
      class="flex items-center justify-between px-4 py-2.5 border-b border-token"
      style="background-color: var(--color-bg-secondary)"
    >
      <div class="flex items-center gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full" style="background-color: var(--color-error)" />
        <div class="w-2.5 h-2.5 rounded-full" style="background-color: var(--color-warning)" />
        <div class="w-2.5 h-2.5 rounded-full" style="background-color: var(--color-success)" />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono" style="color: var(--color-text-subtle)">Vue</span>
        <button
          class="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md transition-all"
          :style="{
            color: copied ? 'var(--color-success)' : 'var(--color-text-muted)',
            backgroundColor: 'transparent',
          }"
          aria-label="Copy code"
          @click="copyCode"
        >
          <svg v-if="!copied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <!-- Code content -->
    <pre class="overflow-x-auto"><code ref="codeEl" class="hljs language-xml" v-html="highlighted" /></pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
}>()

const codeEl = ref<HTMLElement | null>(null)
const copied = ref(false)
const highlighted = ref('')

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Simple Vue/HTML highlighter that works without hljs for SSR
const highlightVue = (code: string): string => {
  const escaped = escapeHtml(code)
  return escaped
    // Comments
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hljs-comment">$1</span>')
    // Closing tags
    .replace(/(&lt;\/)([\w-]+)(&gt;)/g, '<span class="hljs-tag">$1<span class="hljs-name">$2</span>$3</span>')
    // Opening tags with attributes
    .replace(/(&lt;)([\w-]+)((?:\s[^&]*?)?)(\/?)(&gt;)/g, (_, open, name, attrs, selfClose, close) => {
      const highlightedAttrs = attrs.replace(/([\w:-]+)(=)(&quot;[^&]*?&quot;)/g,
        '<span class="hljs-attr">$1</span>$2<span class="hljs-string">$3</span>',
      )
      return `<span class="hljs-tag">${open}<span class="hljs-name">${name}</span>${highlightedAttrs}${selfClose}${close}</span>`
    })
    // Boolean props (no value)
    .replace(/\s([\w-]+)(?=\s|&gt;|\/)/g, ' <span class="hljs-attr">$1</span>')
}

const updateHighlight = () => {
  highlighted.value = highlightVue(props.code)
}

watch(() => props.code, updateHighlight, { immediate: true })

onMounted(() => {
  // Try to use highlight.js for better results if available
  import('highlight.js').then(({ default: hljs }) => {
    if (!hljs.getLanguage('xml')) {
      import('highlight.js/lib/languages/xml').then(({ default: xml }) => {
        hljs.registerLanguage('xml', xml)
        highlighted.value = hljs.highlight(props.code, { language: 'xml' }).value
      })
    } else {
      highlighted.value = hljs.highlight(props.code, { language: 'xml' }).value
    }
  }).catch(() => {
    // Fallback to manual highlighter
    updateHighlight()
  })
})

watch(() => props.code, async (newCode) => {
  try {
    const { default: hljs } = await import('highlight.js')
    if (hljs.getLanguage('xml')) {
      highlighted.value = hljs.highlight(newCode, { language: 'xml' }).value
    } else {
      updateHighlight()
    }
  } catch {
    updateHighlight()
  }
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback for older browsers
    const el = document.createElement('textarea')
    el.value = props.code
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>
