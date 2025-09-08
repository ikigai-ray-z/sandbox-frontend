import { cn } from '@/shared/lib/utils'

export function PageHeading({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mb-4 text-2xl font-bold', className)}>{children}</div>
  )
}
