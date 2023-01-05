import { a11yProps, TabPanel } from '@/components/common/TabPanel'
import { useGetClassByAccount } from '@/hooks/classByAccount'
import { useClassesByTeacher } from '@/hooks/classByTeacher'
import { ClassPayload, ClassStatus } from '@/models/class'
import { Action } from '@/models/common'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClassList } from '../components/ClassList'

const pageTitle = 'Quản lý lớp học'
const classStatus: ClassStatus = 'NEW'

const actionList: Action[] = [
  {
    label: 'Tạo lớp mới',
    value: 'create-new-class',
    icon: <AddIcon />,
    variant: 'contained',
  },
]

export interface ClassManagementProps {}

export function Classes() {
  const [params, setParams] = useState({
    page: 0,
    size: 12,
    classStatus,
  })

  const [classByAccountParams, setClassByAccountParams] = useState({
    page: 0,
    size: 12,
    status: 'REQUESTING',
  })

  const [tab, setTab] = useState(0)

  const navigate = useNavigate()

  const { classByTeacherList, pagination } = useClassesByTeacher(params)

  const { classByAccountList, pagination: classByAccountPagination } =
    useGetClassByAccount(classByAccountParams)

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue)
  }

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

  function handlePageOfClassByAccountChange(e: any, newPage: number) {
    setClassByAccountParams((params) => ({
      ...params,
      page: newPage - 1,
    }))
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
        <Box sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
          <Typography variant="h5" fontWeight={700}>
            {pageTitle}
          </Typography>
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

      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Danh sách lớp học" {...a11yProps(0)} />
            <Tab label="Danh sách lớp chờ duyệt" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
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
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {Array.isArray(classByAccountList) && classByAccountList.length > 0 && (
            <Stack>
              <Typography variant="body1" fontStyle="italic">
                Tổng số: {classByAccountList?.length} / {classByAccountPagination.total} lớp
              </Typography>
              <ClassList classList={classByAccountList} onCardClick={handleCardClick} />
            </Stack>
          )}

          {classByTeacherList && (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <Pagination
                variant="outlined"
                shape="rounded"
                page={classByAccountParams?.page + 1}
                count={classByAccountPagination?.totalPages}
                onChange={handlePageOfClassByAccountChange}
              />
            </Stack>
          )}
        </TabPanel>
      </Box>
    </Stack>
  )
}
