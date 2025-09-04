import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { ZodError } from 'zod'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error.message)
      if (error instanceof ZodError) {
        enqueueSnackbar('API Parsing Error', { variant: 'error' })
        return
      }
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error(error.message)
      if (error instanceof ZodError) {
        enqueueSnackbar('API Parsing Error', { variant: 'error' })
        return
      }
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  }),
})
