import type { OnChangeFn, PaginationState } from '@tanstack/react-table'

import { convertApiParamsToPagination } from '@/shared/ui/data-table/utils'

export function usePlayerListPagination({
  limit,
  offset,
  onChange,
}: {
  limit: number
  offset: number
  onChange: (pagination: PaginationState) => void
}): {
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
} {
  const pagination = convertApiParamsToPagination({ limit, offset })

  const onPaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination)
        : updaterOrValue

    onChange(newPagination)
  }

  return { pagination, onPaginationChange }
}
