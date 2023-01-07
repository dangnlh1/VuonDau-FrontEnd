import ClassTimeTable from './pages/ClassTimeTable'
import { Route, Routes } from 'react-router-dom'
import { Classes } from './pages/Classes'
import { CreateNewClass } from './pages/CreateNewClass'
import { Lesson } from './pages/lesson'
import Students from './pages/Students'

export default function ClassManagement() {
  return (
    <Routes>
      <Route index element={<Classes />} />
      <Route path=":classId">
        <Route index element={<Students />} />
        <Route path="bai-hoc" element={<Lesson />} />
        <Route path="thoi-khoa-bieu" element={<ClassTimeTable />} />
      </Route>

      <Route path="tao-lop-hoc-moi" element={<CreateNewClass />} />
    </Routes>
  )
}
