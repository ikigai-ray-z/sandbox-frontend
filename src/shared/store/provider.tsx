import { Provider } from 'jotai'

import { store } from './instance'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
