import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HomeProvider } from '@/components/home/HomeProvider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeProvider>{children}</HomeProvider>
    </QueryClientProvider>
  )
}