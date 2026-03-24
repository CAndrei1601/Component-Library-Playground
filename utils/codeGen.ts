import type { PropDef } from '~/data/components'

/**
 * Generates a Vue template code snippet for a component with the given props.
 */
export function generateCode(
  componentName: string,
  currentProps: Record<string, string | boolean | number>,
  propDefs: PropDef[],
  defaultProps: Record<string, string | boolean | number>,
): string {
  const attrs: string[] = []
  let slotContent = ''

  for (const def of propDefs) {
    const value = currentProps[def.name]
    const isDefault = value === defaultProps[def.name]

    // "label" maps to slot content, not a prop
    if (def.name === 'label') {
      slotContent = String(value)
      continue
    }

    // Skip default values to keep snippet minimal
    if (isDefault) continue

    if (typeof value === 'boolean') {
      if (value === true) {
        attrs.push(def.name)
      } else {
        attrs.push(`:${def.name}="false"`)
      }
    } else if (typeof value === 'number') {
      attrs.push(`:${def.name}="${value}"`)
    } else {
      attrs.push(`${def.name}="${value}"`)
    }
  }

  const attrsStr = attrs.length > 0 ? '\n  ' + attrs.join('\n  ') + '\n' : ''

  if (slotContent) {
    if (attrsStr) {
      return `<${componentName}${attrsStr}>\n  ${slotContent}\n</${componentName}>`
    }
    return `<${componentName}>\n  ${slotContent}\n</${componentName}>`
  }

  if (attrsStr) {
    return `<${componentName}${attrsStr}/>`
  }

  return `<${componentName} />`
}
