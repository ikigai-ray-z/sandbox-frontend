import { mutationOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { fetcher } from '@/shared/fetcher/instance'

import { createApiResponseSchema } from './utils'

const testLoginResponseSchema = createApiResponseSchema(
  z.object({
    token: z.string(),
  }),
)

export function testLoginOptions() {
  return mutationOptions({
    mutationFn: () =>
      fetcher
        .get('v1/test/saml/login')
        .json()
        .then((res) => testLoginResponseSchema.parse(res)),
  })
}
