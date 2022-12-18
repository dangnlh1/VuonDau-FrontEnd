import { useTimetable } from '@/hooks/timetable'
import { Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  id: string | undefined
}
export default function ClassroomSchedule({ id }: Props) {
  if (!id) return null
  const { data } = useTimetable(id)
  return <Stack>{JSON.stringify(data)}</Stack>
}
