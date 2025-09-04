import { createFileRoute, redirect } from '@tanstack/react-router'

import { store } from '@/shared/store/instance'
import { authTokenAtom } from '@/features/auth/atoms'

export const Route = createFileRoute('/_un-auth')({
  beforeLoad: async () => {
    const authToken = store.get(authTokenAtom)
    if (authToken) {
      throw redirect({ to: '/', replace: true })
    }
  },
})
