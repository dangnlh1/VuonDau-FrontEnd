import ClassroomResource from '@/features/Classroom/classroomComponent/ClassroomResource'
import ClassroomSchedule from '@/features/Classroom/classroomComponent/ClassroomSchedule'
import ClassroomTeacher from '@/features/Classroom/classroomComponent/ClassroomTeacher'
import ClassroomDetail from '@/features/Classroom/ClassroomDetail'
import ClassroomPages from '@/features/Classroom/ClassroomPages'
import { Navigate, Route, Routes } from 'react-router-dom'

export function ClassroomFeature() {
  return (
    <Routes>
      <Route index element={<ClassroomPages />} />
      <Route path=":classId" element={<ClassroomDetail />}>
        <Route path="giao-vien" element={<ClassroomTeacher />} />
        <Route index element={<ClassroomResource />} />
        <Route path="tai-nguyen" element={<ClassroomResource />} />
        <Route path="diem-danh" element={<ClassroomSchedule />} />
      </Route>
    </Routes>
  )
}
export default ClassroomFeature
