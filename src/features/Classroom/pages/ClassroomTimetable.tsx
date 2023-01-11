import { Stack, Typography } from '@mui/material'
import { useDayOfWeek } from '@/hooks/dayOfWeek'
import { useSlot } from '@/hooks/slot'
import { getTableRows, ScheduleRow } from '@/utils/table'
import { useState } from 'react'
import { currentDate } from '@/utils/dateFormatting'
import { Dayjs } from 'dayjs'
import ScheduleTable from '@/components/common/ScheduleTable'
import { useAttendance } from '@/hooks/attendance'
import { useParams } from 'react-router-dom'
import WeekPickerField from '@/components/FormFields/WeekPickerField'

const title = 'Thời Khóa Biểu'

export default function ClassroomTimetable() {
  const [date, setDate] = useState<Dayjs>(currentDate)

  const id = useParams().classId
  if (!id) return null

  const schedule = useAttendance(id)
  console.log(schedule.data)

  const daysOfWeek = useDayOfWeek()
  const slots = useSlot()
  const rows: ScheduleRow[] | undefined = getTableRows(daysOfWeek.dayList, slots.slotList)

  function handleChangeDate(tmpDate: Dayjs | null) {
    if (tmpDate) {
      setDate(tmpDate)
    }
  }

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack
        sx={{
          borderRadius: 1,
          marginBottom: 1,
        }}
      >
        <Stack sx={{ paddingRight: 2 }}>
          <WeekPickerField label="Chọn tuần học" value={date} onChangeDate={handleChangeDate} />
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          {daysOfWeek.dayList && rows && schedule.data && (
            <ScheduleTable
              date={date}
              schedule={schedule.data}
              columns={daysOfWeek.dayList}
              rows={rows}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
