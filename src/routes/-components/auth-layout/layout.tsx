import { useState } from 'react'

import { Aside } from './aside'
import { useBreakpoint } from './hooks'
import { Main } from './main'
import { Header } from './header'

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useBreakpoint()
  const [isOpenAside, setIsOpenAside] = useState(isDesktop)

  const onToggleAside = () => {
    setIsOpenAside(!isOpenAside)
  }

  return (
    <div className="relative flex h-dvh w-dvw">
      <Aside
        className="shrink-0"
        isOpen={isOpenAside}
        onToggle={onToggleAside}
      />
      <div className="flex grow flex-col overflow-y-auto">
        <Header className="shrink-0" onToggle={onToggleAside} />
        <Main className="grow">{children}</Main>
      </div>
    </div>
  )
}
