import { Link } from '@tanstack/react-router'
import { Drawer } from '@mui/material'

import type { NavItem } from './aside'

interface Props {
  isOpen: boolean
  navItems: NavItem[]
  onToggle: () => void
}
export function AsideMobile({ isOpen, navItems, onToggle }: Props) {
  return (
    <Drawer open={isOpen} onClose={onToggle}>
      <div className="flex h-full w-75 flex-col overflow-hidden">
        <Link
          to="/"
          className="my-6 flex w-auto shrink-0 items-center justify-start gap-2 px-6"
        >
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          <div className="text-md">Sandbox</div>
        </Link>

        <nav className="flex grow flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="data-[status=active]:bg-primary/10 data-[status=active]:text-primary hover:bg-action-hover active:bg-action-selected mx-3 flex items-center gap-2 rounded-md p-3 transition-colors"
            >
              <item.icon className="size-6" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </Drawer>
  )
}
