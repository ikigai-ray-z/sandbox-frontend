import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from '@tanstack/react-router'
import { LogOut, Rocket, Tag, User, UserLock } from 'lucide-react'
import { useState } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/shared/ui/sidebar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { handleSignOut } from '@/features/auth'
import { cn } from '@/shared/lib/utils'

type NavItem = {
  label: string
  icon: React.ElementType
  to: ValidateLinkOptions<RegisteredRouter>['to']
}

export function AuthSidebar({ className }: { className?: string }) {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)
  const navItems: NavItem[] = [
    {
      label: 'Operator',
      icon: UserLock,
      to: '/operator',
    },
    {
      label: 'Brand',
      icon: Tag,
      to: '/brand',
    },
    {
      label: 'Player',
      icon: User,
      to: '/player',
    },
    {
      label: 'Launch',
      icon: Rocket,
      to: '/launch',
    },
  ]
  return (
    <Sidebar collapsible="icon" className={cn('z-20', className)}>
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center gap-2">
                <img src="/favicon.svg" alt="" className="size-6" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">
                  Sandbox
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link
                      to={item.to}
                      className="data-[status=active]:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent py-6"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Sign out">
                  <LogOut />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit"
                side="top"
                align="start"
                alignOffset={16}
              >
                <p className="mb-4 text-sm">
                  Are you sure you want to sign out?
                </p>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSignOutOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSignOut}>
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
