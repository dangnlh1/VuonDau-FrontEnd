import { Route, Routes } from 'react-router-dom'

import ClassroomResource from '@/features/Classroom/pages/ClassroomResource'
import ClassroomHomework from '@/features/Classroom/pages/ClassroomHomework'
import ClassroomTeacher from '@/features/Classroom/pages/ClassroomTeacher'
import ClassroomDetail from '@/features/Classroom/pages/ClassroomDetail'
import ClassroomPages from '@/features/Classroom/pages/ClassroomPages'
import ClassroomTimetable from '@/features/Classroom/pages/ClassroomTimetable'

export function ClassroomFeature() {
  return (
    <Routes>
      <Route index element={<ClassroomPages />} />
      <Route path=":classId" element={<ClassroomDetail />}>
        <Route index element={<ClassroomResource />} />
        <Route path="giao-vien" element={<ClassroomTeacher />} />
        <Route path="tai-nguyen" element={<ClassroomResource />} />
        <Route path="diem-danh" element={<ClassroomTimetable />} />
        <Route path="bai-tap" element={<ClassroomHomework />} />
      </Route>
    </Routes>
  )
}
export default ClassroomFeature
