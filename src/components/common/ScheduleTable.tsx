import { DayOfWeek } from '@/models/dayOfWeek'
import { AttendanceRequest, AttendanceSlot } from '@/models/timetables'
import { checkDayInWeek, dateFormatting } from '@/utils/dateFormatting'
import { ScheduleCell, ScheduleRow } from '@/utils/table'
import {
  Chip,
  makeStyles,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
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
  const theme = useTheme()

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
        <Table size="small" aria-label="simple table">
          {displayRows ? (
            <>
              <TableHead sx={{ background: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell
                    sx={{ textAlign: 'center', padding: '5px', margin: '5px', width: '95px' }}
                  >
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }} color={'white'}>
                      Giờ học
                    </Typography>
                  </TableCell>
                  {columns.map((column, idx) => (
                    <TableCell sx={{ textAlign: 'center', padding: 0, margin: 0 }} key={idx}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }} color={'white'}>
                        {column.name}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRows &&
                  displayRows.map((row: ScheduleRow) => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{
                          background: theme.palette.primary.light,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '5px',
                          margin: 0,
                        }}
                        component="th"
                        scope="row"
                      >
                        <Typography
                          textAlign={'center'}
                          sx={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          textAlign={'center'}
                          sx={{ fontSize: '10px', fontWeight: 'bold' }}
                        >
                          {row.time}
                        </Typography>
                      </TableCell>
                      {row.dowArray.map((slot, idx) => {
                        return (
                          <TableCell
                            sx={{
                              width: 130,
                              background: idx % 2 === 0 ? '#eee' : '#fff',
                            }}
                            key={idx}
                            component="th"
                            scope="row"
                          >
                            {slot.isStudied && (
                              <Stack
                                sx={{
                                  alignItems: 'center',
                                }}
                              >
                                <Typography sx={{ fontSize: '13px' }}>{slot.date}</Typography>
                                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                  {slot.name.toUpperCase()}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: slot.isPresent ? '#18ffad' : '#ff5238',
                                  }}
                                >
                                  {slot.isPresent ? 'Đã điểm danh' : 'Chưa điểm danh'}
                                </Typography>
                              </Stack>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </>
          ) : (
            <Stack>
              <Typography textAlign={'center'}>Dữ liệu đang được tải...</Typography>
            </Stack>
          )}
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default ScheduleTable
