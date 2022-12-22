import { Route, Routes } from 'react-router-dom'
import Classes from './pages/Classes'
import { CreateClass } from './pages/CreateClass'
import { CreateCourse } from './pages/CreateCourse'
import Students from './pages/Students'

export default function ClassManagement() {
  return (
    <Routes>
      <Route index element={<Classes />} />
      <Route path=":classId" element={<Students />} />
      <Route path="tao-lop-hoc-moi" element={<CreateClass />} />
      <Route path="tao-khoa-hoc-moi" element={<CreateCourse />} />
    </Routes>
  )
}
