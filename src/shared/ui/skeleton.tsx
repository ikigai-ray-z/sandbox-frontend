import { cn } from '@/shared/lib/utils/index'

function Skeleton({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-accent animate-pulse rounded-md *:invisible',
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  )
}

export { Skeleton }
