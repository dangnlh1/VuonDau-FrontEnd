import { Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  timeTable: any
}
export default function ClassroomSchedule(props: Props) {
  const { timeTable } = props
  return (
    <Stack
      style={{ marginTop: 5, marginBottom: 5, background: '#fff', borderRadius: 5, padding: 20 }}
    >
      Lịch học
    </Stack>
  )
}
