import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographySmall({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  )
}
