import {
  Avatar,
  ButtonBase,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { onSignOut } from '@/features/auth/utils'
import { cn } from '@/shared/lib/utils'

import { useBreakpoint } from './hooks'

interface Props {
  className?: string
  onToggle: () => void
}
export function Header({ className, onToggle }: Props) {
  const { isMobile } = useBreakpoint()
  const [avatarElement, setAvatarElement] = useState<HTMLButtonElement | null>(
    null,
  )
  const isAvatarMenuOpen = Boolean(avatarElement)

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarElement(event.currentTarget)
  }

  const handleAvatarMenuClose = () => {
    setAvatarElement(null)
  }

  return (
    <header
      className={cn(
        'bg-background-default/95 sticky top-0 z-10 flex items-center gap-4 px-4 py-3 backdrop-blur-xs md:px-8',
        className,
      )}
    >
      {isMobile && (
        <IconButton onClick={onToggle}>
          <MenuIcon />
        </IconButton>
      )}
      <ButtonBase
        className="ms-auto gap-1 rounded-lg"
        onClick={handleAvatarClick}
        aria-controls={isAvatarMenuOpen ? 'avatar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isAvatarMenuOpen ? 'true' : undefined}
      >
        <Avatar className="size-8" />
        <ExpandMoreIcon className="size-4" />
      </ButtonBase>
      <Menu
        anchorEl={avatarElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isAvatarMenuOpen}
        onClose={handleAvatarMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'avatar-list',
          },
        }}
      >
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <LogoutTwoToneIcon />
          </ListItemIcon>
          <ListItemText className="text-sm">Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </header>
  )
}
