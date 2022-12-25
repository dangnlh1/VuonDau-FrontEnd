import { DayOfWeekProps, TimetableRowProps } from '@/features/Classroom/pages/ClassroomTimetable'

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  TableCell,
  tableCellClasses,
  styled,
} from '@mui/material'
import React from 'react'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

interface TimetableProps {
  dows: DayOfWeekProps[]
  rows: TimetableRowProps[]
  renderHeadCell: (item: DayOfWeekProps, idx: number) => React.ReactNode
  renderRowCell: (item: TimetableRowProps, idx: number) => React.ReactNode
}

export default function Timetable({ dows, rows, renderHeadCell, renderRowCell }: TimetableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Slot học</Typography>
            </StyledTableCell>
            {dows.map((dow: DayOfWeekProps, idx) => renderHeadCell(dow, idx))}
          </TableRow>
        </TableHead>
        <TableBody>{rows.map((row, idx) => renderRowCell(row, idx))}</TableBody>
      </Table>
    </TableContainer>
  )
}
