import { DayOfWeekPayload } from '@/models/tmpTimetable'
import { dateFormatting } from '@/utils/dateFormatting'
import { Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  item: DayOfWeekPayload
}
export default function ColumnHeader({ item }: Props) {
  const { day, name } = item
  const displayDay = dateFormatting(day.toISOString())
  return (
    <Stack>
      <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Typography>
      <Typography sx={{ fontSize: 13 }}>{displayDay}</Typography>
    </Stack>
  )
}
