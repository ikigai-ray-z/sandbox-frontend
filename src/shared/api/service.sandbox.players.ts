import { queryOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { Keys } from '@/shared/schema'
import { fetcher } from '@/shared/fetcher/instance'
import { stringifySearch } from '@/shared/lib/utils'

import { paginationSchema } from './schema'
import { createApiResponseSchema } from './utils'

export const playersPayloadSchema = z.object({
  operatorCode: z.string().array().optional(),
  brandCode: z.string().array().optional(),
  playerExternalId: z.string().array().optional(),
  fuzzyId: z
    .string()
    .min(2)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  ...paginationSchema.shape,
})

type PlayersPayload = z.infer<typeof playersPayloadSchema>

const playersResponseSchema = createApiResponseSchema(
  z.object({
    totalCount: z.number(),
    list: z.array(
      z.object({
        playerExternalId: z.string(),
        balance: z.number(),
        operatorCode: z.string(),
        brandCode: z.string(),
        lastCurrency: z.string(),
        lastCurrencyId: z.number(),
        country: z.string(),
        name: z.string(),
        isEnabled: z.boolean(),
        payload: z.record(Keys, z.unknown()),
        lastLang: z.string(),
        session: z.string(),
        lastIp: z.string(),
        jurisdictionCode: z.string(),
      }),
    ),
  }),
)

const getPlayers = async ({
  payload,
  signal,
}: {
  payload: PlayersPayload
  signal: AbortSignal
}) => {
  const parsedPayload = playersPayloadSchema.parse(payload)
  return fetcher('v1/service/sandbox/players', {
    method: 'GET',
    searchParams: stringifySearch(parsedPayload),
    signal,
  })
    .json()
    .then((res) => playersResponseSchema.parse(res))
}

export const playersQueryKey = ['service', 'sandbox', 'players']
export function getPlayersOptions(payload: PlayersPayload) {
  return queryOptions({
    queryKey: [...playersQueryKey, payload],
    queryFn: ({ signal }) => getPlayers({ payload, signal }),
  })
}
