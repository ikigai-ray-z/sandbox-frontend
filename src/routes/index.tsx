import { createFileRoute, redirect } from '@tanstack/react-router'

import { authTokenAtom } from '@/features/auth/atoms'
import { store } from '@/shared/store/instance'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const authToken = store.get(authTokenAtom)
    if (authToken) {
      throw redirect({ to: '/launch', replace: true })
    } else {
      throw redirect({ to: '/sign-in', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Index Route</div>
}
