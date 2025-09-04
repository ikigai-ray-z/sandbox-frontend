import { type LinkProps } from '@tanstack/react-router'
import PolicyTwoToneIcon from '@mui/icons-material/PolicyTwoTone'
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone'
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone'
import type { OverridableComponent } from '@mui/material/OverridableComponent'
import type { SvgIconTypeMap } from '@mui/material/SvgIcon'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'

import { cn } from '@/shared/lib/utils'

import { useBreakpoint } from './hooks'
import { AsideDesktop } from './aside.desktop'
import { AsideMobile } from './aside.mobile'

export type NavItem = LinkProps & {
  label: string
  icon: OverridableComponent<SvgIconTypeMap>
}

interface Props {
  isOpen: boolean
  className?: string
  onToggle: () => void
}
export function Aside({ isOpen, className, onToggle }: Props) {
  const { isMobile } = useBreakpoint()
  const navItems = [
    {
      label: 'Operator',
      icon: PolicyTwoToneIcon,
      to: '/operator',
    },
    {
      label: 'Brand',
      icon: LocalOfferTwoToneIcon,
      to: '/brand',
    },
    {
      label: 'Player',
      icon: AccountCircleTwoToneIcon,
      to: '/player',
    },
    {
      label: 'Launch',
      icon: SportsEsportsTwoToneIcon,
      to: '/launch',
    },
  ] as const satisfies NavItem[]

  return (
    <aside className={cn('relative', className)}>
      {isMobile ? (
        <AsideMobile isOpen={isOpen} navItems={navItems} onToggle={onToggle} />
      ) : (
        <AsideDesktop isOpen={isOpen} navItems={navItems} onToggle={onToggle} />
      )}
    </aside>
  )
}
