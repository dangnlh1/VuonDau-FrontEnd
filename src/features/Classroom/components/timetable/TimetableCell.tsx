import { AttendanceSlot, FirstRowProps } from '@/models/timetable'
import { Box, Chip, Typography } from '@mui/material'
interface Props {
  firstRow?: FirstRowProps
  attendance?: AttendanceSlot | undefined
}
export default function TimetableCell({ attendance, firstRow }: Props) {
  return (
    <Box sx={{ flexWrap: 'wrap', width: 120 }}>
      {attendance && (
        <>
          <Typography
            sx={{ fontSize: 12 }}
          >{`${attendance.startTime} - ${attendance.endTime}`}</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>
            {`Slot ${attendance.slotNumber} - ${attendance.archetypeName.toUpperCase()}`}
          </Typography>
          <Chip
            sx={{ fontSize: 12 }}
            label={attendance.present ? 'Đã điểm danh' : 'Chưa điểm danh'}
            color={attendance.present ? 'success' : 'error'}
            variant="filled"
          />
        </>
      )}
      {firstRow && (
        <>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{firstRow.name}</Typography>
          <Typography sx={{ fontSize: 13 }}>{firstRow.time}</Typography>
        </>
      )}
    </Box>
  )
}
