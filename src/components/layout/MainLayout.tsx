import { NavPayload, RegisterPayload } from '@/models/navMenu'
import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
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
let theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#fff',
    },
  },
})
theme = responsiveFontSizes(theme)

export function MainLayout({ children }: MainLayoutProps) {
  const [showDrawer, setShowDrawer] = useState(false)

  const { keycloak, initialized } = useKeycloak()
  console.log(keycloak.token)
  async function handleRegisterClick(value: string) {
    if (value === 'login') {
      try {
        await keycloak.login()
        // console.log(keycloak.token)
      } catch (error) {
        console.log(error.message)
      }
      return
    }
  }

  function handleToggleDrawer() {
    setShowDrawer((x) => !x)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  )
}
