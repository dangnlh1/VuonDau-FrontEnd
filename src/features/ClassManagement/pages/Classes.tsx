import { SearchField } from '@/components/FormFields/SearchField'
import { Action } from '@/models/common'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import { useState } from 'react'
import { useClassesByTeacher } from '@/hooks/classByTeacher'
import { ClassList } from '../components/ClassList'
import { useNavigate } from 'react-router-dom'

const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  {
    label: 'Tạo lớp mới',
    value: 'create-new-class',
    icon: <AddIcon />,
    variant: 'contained',
  },

  {
    label: 'Tạo lớp cho khóa mới',
    value: 'create-new-class-for-new-course',
    icon: <AddIcon />,
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

  const { classByTeacherList, pagination, isLoading } = useClassesByTeacher(params)

  function handleRowClick(value: any) {
    navigate(`/giao-vien/quan-ly-lop/${value.id}`)
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

        <Stack direction="row" spacing={1}>
          {actionList.map((item, idx) => (
            <Button variant={item.variant} key={idx} startIcon={item.icon}>
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Stack>
        <ClassList
          classList={classByTeacherList}
          pagination={pagination}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />
      </Stack>
    </Stack>
  )
}
