import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export interface MainLayoutProps {
  children?: ReactNode
}

const firstNavList: NavPayload[] = [
  {
    label: 'Trang chủ',
    link: 'home',
  },
  {
    label: 'Khóa học',
    link: 'home',
  },
  {
    label: 'Giới thiệu',
    link: 'home',
  },
]

const registerList: RegisterPayload[] = [
  {
    label: 'Giảng dạy trên Vườn Dâu',
    link: '/teaching-register',
    variant: 'text',
  },
  {
    label: 'Đăng nhập',
    link: '/login',
    variant: 'outlined',
  },
  {
    label: 'Đăng ký',
    link: '/sign-up',
    variant: 'outlined',
  },
]

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack width="100%" height="100vh">
      <Header firstNavList={firstNavList} registerList={registerList} />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
    </Stack>
  )
}
