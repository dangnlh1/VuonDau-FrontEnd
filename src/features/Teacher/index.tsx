import { AdminLayout } from '@/components/layout/AdminLayout'
import { Menu } from '@/components/layout/AdminSideBar'
import { LinearProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import FolderIcon from '@mui/icons-material/Folder'
import ClassIcon from '@mui/icons-material/Class'
import DescriptionIcon from '@mui/icons-material/Description'
import GroupIcon from '@mui/icons-material/Group'

const menuList: Menu[] = [
  { label: 'Tổng quan', path: '/giao-vien/tong-quan', icon: <HomeIcon /> },
  { label: 'Bài tập', path: '/giao-vien/bai-tap', icon: <DescriptionIcon /> },
  { label: 'Đề thi', path: '/giao-vien/de-thi', icon: <FolderIcon /> },
  { label: 'Quản lý lớp', path: '/giao-vien/quan-ly-lop', icon: <ClassIcon /> },
  { label: 'Đội nhóm', path: '/giao-vien/doi-nhom', icon: <GroupIcon /> },
]

const TeacherDashboard = lazy(() => import('@/features/TeacherDashboard/TeacherDashboard'))
const ExerciseManagement = lazy(() => import('@/features/ExerciseManagement/ExerciseManagement'))
const ClassManagement = lazy(() => import('@/features/ClassManagement/pages/ClassManagement'))
const Exam = lazy(() => import('@/features/Exam/Exam'))
const TeacherTeams = lazy(() => import('@/features/TeacherTeams/TeacherTeams'))

export default function Teacher() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AdminLayout menuList={menuList}>
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
  )
}
