import { Route, Routes } from 'react-router-dom'

import ForumClassDetail from '@/features/Forum/pages/ForumClassDetail'
import ForumClasses from '@/features/Forum/pages/ForumClasses'
import ForumCommunity from '@/features/Forum/pages/ForumCommunity'
import ForumPage from '@/features/Forum/pages/ForumPage'
import ForumQuestion from '@/features/Forum/pages/ForumQuestion'


export function Forum() {
  return (
    <Routes>
      <Route path="" element={<ForumPage />}>
        <Route index element={<ForumCommunity />} />
        <Route path="mon-hoc" element={<ForumCommunity />} />
        <Route path="mon-hoc/:questionId" element={<ForumQuestion />} />
        <Route path="lop-hoc" element={<ForumClasses />} />
        <Route path="lop-hoc/:classId" element={<ForumClassDetail />}>
          <Route path=":questionId" element={<ForumQuestion />} />
        </Route>
      </Route>
    </Routes>
  )
}
export default Forum
