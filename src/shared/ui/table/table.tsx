import {
  DataGrid,
  type GridColDef,
  type GridPaginationMeta,
  type GridPaginationModel,
  type GridValidRowModel,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

import { NoRowsOverlay } from './no-rows-overlay'

type TableProps<T extends GridValidRowModel> = {
  loading: boolean
  rows: T[]
  columns: GridColDef<T>[]
  pageSizeOptions: number[]
  paginationModel: GridPaginationModel
  rowCount: number | undefined
  onPaginationModelChange: (model: GridPaginationModel) => void
}
export function Table<T extends GridValidRowModel>({
  loading,
  rows,
  columns,
  pageSizeOptions,
  paginationModel,
  rowCount: rowCountProp,
  onPaginationModelChange,
}: TableProps<T>) {
  const defaultRowCount = rowCountProp ?? 0
  const [rowCount, setRowCount] = useState(defaultRowCount)

  const currentRowCount = paginationModel.pageSize * paginationModel.page + 1
  const paginationMeta: GridPaginationMeta = {
    hasNextPage: typeof rowCount !== 'undefined' && rowCount > currentRowCount,
  }

  useEffect(() => {
    if (typeof rowCountProp !== 'undefined' && rowCountProp !== rowCount) {
      setRowCount(rowCountProp)
    }
  }, [rowCount, rowCountProp])

  return (
    <DataGrid
      disableColumnMenu
      disableColumnFilter
      disableColumnSorting
      disableRowSelectionOnClick
      loading={loading}
      rows={rows}
      columns={columns}
      pageSizeOptions={pageSizeOptions}
      paginationMode="server"
      paginationModel={paginationModel}
      paginationMeta={paginationMeta}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={rowCount}
      slots={{ noRowsOverlay: NoRowsOverlay }}
    />
  )
}
