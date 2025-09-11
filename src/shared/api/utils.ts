import { z } from 'zod'

export function createApiResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    error: z.null(),
    data: schema,
  })
}

export function isSameSearch(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b)
}
