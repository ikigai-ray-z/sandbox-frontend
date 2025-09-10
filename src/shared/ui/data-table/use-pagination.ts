import type { OnChangeFn, PaginationState } from '@tanstack/react-table'
import * as z from 'zod'
import { useCallback, useMemo } from 'react'

import { paginationSchema } from '@/shared/api/schema'

import { convertApiParamsToPagination } from './utils'

export function usePagination({
  limit,
  offset,
  onChange,
}: z.infer<typeof paginationSchema> & {
  onChange: (pagination: PaginationState) => void
}): {
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
} {
  const pagination = useMemo(
    () => convertApiParamsToPagination({ limit, offset }),
    [limit, offset],
  )

  const onPaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updaterOrValue) => {
      const newPagination =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(pagination)
          : updaterOrValue

      onChange(newPagination)
    },
    [pagination, onChange],
  )

  return { pagination, onPaginationChange }
}
