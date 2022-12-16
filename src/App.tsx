import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import Main from '@/features/Main'
import { Route, Routes } from 'react-router-dom'
import Teacher from './features/Teacher'
import Student from './features/Student'

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="giao-vien/*" element={<Teacher />} />
      <Route path="hoc-sinh/*" element={<Student />} />
    </Routes>
  )
}
