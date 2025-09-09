'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type OnChangeFn,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Skeleton } from '@/shared/ui/skeleton'

import { DataTablePagination } from './data-table-pagination'

/**
 * fallback data MUST have a "stable" reference
 * @see https://tanstack.com/table/latest/docs/guide/data#give-data-a-stable-reference
 */
const fallbackData: never[] = []

interface DataTableProps<TData, TValue> {
  loading: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  rowCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
}

export function DataTable<TData, TValue>({
  loading,
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const rows = data ?? fallbackData
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    state: {
      pagination,
    },
    initialState: {
      columnPinning: {
        right: ['actions'],
      },
    },
    onPaginationChange,
  })

  return (
    <div
      data-slot="data-table"
      className="flex flex-col gap-2 rounded-md border"
    >
      <div className="relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading && table.getRowModel().rows.length === 0 ? (
              Array.from({ length: pagination.pageSize }).map((_, rowIdx) => (
                <TableRow key={`skeleton-row-${rowIdx}`}>
                  {Array.from({ length: columns.length }).map((_, colIdx) => (
                    <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loading && (
          <div className="bg-background/80 absolute inset-0 z-10 backdrop-blur-xs" />
        )}
      </div>
      <DataTablePagination table={table} className="border-t py-3" />
    </div>
  )
}
