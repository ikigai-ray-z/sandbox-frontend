import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyH1({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </h1>
  )
}
