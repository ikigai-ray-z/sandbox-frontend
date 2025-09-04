import { queryOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { fetcher } from '@/shared/fetcher/instance'
import { stringifySearch } from '@/shared/lib/utils'

import { paginationSchema } from './schema'
import { createApiResponseSchema } from './utils'

export const OperatorPayloadSchema = z.object({
  operatorCode: z.string().array().optional(),
  ...paginationSchema.shape,
})

type OperatorPayload = z.infer<typeof OperatorPayloadSchema>

const OperatorsResponseSchema = createApiResponseSchema(
  z.object({
    totalCount: z.number(),
    list: z.array(
      z.object({
        operatorCode: z.string(),
        name: z.string(),
        isIntegrated: z.boolean(),
        isEnabled: z.boolean(),
        salt: z.string(),
        lobbyLink: z.string(),
        depositLink: z.string(),
      }),
    ),
  }),
)

const getOperators = async ({
  payload,
  signal,
}: {
  payload: OperatorPayload
  signal: AbortSignal
}) => {
  const parsedPayload = OperatorPayloadSchema.parse(payload)
  return fetcher('v1/service/sandbox/operators', {
    method: 'GET',
    searchParams: stringifySearch(parsedPayload),
    signal,
  })
    .json()
    .then((res) => OperatorsResponseSchema.parse(res))
}

export function getOperatorsOptions(
  payload: OperatorPayload = { limit: 200, offset: 0 },
) {
  return queryOptions({
    queryKey: ['service', 'sandbox', 'operators', payload],
    queryFn: ({ signal }) => getOperators({ payload, signal }),
  })
}
