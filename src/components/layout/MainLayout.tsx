import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { Box, Stack, Toolbar } from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { ReactNode, useState } from 'react'
import { PageLoading } from '../common/PageLoading'
import { Footer } from './Footer'
import { Header } from './Header'
import { SideBar } from './SideBar'

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
    link: '/dang-ky-hoc-sinh',
  },
  {
    label: 'Đăng ký giáo viên',
    link: '/dang-ky-giao-vien',
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
  const [showDrawer, setShowDrawer] = useState(false)

  const { keycloak, initialized } = useKeycloak()

  function handleRegisterClick(value: string) {
    console.log(value)
    if (value === 'login') {
      keycloak.login()
      return
    }
  }

  function handleToggleDrawer() {
    setShowDrawer((x) => !x)
  }

  return (
    <Stack width="100%" height="100vh">
      <Header
        firstNavList={firstNavList}
        registerList={registerList}
        lastNavList={lastNavList}
        onRegisterClick={handleRegisterClick}
        onToggleDrawer={handleToggleDrawer}
      />
      <Toolbar />

      <SideBar
        navList={[...firstNavList, ...lastNavList]}
        registerList={registerList}
        onClose={() => setShowDrawer(false)}
        onRegisterClick={handleRegisterClick}
        open={showDrawer}
      />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
      <PageLoading />
    </Stack>
  )
}
