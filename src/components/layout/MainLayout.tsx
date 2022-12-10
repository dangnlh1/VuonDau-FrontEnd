import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { Box, Stack } from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export interface MainLayoutProps {
  children?: ReactNode
}

const firstNavList: NavPayload[] = [
  {
    label: 'Trang chủ',
    link: 'trang-chu',
  },
  {
    label: 'Khóa học',
    link: 'khoa-hoc',
  },
  {
    label: 'Giới thiệu',
    link: 'gioi-thieu',
  },
]

const lastNavList: NavPayload[] = [
  {
    label: 'Học sinh',
    link: '/hoc-sinh',
  },
  {
    label: 'Giáo viên',
    link: '/giao-vien',
  },
]

const registerList: RegisterPayload[] = [
  {
    label: 'Đăng nhập',
    value: 'login',
  },
  {
    label: 'Đăng ký',
    value: 'signUp',
  },
]

export function MainLayout({ children }: MainLayoutProps) {
  const { keycloak, initialized } = useKeycloak()

  function handleRegisterClick(value: string) {
    console.log(value)
    if (value === 'login') {
      keycloak.login()
      return
    }
  }

  return (
    <Stack width="100%" height="100vh">
      <Header
        firstNavList={firstNavList}
        registerList={registerList}
        lastNavList={lastNavList}
        onRegisterClick={handleRegisterClick}
      />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
    </Stack>
  )
}
