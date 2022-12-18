import { SearchField } from '@/components/FormFields/SearchField'
import { useClass } from '@/hooks/class'
import { Action } from '@/models/common'
import { StudentPayload } from '@/models/student'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StudentList } from '../components/StudenList'
const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  // {
  //   label: 'Danh sách học sinh',
  //   value: 'create-new-class',
  //   variant: 'contained',
  // },

  {
    label: 'Bài học',
    value: 'create-new-class-for-new-course',
    variant: 'contained',
  },

  {
    label: 'Điểm danh',
    value: 'attendance',
    variant: 'contained',
  },
  {
    label: 'Thời khóa biểu',
    value: 'attendance',
    variant: 'outlined',
  },
]

export interface ClassManagementProps {}

export default function Students() {
  const [studentList, setStudentList] = useState<StudentPayload[]>([])

  const { classId } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useClass(parseInt(classId as string))

  useEffect(() => {
    if (data && Array.isArray(data.students)) {
      setStudentList(data.students)
    }
  }, [data])

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          onClick={() => navigate(-1)}
          color="inherit"
          startIcon={<ArrowBackIcon fontSize="large" />}
          sx={{
            width: 40,
            height: 40,
            minWidth: 0,
            '& span': {
              m: 0,
            },
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          {data?.name}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <SearchField />
        </Box>

        <Stack direction="row" spacing={1}>
          {actionList.map((item, idx) => (
            <Button variant={item.variant} key={idx} startIcon={item.icon}>
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <StudentList studentList={studentList || []} />
      </Stack>
    </Stack>
  )
}
