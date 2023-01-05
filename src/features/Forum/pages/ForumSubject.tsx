import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import EditorInput from '@/components/common/EditorInput'
import ForumSearchBar from '@/features/Forum/components/ForumSearchBar'
import { useCreateQuestion } from '@/hooks/createQuestion'
import useForum from '@/hooks/subjectForum'
import { ForumPayload } from '@/models/forum'
import { InfoPayload } from '@/models/info'
import { Question, QuestionRequest, QuestionRow } from '@/models/questions'
import { Subject } from '@/models/subject'
import { getTimeAgo } from '@/utils/timeAgo'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const columns: GridColDef<Question>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Câu hỏi', width: 600, flex: 1 },
  {
    field: 'user',
    headerName: 'Người Hỏi',
    width: 200,
    renderCell: ({ row }) => {
      return row.user?.email || `${row.user.firstName} ${row.user.lastName}`
    },
  },
  {
    field: 'created',
    headerName: 'Ngày tạo',
    width: 90,
  },
]

export default function ForumSubject() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const { subjectId } = useParams()
  const { data, isLoading } = useForum(subjectId + '')
  const { createQuestion } = useCreateQuestion()
  const navigate = useNavigate()

  if (!data) return null

  function handleRowClick(row: any) {
    navigate(`/hoc-sinh/dien-dan/mon-hoc/${subjectId}/${row.id}`)
  }

  function handleOpenDialog() {
    setOpen(!open)
  }

  function handleChangeTitle(event: any) {
    setTitle(event.target.value)
  }

  async function handleCreateQuestion(content: string) {
    try {
      const params: QuestionRequest = {
        title,
        content,
        forumId: data?.id || 0,
      }
      await createQuestion.mutateAsync(params)
      toast.success('Tạo câu hỏi thành công.')
      setOpen(!open)
    } catch (error) {
      toast.error('Tạo câu hỏi không thành công.')
    }
  }

  function handleSearchQuestion(value: string) {
    //TODO: add search forum api
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack>
        <Typography sx={{ fontSize: '12px' }} variant="body1">
          Môn học
        </Typography>
        <Typography variant="h3">{data?.name}</Typography>
      </Stack>

      <ForumSearchBar
        searchLabel="Tìm kiếm câu hỏi"
        onCreateQuestion={handleOpenDialog}
        onSearchQuestion={handleSearchQuestion}
      />

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
      <Dialog open={open} onClose={handleOpenDialog}>
        <DialogTitle>Thêm Câu Hỏi Của Bạn</DialogTitle>
        <DialogContent>
          <Stack paddingY={1}>
            <TextField label="Thêm tựa đề" value={title} onChange={handleChangeTitle}></TextField>
          </Stack>
          <EditorInput onCancel={handleOpenDialog} onComment={handleCreateQuestion} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}
