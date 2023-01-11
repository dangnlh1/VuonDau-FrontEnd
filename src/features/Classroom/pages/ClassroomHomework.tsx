import { CourseContent } from '@/components/common/CourseContent'
import useExerciseByStudent from '@/hooks/exercise'
import { useResource } from '@/hooks/resource'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
export default function ClassroomHomework() {
  const id = useParams().classId
  if (!id) return null
  const { exercise } = useExerciseByStudent(parseInt(id))

  return (
    <Stack>
      <CourseContent resourceList={exercise || []} title="Bài tập" />
    </Stack>
  )
}
