import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { Header } from './Header'

export interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box height="100vh">
      <Header />
      <>
        {children}
        <div />
      </>
    </Box>
  )
}
