//react
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

//mui component
import { LinearProgress } from '@mui/material'

//mui icon
import HomeIcon from '@mui/icons-material/Home'
import ForumIcon from '@mui/icons-material/Forum'
import ClassIcon from '@mui/icons-material/Class'
import SchoolIcon from '@mui/icons-material/School'
import SettingsIcon from '@mui/icons-material/Settings'

//layout
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Menu } from '@/components/layout/AdminSideBar'
//pages

import StudentDashboard from '@/features/StudentDashboard/StudentDashboard'
import Moodle from '@/features/Moodle/Moodle'
import Forum from '@/features/Forum/Forum'
import ClassroomFeature from '@/features/Classroom/ClassroomFeature'

export const menuList: Menu[] = [
  { label: 'Tổng quan', path: '/hoc-sinh/tong-quan', icon: <HomeIcon /> },
  { label: 'Học tập', path: '/hoc-sinh/hoc-tap', icon: <SchoolIcon /> },
  { label: 'Diễn đàn', path: '/hoc-sinh/dien-dan', icon: <ForumIcon /> },
  { label: 'Lớp Học', path: '/hoc-sinh/lop-hoc', icon: <ClassIcon /> },
]

export const lastMenuList: Menu[] = [
  { label: 'Cài đặt', path: '/hoc-sinh/cai-dat', icon: <SettingsIcon /> },
]

export default function Students() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AdminLayout menuList={menuList} lastMenuList={lastMenuList}>
        <Routes>
          <Route index element={<Navigate to="tong-quan" />} />
          <Route path="tong-quan" element={<StudentDashboard />} />
          <Route path="hoc-tap" element={<Moodle />} />
          <Route path="dien-dan" element={<Forum />} />
          <Route path="lop-hoc/*" element={<ClassroomFeature />} />
        </Routes>
      </AdminLayout>
    </Suspense>
  )
}
