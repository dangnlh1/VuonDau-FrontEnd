import { Home } from '@/features/Home'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import {
  Box,
  createTheme,
  CssBaseline,
  LinearProgress,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFound } from '@/components/common/NotFound'
import { MainLayout } from '@/components/layout/MainLayout'
import { TeacherRegister } from './features/TeacherRegister/TeacherRegister'

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
            <Route path="trang-chu" element={<Home />} />
            <Route path="giao-vien" element={<TeacherRegister />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}
