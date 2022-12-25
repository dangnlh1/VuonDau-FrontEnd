import { ComingSoon } from '@/components/common/ComingSoon'
import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import PaymentInProgress from '@/features/PaymentInProgress'
import PaymentSuccess from '@/features/PaymentSuccess'
import {
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { env } from 'process'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSubscription } from 'react-stomp-hooks'
import { toast } from 'react-toastify'

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

const Home = lazy(() => import('@/features/Home'))
const TeacherRegister = lazy(() => import('@/features/TeacherRegister/pages/TeacherRegister'))
const StudentRegister = lazy(() => import('@/features/StudentRegister/StudentRegister'))
const Course = lazy(() => import('@/features/Course/CourseFeature'))

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route index element={<Navigate to="trang-chu" />} />
            <Route path="trang-chu/*" element={<Home />} />
            <Route path="dang-ky-giao-vien" element={<TeacherRegister />} />
            <Route path="dang-ky-hoc-sinh" element={<StudentRegister />} />
            <Route path="khoa-hoc/*" element={<Course />} />
            <Route path="gioi-thieu" element={<ComingSoon />} />
            <Route path="thanh-toan" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}
