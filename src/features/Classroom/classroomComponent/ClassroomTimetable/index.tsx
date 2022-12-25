import ColumnHeader from '@/features/Classroom/classroomComponent/ClassroomTimetable/ColumnHeader'
import TimetableCell from '@/features/Classroom/classroomComponent/ClassroomTimetable/TimetableCell'
import { useAttendance } from '@/hooks/attendance'
import { AttendanceSlot } from '@/models/timetable'
import { getCurrentDayOfWeek } from '@/utils/dateFormatting'
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { CalendarPicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import * as React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

interface TimetableProps {
  name: string
  time: string
  MONDAY: AttendanceSlot | undefined
  TUESDAY: AttendanceSlot | undefined
  WEDNESDAY: AttendanceSlot | undefined
  THURSDAY: AttendanceSlot | undefined
  FRIDAY: AttendanceSlot | undefined
}

interface Props {
  id: string
}

export interface DayOfWeekProps {
  name: string
  day: Dayjs
}

const defaultDate: Dayjs = dayjs()

const timetable: TimetableProps[] = [
  {
    name: 'Slot 1 ',
    time: '(7h00 - 8h30)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
  {
    name: 'Slot 2 ',
    time: '(8h45 - 10h15)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
  {
    name: 'Slot 3 ',
    time: '(10h30 - 12h00)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
  {
    name: 'Slot 4 ',
    time: '(12h30 - 14h00)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
  {
    name: 'Slot 5 ',
    time: '(14h15 - 15h45)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
  {
    name: 'Slot 6 ',
    time: '(16h00 - 17h30)',
    MONDAY: undefined,
    TUESDAY: undefined,
    WEDNESDAY: undefined,
    THURSDAY: undefined,
    FRIDAY: undefined,
  },
]

const slots: string[] = ['SLOT1', 'SLOT2', 'SLOT3', 'SLOT4', 'SLOT5', 'SLOT6']

export default function ClassroomTimetable({ id }: Props) {
  const [displayType, setDisplayType] = React.useState<number>(1)
  const [date, setDate] = React.useState<Dayjs>(defaultDate)
  const [rows, setRows] = React.useState<TimetableProps[]>(timetable)
  const [dows, setDows] = React.useState<DayOfWeekProps[]>(getCurrentDayOfWeek(date))

  const { data } = useAttendance(id)

  React.useEffect(() => {
    if (date) {
      const dayOfWeek = getCurrentDayOfWeek(date)
      setDows(dayOfWeek)
    }
  }, [date])
  React.useEffect(() => {
    if (data && dows) {
      data.map((item) => {
        if (dows[0].day.isBefore(dayjs(item.date)) && dows[4].day.isAfter(dayjs(item.date))) {
          handleAddSlotToTimeTable(item)
        }
      })
    }
  }, [data])

  function handleAddSlotToTimeTable(item: AttendanceSlot) {
    const dowCode: keyof TimetableProps = item.dowCode as keyof TimetableProps
    const slotIndex: number = slots.indexOf(item.slotCode)
    rows[slotIndex][dowCode] = item as AttendanceSlot & string
    setRows([...rows])
  }
  function handleChange(event: SelectChangeEvent<number>) {
    const item = event.target.value
    if (typeof item !== 'string') {
      setDisplayType(item)
    }
  }
  function handleChangeDate(tmpDate: Dayjs) {
    setDate(tmpDate)
  }
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Thời Khóa Biểu
      </Typography>

      <Grid container>
        <Grid xs={3}>
          <Stack paddingBottom={2} paddingRight={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Hiển thị </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={displayType}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={0}>Ngày</MenuItem>
                <MenuItem value={1}>Tuần</MenuItem>
                <MenuItem value={2}>Tháng</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <CalendarPicker
            date={date}
            onChange={(newDate) => {
              if (newDate) setDate(newDate)
            }}
          />
        </Grid>
        <Grid xs={9}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Slot học</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ColumnHeader item={dows[0]} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ColumnHeader item={dows[1]} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ColumnHeader item={dows[2]} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ColumnHeader item={dows[3]} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ColumnHeader item={dows[4]} />
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" sx={{ alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{row.name}</Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.time}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimetableCell attendance={row.MONDAY} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimetableCell attendance={row.TUESDAY} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimetableCell attendance={row.WEDNESDAY} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimetableCell attendance={row.THURSDAY} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TimetableCell attendance={row.FRIDAY} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Stack>
  )
}
