import { SearchField } from '@/components/FormFields/SearchField'
import { Action } from '@/models/common'
import { Box, Button, Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useClassesByStudent } from '@/hooks/classByStudent'
import { ClassPayload, ClassStatus } from '@/models/class'
import { StudentClassList } from '@/features/Classroom/components/classroom/StudentClassList'

const pageTitle = 'Quản lý lớp học'
const status: ClassStatus = 'NEW'

export interface ClassManagementProps {}

export default function Classes() {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  })

  const navigate = useNavigate()

  const { classByStudentList, pagination, isLoading } = useClassesByStudent(status, params)

  function handleCardClick(value: ClassPayload) {
    navigate(`/hoc-sinh/lop-hoc/${value.id}`)
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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <SearchField />
        </Box>
      </Stack>

      <Stack>
        {Array.isArray(classByStudentList) && classByStudentList.length > 0 ? (
          <Stack>
            <Typography variant="body1" fontStyle="italic">
              Tổng số: {classByStudentList?.length}/ {pagination.total} lớp
            </Typography>
            <StudentClassList classList={classByStudentList} onCardClick={handleCardClick} />
          </Stack>
        ) : (
          <Stack>
            <Typography variant="body1" fontStyle="italic">
              Bạn chưa có lớp học nào.
            </Typography>
          </Stack>
        )}

        {Array.isArray(classByStudentList) && classByStudentList.length > 0 && (
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
    </Stack>
  )
}
