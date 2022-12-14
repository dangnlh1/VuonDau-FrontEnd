import { AdminLayout } from '@/components/layout/AdminLayout'
import { Menu } from '@/components/layout/AdminSideBar'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
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

let theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005',
      contrastText: '#fff',
    },
  },
})
theme = responsiveFontSizes(theme)

export const menuList: Menu[] = [
  { label: 'Tổng quan', path: '/giao-vien/tong-quan', icon: <HomeOutlinedIcon /> },
  { label: 'Quản lý lớp', path: '/giao-vien/quan-ly-lop', icon: <ClassOutlinedIcon /> },
  { label: 'Moodle', path: '/giao-vien/moodle', icon: <AccountBoxIcon /> },
  { label: 'Bài tập', path: '/giao-vien/bai-tap', icon: <DescriptionOutlinedIcon /> },
  { label: 'Đề thi', path: '/giao-vien/de-thi', icon: <FolderOpenOutlinedIcon /> },
  { label: 'Đội nhóm', path: '/giao-vien/doi-nhom', icon: <GroupOutlinedIcon /> },
  { label: 'Cài đặt', path: '/giao-vien/cai-dat', icon: <SettingsIcon /> },
]

const settingList = ['Trang Chủ', 'Đăng xuất']

const TeacherDashboard = lazy(() => import('@/features/TeacherDashboard/TeacherDashboard'))
const ExerciseManagement = lazy(() => import('@/features/ExerciseManagement/ExerciseManagement'))
const ClassManagement = lazy(() => import('@/features/ClassManagement/ClassManagement'))
const Exam = lazy(() => import('@/features/Exam/Exam'))
const TeacherTeams = lazy(() => import('@/features/TeacherTeams/TeacherTeams'))
const Moodle = lazy(() => import('@/features/Moodle/Moodle'))

export default function Teacher() {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  useEffect(() => {
    if (!role || role !== 'TEACHER') {
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

  if (!role || role !== 'TEACHER') {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>
        <AdminLayout
          menuList={menuList}
          settingList={settingList}
          onSettingMenuClick={handleSettingMenuClick}
        >
          <Routes>
            <Route index element={<Navigate to="tong-quan" />} />
            <Route path="tong-quan" element={<TeacherDashboard />} />
            <Route path="bai-tap" element={<ExerciseManagement />} />
            <Route path="quan-ly-lop/*" element={<ClassManagement />} />
            <Route path="de-thi" element={<Exam />} />
            <Route path="doi-nhom" element={<TeacherTeams />} />
            <Route path="moodle" element={<Moodle />} />
          </Routes>
        </AdminLayout>
      </Suspense>
    </ThemeProvider>
  )
}
