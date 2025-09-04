import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Suspense } from 'react'

import { AuthLayout } from '@/routes/_auth/-components/auth-layout'
import { checkIsAuthorized } from '@/features/auth'
import { RoutePending } from '@/routes/-components/route-loading'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const isAuthorized = checkIsAuthorized()
    if (!isAuthorized) {
      throw redirect({ to: '/sign-in', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout>
      <Suspense fallback={<RoutePending />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  )
}
