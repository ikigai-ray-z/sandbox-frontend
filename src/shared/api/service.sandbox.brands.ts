import { queryOptions } from '@tanstack/react-query'
import * as z from 'zod'

import { fetcher } from '@/shared/fetcher/instance'
import { stringifySearch } from '@/shared/lib/utils'

import { paginationSchema } from './schema'
import { createApiResponseSchema } from './utils'

export const BrandPayloadSchema = z.object({
  operatorCode: z.string().optional(),
  ...paginationSchema.shape,
})

type BrandPayload = z.infer<typeof BrandPayloadSchema>

const BrandsResponseSchema = createApiResponseSchema(
  z.object({
    totalCount: z.number(),
    list: z.array(
      z.object({
        brandCode: z.string(),
        operatorCode: z.string(),
        name: z.string(),
        isIntegrated: z.boolean(),
        isEnabled: z.boolean(),
        casinoLink: z.string(),
      }),
    ),
  }),
)

const getBrands = async ({
  payload,
  signal,
}: {
  payload: BrandPayload
  signal: AbortSignal
}) => {
  const parsedPayload = BrandPayloadSchema.parse(payload)
  return fetcher('v1/service/sandbox/brands', {
    method: 'GET',
    searchParams: stringifySearch(parsedPayload),
    signal,
  })
    .json()
    .then((res) => BrandsResponseSchema.parse(res))
}

export function getBrandsOptions(payload: BrandPayload) {
  return queryOptions({
    queryKey: ['service', 'sandbox', 'brands', payload],
    queryFn: ({ signal }) => getBrands({ payload, signal }),
  })
}
