import { LoaderCircle } from 'lucide-react'

export function RoutePending() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <LoaderCircle className="text-primary size-10 animate-spin" />
      <span className="text-secondary-foreground text-sm">Loading...</span>
    </div>
  )
}
