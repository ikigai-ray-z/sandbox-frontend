import { ColorSchemeProvider } from './features/color-scheme'
import { QueryProvider } from './shared/query/provider'
import { RouterProvider } from './shared/router/provider'
import { JotaiProvider } from './shared/store/provider'
import { Toaster } from './shared/ui/sonner'

export function App() {
  return (
    <>
      <JotaiProvider>
        <ColorSchemeProvider>
          <QueryProvider>
            <RouterProvider />
          </QueryProvider>
        </ColorSchemeProvider>
      </JotaiProvider>
      <Toaster />
    </>
  )
}
