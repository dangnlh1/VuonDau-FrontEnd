import { GoBack } from '@/components/common/GoBack'
import TimetablePicker from '@/components/common/TimetablePicker'
import { useAttendance } from '@/hooks/attendance'
import { AttendanceSlot, DayOfWeekPayload, TimetableRow } from '@/models/timetables'
import { getCurrentDayOfWeek } from '@/utils/dateFormatting'
import { Box, SelectChangeEvent, Stack, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClassTimeTableList } from '../components/ClassTimeTableList'

const defaultDate: Dayjs = dayjs()

const timetable: TimetableRow[] = [
  {
    firstRow: {
      name: 'Slot 1 ',
      time: '(7h00 - 8h30)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
  {
    firstRow: {
      name: 'Slot 2 ',
      time: '(8h45 - 10h15)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
  {
    firstRow: {
      name: 'Slot 3 ',
      time: '(10h30 - 12h00)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
  {
    firstRow: {
      name: 'Slot 4 ',
      time: '(12h30 - 14h00)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
  {
    firstRow: {
      name: 'Slot 5 ',
      time: '(14h15 - 15h45)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
  {
    firstRow: {
      name: 'Slot 6 ',
      time: '(16h00 - 17h30)',
    },
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
    SATURDAY: undefined,
  },
]

const slots: string[] = ['SLOT1', 'SLOT2', 'SLOT3', 'SLOT4', 'SLOT5', 'SLOT6']

const pageTitle = 'Thời Khóa Biểu'

export function ClassTimetable() {
  const [type, setType] = React.useState<number>(1)
  const [date, setDate] = React.useState<Dayjs>(defaultDate)
  const [rows, setRows] = React.useState<TimetableRow[]>(timetable)
  const [dows, setDows] = React.useState<DayOfWeekPayload[]>(getCurrentDayOfWeek(date))

  const id = useParams().classId
  if (!id) return null

  const navigate = useNavigate()
  const { data } = useAttendance(id)

  React.useEffect(() => {
    if (date) {
      const dayOfWeek = getCurrentDayOfWeek(date)
      setDows(dayOfWeek)
    }
  }, [date])

  React.useEffect(() => {
    if (data && dows) {
      data.map((item: AttendanceSlot) => {
        const currentDate = dayjs(item.date)
        const isBefore = dows[0].day.isBefore(currentDate, 'day')
        const isAfter = dows[4].day.isAfter(currentDate, 'day')
        const isSame =
          dows[0].day.isSame(currentDate, 'day') || dows[4].day.isSame(currentDate, 'day')
        if ((isBefore && isAfter) || isSame) {
          handleAddSlotToTimeTable(item)
        }
      })
    }
  }, [data])

  function handleAddSlotToTimeTable(item: AttendanceSlot) {
    const dowCode = item.dowCode
    const slotIndex: number = slots.indexOf(item.slotCode)
    rows[slotIndex][dowCode] = item
    setRows([...rows])
  }

  function handleChangeType(event: SelectChangeEvent<number>) {
    const item = event.target.value
    if (typeof item !== 'string') {
      setType(item)
    }
  }

  function handleChangeDate(date: Dayjs) {
    setDate(date)
  }

  return (
    <Stack spacing={3}>
      <GoBack onClick={() => navigate(-1)} />

      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <Box width="100%">
        <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
          <Box sx={{ xs: '100%', md: { width: 1 / 3 } }}>
            <Box sx={{ p: 2 }}>
              <TimetablePicker
                date={date}
                type={type}
                handleChangeDate={handleChangeDate}
                handleChangeType={handleChangeType}
              />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, xs: '100%', md: { width: 2 / 3 } }}>
            <Box sx={{ p: 2 }}>
              <ClassTimeTableList rows={rows} dows={dows} />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
