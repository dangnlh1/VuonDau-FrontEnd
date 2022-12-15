import { ComingSoon } from '@/components/common/ComingSoon'
import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import { LinearProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('@/features/Home'))
const TeacherRegister = lazy(() => import('@/features/TeacherRegister/TeacherRegister'))
const Course = lazy(() => import('@/features/Course/CourseFeature'))

export default function Main() {
  return (
    <MainLayout>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route index element={<Navigate to="trang-chu" />} />
          <Route path="trang-chu/*" element={<Home />} />
          <Route path="dang-ky-giao-vien" element={<TeacherRegister />} />
          <Route path="gioi-thieu" element={<ComingSoon />} />
          <Route path="khoa-hoc/*" element={<Course />} />
          <Route path="dang-ky-hoc-sinh" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}
