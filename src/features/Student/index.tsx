import { Menu } from '@/components/layout/AdminSideBar'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School'
import ForumIcon from '@mui/icons-material/Forum'
import ClassIcon from '@mui/icons-material/Class'
import {
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { StudentLayout } from '@/components/layout/StudentLayout'

let theme = createTheme({
  palette: {
    primary: {
      main: '#74a2f7',
      light: '#7789ff',
      dark: '#506faa',
      contrastText: '#fff',
    },
  },
})
theme = responsiveFontSizes(theme)

export const menuList: Menu[] = [
  { label: 'Tổng quan', path: '/hoc-sinh/tong-quan', icon: <HomeIcon /> },
  { label: 'Học tập', path: '/hoc-sinh/hoc-tap', icon: <SchoolIcon /> },
  { label: 'Diễn đàn', path: '/hoc-sinh/dien-dan', icon: <ForumIcon /> },
  { label: 'Lớp Học', path: '/hoc-sinh/lop-hoc', icon: <ClassIcon /> },
]

const settingList = ['Trang Chủ', 'Đăng xuất']

const StudentDashboard = lazy(() => import('@/features/StudentDashboard/StudentDashboard'))
const Moodle = lazy(() => import('@/features/Moodle/Moodle'))
const Forum = lazy(() => import('@/features/Forum/Forum'))
const ClassroomFeature = lazy(() => import('@/features/Classroom/ClassroomFeature'))

export default function Teacher() {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  useEffect(() => {
    if (!role || role !== 'STUDENT') {
      navigate('/trang-chu')
    }
  }, [role])

  function handleSettingMenuClick(value: string) {
    if (value === 'Đăng xuất') {
      keycloak.logout()
      localStorage.setItem('token', '')
      localStorage.setItem('role', '')

      return
    }

    if (value === 'Trang Chủ') {
      navigate('/trang-chu')
    }
  }

  if (!role || role !== 'STUDENT') {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>
        <StudentLayout
          menuList={menuList}
          settingList={settingList}
          onSettingMenuClick={handleSettingMenuClick}
        >
          <Routes>
            <Route index element={<Navigate to="tong-quan" />} />
            <Route path="tong-quan" element={<StudentDashboard />} />
            <Route path="hoc-tap" element={<Moodle />} />
            <Route path="dien-dan" element={<Forum />} />
            <Route path="lop-hoc/*" element={<ClassroomFeature />} />
          </Routes>
        </StudentLayout>
      </Suspense>
    </ThemeProvider>
  )
}
