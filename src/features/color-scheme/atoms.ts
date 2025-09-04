import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import * as z from 'zod'

import { store } from '@/shared/store/instance'

const colorSchemeSchema = z.literal(['light', 'dark', 'system'])
type ColorScheme = z.infer<typeof colorSchemeSchema>

// Color Scheme
export const colorSchemeAtom = atomWithStorage<ColorScheme>(
  'color-scheme',
  'system',
  {
    getItem(key, initialValue) {
      const storedValue = localStorage.getItem(key) ?? initialValue
      try {
        return colorSchemeSchema.parse(JSON.parse(storedValue))
      } catch {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
    },
    setItem(key, newValue) {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    removeItem(key) {
      localStorage.removeItem(key)
    },
  },
  {
    getOnInit: true,
  },
)

// Prefers Color Scheme
type PrefersColorScheme = Exclude<ColorScheme, 'system'>
const prefersColorSchemeMedia = window.matchMedia(
  '(prefers-color-scheme: dark)',
)
const prefersColorSchemeAtom = atom<PrefersColorScheme>(
  prefersColorSchemeMedia.matches ? 'dark' : 'light',
)

prefersColorSchemeAtom.onMount = (setAtom) => {
  const handleChange = (e: MediaQueryListEvent) => {
    setAtom(e.matches ? 'dark' : 'light')
  }

  prefersColorSchemeMedia.addEventListener('change', handleChange)

  return () => {
    prefersColorSchemeMedia.removeEventListener('change', handleChange)
  }
}

// ===============================
// is dark mode
// ===============================
export const isDarkModeAtom = atom<boolean>((get) => {
  const isDarkMode = get(colorSchemeAtom) === 'dark'
  const isSystemDarkMode =
    get(colorSchemeAtom) === 'system' && get(prefersColorSchemeAtom) === 'dark'

  return isDarkMode || isSystemDarkMode
})

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark', store.get(isDarkModeAtom))
}

toggleDarkMode() // initialize the dark mode
store.sub(isDarkModeAtom, toggleDarkMode) // watch dark mode change
