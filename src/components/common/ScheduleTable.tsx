import { DayOfWeek } from '@/models/dayOfWeek'
import { AttendanceRequest, AttendanceSlot } from '@/models/timetables'
import { checkDayInWeek, dateFormatting } from '@/utils/dateFormatting'
import { ScheduleCell, ScheduleRow } from '@/utils/table'
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

interface ScheduleTableProps {
  date: Dayjs
  schedules?: AttendanceRequest[]
  schedule?: AttendanceSlot[]
  rows: ScheduleRow[]
  columns: DayOfWeek[]
}

const ScheduleTable = ({ columns, rows, date, schedules, schedule }: ScheduleTableProps) => {
  const [displayRows, setDisplayRows] = useState<ScheduleRow[]>()

  function handleAddStudySlot(attendance: AttendanceSlot) {
    const value: ScheduleCell = {
      dowCode: attendance.dowCode,
      isStudied: true,
      date: `${dateFormatting(attendance.date)}`,
      isPresent: !!attendance.present,
      name: attendance.archetypeName,
      time: '',
    }

    const nextRows: ScheduleRow[] | undefined = rows?.map((row) => {
      if (row.code === attendance.slotCode) {
        const nextDowArray = row.dowArray.map((dow) => {
          if (dow.dowCode === attendance.dowCode) {
            return value
          } else {
            return dow
          }
        })
        row.dowArray = nextDowArray
        return row
      } else {
        return row
      }
    })

    setDisplayRows(nextRows)
  }

  function handleAddSchedule() {
    setDisplayRows(rows)
    if (schedules) {
      schedules.map((studySlot) =>
        studySlot.attendance.map((attendance) => {
          const slotDay = dayjs(attendance.date)
          const { dayIsBetween } = checkDayInWeek(date, slotDay)
          if (dayIsBetween) {
            handleAddStudySlot(attendance)
          }
        })
      )
    } else if (schedule) {
      schedule.map((attendance) => {
        const slotDay = dayjs(attendance.date)
        const { dayIsBetween } = checkDayInWeek(date, slotDay)
        if (dayIsBetween) {
          handleAddStudySlot(attendance)
        }
      })
    }
  }

  useEffect(() => {
    handleAddSchedule()
  }, [date])

  return (
    <Stack height={'100%'}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Slots</TableCell>
              {columns.map((column, idx) => (
                <TableCell key={idx}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: ScheduleRow) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Stack>
                    <Typography variant="body1">{`${row.name} (${row.time})`}</Typography>
                  </Stack>
                </TableCell>
                {row.dowArray.map((slot, idx) => {
                  return (
                    <TableCell key={idx} component="th" scope="row">
                      <Stack
                        sx={{
                          width: 120,
                          height: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          {slot.isStudied &&
                            ` ${slot.name} - ${slot.date} - ${
                              slot.isPresent ? 'Đã điểm danh' : 'Chưa điểm danh'
                            } `}
                        </Typography>
                      </Stack>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default ScheduleTable
