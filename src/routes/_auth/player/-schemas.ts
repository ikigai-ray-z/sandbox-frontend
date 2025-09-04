import type { z } from 'zod'

import { playerPayloadSchema } from '@/shared/api/service.sandbox.players'

export const searchFormSchema = playerPayloadSchema.omit({
  limit: true,
  offset: true,
})

export type SearchFormType = z.infer<typeof searchFormSchema>
