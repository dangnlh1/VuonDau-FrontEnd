import { DayOfWeekProps } from '@/features/Classroom/classroomComponent/ClassroomTimetable'
import { dateFormatting } from '@/utils/dateFormatting'
import { Stack, Typography } from '@mui/material'
interface Props {
  item: DayOfWeekProps
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
