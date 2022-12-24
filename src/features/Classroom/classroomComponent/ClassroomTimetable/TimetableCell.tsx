import { AttendanceSlot } from '@/models/timetable'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { dateFormatting } from '@/utils/dateFormatting'
interface Props {
  attendance: AttendanceSlot | undefined
}
export default function TimetableCell({ attendance }: Props) {
  return (
    <Box sx={{ flexWrap: 'wrap', width: 150 }}>
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
    </Box>
  )
}
