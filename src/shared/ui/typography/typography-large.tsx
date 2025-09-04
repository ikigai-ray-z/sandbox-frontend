import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyLarge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  )
}
