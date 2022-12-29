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

const mockSubject: Subject = {
  name: 'Toán',
  code: 'MATH',
  id: 0,
}

const mockUser: InfoPayload = {
  active: true,
  avatar: '',
  birthday: '',
  email: 'tranvinhan2k@gmail.com',
  firstName: '',
  gender: '',
  id: 0,
  introduce: null,
  lastName: '',
  phoneNumber: '',
  role: {
    code: 'STUDENT',
    id: 0,
    name: 'STUDENT',
  },
  username: '',
}

const rows: Question[] = [
  {
    id: 0,
    content: 'Quesion 1',
    subject: mockSubject,
    user: mockUser,
    downVoteNumber: 2,
    upvoteNumber: 2,
    closed: false,
  },
  {
    id: 1,
    content: 'Quesion 2',
    subject: mockSubject,
    user: mockUser,
    downVoteNumber: 2,
    upvoteNumber: 2,
    closed: false,
  },
]

export default function ForumLesson() {
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
          rows={rows || []}
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
