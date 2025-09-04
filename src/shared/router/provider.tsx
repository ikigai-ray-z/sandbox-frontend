import { RouterProvider as Provider } from '@tanstack/react-router'

import { router } from './instance'

export function RouterProvider() {
  return <Provider router={router} />
}
