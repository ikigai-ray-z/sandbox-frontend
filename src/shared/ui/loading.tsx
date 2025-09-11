import { LoaderCircleIcon } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

export function Loading({ className }: { className?: string }) {
  return (
    <div
      data-slot="loading"
      className={cn('flex size-full items-center justify-center', className)}
    >
      <LoaderCircleIcon className="text-primary size-10 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
