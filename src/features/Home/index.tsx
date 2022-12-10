import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { HomeDetail } from './pages/HomeDetail'
import { HomePage } from './pages/HomePage'

export function Home() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path=":courseId" element={<HomeDetail />} />
    </Routes>
  )
}

export default Home
