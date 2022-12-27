import Timetable, { StyledTableCell, StyledTableRow } from '@/components/common/Timetable'
import TimetableCell from '@/components/common/TimetableCell'
import { DayOfWeekPayload, TimetableRow } from '@/models/timetables'
import ColumnHeader from '@/components/common/ColumnHeader'

export interface ClassTimeTableListProps {
  dows: DayOfWeekPayload[]
  rows: TimetableRow[]
}
export function ClassTimeTableList({ dows, rows }: ClassTimeTableListProps) {
  return (
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
  )
}
