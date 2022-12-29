import { Route, Routes } from 'react-router-dom'

import ForumClassDetail from '@/features/Forum/pages/ForumClassDetail'
import ForumClasses from '@/features/Forum/pages/ForumClasses'
import ForumPage from '@/features/Forum/pages/ForumPage'
import ForumQuestion from '@/features/Forum/pages/ForumQuestion'
import ForumSubject from '@/features/Forum/pages/ForumSubject'
import ForumSubjects from '@/features/Forum/pages/ForumSubjects'
import ForumLesson from '@/features/Forum/pages/ForumLesson'

export function Forum() {
  return (
    <Routes>
      <Route path="/" element={<ForumPage />}>
        <Route index element={<ForumSubjects />} />
        <Route path="mon-hoc" element={<ForumSubjects />} />
        <Route path="mon-hoc/:subjectId" element={<ForumSubject />} />
        <Route path="mon-hoc/:subjectId/:questionId" element={<ForumQuestion />} />
        <Route path="lop-hoc" element={<ForumClasses />} />
        <Route path="lop-hoc/:classId" element={<ForumClassDetail />} />
        <Route path="lop-hoc/:classId/:lessonId" element={<ForumLesson />} />
        <Route path="lop-hoc/:classId/:lessonId/:questionId" element={<ForumQuestion />} />
      </Route>
    </Routes>
  )
}
export default Forum
