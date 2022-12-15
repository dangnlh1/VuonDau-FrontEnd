import { AdminLayout } from '@/components/layout/AdminLayout'
import { Menu } from '@/components/layout/AdminSideBar'
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

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
  { label: 'Bài tập', path: '/giao-vien/bai-tap', icon: <DescriptionOutlinedIcon /> },
  { label: 'Đề thi', path: '/giao-vien/de-thi', icon: <FolderOpenOutlinedIcon /> },
  { label: 'Quản lý lớp', path: '/giao-vien/quan-ly-lop', icon: <ClassOutlinedIcon /> },
  { label: 'Đội nhóm', path: '/giao-vien/doi-nhom', icon: <GroupOutlinedIcon /> },
]

export const lastMenuList: Menu[] = [
  { label: 'Cài đặt', path: '/giao-vien/cai-dat', icon: <SettingsIcon /> },
]

const TeacherDashboard = lazy(() => import('@/features/TeacherDashboard/TeacherDashboard'))
const ExerciseManagement = lazy(() => import('@/features/ExerciseManagement/ExerciseManagement'))
const ClassManagement = lazy(() => import('@/features/ClassManagement/ClassManagement'))
const Exam = lazy(() => import('@/features/Exam/Exam'))
const TeacherTeams = lazy(() => import('@/features/TeacherTeams/TeacherTeams'))

export default function Teacher() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>
        <AdminLayout menuList={menuList} lastMenuList={lastMenuList}>
          <Routes>
            <Route index element={<Navigate to="tong-quan" />} />
            <Route path="tong-quan" element={<TeacherDashboard />} />
            <Route path="bai-tap" element={<ExerciseManagement />} />
            <Route path="quan-ly-lop" element={<ClassManagement />} />
            <Route path="de-thi" element={<Exam />} />
            <Route path="doi-nhom" element={<TeacherTeams />} />
          </Routes>
        </AdminLayout>
      </Suspense>
    </ThemeProvider>
  )
}
