import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import {
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('@/features/Home'))
const TeacherRegister = lazy(() => import('@/features/TeacherRegister/TeacherRegister'))

export default function App() {
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<Navigate to="trang-chu" />} />
            <Route path="trang-chu/*" element={<Home />} />
            <Route path="giao-vien" element={<TeacherRegister />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}
