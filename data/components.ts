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

  // ── Actions ──────────────────────────────────────────────────────────────

  {
    slug: 'button',
    name: 'Button',
    description: 'Triggers actions or navigation. Supports five visual variants, three sizes, loading and disabled states.',
    category: 'Actions',
    icon: '⬡',
    props: [
      { name: 'label',     type: 'string',  default: 'Click me',  description: 'Button text content (maps to default slot)' },
      { name: 'variant',   type: 'select',  default: 'primary',   options: ['primary', 'secondary', 'ghost', 'destructive', 'outline'], description: 'Visual style variant' },
      { name: 'size',      type: 'select',  default: 'md',        options: ['sm', 'md', 'lg'], description: 'Button size' },
      { name: 'disabled',  type: 'boolean', default: false,       description: 'Disables the button and prevents interaction' },
      { name: 'loading',   type: 'boolean', default: false,       description: 'Shows a spinner; implies disabled' },
      { name: 'fullWidth', type: 'boolean', default: false,       description: 'Stretches the button to fill its container' },
    ],
    defaultProps: { label: 'Click me', variant: 'primary', size: 'md', disabled: false, loading: false, fullWidth: false },
    accessibilityNotes: [
      'Uses a native <button> element for full keyboard and screen reader support.',
      'Disabled state sets aria-disabled="true" and prevents pointer events.',
      'Loading state sets aria-busy="true" and provides a visually hidden loading label.',
      'Focus ring uses a 2px outline with 2px offset — visible in all themes.',
    ],
    usageNotes: 'Use "primary" for the single main call-to-action per section. "secondary" and "ghost" work for supporting actions. Reserve "destructive" strictly for irreversible operations like permanent deletion. Never use more than one "primary" button in the same visual group.',
  },

  // ── Forms ─────────────────────────────────────────────────────────────────

  {
    slug: 'input',
    name: 'Input',
    description: 'A text field for capturing user input. Supports labels, hints, error states, and multiple input types.',
    category: 'Forms',
    icon: '▱',
    props: [
      { name: 'label',       type: 'string',  default: 'Email address',      description: 'Visible label above the input' },
      { name: 'placeholder', type: 'string',  default: 'you@example.com',    description: 'Placeholder shown when the field is empty' },
      { name: 'type',        type: 'select',  default: 'text',               options: ['text', 'email', 'password', 'number', 'search', 'url'], description: 'HTML input type' },
      { name: 'hint',        type: 'string',  default: '',                   description: 'Helper text shown below the input' },
      { name: 'error',       type: 'string',  default: '',                   description: 'Error message — replaces hint and visually marks the field' },
      { name: 'disabled',    type: 'boolean', default: false,                description: 'Prevents interaction with the input' },
      { name: 'required',    type: 'boolean', default: false,                description: 'Marks the field as required' },
    ],
    defaultProps: { label: 'Email address', placeholder: 'you@example.com', type: 'text', hint: '', error: '', disabled: false, required: false },
    accessibilityNotes: [
      'Label is always associated with the input via matching for/id attributes.',
      'Error messages are linked via aria-describedby so screen readers announce them.',
      'Required fields include aria-required="true".',
      'Error state uses aria-invalid="true" to signal invalid input to assistive tech.',
    ],
    usageNotes: 'Always pair an input with a visible label — never rely on placeholder text alone. Use "hint" to explain expected format or constraints. The "error" prop takes over from "hint" and should describe what went wrong and how to fix it.',
  },
  {
    slug: 'select',
    name: 'Select',
    description: 'A custom dropdown for choosing from a list of options. Supports keyboard navigation and accessible labeling.',
    category: 'Forms',
    icon: '⌄',
    props: [
      { name: 'label',       type: 'string',  default: 'Team',               description: 'Visible label above the select' },
      { name: 'placeholder', type: 'string',  default: 'Choose a team…',     description: 'Shown when no value is selected' },
      { name: 'hint',        type: 'string',  default: '',                   description: 'Helper text below the select' },
      { name: 'error',       type: 'string',  default: '',                   description: 'Error message when validation fails' },
      { name: 'disabled',    type: 'boolean', default: false,                description: 'Prevents interaction' },
      { name: 'required',    type: 'boolean', default: false,                description: 'Marks the field as required' },
    ],
    defaultProps: { label: 'Team', placeholder: 'Choose a team…', hint: '', error: '', disabled: false, required: false },
    accessibilityNotes: [
      'Uses role="combobox" on the trigger and role="listbox" on the dropdown.',
      'Keyboard navigation: ArrowUp/Down moves between options, Enter/Space opens/closes, Escape closes.',
      'aria-expanded reflects the open state of the dropdown.',
      'Selected option uses aria-selected="true".',
    ],
    usageNotes: 'Use a Select when there are 5 or more options. For 2–4 options, consider Radio buttons instead — they allow the user to see all choices at once. Always provide a clear placeholder or default selection.',
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    description: 'A switch control for boolean settings that take immediate effect — no confirmation required.',
    category: 'Forms',
    icon: '⊙',
    props: [
      { name: 'label',       type: 'string',  default: 'Enable notifications', description: 'Text label displayed next to the toggle' },
      { name: 'checked',     type: 'boolean', default: false,                  description: 'Whether the toggle is in the on state' },
      { name: 'size',        type: 'select',  default: 'md',                   options: ['sm', 'md', 'lg'], description: 'Size of the control' },
      { name: 'disabled',    type: 'boolean', default: false,                  description: 'Prevents user interaction' },
      { name: 'description', type: 'string',  default: '',                     description: 'Secondary descriptive text below the label' },
    ],
    defaultProps: { label: 'Enable notifications', checked: false, size: 'md', disabled: false, description: '' },
    accessibilityNotes: [
      'Uses role="switch" with aria-checked to communicate state to screen readers.',
      'Keyboard accessible — Space or Enter toggles the state.',
      'The visible label is always associated with the control via aria-labelledby.',
    ],
    usageNotes: 'Use toggles only for settings that apply immediately without a save action. For anything requiring confirmation — or in a form that needs to be submitted — use a Checkbox instead.',
  },

  // ── Display ───────────────────────────────────────────────────────────────

  {
    slug: 'badge',
    name: 'Badge',
    description: 'A compact status indicator for labeling, classifying, or highlighting elements.',
    category: 'Display',
    icon: '◈',
    props: [
      { name: 'label',   type: 'string',  default: 'Badge',   description: 'The badge text content' },
      { name: 'variant', type: 'select',  default: 'default', options: ['default', 'success', 'warning', 'error', 'info', 'outline'], description: 'Color variant conveying semantic meaning' },
      { name: 'size',    type: 'select',  default: 'md',      options: ['sm', 'md'], description: 'Size of the badge' },
      { name: 'dot',     type: 'boolean', default: false,      description: 'Adds a colored dot indicator before the text' },
    ],
    defaultProps: { label: 'Badge', variant: 'default', size: 'md', dot: false },
    accessibilityNotes: [
      'Rendered as a <span> — surrounding context must convey the badge meaning.',
      'When color alone communicates status, add a visually hidden text alternative.',
    ],
    usageNotes: 'Use semantic variants to communicate status at a glance: "success" for live/active, "warning" for pending/attention, "error" for failed/critical, "info" for neutral context. Avoid stacking multiple badges next to each other.',
  },
  {
    slug: 'card',
    name: 'Card',
    description: 'A surface container for grouping related content, data, or actions into a cohesive unit.',
    category: 'Display',
    icon: '▭',
    props: [
      { name: 'title',       type: 'string',  default: 'Card Title',                           description: 'Heading shown at the top of the card' },
      { name: 'description', type: 'string',  default: 'A concise description of the content.', description: 'Body text content inside the card' },
      { name: 'footer',      type: 'string',  default: 'Card footer',                          description: 'Optional footer text content' },
      { name: 'shadow',      type: 'boolean', default: true,                                   description: 'Applies a subtle drop shadow' },
      { name: 'bordered',    type: 'boolean', default: true,                                   description: 'Shows a border around the card' },
      { name: 'hoverable',   type: 'boolean', default: false,                                  description: 'Adds a hover lift and shadow effect' },
    ],
    defaultProps: { title: 'Card Title', description: 'A concise description of the content.', footer: 'Card footer', shadow: true, bordered: true, hoverable: false },
    accessibilityNotes: [
      'Cards are generic containers — maintain correct heading hierarchy based on page context.',
      'If the card is interactive (hoverable), ensure a focusable element such as a link or button is present inside.',
    ],
    usageNotes: 'Use cards to create visual separation between distinct content sections. Avoid nesting cards within cards. For a list of similar items, consider a table or list layout instead.',
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    description: 'Represents a user or entity. Displays a photo, or gracefully falls back to initials.',
    category: 'Display',
    icon: '◎',
    props: [
      { name: 'name',   type: 'string',  default: 'Jane Doe', description: 'Full name — used for the initials fallback and alt text' },
      { name: 'src',    type: 'string',  default: '',         description: 'Image URL — leave empty to render initials' },
      { name: 'size',   type: 'select',  default: 'md',       options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Size of the avatar' },
      { name: 'shape',  type: 'select',  default: 'circle',   options: ['circle', 'square'], description: 'Border radius shape' },
      { name: 'status', type: 'select',  default: 'none',     options: ['none', 'online', 'offline', 'busy', 'away'], description: 'Presence indicator badge' },
    ],
    defaultProps: { name: 'Jane Doe', src: '', size: 'md', shape: 'circle', status: 'none' },
    accessibilityNotes: [
      'Image avatars always include alt text derived from the name prop.',
      'When used without an accompanying visible name, wrap in an element with aria-label.',
      'Presence status badges include a visually hidden text description.',
    ],
    usageNotes: 'For image-based avatars, provide square images for best results. The initials fallback uses a deterministic color derived from the name string.',
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'A loading placeholder with a shimmer animation that mimics the shape of the content it replaces.',
    category: 'Display',
    icon: '▒',
    props: [
      { name: 'width',     type: 'string',  default: '100%',     description: 'Width of the skeleton element' },
      { name: 'height',    type: 'string',  default: '1rem',     description: 'Height of the skeleton element' },
      { name: 'variant',   type: 'select',  default: 'rect',     options: ['rect', 'text', 'circle', 'button'], description: 'Preset shape variant' },
      { name: 'ariaLabel', type: 'string',  default: 'Loading…', description: 'Screen reader label for the loading state' },
    ],
    defaultProps: { width: '100%', height: '1rem', variant: 'rect', ariaLabel: 'Loading…' },
    accessibilityNotes: [
      'Uses role="status" so screen readers announce the loading state.',
      'The aria-label prop provides a meaningful description of what is loading.',
      'The shimmer animation is disabled via prefers-reduced-motion.',
    ],
    usageNotes: 'Match the skeleton shape and size to the content it replaces. Avoid showing skeletons for very short loading times (< 300ms) — it creates more perceived latency. Use text variant for text lines, circle for avatars, button for button placeholders.',
  },

  // ── Feedback ──────────────────────────────────────────────────────────────

  {
    slug: 'alert',
    name: 'Alert',
    description: 'Displays a contextual status message. Use for important feedback that requires user attention.',
    category: 'Feedback',
    icon: '◬',
    props: [
      { name: 'title',       type: 'string',  default: 'Heads up!',                                     description: 'Alert headline' },
      { name: 'message',     type: 'string',  default: 'This is an informational message with detail.', description: 'Alert body text' },
      { name: 'variant',     type: 'select',  default: 'info',                                          options: ['info', 'success', 'warning', 'error'], description: 'Semantic color variant' },
      { name: 'dismissible', type: 'boolean', default: false,                                            description: 'Shows a close button to dismiss the alert' },
      { name: 'showIcon',    type: 'boolean', default: true,                                             description: 'Displays a contextual icon' },
    ],
    defaultProps: { title: 'Heads up!', message: 'This is an informational message with detail.', variant: 'info', dismissible: false, showIcon: true },
    accessibilityNotes: [
      'Uses role="alert" so screen readers announce the content immediately on render.',
      'For non-urgent messages, role="status" is more appropriate.',
      'The dismiss button includes an aria-label for screen readers.',
    ],
    usageNotes: 'Use "info" for neutral updates, "success" for completed actions, "warning" for things needing attention, and "error" for failures. Place alerts near the content they relate to — not always at the top of the page.',
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'A non-interactive floating label that appears on hover or focus to provide supplementary context.',
    category: 'Feedback',
    icon: '◌',
    props: [
      { name: 'content',      type: 'string',  default: 'This is a helpful tooltip', description: 'Text content of the tooltip' },
      { name: 'position',     type: 'select',  default: 'top',                       options: ['top', 'bottom', 'left', 'right'], description: 'Placement of the tooltip relative to the trigger' },
      { name: 'triggerLabel', type: 'string',  default: 'Hover over me',             description: 'Label for the demo trigger button' },
      { name: 'delay',        type: 'select',  default: '200',                       options: ['0', '200', '500'], description: 'Delay before tooltip appears (ms)' },
    ],
    defaultProps: { content: 'This is a helpful tooltip', position: 'top', triggerLabel: 'Hover over me', delay: '200' },
    accessibilityNotes: [
      'Uses role="tooltip" and aria-describedby to associate tooltip content with its trigger.',
      'Tooltip content is never the sole way to convey critical information.',
      'Tooltips appear on keyboard focus as well as pointer hover.',
    ],
    usageNotes: 'Keep tooltip content short (under 80 characters). Never place interactive elements — links, buttons — inside a tooltip. Tooltips should supplement visible UI, never replace it.',
  },
  {
    slug: 'modal',
    name: 'Modal',
    description: 'A dialog overlay that focuses user attention on a task or confirmation. Use sparingly.',
    category: 'Feedback',
    icon: '⬜',
    props: [
      { name: 'title',           type: 'string',  default: 'Confirm action',                                    description: 'Dialog heading' },
      { name: 'description',     type: 'string',  default: 'Are you sure you want to proceed? This cannot be undone.', description: 'Dialog body content' },
      { name: 'size',            type: 'select',  default: 'md',                                               options: ['sm', 'md', 'lg', 'full'], description: 'Width of the dialog' },
      { name: 'showFooter',      type: 'boolean', default: true,                                               description: 'Displays action buttons in the footer' },
      { name: 'closeOnOverlay',  type: 'boolean', default: true,                                               description: 'Closes the modal when clicking the backdrop' },
    ],
    defaultProps: { title: 'Confirm action', description: 'Are you sure you want to proceed? This cannot be undone.', size: 'md', showFooter: true, closeOnOverlay: true },
    accessibilityNotes: [
      'Uses role="dialog" with aria-modal="true".',
      'Focus is trapped inside the modal while it is open.',
      'Pressing Escape closes the dialog.',
      'Focus returns to the triggering element when the modal closes.',
    ],
    usageNotes: 'Use modals only when an action requires immediate attention or confirmation. For simple messages, prefer an inline alert or toast. Always provide a clearly labeled way to dismiss.',
  },
  {
    slug: 'toast',
    name: 'Toast',
    description: 'A transient notification that appears at the edge of the screen and auto-dismisses.',
    category: 'Feedback',
    icon: '◫',
    props: [
      { name: 'message', type: 'string',  default: 'Action completed successfully', description: 'The notification message text' },
      { name: 'variant', type: 'select',  default: 'success',                       options: ['success', 'error', 'warning', 'info'], description: 'Semantic color variant' },
      { name: 'title',   type: 'string',  default: '',                              description: 'Optional bold title above the message' },
    ],
    defaultProps: { message: 'Action completed successfully', variant: 'success', title: '' },
    accessibilityNotes: [
      'Uses role="alert" (assertive) for errors, role="status" (polite) for all other variants.',
      'Auto-dismiss respects a minimum display time to ensure readability.',
      'The dismiss button has an aria-label for screen reader users.',
    ],
    usageNotes: 'Use toasts for brief, non-blocking feedback about background processes or actions. Do not use them for critical errors — use an inline Alert instead. Keep messages under 80 characters.',
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    description: 'An animated loading indicator communicating that a process is in progress.',
    category: 'Feedback',
    icon: '⟳',
    props: [
      { name: 'size',      type: 'select',  default: 'md',       options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Size of the spinner' },
      { name: 'variant',   type: 'select',  default: 'primary',  options: ['primary', 'muted', 'white'],  description: 'Color variant' },
      { name: 'label',     type: 'string',  default: 'Loading…', description: 'Accessible label for screen readers' },
      { name: 'showLabel', type: 'boolean', default: false,       description: 'Renders the label visibly below the spinner' },
    ],
    defaultProps: { size: 'md', variant: 'primary', label: 'Loading…', showLabel: false },
    accessibilityNotes: [
      'Has role="status" and aria-label so screen readers announce the loading state.',
      'The visually hidden label is always present for assistive technologies.',
    ],
    usageNotes: 'Use spinners for indeterminate loading states where progress cannot be measured. For known durations, a progress bar communicates more. Always provide a meaningful label describing what is loading.',
  },

  // ── Navigation ────────────────────────────────────────────────────────────

  {
    slug: 'tabs',
    name: 'Tabs',
    description: 'A navigation pattern for switching between related sections of content within the same page context.',
    category: 'Navigation',
    icon: '⊟',
    props: [
      { name: 'modelValue', type: 'string', default: 'tab1', description: 'The value of the currently active tab (v-model)' },
    ],
    defaultProps: { modelValue: 'tab1' },
    accessibilityNotes: [
      'Uses role="tablist", role="tab", and role="tabpanel" for full ARIA tab semantics.',
      'Left/Right arrow keys move focus between tabs.',
      'Active tab has aria-selected="true"; inactive tabs have tabindex="-1".',
    ],
    usageNotes: 'Use tabs to organize content at the same level of hierarchy. Avoid using tabs for step-by-step processes — use a stepper instead. Tabs should remain visible at all times; content should not require scrolling to see the tab panel.',
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Vertically stacked sections that expand to reveal content, reducing visual noise.',
    category: 'Navigation',
    icon: '≡',
    props: [
      { name: 'multiple',    type: 'boolean', default: false, description: 'Allows multiple sections to be open simultaneously' },
    ],
    defaultProps: { multiple: false },
    accessibilityNotes: [
      'Uses aria-expanded on trigger buttons to communicate open/closed state.',
      'Each panel is linked to its trigger via aria-controls and aria-labelledby.',
      'Trigger buttons are keyboard focusable and activated with Enter or Space.',
    ],
    usageNotes: 'Use accordions when content sections are too long to display all at once and users likely need only one or two sections. Avoid accordions for short content — plain sections work better. Single-expand mode reduces cognitive load.',
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Navigates through paged data sets. Automatically generates ellipsis for large page counts.',
    category: 'Navigation',
    icon: '⋯',
    props: [
      { name: 'modelValue', type: 'number', default: 1,    description: 'The current active page (v-model)' },
      { name: 'total',      type: 'number', default: 10,   description: 'Total number of pages' },
      { name: 'sibling',    type: 'number', default: 1,    description: 'Number of sibling pages shown around the current page' },
    ],
    defaultProps: { modelValue: 1, total: 10, sibling: 1 },
    accessibilityNotes: [
      'Wrapped in a <nav> with aria-label="Pagination".',
      'Current page button has aria-current="page".',
      'Each page button has an aria-label describing the destination.',
      'Disabled prev/next buttons use the disabled attribute.',
    ],
    usageNotes: 'Use pagination for data sets where the user needs to browse through pages. Show total page count when possible. For infinite scroll or load-more patterns, pagination is not the right choice.',
  },
]

export const componentCategories = [
  { name: 'Actions',    components: allComponents.filter(c => c.category === 'Actions') },
  { name: 'Forms',      components: allComponents.filter(c => c.category === 'Forms') },
  { name: 'Display',    components: allComponents.filter(c => c.category === 'Display') },
  { name: 'Feedback',   components: allComponents.filter(c => c.category === 'Feedback') },
  { name: 'Navigation', components: allComponents.filter(c => c.category === 'Navigation') },
]
