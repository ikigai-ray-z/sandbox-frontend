import { Link } from '@tanstack/react-router'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { cn } from '@/shared/lib/utils'

import type { NavItem } from './aside'

interface Props {
  isOpen: boolean
  navItems: NavItem[]
  onToggle: () => void
}
export function AsideDesktop({ isOpen, navItems, onToggle }: Props) {
  return (
    <>
      <div
        className={cn(
          'border-divider flex h-full flex-col overflow-hidden border-e transition-all',
          isOpen ? 'w-75' : 'w-20',
        )}
      >
        <Link
          to="/"
          className={cn(
            'my-6 flex w-auto shrink-0 items-center gap-2',
            isOpen ? 'justify-start px-6' : 'justify-center px-4',
          )}
        >
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          {isOpen && <div className="text-md">Sandbox</div>}
        </Link>

        <nav className="flex grow flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'data-[status=active]:bg-primary/10 data-[status=active]:text-primary hover:bg-action-hover active:bg-action-selected flex items-center rounded-md p-3 transition-colors',
                isOpen ? 'mx-3 flex-row gap-2' : 'mx-1 flex-col gap-1',
              )}
            >
              <item.icon className="size-6" />
              <span className={cn(isOpen ? 'text-sm' : 'text-center text-xs')}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <button
        type="button"
        aria-label="toggle navigation"
        className={cn(
          'bg-background-default border-divider absolute top-7 z-20 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border transition-all',
          isOpen ? 'start-75 rotate-180' : 'start-20 rotate-0',
        )}
        onClick={onToggle}
      >
        <span className="hover:bg-action-hover active:bg-action-selected rounded-full">
          <KeyboardArrowRightIcon />
        </span>
      </button>
    </>
  )
}
