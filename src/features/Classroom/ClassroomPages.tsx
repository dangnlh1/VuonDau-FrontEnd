import { SearchField } from '@/components/FormFields/SearchField'
import { Action } from '@/models/common'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClassList } from '@/features/Classroom/classroomComponent/ClassList'
import { useClassesByStudent } from '@/hooks/classByStudent'

const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  {
    label: 'Bài Tập',
    value: 'excercise',
    variant: 'contained',
  },

  {
    label: 'Giáo viên',
    value: 'teacher',
    variant: 'contained',
  },
  {
    label: 'Điểm danh/ Thời Khóa Biểu',
    value: 'attendance',
    variant: 'contained',
  },

  // {
  //   label: 'Tạo lớp mới',
  //   value: 'attendance',
  //   icon: <FactCheckIcon />,
  //   variant: 'outlined',
  // },
]

export interface ClassManagementProps {}

export default function Classes() {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  })

  const navigate = useNavigate()

  const { classByStudentList, pagination, isLoading } = useClassesByStudent(params)

  function handleRowClick(value: any) {
    navigate(`/hoc-sinh/lop-hoc/${value.id}`)
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <SearchField />
        </Box>

        {/* <Stack direction="row" spacing={1}>
          {actionList.map((item, idx) => (
            <Button variant={item.variant} key={idx} startIcon={item.icon}>
              {item.label}
            </Button>
          ))}
        </Stack> */}
      </Stack>

      <Stack>
        <ClassList
          classList={classByStudentList}
          pagination={pagination}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </Stack>
    </Stack>
  )
}
