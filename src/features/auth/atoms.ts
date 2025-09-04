import { atomWithStorage } from 'jotai/utils'
import Cookies from 'js-cookie'
import * as z from 'zod'

const authTokenSchema = z.string().min(1).nullable()
type AuthToken = z.infer<typeof authTokenSchema>

export const authTokenAtom = atomWithStorage<AuthToken>(
  'token',
  null,
  {
    getItem(key, initialValue) {
      try {
        const value = Cookies.get(key)
        return authTokenSchema.parse(value)
      } catch {
        return initialValue
      }
    },
    setItem(key, newValue) {
      Cookies.set(key, newValue ?? '', {
        secure: true,
        sameSite: 'strict',
      })
    },
    removeItem(key) {
      Cookies.remove(key)
    },
  },
  {
    getOnInit: true,
  },
)
