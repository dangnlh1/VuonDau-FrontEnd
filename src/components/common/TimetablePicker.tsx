import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { CalendarPicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import React from 'react'

interface Props {
  date: Dayjs
  type: number
  handleChangeType: (event: SelectChangeEvent<any>, child: React.ReactNode) => void
  handleChangeDate: (day: Dayjs) => void
}
export default function TimetablePicker({ date, type, handleChangeDate, handleChangeType }: Props) {
  return (
    <Stack sx={{ borderRadius: 2, background: '#fff', padding: 2, marginRight: 1 }}>
      <Stack>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Hiển thị</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={handleChangeType}
          >
            <MenuItem value={0}>Ngày</MenuItem>
            <MenuItem value={1}>Tuần</MenuItem>
            <MenuItem value={2}>Tháng</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack sx={{ width: '100%' }}>
        <CalendarPicker
          date={date}
          onChange={(newDate) => {
            if (newDate) handleChangeDate(newDate)
          }}
        />
      </Stack>
    </Stack>
  )
}
