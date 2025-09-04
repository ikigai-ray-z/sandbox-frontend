import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { AuthLayout } from '@/routes/-components/auth-layout'
import { store } from '@/shared/store/instance'
import { authTokenAtom } from '@/features/auth/atoms'
import { Loading } from '@/routes/-components/loading'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const authToken = store.get(authTokenAtom)
    if (!authToken) {
      throw redirect({ to: '/', replace: true })
    }
  },
  component: RouteComponent,
  pendingComponent: Loading,
})

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
