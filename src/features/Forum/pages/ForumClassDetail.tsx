import { LessonList } from '@/features/Forum/components/LessonList'
import useClassForum from '@/hooks/classForum'
import { ForumLesson } from '@/models/forum'
import { Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const pageTitle = 'Diễn đàn lớp'
const NO_FORUM_LABEL = 'Không có bài học nào để hiển thị.'

export default function ForumClassDetail() {
  const { classId } = useParams()

  const navigate = useNavigate()

  const { data } = useClassForum(classId + '')

  const lessons = data?.forumLessonDtos || []

  function handleForumClick(value: ForumLesson) {
    navigate(`/hoc-sinh/dien-dan/lop-hoc/${classId}/${value.id}`)
  }

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      {Array.isArray(lessons) && lessons.length > 0 ? (
        <Stack>
          <LessonList lessonList={lessons} onCardClick={handleForumClick} />
        </Stack>
      ) : (
        <Stack>
          <Typography variant="body1">{NO_FORUM_LABEL}</Typography>
        </Stack>
      )}
    </Stack>
  )
}
