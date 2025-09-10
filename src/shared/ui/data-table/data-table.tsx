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
import { cn } from '@/shared/lib/utils'

import { DataTablePagination } from './data-table-pagination'
import { getPinningStyles } from './utils'

/**
 * fallback data MUST have a "stable" reference
 * @see https://tanstack.com/table/latest/docs/guide/data#give-data-a-stable-reference
 */
const fallbackData: never[] = []

interface DataTableProps<TData, TValue> {
  className?: string
  loading: boolean
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
  rowCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
}

export function DataTable<TData, TValue>({
  className,
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

  const fixIconScreenOnly = 'relative'

  return (
    <div
      data-slot="data-table"
      className={cn(
        'flex flex-col rounded-md border',
        fixIconScreenOnly,
        className,
      )}
    >
      <Table
        className={cn(
          'grow transition-opacity',
          loading ? 'pointer-events-none opacity-50' : 'opacity-100',
        )}
      >
        <TableHeader className="bg-secondary sticky top-0 z-10 shadow-[inset_0_-1px_var(--border)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="bg-secondary"
                    style={getPinningStyles(header.column)}
                  >
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
                    <Skeleton className="h-5 w-full" />
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
                  <TableCell
                    key={cell.id}
                    className="bg-background"
                    style={getPinningStyles(cell.column)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination
        table={table}
        className="bg-secondary w-full border-t py-2"
      />
    </div>
  )
}
