import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyBlockquote({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}
