import { type ClassValue, clsx } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseSearch(search: string) {
  return qs.parse(search, {
    parseBooleans: true,
    parseNumbers: true,
  })
}

export function stringifySearch(search: Record<string, unknown>) {
  return qs.stringify(search, { skipEmptyString: true, skipNull: true })
}

export function omitEmptyValues(search: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(search).filter(([_, value]) => {
      if (typeof value === 'string' && value === '') {
        return false
      }
      if (value === null) {
        return false
      }
      if (value === undefined) {
        return false
      }

      if (Array.isArray(value) && value.length === 0) {
        return false
      }

      if (typeof value === 'object' && Object.keys(value).length === 0) {
        return false
      }

      if (typeof value === 'number' && Number.isNaN(value)) {
        return false
      }

      return true
    }),
  )
}
