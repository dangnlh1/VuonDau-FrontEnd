import { useGetAccountDetailAfterLogin } from '@/hooks/accountDetailAfterLogin'
import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { LayoutType, RolePayload } from '@/models/role'
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    items: [
      { label: 'Đăng kí tìm gia sư', link: '/dang-ky-tim-gia-su' },
      { label: 'Danh sách gia sư', link: '/danh-sach-gia-su' },
    ],
  },
  {
    label: 'Đăng ký',
    items: [
      { label: 'Đăng ký giáo viên', link: '/dang-ky-giao-vien' },
      { label: 'Đăng ký học sinh', link: '/dang-ky-hoc-sinh' },
    ],
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

  const { keycloak } = useKeycloak()
  const token = keycloak.token

  const { data, refetch } = useGetAccountDetailAfterLogin()

  useEffect(() => {
    if (!token) return
    refetch()
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    if (!data) return
    const role = data.role.code
    localStorage.setItem('role', role)
  }, [data])

  async function handleRegisterClick(value: string) {
    if (value === 'login') {
      try {
        await keycloak.login()
      } catch (error) {
        console.log(error)
      }
      return
    }
  }

  function handleToggleDrawer() {
    setShowDrawer((x) => !x)
  }

  function handleLogout() {
    keycloak.logout()
    //clear token
    localStorage.setItem('token', '')
    //clear role
    localStorage.setItem('role', '')
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
