import { useAtomValue } from 'jotai'

import { isDarkModeAtom } from './atoms'

export function ColorSchemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useAtomValue(isDarkModeAtom) // initialize the color scheme
  return <>{children}</>
}
