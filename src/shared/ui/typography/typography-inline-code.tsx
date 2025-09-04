import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export function TypographyInlineCode({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
    >
      {children}
    </code>
  )
}
