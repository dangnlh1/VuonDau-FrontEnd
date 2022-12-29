import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import useForum from '@/hooks/subjectForum'
import { ForumPayload } from '@/models/forum'
import { InfoPayload } from '@/models/info'
import { Question, QuestionRow } from '@/models/questions'
import { Subject } from '@/models/subject'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom'

const columns: GridColDef<Question>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'content', headerName: 'Câu hỏi', width: 600, flex: 1 },
  {
    field: 'user',
    headerName: 'Người Hỏi',
    width: 200,
    renderCell: ({ row }) => {
      return row.user?.email || `${row.user.firstName} ${row.user.lastName}`
    },
  },
  {
    field: 'id',
    headerName: 'Ngày tạo',
    width: 90,
    renderCell: ({ row }) => {
      return row.id
    },
  },
]

export default function ForumSubject() {
  const { subjectId } = useParams()
  const { data, error, isLoading } = useForum(subjectId + '')
  const navigate = useNavigate()
  console.log(data)

  function handleRowClick(row: any) {
    navigate(`/hoc-sinh/dien-dan/mon-hoc/${subjectId}/${row.id}`)
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack>
        <Typography sx={{ fontSize: '12px' }} variant="body1">
          Môn học
        </Typography>
        <Typography variant="h3">{data?.name}</Typography>
      </Stack>

      <Stack direction={'row'} marginTop={1}>
        <Stack flexGrow={1} marginRight={2}>
          <TextField label="Tìm kiếm câu hỏi" variant="outlined" sx={{ background: '#fff' }} />
        </Stack>
        <Button variant="contained">Tìm Kiếm</Button>
      </Stack>

      <Stack sx={{ background: '#fff' }} height={'100%'} width={'100%'} marginTop={2}>
        <DataGrid
          components={{
            LoadingOverlay: DataGridLoadingOverlay,
          }}
          loading={isLoading}
          rows={data?.questions || []}
          columns={columns}
          pagination
          paginationMode="server"
          onRowClick={handleRowClick}
          disableColumnMenu
          autoHeight
        />
      </Stack>
    </Stack>
  )
}
