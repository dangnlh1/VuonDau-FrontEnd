import { SearchField } from '@/components/FormFields/SearchField'
import { useClassesByTeacher } from '@/hooks/classByTeacher'
import { ClassPayload } from '@/models/class'
import { Action } from '@/models/common'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClassList } from '../components/ClassList'

const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  {
    label: 'Tạo lớp mới',
    value: 'create-new-class',
    icon: <AddIcon />,
    variant: 'contained',
  },
]

export interface ClassManagementProps {}

export default function Classes() {
  const [params, setParams] = useState({
    page: 0,
    size: 12,
  })

  const navigate = useNavigate()

  const { classByTeacherList, pagination } = useClassesByTeacher(params)

  function handleCardClick(value: ClassPayload) {
    navigate(`/giao-vien/quan-ly-lop/${value.id}`)
  }

  function handleActionClick(value: string) {
    if (value === 'create-new-class') {
      navigate(`/giao-vien/quan-ly-lop/tao-lop-hoc-moi`)
    }
  }

  function handlePageChange(e: any, newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage - 1,
    }))
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
        <Box sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
          <SearchField />
        </Box>

        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {actionList.map((item, idx) => (
            <Button
              variant={item.variant}
              key={idx}
              startIcon={item.icon}
              onClick={() => handleActionClick?.(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>

      {Array.isArray(classByTeacherList) && classByTeacherList.length > 0 && (
        <Stack>
          <Typography variant="body1" fontStyle="italic">
            Tổng số: {classByTeacherList?.length}/ {pagination.total} lớp
          </Typography>
          <ClassList classList={classByTeacherList} onCardClick={handleCardClick} />
        </Stack>
      )}

      {classByTeacherList && (
        <Stack alignItems="center" sx={{ py: 2 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            page={params?.page + 1}
            count={pagination?.totalPages}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Stack>
  )
}
