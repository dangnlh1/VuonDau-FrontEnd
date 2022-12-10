import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import {
  Box,
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ComingSoon } from './components/common/ComingSoon'

const Home = lazy(() => import('@/features/Home'))
const TeacherRegister = lazy(() => import('@/features/TeacherRegister/TeacherRegister'))

export default function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<Navigate to="trang-chu" />} />
            <Route path="trang-chu/*" element={<Home />} />
            <Route path="giao-vien" element={<TeacherRegister />} />
            <Route path="gioi-thieu" element={<ComingSoon />} />
            <Route path="khoa-hoc" element={<ComingSoon />} />
            <Route path="hoc-sinh" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}
