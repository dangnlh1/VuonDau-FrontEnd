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
import SettingsIcon from '@mui/icons-material/Settings'
import StudentDashboard from '@/features/StudentDashboard/StudentDashboard'
import Moodle from '@/features/Moodle/Moodle'
import Forum from '@/features/Forum/Forum'
import Classroom from '@/features/Classroom/Classroom'

export const menuList: Menu[] = [
  { label: 'Tổng quan', path: '/hoc-sinh/tong-quan', icon: <HomeIcon /> },
  { label: 'Moodle', path: '/hoc-sinh/moodle', icon: <DescriptionIcon /> },
  { label: 'Forum', path: '/hoc-sinh/forum', icon: <FolderIcon /> },
  { label: 'Lớp Học', path: '/hoc-sinh/lop-hoc', icon: <ClassIcon /> },
]

export const lastMenuList: Menu[] = [
  { label: 'Cài đặt', path: '/hoc-sinh/cai-dat', icon: <SettingsIcon /> },
]

const TeacherDashboard = lazy(() => import('@/features/TeacherDashboard/TeacherDashboard'))
const ExerciseManagement = lazy(() => import('@/features/ExerciseManagement/ExerciseManagement'))
const ClassManagement = lazy(() => import('@/features/ClassManagement/pages/ClassManagement'))
const Exam = lazy(() => import('@/features/Exam/Exam'))
const TeacherTeams = lazy(() => import('@/features/TeacherTeams/TeacherTeams'))

export default function Teacher() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AdminLayout menuList={menuList} lastMenuList={lastMenuList}>
        <Routes>
          <Route index element={<Navigate to="tong-quan" />} />
          <Route path="tong-quan" element={<StudentDashboard />} />
          <Route path="moodle" element={<Moodle />} />
          <Route path="forum" element={<Forum />} />
          <Route path="lop-hoc" element={<Classroom />} />
        </Routes>
      </AdminLayout>
    </Suspense>
  )
}