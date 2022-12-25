import { Route, Routes } from 'react-router-dom'
import { Classes } from './pages/Classes'
import { CreateNewClass } from './pages/CreateNewClass'
import Students from './pages/Students'

export default function ClassManagement() {
  return (
    <Routes>
      <Route index element={<Classes />} />
      <Route path=":classId" element={<Students />} />
      <Route path="tao-lop-hoc-moi" element={<CreateNewClass />} />
    </Routes>
  )
}
