import { SidebarProvider } from '@/shared/ui/sidebar'

import { AuthSidebar } from './auth-sidebar'
import { AuthHeader } from './auth-header'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="grid h-full w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-y-auto">
      <AuthSidebar className="col-start-1" />
      <AuthHeader className="sticky top-0 col-start-2" />
      <main className="@container relative col-start-2 px-4 py-8 md:px-8">
        {children}
      </main>
    </SidebarProvider>
  )
}
