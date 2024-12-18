'use client'
import { IProviderProps } from '@/utils/propsTypes'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const Provider = ({children}:IProviderProps) => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Provider