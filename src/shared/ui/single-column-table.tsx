import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/table'
import { cn } from '@/shared/lib/utils/index'

type SingleColumnTableProps = {
  items: {
    id: string
    key: React.ReactNode
    value: React.ReactNode
  }[]
  className?: string
}

export function SingleColumnTable({
  items,
  className,
}: SingleColumnTableProps) {
  return (
    <div
      data-slot="single-column-table"
      className={cn('rounded-md border', className)}
    >
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                className="py-4 font-medium"
                style={{ width: '120px' }}
              >
                {item.key}
              </TableCell>
              <TableCell className="py-4" style={{ width: '120px' }}>
                {item.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
