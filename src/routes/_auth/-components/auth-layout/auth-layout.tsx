import { SidebarProvider } from '@/shared/ui/sidebar'

import { AuthSidebar } from './auth-sidebar'
import { AuthHeader } from './auth-header'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="grid h-full w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-y-auto">
      <AuthSidebar className="col-start-1" />
      <AuthHeader className="sticky top-0 col-start-2" />
      <main className="relative col-start-2 container py-8">{children}</main>
    </SidebarProvider>
  )
}
