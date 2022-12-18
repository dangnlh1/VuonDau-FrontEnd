import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useClassTeacher } from '@/hooks/teacher'
interface Props {
  id: string | undefined
}
export default function ClassroomTeacher({ id }: Props) {
  if (!id) return null
  const { data } = useClassTeacher(id)
  return <Stack>{JSON.stringify(data)}</Stack>
}
