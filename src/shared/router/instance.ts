import { createRouter } from '@tanstack/react-router'

import { queryClient } from '@/shared/query/instance'
import { NotFound } from '@/routes/-components/not-found'
import { routeTree } from '@/routeTree.gen'
import { RouteError } from '@/routes/-components/route-error'

export const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: RouteError,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
