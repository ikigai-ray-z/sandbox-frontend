import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

type Item = { key: string; value: ReactNode }

export function TypographyList({
  items,
  className,
}: {
  items: Item[]
  className?: string
}) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {items.map((item) => (
        <li key={item.key}>{item.value}</li>
      ))}
    </ul>
  )
}
