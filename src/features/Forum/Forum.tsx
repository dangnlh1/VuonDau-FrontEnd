import ClassroomDetail from '@/features/Classroom/pages/ClassroomDetail'
import ForumDetail from '@/features/Forum/ForumDetail'
import ForumPage from '@/features/Forum/ForumPage'
import { Route, Routes } from 'react-router-dom'

export function Forum() {
  return (
    <Routes>
      <Route index element={<ForumPage />} />
      <Route path=":forumId" element={<ForumDetail />} />
    </Routes>
  )
}
export default Forum
