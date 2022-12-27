import { CourseContent } from '@/components/common/CourseContent'
import { GoBack } from '@/components/common/GoBack'
import { useResource } from '@/hooks/resource'
import { Box, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const pageTitle = 'Danh sách bài học'

export interface LessonProps {}

export function Lesson() {
  const { classId } = useParams()
  const navigate = useNavigate()

  const { resource } = useResource(classId as string)

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
