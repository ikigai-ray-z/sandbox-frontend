import { RESET } from 'jotai/utils'

import { store } from '@/shared/store/instance'
import { queryClient } from '@/shared/query/instance'
import { router } from '@/shared/router/instance'

import { authTokenAtom } from './atoms'

export function onSignOut() {
  store.set(authTokenAtom, RESET)
  queryClient.clear()
  router.navigate({ to: '/sign-in', replace: true })
}
