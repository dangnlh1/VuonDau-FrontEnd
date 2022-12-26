import { GoBack } from '@/components/common/GoBack'
import { SearchField } from '@/components/FormFields/SearchField'
import { useClass } from '@/hooks/class'
import { useGetStudentByClassId } from '@/hooks/useGetStudentByClassId'
import { Action } from '@/models/common'
import { StudentPayload } from '@/models/student'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StudentList } from '../components/StudenList'

const actionList: Action[] = [
  {
    label: 'Danh sách bài học',
    value: 'lesson',
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
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  })

  const { classId } = useParams()
  const navigate = useNavigate()

  const { data } = useClass(parseInt(classId as string))

  const {
    data: students,
    isLoading,
    pagination,
  } = useGetStudentByClassId(params, parseInt(classId as string))

  useEffect(() => {
    if (students && Array.isArray(students) && students.length > 0) {
      setStudentList(students)
      return
    }

    setStudentList([])
  }, [students])

  function handlePageChange(newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage,
    }))
  }

  function handleActionClick(action: Action) {
    if (action.value === 'lesson') {
      navigate(`/giao-vien/quan-ly-lop/${classId}/bai-hoc`)
      return
    }

    navigate(`/giao-vien/quan-ly-lop/${classId}/thoi-khoa-bieu`)
  }

  return (
    <Stack spacing={3}>
      <GoBack onClick={() => navigate(-1)} />

      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h5" fontWeight={700}>
          Danh sách học sinh lớp {data?.name}
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between">
        <Box sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
          <SearchField />
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {actionList.map((item, idx, arr) => (
            <Button
              variant="contained"
              key={idx}
              startIcon={item.icon}
              onClick={() => handleActionClick(item)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack>
        <StudentList
          studentList={studentList || []}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Stack>
    </Stack>
  )
}
