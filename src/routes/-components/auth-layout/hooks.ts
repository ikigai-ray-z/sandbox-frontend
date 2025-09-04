import { useMediaQuery, useTheme } from '@mui/material'

export const useBreakpoint = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const isDesktop = matches
  const isMobile = !matches

  return { isDesktop, isMobile }
}
