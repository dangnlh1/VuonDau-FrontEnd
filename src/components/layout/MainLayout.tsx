import { useGetAccountDetailAfterLogin } from '@/hooks/accountDetailAfterLogin'
import { InfoPayload } from '@/models/info'
import { NavPayload, RegisterPayload } from '@/models/navMenu'
import { DialogPayload } from '@/models/option'
import { Box, Stack, Toolbar } from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLoading } from '../common/PageLoading'
import { Footer } from './Footer'
import { Header } from './Header'
import { SideBar } from './SideBar'

const settingList = ['Dashboard', 'Logout']
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
    label: 'Đăng ký giáo viên',
    link: '/dang-ky-giao-vien',
    value: 'TEACHER',
  },
]

const registerList: RegisterPayload[] = [
  {
    label: 'Đăng nhập',
    value: 'login',
    variant: 'contained',
  },
  {
    label: 'Tạo tài khoản',
    value: 'sign-up',
    variant: 'outlined',
  },
]

const roleList: DialogPayload[] = [
  {
    label: 'Học Sinh',
    link: '/dang-ky-hoc-sinh',
    icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/2x/external-student-university-flaticons-flat-flat-icons-2.png',
  },
  {
    label: 'Giáo Viên',
    link: '/dang-ky-giao-vien',
    icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/2x/external-lecturer-university-flaticons-flat-flat-icons.png',
  },
]

export function MainLayout({ children }: MainLayoutProps) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [user, setUser] = useState<InfoPayload | null>(null)
  const [openRoleDialog, setOpenRoleDialog] = useState<boolean>(false)

  const { keycloak } = useKeycloak()
  const token = keycloak.token

  const { data, refetch } = useGetAccountDetailAfterLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setUser(null)
      localStorage.setItem('role', '')
      return
    }

    refetch()
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    if (!data) return
    const role = data.role.code
    localStorage.setItem('role', role)
    setUser(data)
  }, [data])

  function handleClose() {
    setOpenRoleDialog(false)
  }

  function handleNavigate(value: string) {
    navigate(value)
  }

  async function handleRegisterClick(value: string) {
    if (value === 'login') {
      try {
        await keycloak.login()
      } catch (error) {
        console.log(error)
      }
    }

    setOpenRoleDialog(true)
  }

  function handleToggleDrawer() {
    setShowDrawer((x) => !x)
  }

  function handleSettingMenuClick(value: string) {
    if (value === 'Dashboard' && data) {
      switch (data.role.code) {
        case 'TEACHER':
          navigate(`/giao-vien`)
          return

        case 'STUDENT':
          navigate(`/hoc-sinh`)
          return

        default:
          navigate(`/`)
          return
      }
    }

    keycloak.logout()
    localStorage.setItem('token', '')
  }

  return (
    <Stack width="100%" height="100vh">
      <Header
        firstNavList={firstNavList}
        registerList={registerList}
        roleList={roleList}
        user={user as InfoPayload}
        openChooseRoleDialog={openRoleDialog}
        settingList={settingList}
        onRegisterClick={handleRegisterClick}
        onToggleDrawer={handleToggleDrawer}
        onSettingMenuClick={handleSettingMenuClick}
        onCloseDialog={handleClose}
        onNavigate={handleNavigate}
      />

      <SideBar
        navList={[...firstNavList, ...lastNavList]}
        registerList={registerList}
        onClose={() => setShowDrawer(false)}
        onRegisterClick={handleRegisterClick}
        open={showDrawer}
      />

      <Box flexGrow={1} sx={{ mt: '102px' }}>
        {children}
      </Box>

      <Footer />
      <PageLoading />
    </Stack>
  )
}
