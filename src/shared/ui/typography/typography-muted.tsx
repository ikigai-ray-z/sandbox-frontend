import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyMuted({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
  )
}
