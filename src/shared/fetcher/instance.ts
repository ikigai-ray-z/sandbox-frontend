import ky from 'ky'

import { store } from '@/shared/store/instance'
import { authTokenAtom } from '@/features/auth/atoms'
import { onSignOut } from '@/features/auth/utils'

const backApiUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BACKEND_API_BASE
    : import.meta.env.VITE_BACKEND_API_URL

export const fetcher = ky.create({
  prefixUrl: backApiUrl,
  cache: 'no-cache',
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        const authToken = store.get(authTokenAtom)
        if (authToken) {
          request.headers.set('Authorization', `Bearer ${authToken}`)
          request.headers.set('x-service-signature', 'secret')
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          onSignOut()
        }
      },
    ],
    beforeError: [
      (error) => {
        switch (error.response.status) {
          case 401:
            error.message = 'Unauthorized'
            break
        }
        return error
      },
    ],
  },
})
