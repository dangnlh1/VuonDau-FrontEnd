import { useClassesByStudentNoPaging } from '@/hooks/classByStudentNoPaging'
import { useRevenue } from '@/hooks/revenue'
import { formatCurrency } from '@/utils/common'
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

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
    renderCell({ row }) {
      return row.success ? 'Thành công' : 'Thất bại'
    },
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
  const [toDate, setToDate] = useState<Dayjs>(dayjs('01/01/2001'))
  const [fromDate, setFormDate] = useState<Dayjs>(dayjs())

  const { revenues, refetch, isLoading } = useRevenue({
    classIds,
    teacherIds,
    dateFrom: fromDate?.toISOString(),
    dateTo: toDate?.toISOString(),
  })
  const { classes } = useClassesByStudentNoPaging('NEW')
  console.log(classes)

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
      <Stack
        direction={'row'}
        sx={{
          paddingY: 2,
          paddingX: 3,
          background: '#fff',
          marginY: 1,
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ minWidth: 120, paddingRight: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">Lớp học</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={classIds}
            label="Lớp học"
            onChange={handleChangeClass}
          >
            {classes &&
              classes.map((item, index) => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>
              })}
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
          <IconButton sx={{ background: '#000' }} onClick={handleSearch}>
            <SearchIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack sx={{ background: '#fff' }}>
        <DataGrid
          loading={isLoading}
          autoHeight
          columns={columns}
          rows={revenues || []}
          getRowId={(row) => row.classId}
        />
      </Stack>
    </Stack>
  )
}
