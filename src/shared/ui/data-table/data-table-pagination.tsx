import type { Table } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils/index'

const pageSizeOptions = [25, 50, 100]

export function DataTablePagination<T>({
  table,
  className,
}: {
  table: Table<T>
  className?: string
}) {
  const getRowSelectionText = () => {
    return `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`
  }

  const getItemsText = () => {
    const totalItems = table.getRowCount()
    const rowCount = `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize}`
    return `${rowCount} of ${totalItems} items`
  }

  const getPageText = () => {
    return `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
  }

  return (
    <div
      data-slot="data-table-pagination"
      className={cn('flex items-center justify-between px-2', className)}
    >
      {table.getIsSomeRowsSelected() && (
        <div className="text-muted-foreground text-sm">
          {getRowSelectionText()}
        </div>
      )}
      <div className="ms-auto flex flex-col flex-wrap items-center justify-center gap-x-6 gap-y-2 @lg:flex-row @lg:gap-x-8">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="bg-background h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm">
          {getItemsText()}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <div className="text-sm">{getPageText()}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
