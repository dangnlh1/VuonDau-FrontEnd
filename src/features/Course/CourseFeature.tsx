import { Navigate, Route, Routes } from 'react-router-dom'
import { CourseDetail } from './pages/CourseDetail'
import { CoursePage } from './pages/CoursePage'

export function CourseFeature() {
  return (
    <Routes>
      <Route index element={<CoursePage />} />
      <Route path=":courseId" element={<CourseDetail />} />
      <Route />
    </Routes>
  )
}
export default CourseFeature
