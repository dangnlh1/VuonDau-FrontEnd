import { CourseContent } from '@/components/common/CourseContent'
import { useResource } from '@/hooks/resource'
import { Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  id: string | undefined
}
export default function ClassroomResource({ id }: Props) {
  if (!id) return null
  const { data, error, isLoading } = useResource(id)
  const resourceList = data?.resources
  return (
    <Stack>
      <CourseContent resourceList={resourceList} title="Nội dung khóa học" />
    </Stack>
  )
}
