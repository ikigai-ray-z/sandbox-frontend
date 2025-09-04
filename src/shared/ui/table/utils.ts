import type { GridPaginationModel } from '@mui/x-data-grid'

export function convertToMuiPagination({
  offset,
  limit,
}: {
  offset: number
  limit: number
}) {
  return {
    page: offset,
    pageSize: limit,
  }
}

export function getPaginationChange({
  model,
  limit,
  offset,
}: {
  model: GridPaginationModel
  limit: number
  offset: number
}) {
  if (model.pageSize !== limit) {
    return {
      limit: model.pageSize,
      offset: 0,
    }
  }

  if (model.page !== offset) {
    return {
      limit,
      offset: model.page,
    }
  }
  return null
}
