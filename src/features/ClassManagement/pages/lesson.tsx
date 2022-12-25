import { CourseContent } from '@/components/common/CourseContent'
import { GoBack } from '@/components/common/GoBack'
import { useResource } from '@/hooks/resource'
import { Box, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { LessonList } from '../components/LessonList'

const pageTitle = 'Danh sách bài học'

export interface LessonProps {}

export function Lesson() {
  const { classId } = useParams()
  const navigate = useNavigate()

  const { resource } = useResource(classId as string)

  console.log({ resource })

  return (
    <Stack spacing={3}>
      <GoBack onClick={() => navigate(-1)} />

      {Array.isArray(resource) && resource.length > 0 && (
        <Box>
          <CourseContent resourceList={resource} title={pageTitle} />
        </Box>
      )}
    </Stack>
  )
}
