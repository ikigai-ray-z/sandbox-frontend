import { createRouter } from '@tanstack/react-router'

import { queryClient } from '@/shared/query/instance'
import { RouteNotFound } from '@/routes/-components/route-not-found'
import { routeTree } from '@/routeTree.gen'
import { RouteError } from '@/routes/-components/route-error'
import { RoutePending } from '@/routes/-components/route-loading'

export const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent: RouteNotFound,
  defaultErrorComponent: RouteError,
  defaultPendingComponent: RoutePending,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
