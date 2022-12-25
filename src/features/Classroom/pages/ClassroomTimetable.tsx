import * as React from 'react'
import { Grid, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
import { useAttendance } from '@/hooks/attendance'
import { getCurrentDayOfWeek } from '@/utils/dateFormatting'
import { AttendanceSlot, DayOfWeekPayload, TimetableRow } from '@/models/timetable'
import TimetablePicker from '@/features/Classroom/components/timetable/TimetablePicker'
import Timetable, { StyledTableCell, StyledTableRow } from '@/components/common/Timetable'
import ColumnHeader from '@/features/Classroom/components/timetable/ColumnHeader'
import TimetableCell from '@/features/Classroom/components/timetable/TimetableCell'

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
  },
]

const slots: string[] = ['SLOT1', 'SLOT2', 'SLOT3', 'SLOT4', 'SLOT5', 'SLOT6']

const title = 'Thời Khóa Biểu'

export default function ClassroomTimetable() {
  const [type, setType] = React.useState<number>(1)
  const [date, setDate] = React.useState<Dayjs>(defaultDate)
  const [rows, setRows] = React.useState<TimetableRow[]>(timetable)
  const [dows, setDows] = React.useState<DayOfWeekPayload[]>(getCurrentDayOfWeek(date))

  const id = useParams().classId
  if (!id) return null

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
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container>
        <Grid item xs={3}>
          <TimetablePicker
            date={date}
            type={type}
            handleChangeDate={handleChangeDate}
            handleChangeType={handleChangeType}
          />
        </Grid>
        <Grid item xs={9}>
          <Timetable
            dows={dows}
            rows={rows}
            renderRowCell={(item: TimetableRow, idx: number) => (
              <StyledTableRow key={idx}>
                <StyledTableCell component="th" scope="row" sx={{ alignItems: 'center' }}>
                  <TimetableCell firstRow={item.firstRow} />
                </StyledTableCell>
                <StyledTableCell>
                  <TimetableCell attendance={item.MONDAY} />
                </StyledTableCell>
                <StyledTableCell>
                  <TimetableCell attendance={item.TUESDAY} />
                </StyledTableCell>
                <StyledTableCell>
                  <TimetableCell attendance={item.WEDNESDAY} />
                </StyledTableCell>
                <StyledTableCell>
                  <TimetableCell attendance={item.THURSDAY} />
                </StyledTableCell>
                <StyledTableCell>
                  <TimetableCell attendance={item.FRIDAY} />
                </StyledTableCell>
              </StyledTableRow>
            )}
            renderHeadCell={(item: DayOfWeekPayload, idx: number) => (
              <StyledTableCell>
                <ColumnHeader item={item} />
              </StyledTableCell>
            )}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}
