import { ComingSoon } from '@/components/common/ComingSoon'
import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import PaymentSuccess from '@/features/PaymentSuccess'
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
