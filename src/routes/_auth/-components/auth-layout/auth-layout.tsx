import { SidebarProvider } from '@/shared/ui/sidebar'

import { AuthSidebar } from './auth-sidebar'
import { AuthHeader } from './auth-header'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex h-full w-full items-stretch">
      <AuthSidebar className="shrink-0" />
      <div className="flex grow flex-col">
        <AuthHeader className="sticky top-0" />
        <main className="h-0 grow overflow-auto p-4">{children}</main>
      </div>
    </SidebarProvider>
  )
}
