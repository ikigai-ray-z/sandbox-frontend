import { createFileRoute, redirect } from '@tanstack/react-router'

import { checkIsAuthorized } from '@/features/auth'

export const Route = createFileRoute('/_un-auth')({
  beforeLoad: async () => {
    const isAuthorized = checkIsAuthorized()
    if (isAuthorized) {
      throw redirect({ to: '/', replace: true })
    }
  },
})
