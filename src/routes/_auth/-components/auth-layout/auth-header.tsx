import { useAtom } from 'jotai'
import { Moon, Sun, SunMoon } from 'lucide-react'

import { colorSchemeAtom } from '@/features/color-scheme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { SidebarTrigger } from '@/shared/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export function AuthHeader({ className }: { className?: string }) {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom)

  const ColorSchemeIcon = (() => {
    switch (colorScheme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      case 'system':
        return SunMoon
    }
  })()

  return (
    <header
      className={cn('bg-background z-10 flex border-b px-4 py-3', className)}
    >
      <div className="flex-1">
        <Button size="icon" variant="ghost" asChild>
          <SidebarTrigger />
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <ColorSchemeIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={colorScheme}
            onValueChange={(value) =>
              setColorScheme(value as typeof colorScheme)
            }
          >
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
