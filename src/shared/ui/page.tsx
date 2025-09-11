import { useCanGoBack, useRouter } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

export function Page({
  dataSlot,
  className,
  children,
}: {
  dataSlot: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div data-slot={dataSlot} className={cn('animate-in fade-in', className)}>
      {children}
    </div>
  )
}

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

export function PageBackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const handleBack = () => {
    if (canGoBack) {
      router.history.back()
    } else {
      router.navigate({ to: '/player' })
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleBack}>
      <ArrowLeftIcon />
    </Button>
  )
}
