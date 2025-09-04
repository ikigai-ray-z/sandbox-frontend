import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyH4({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h4>
  )
}
