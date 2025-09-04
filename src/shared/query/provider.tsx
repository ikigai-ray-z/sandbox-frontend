import { QueryClientProvider as Provider } from '@tanstack/react-query'

import { queryClient } from './instance'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={queryClient}>{children}</Provider>
}
