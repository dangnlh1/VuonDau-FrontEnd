import { Stack, Typography } from '@mui/material'
import { useUserTimetable } from '@/hooks/userTimetable'
import { useDayOfWeek } from '@/hooks/dayOfWeek'
import { useSlot } from '@/hooks/slot'
import { getTableRows, ScheduleRow } from '@/utils/table'
import { useState } from 'react'
import { currentDate } from '@/utils/dateFormatting'
import { Dayjs } from 'dayjs'
import CustomDay from '@/components/common/CustomDay'
import ScheduleTable from '@/components/common/ScheduleTable'

const title = 'Thời Khóa Biểu'

export default function StudentSchedule() {
  const [date, setDate] = useState<Dayjs>(currentDate)

  const schedule = useUserTimetable()
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
          flexDirection: 'row',
        }}
      >
        <Stack sx={{ paddingRight: 2 }}>
          <CustomDay value={date} onChangeDate={handleChangeDate} />
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          {daysOfWeek.dayList && rows && schedule.data && (
            <ScheduleTable
              date={date}
              schedules={schedule.data}
              columns={daysOfWeek.dayList}
              rows={rows}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
