import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import EditorInput from '@/components/common/EditorInput'
import useClassForum from '@/hooks/classForum'
import { useCreateQuestion } from '@/hooks/createQuestion'
import { Question, QuestionRequest } from '@/models/questions'
import {
  Button,
  Dialog,
  DialogContent,
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
      return `${row.user.firstName} ${row.user.lastName}`
    },
  },
]

export default function ForumLesson() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const { lessonId, classId } = useParams()
  const { data, isLoading } = useClassForum(classId + '')
  const { createQuestion } = useCreateQuestion()

  if (!lessonId || !classId) return null
  const lesson = data?.forumLessonDtos?.find((item) => item.id === parseInt(lessonId))
  console.log(lesson)

  const navigate = useNavigate()
  function handleRowClick(row: any) {
    navigate(`/hoc-sinh/dien-dan/lop-hoc/${classId}/${lessonId}/${row.id}`)
  }

  function handleOpenDialog() {
    setOpen(!open)
  }

  function handleChangeTitle(event: any) {
    setTitle(event.target.value)
  }

  async function handleCreateQuestion(content: string) {
    if (title && lessonId) {
      try {
        const params: QuestionRequest = {
          content,
          title,
          forumId: data?.id || 0,
          forumLessonId: parseInt(lessonId),
        }
        await createQuestion.mutateAsync(params)
        toast.success('Tạo câu hỏi thành công.')
      } catch (error) {
        toast.error('Tạo câu hỏi không thành công.')
      }
      setOpen(!open)
    }
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack>
        <Typography sx={{ fontSize: '12px' }} variant="body1">
          Khóa học
        </Typography>
        <Typography variant="h3">{lesson?.lessonName}</Typography>
      </Stack>

      <Stack direction={'row'} marginTop={1}>
        <Stack flexGrow={1} marginRight={1}>
          <TextField label="Tìm kiếm câu hỏi" variant="outlined" sx={{ background: '#fff' }} />
        </Stack>
        <Stack marginRight={1}>
          <Button variant="contained">Tìm Kiếm</Button>
        </Stack>
        <Stack marginRight={1}>
          <Button variant="contained" onClick={handleOpenDialog}>
            Tạo Câu Hỏi
          </Button>
        </Stack>
      </Stack>

      <Stack sx={{ background: '#fff' }} height={'100%'} width={'100%'} marginTop={2}>
        <DataGrid
          components={{
            LoadingOverlay: DataGridLoadingOverlay,
          }}
          loading={isLoading}
          rows={lesson?.questions || []}
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
