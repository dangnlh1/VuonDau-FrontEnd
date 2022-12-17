import ClassroomDetail from '@/features/Classroom/ClassroomDetail'
import ClassroomPages from '@/features/Classroom/ClassroomPages'
import { Navigate, Route, Routes } from 'react-router-dom'

export function ClassroomFeature() {
  return (
    <Routes>
      <Route index element={<ClassroomPages />} />
      <Route path=":classId" element={<ClassroomDetail />} />
      <Route />
    </Routes>
  )
}
export default ClassroomFeature
