import { useClassesByStudentNoPaging } from '@/hooks/classByStudentNoPaging'
import { useRevenue } from '@/hooks/revenue'
import { formatCurrency } from '@/utils/common'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { OptionPayload } from '@/models/option'
import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { useForm } from 'react-hook-form'
import { SelectField } from '@/components/FormFields/SelectField'

const title = 'Lịch Sử Giao Dịch'

const columns: GridColDef[] = [
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
      return row.success ? (
        <Typography color="#3ce26b">Thành công</Typography>
      ) : (
        <Typography color="#ff5238">Thất bại</Typography>
      )
    },
  },
]

export default function PaymentHistory() {
  const { control, handleSubmit } = useForm()
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
  const { classes } = useClassesByStudentNoPaging('All')

  function handleSuccess(data: any) {
    console.log('data', data)
  }
  function handleError(error: any) {}

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

  let classOptionList: OptionPayload[] = [
    {
      label: 'Tất cả lớp',
      value: 'all',
    },
  ]

  classes?.map((item) =>
    classOptionList.push({
      label: item.name,
      value: item.id,
    })
  )

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack
        direction={'row'}
        sx={{
          paddingY: 2,
          height: '100%',
          marginY: 1,
        }}
      >
        <Box paddingRight={1}>
          <SelectField
            label="Lớp học"
            control={control}
            defaultValue={classOptionList[0].value}
            optionList={classOptionList}
            name={'class'}
          />
        </Box>
        <Box paddingRight={1}>
          <DateTimePickerField control={control} name="toDate" label="Ngày bắt đầu" />
        </Box>
        <Box paddingRight={1}>
          <DateTimePickerField control={control} name="fromDate" label="Ngày kết thúc" />
        </Box>

        <Box marginTop={'22px'}>
          <Button
            onClick={handleSubmit(handleSuccess, handleError)}
            color="primary"
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </Box>
      </Stack>
      <Stack sx={{ background: '#fff' }}>
        <DataGrid
          loading={isLoading}
          autoHeight
          columns={columns}
          rows={revenues || []}
          getRowId={(row) => row.classId}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Bạn chưa có giao dịch nào.
              </Stack>
            ),
          }}
        />
      </Stack>
    </Stack>
  )
}
