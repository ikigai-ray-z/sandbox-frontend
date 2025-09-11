import { mutationOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { Keys } from '@/shared/schema'
import { fetcher } from '@/shared/fetcher/instance'

import { createApiResponseSchema } from './utils'

export const playerPayloadSchema = z.object({
  operatorCode: z.string().optional(),
  balance: z.number().optional(),
  brandCode: z.string().optional(),
  lastCurrency: z.string().optional(),
  lastCurrencyId: z.number().optional(),
  country: z.string().optional(),
  name: z.string().optional(),
  isEnabled: z.boolean().optional(),
  payload: z.record(Keys, z.unknown()).optional(),
  lastLang: z.string().optional(),
  session: z.string().optional(),
  lastIp: z.string().optional(),
  jurisdictionCode: z.string().optional(),
})
type PlayerPayload = z.infer<typeof playerPayloadSchema>

const playerResponseSchema = createApiResponseSchema(z.string())

const playerQueryKey = ['service', 'sandbox', 'player']

const putPlayer = async ({
  playerExternalId,
  payload,
}: {
  playerExternalId: string
  payload: PlayerPayload
}) => {
  const parsedPayload = playerPayloadSchema.parse(payload)
  return fetcher(`v1/service/sandbox/players/${playerExternalId}`, {
    method: 'PUT',
    json: parsedPayload,
  })
    .json()
    .then((res) => playerResponseSchema.parse(res))
}

export function putPlayersOptions() {
  return mutationOptions({
    mutationKey: [...playerQueryKey],
    mutationFn: ({
      playerExternalId,
      payload,
    }: {
      playerExternalId: string
      payload: PlayerPayload
    }) => putPlayer({ playerExternalId, payload }),
  })
}

const deletePlayer = async ({
  playerExternalId,
}: {
  playerExternalId: string
}) => {
  return fetcher(`v1/service/sandbox/players/${playerExternalId}`, {
    method: 'DELETE',
  })
    .json()
    .then((res) => playerResponseSchema.parse(res))
}

export function deletePlayersOptions() {
  return mutationOptions({
    mutationKey: [...playerQueryKey],
    mutationFn: (playerExternalId: string) =>
      deletePlayer({ playerExternalId }),
  })
}
