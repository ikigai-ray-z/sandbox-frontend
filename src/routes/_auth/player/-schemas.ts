import * as z from 'zod'

import { playersPayloadSchema } from '@/shared/api/service.sandbox.players'
import { playerPayloadSchema } from '@/shared/api/service.sandbox.players.$playerExternalId'

export const searchFormSchema = playersPayloadSchema.omit({
  limit: true,
  offset: true,
})

export type SearchFormType = z.infer<typeof searchFormSchema>

export const putPlayerSchema = playerPayloadSchema
  .extend({
    playerExternalId: z.string(),
  })
  .catch({
    playerExternalId: '',
    balance: 0,
    lastCurrency: '',
    operatorCode: '',
    brandCode: '',
    jurisdictionCode: '',
    country: '',
  })

export type PutPlayerType = z.infer<typeof putPlayerSchema>
