import { queryOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { fetcher } from '@/shared/fetcher/instance'

import { createApiResponseSchema } from './utils'

const OperatorCodesResponseSchema = createApiResponseSchema(z.array(z.string()))

const getOperatorCodes = async ({ signal }: { signal: AbortSignal }) => {
  return fetcher('v1/service/sandbox/operator-codes', {
    method: 'GET',
    signal,
  })
    .json()
    .then((res) => OperatorCodesResponseSchema.parse(res))
}

export function getOperatorCodesOptions() {
  return queryOptions({
    queryKey: ['service', 'sandbox', 'operator-codes'],
    queryFn: ({ signal }) => getOperatorCodes({ signal }),
  })
}
