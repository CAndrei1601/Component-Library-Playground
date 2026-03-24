export type Theme = 'light' | 'dark' | 'brand'

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const stored = (localStorage.getItem('theme') as Theme) || 'light'
      theme.value = stored
      document.documentElement.setAttribute('data-theme', stored)
    }
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'brand']
    const current = themes.indexOf(theme.value)
    setTheme(themes[(current + 1) % themes.length])
  }

  return { theme, setTheme, initTheme, toggleTheme }
}
