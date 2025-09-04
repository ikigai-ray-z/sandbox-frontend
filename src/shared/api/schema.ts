import * as z from 'zod'

export const paginationSchema = z.object({
  limit: z.number().int().min(1).max(1000).default(50),
  offset: z.number().int().min(0).max(1000).default(0),
})
