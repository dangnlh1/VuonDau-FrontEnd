import { Teacher } from '@/models/class'
import { Stack } from '@mui/material'
import React from 'react'
interface Props {
  teacher: Teacher
}
export default function ClassroomTeacher(props: Props) {
  const { teacher } = props
  return (
    <Stack
      style={{ marginTop: 5, marginBottom: 5, background: '#fff', borderRadius: 5, padding: 20 }}
    >
      Teacher
    </Stack>
  )
}
