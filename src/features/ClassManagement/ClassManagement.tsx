import { Route, Routes } from 'react-router-dom'
import Classes from './pages/Classes'
import Students from './pages/Students'

export default function ClassManagement() {
  return (
    <Routes>
      <Route index element={<Classes />} />
      <Route path=":classId" element={<Students />} />
    </Routes>
  )
}
