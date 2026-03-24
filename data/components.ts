export interface PropDef {
  name: string
  type: 'string' | 'boolean' | 'number' | 'select'
  default: string | boolean | number
  required?: boolean
  options?: string[]
  description: string
}

export interface ComponentData {
  slug: string
  name: string
  description: string
  category: string
  icon: string
  props: PropDef[]
  defaultProps: Record<string, string | boolean | number>
  accessibilityNotes: string[]
  usageNotes: string
}

export const allComponents: ComponentData[] = [
  {
    slug: 'button',
    name: 'Button',
    description: 'Triggers actions or navigates to a new page. Supports multiple visual variants and sizes.',
    category: 'Actions',
    icon: '⬡',
    props: [
      { name: 'label', type: 'string', default: 'Click me', description: 'The text content of the button' },
      { name: 'variant', type: 'select', default: 'primary', options: ['primary', 'secondary', 'ghost', 'destructive', 'outline'], description: 'Visual style variant' },
      { name: 'size', type: 'select', default: 'md', options: ['sm', 'md', 'lg'], description: 'Size of the button' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disables the button, preventing interaction' },
      { name: 'loading', type: 'boolean', default: false, description: 'Shows a loading spinner and disables interaction' },
      { name: 'fullWidth', type: 'boolean', default: false, description: 'Stretches the button to fill its container' },
    ],
    defaultProps: { label: 'Click me', variant: 'primary', size: 'md', disabled: false, loading: false, fullWidth: false },
    accessibilityNotes: [
      'Uses a native <button> element for full keyboard and screen reader support.',
      'Disabled state sets aria-disabled="true" and prevents pointer events.',
      'Loading state sets aria-busy="true" and provides a visually hidden loading label.',
    ],
    usageNotes: 'Use the `primary` variant for the main call-to-action. Use `secondary` or `ghost` for supporting actions. Reserve `destructive` for irreversible actions like delete.',
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: 'A small status indicator used to label, classify, or highlight an element.',
    category: 'Display',
    icon: '◈',
    props: [
      { name: 'label', type: 'string', default: 'Badge', description: 'The badge text' },
      { name: 'variant', type: 'select', default: 'default', options: ['default', 'success', 'warning', 'error', 'info', 'outline'], description: 'Color variant conveying semantic meaning' },
      { name: 'size', type: 'select', default: 'md', options: ['sm', 'md'], description: 'Size of the badge' },
      { name: 'dot', type: 'boolean', default: false, description: 'Shows a colored dot indicator before the label' },
    ],
    defaultProps: { label: 'Badge', variant: 'default', size: 'md', dot: false },
    accessibilityNotes: [
      'Rendered as a <span> element — ensure surrounding context communicates the badge meaning.',
      'Status badges should be accompanied by a visually hidden text if color alone conveys meaning.',
    ],
    usageNotes: 'Use semantic variants to convey status at a glance: `success` for active/live, `warning` for pending, `error` for failed, `info` for informational context.',
  },
  {
    slug: 'card',
    name: 'Card',
    description: 'A surface container used to group related content and actions.',
    category: 'Display',
    icon: '▭',
    props: [
      { name: 'title', type: 'string', default: 'Card Title', description: 'Heading shown at the top of the card' },
      { name: 'description', type: 'string', default: 'This is a card description with supporting text.', description: 'Body text content inside the card' },
      { name: 'footer', type: 'string', default: 'Card footer', description: 'Optional footer text' },
      { name: 'shadow', type: 'boolean', default: true, description: 'Applies a subtle drop shadow to the card' },
      { name: 'bordered', type: 'boolean', default: true, description: 'Shows a border around the card' },
      { name: 'hoverable', type: 'boolean', default: false, description: 'Adds a hover lift effect' },
    ],
    defaultProps: { title: 'Card Title', description: 'This is a card description with supporting text.', footer: 'Card footer', shadow: true, bordered: true, hoverable: false },
    accessibilityNotes: [
      'Cards are generic containers — heading hierarchy should be maintained based on page context.',
      'Interactive cards (hoverable) should be navigable via keyboard if they contain a link or button.',
    ],
    usageNotes: 'Use cards to create visual separation between content sections. Avoid excessive nesting of cards within cards.',
  },
  {
    slug: 'alert',
    name: 'Alert',
    description: 'Displays a contextual message to communicate status, feedback, or important information.',
    category: 'Feedback',
    icon: '◬',
    props: [
      { name: 'title', type: 'string', default: 'Heads up!', description: 'Short summary headline for the alert' },
      { name: 'message', type: 'string', default: 'This is an informational message with some detail.', description: 'Body text of the alert' },
      { name: 'variant', type: 'select', default: 'info', options: ['info', 'success', 'warning', 'error'], description: 'Semantic color variant' },
      { name: 'dismissible', type: 'boolean', default: false, description: 'Shows a close button to dismiss the alert' },
      { name: 'showIcon', type: 'boolean', default: true, description: 'Displays a contextual icon alongside the message' },
    ],
    defaultProps: { title: 'Heads up!', message: 'This is an informational message with some detail.', variant: 'info', dismissible: false, showIcon: true },
    accessibilityNotes: [
      'Uses role="alert" so screen readers announce the content immediately.',
      'For non-urgent messages, use role="status" instead by passing the appropriate ARIA role.',
      'The dismiss button has an aria-label for screen reader users.',
    ],
    usageNotes: 'Use `info` for neutral updates, `success` for completed actions, `warning` for things requiring attention, and `error` for failed operations.',
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    description: 'Represents a user or entity — displays a photo, or falls back to initials.',
    category: 'Display',
    icon: '◎',
    props: [
      { name: 'name', type: 'string', default: 'Jane Doe', description: 'Full name used to generate initials fallback' },
      { name: 'src', type: 'string', default: '', description: 'URL of the avatar image (leave empty for initials)' },
      { name: 'size', type: 'select', default: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Size of the avatar' },
      { name: 'shape', type: 'select', default: 'circle', options: ['circle', 'square'], description: 'Border radius shape' },
      { name: 'status', type: 'select', default: 'none', options: ['none', 'online', 'offline', 'busy', 'away'], description: 'Presence indicator badge' },
    ],
    defaultProps: { name: 'Jane Doe', src: '', size: 'md', shape: 'circle', status: 'none' },
    accessibilityNotes: [
      'Always provides alt text derived from the name prop when rendering an image.',
      'When used without accompanying visible name, wrap in an element with aria-label.',
    ],
    usageNotes: 'For image-based avatars, ensure high-quality square images for best results. The initials fallback uses a deterministic color based on the name.',
  },
  {
    slug: 'input',
    name: 'Input',
    description: 'A text field for capturing user input. Supports labels, hints, validation states, and icons.',
    category: 'Forms',
    icon: '▱',
    props: [
      { name: 'label', type: 'string', default: 'Email address', description: 'Visible label above the input' },
      { name: 'placeholder', type: 'string', default: 'you@example.com', description: 'Placeholder text shown when empty' },
      { name: 'type', type: 'select', default: 'text', options: ['text', 'email', 'password', 'number', 'search', 'url'], description: 'HTML input type' },
      { name: 'hint', type: 'string', default: '', description: 'Helper text shown below the input' },
      { name: 'error', type: 'string', default: '', description: 'Error message (replaces hint when set)' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Prevents interaction with the input' },
      { name: 'required', type: 'boolean', default: false, description: 'Marks the field as required' },
    ],
    defaultProps: { label: 'Email address', placeholder: 'you@example.com', type: 'text', hint: '', error: '', disabled: false, required: false },
    accessibilityNotes: [
      'The label is always associated with the input via htmlFor/id.',
      'Error messages are announced to screen readers via aria-describedby.',
      'Required fields have aria-required="true".',
    ],
    usageNotes: 'Always provide a visible label. Use `hint` for formatting guidance. The `error` prop visually highlights the field and announces the error to assistive technologies.',
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'A switch control for toggling a boolean setting on or off.',
    category: 'Forms',
    icon: '⊙',
    props: [
      { name: 'label', type: 'string', default: 'Enable notifications', description: 'Text label displayed next to the toggle' },
      { name: 'checked', type: 'boolean', default: false, description: 'Whether the toggle is in the on state' },
      { name: 'size', type: 'select', default: 'md', options: ['sm', 'md', 'lg'], description: 'Size of the toggle control' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Prevents user interaction' },
      { name: 'description', type: 'string', default: '', description: 'Secondary descriptive text below the label' },
    ],
    defaultProps: { label: 'Enable notifications', checked: false, size: 'md', disabled: false, description: '' },
    accessibilityNotes: [
      'Uses role="switch" with aria-checked to communicate state to screen readers.',
      'Fully keyboard accessible — Space or Enter toggles the state.',
      'The label is always associated with the control.',
    ],
    usageNotes: 'Use toggles for binary settings that take effect immediately without requiring confirmation. For settings that need a save action, consider using a checkbox instead.',
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'A non-interactive floating label that appears on hover or focus to provide additional context.',
    category: 'Feedback',
    icon: '◌',
    props: [
      { name: 'content', type: 'string', default: 'This is a helpful tooltip', description: 'The text content shown inside the tooltip' },
      { name: 'position', type: 'select', default: 'top', options: ['top', 'bottom', 'left', 'right'], description: 'Preferred placement of the tooltip' },
      { name: 'triggerLabel', type: 'string', default: 'Hover over me', description: 'Label for the trigger button in the preview' },
      { name: 'delay', type: 'select', default: '200', options: ['0', '200', '500'], description: 'Delay before tooltip appears (ms)' },
    ],
    defaultProps: { content: 'This is a helpful tooltip', position: 'top', triggerLabel: 'Hover over me', delay: '200' },
    accessibilityNotes: [
      'Uses role="tooltip" and aria-describedby to associate tooltip content with its trigger.',
      'Tooltip content is never the only way to convey critical information.',
      'Tooltips are visible on keyboard focus as well as hover.',
    ],
    usageNotes: 'Keep tooltip content short and supplementary. Never put essential or interactive content inside a tooltip.',
  },
  {
    slug: 'modal',
    name: 'Modal',
    description: 'A dialog overlay that focuses user attention on a specific task or message.',
    category: 'Feedback',
    icon: '⬜',
    props: [
      { name: 'title', type: 'string', default: 'Confirm action', description: 'Dialog heading text' },
      { name: 'description', type: 'string', default: 'Are you sure you want to proceed? This action cannot be undone.', description: 'Body text content of the modal' },
      { name: 'size', type: 'select', default: 'md', options: ['sm', 'md', 'lg', 'full'], description: 'Width of the modal dialog' },
      { name: 'showFooter', type: 'boolean', default: true, description: 'Displays action buttons in the footer' },
      { name: 'closeOnOverlay', type: 'boolean', default: true, description: 'Allows dismissing by clicking the backdrop' },
    ],
    defaultProps: { title: 'Confirm action', description: 'Are you sure you want to proceed? This action cannot be undone.', size: 'md', showFooter: true, closeOnOverlay: true },
    accessibilityNotes: [
      'Uses role="dialog" with aria-modal="true" to signal a modal context.',
      'Focus is trapped inside the modal while it is open.',
      'Pressing Escape closes the modal.',
      'Focus returns to the triggering element upon close.',
    ],
    usageNotes: 'Use modals sparingly — they interrupt user flow. For simple confirmations, prefer a popover or inline message. Always provide a clear way to dismiss.',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    description: 'An animated loading indicator used to communicate that a process is in progress.',
    category: 'Feedback',
    icon: '⟳',
    props: [
      { name: 'size', type: 'select', default: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Size of the spinner' },
      { name: 'variant', type: 'select', default: 'primary', options: ['primary', 'muted', 'white'], description: 'Color variant of the spinner' },
      { name: 'label', type: 'string', default: 'Loading…', description: 'Screen reader accessible label' },
      { name: 'showLabel', type: 'boolean', default: false, description: 'Shows the loading label visually below the spinner' },
    ],
    defaultProps: { size: 'md', variant: 'primary', label: 'Loading…', showLabel: false },
    accessibilityNotes: [
      'Has role="status" and aria-label so screen readers announce the loading state.',
      'When the label is visually hidden, it is still accessible via aria-label.',
    ],
    usageNotes: 'Use spinners for indeterminate loading states. For operations with known progress, use a progress bar instead. Always provide a meaningful label.',
  },
]

export const componentCategories = [
  {
    name: 'Actions',
    components: allComponents.filter(c => c.category === 'Actions'),
  },
  {
    name: 'Forms',
    components: allComponents.filter(c => c.category === 'Forms'),
  },
  {
    name: 'Display',
    components: allComponents.filter(c => c.category === 'Display'),
  },
  {
    name: 'Feedback',
    components: allComponents.filter(c => c.category === 'Feedback'),
  },
]
