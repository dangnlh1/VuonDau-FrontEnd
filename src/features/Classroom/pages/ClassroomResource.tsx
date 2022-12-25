import { CourseContent } from '@/components/common/CourseContent'
import { useResource } from '@/hooks/resource'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
export default function ClassroomResource() {
  const id = useParams().classId
  if (!id) return null
  const { resource, error, isLoading } = useResource(id)

  return (
    <Stack>
      <CourseContent resourceList={resource || []} title="Tài Nguyên Môn Học" />
    </Stack>
  )
}
