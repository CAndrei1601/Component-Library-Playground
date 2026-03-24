export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

const toasts = ref<ToastItem[]>([])

export const useToast = () => {
  const addToast = (options: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const item: ToastItem = { id, duration: 4000, ...options }
    toasts.value.push(item)

    if (item.duration && item.duration > 0) {
      setTimeout(() => removeToast(id), item.duration)
    }
  }

  const removeToast = (id: string) => {
    const i = toasts.value.findIndex(t => t.id === id)
    if (i !== -1) toasts.value.splice(i, 1)
  }

  return { toasts: readonly(toasts), addToast, removeToast }
}
