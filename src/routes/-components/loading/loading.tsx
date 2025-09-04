import { Skeleton } from '@mui/material'

export function Loading() {
  return (
    <div className="h-full w-full pb-8">
      <Skeleton variant="rounded" className="h-full w-full" />
    </div>
  )
}
