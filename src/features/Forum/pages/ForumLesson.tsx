import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import useForum from '@/hooks/subjectForum'
import { ForumPayload } from '@/models/forum'
import { InfoPayload } from '@/models/info'
import { Question, QuestionRow } from '@/models/questions'
import { Subject } from '@/models/subject'
import { Stack, Typography } from '@mui/material'
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
      return row.user.email
    },
  },
  {
    field: 'subject',
    headerName: 'Môn Học',
    width: 90,
    renderCell: ({ row }) => {
      return row.subject.name
    },
  },
]

export default function ForumLesson() {
  const { lessonId, subjectId } = useParams()
  const { data, isLoading } = useForum(subjectId + '')
  if (!lessonId || !subjectId) return null
  const lesson = data?.forumLessonDtos?.find((item) => item.id === parseInt(lessonId))
  const navigate = useNavigate()
  console.log(data)

  function handleRowClick(row: any) {
    navigate(`/hoc-sinh/dien-dan/mon-hoc/${subjectId}/${row.id}`)
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack>
        <Typography sx={{ fontSize: '12px' }} variant="body1">
          Khóa học
        </Typography>
        <Typography variant="h3">{'Lesson 1'}</Typography>
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
    </Stack>
  )
}
