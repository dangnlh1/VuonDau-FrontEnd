import { useClass } from '@/hooks/class'
import { useClasses } from '@/hooks/classes'
import { useRevenue } from '@/hooks/revenue'
import { formatCurrency } from '@/utils/common'
import { BreakfastDiningOutlined } from '@mui/icons-material'
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DateTimePicker, DesktopDatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import React, { useState } from 'react'

const title = 'Lịch Sử Giao Dịch'

const columns: GridColDef[] = [
  {
    field: 'classId',
    headerName: 'ID',
  },
  {
    field: 'orderInfo',
    headerName: 'Nội dung',
    flex: 1,
  },
  {
    field: 'revenue',
    headerName: 'Số tiền',
    renderCell({ row }) {
      return formatCurrency(row.revenue)
    },
  },
  {
    field: 'success',
    headerName: 'Trạng thái',
    width: 200,
  },
]

//TODO: delete when have api
const mockRows = [
  {
    id: 0,
    content: 'Giao dich tien te',
    amount: '250000',
    status: 1,
  },
  {
    id: 1,
    content: 'Giao dich tien te',
    amount: '250000',
    status: 1,
  },
  {
    id: 2,
    content: 'Giao dich tien te',
    amount: '250000',
    status: -1,
  },
  {
    id: 3,
    content: 'Giao dich tien te',
    amount: '250000',
    status: 0,
  },
]

export default function PaymentHistory() {
  const [classIds, setClassIds] = useState<number[]>([])
  const [teacherIds, setTeacherIds] = useState<number[]>([])
  const [toDate, setToDate] = useState<Dayjs>()
  const [fromDate, setFormDate] = useState<Dayjs>()

  const { revenues, refetch, isLoading } = useRevenue({
    classIds,
    teacherIds,
    dateFrom: fromDate?.toISOString(),
    dateTo: toDate?.toISOString(),
  })
  const rows = mockRows

  function handleChangeClass(event: any) {
    setClassIds(event.target.value)
  }
  function handleChangeToDate(value: Dayjs | undefined | null) {
    if (value) setToDate(value)
  }
  function handleChangeFromDate(value: Dayjs | undefined | null) {
    if (value) setFormDate(value)
  }
  async function handleSearch() {
    await refetch()
  }
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack direction={'row'} sx={{ paddingY: 1 }}>
        <FormControl sx={{ minWidth: 120, paddingRight: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">Lớp học</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={classIds}
            label="Lớp học"
            onChange={handleChangeClass}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Lớp thầy Phương</MenuItem>
            <MenuItem value={1}>Lớp cô Thảo</MenuItem>
            <MenuItem value={2}>Lớp cô Hồng</MenuItem>
          </Select>
        </FormControl>
        <Stack sx={{ paddingRight: 1 }}>
          <DesktopDatePicker
            label="Ngày bắt đầu"
            value={toDate}
            onChange={handleChangeToDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
        <Stack sx={{ paddingRight: 1 }}>
          <DesktopDatePicker
            label="Ngày kết thúc"
            value={fromDate}
            onChange={handleChangeFromDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
        <Stack>
          <Button onClick={handleSearch} variant="contained">
            Tìm kiếm
          </Button>
        </Stack>
      </Stack>
      <Stack>
        <DataGrid loading={isLoading} autoHeight columns={columns} rows={revenues || []} />
      </Stack>
    </Stack>
  )
}
