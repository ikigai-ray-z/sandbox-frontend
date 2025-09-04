import * as z from 'zod'

export const Keys = z.union([z.string(), z.number(), z.symbol()])
