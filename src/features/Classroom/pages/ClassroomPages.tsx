import { SearchField } from '@/components/FormFields/SearchField'
import { Box, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClassesByStudent } from '@/hooks/classByStudent'
import { ClassPayload, ClassStatus } from '@/models/class'
import { StudentClassList } from '@/features/Classroom/components/classroom/StudentClassList'
import { SelectCustom } from '@/components/FormFields/SelectCustom'
import { OptionPayload } from '@/models/option'
import { a11yProps, TabPanel } from '@/components/common/TabPanel'
import { TabPayload } from '@/models/common'

const pageTitle = 'Quản lý lớp học'
const status: ClassStatus = 'STARTING'

const TabList: TabPayload[] = [
  { id: 0, label: 'Danh sách lớp đã học', status: 'NOTSTART' },
  { id: 0, label: 'Danh sách lớp đang học', status: 'STARTING' },
  { id: 0, label: 'Danh sách lớp chuẩn bị học', status: 'ENDED' },
]

export interface ClassManagementProps {}

const optionList: OptionPayload[] = [
  {
    label: 'Lớp chưa bắt đầu',
    value: 'NOTSTART',
  },
  {
    label: 'Lớp đang học',
    value: 'STARTING',
  },
  {
    label: 'Lớp đã học',
    value: 'END',
  },
]

export default function Classes() {
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    status,
  })
  const [tab, setTab] = useState(0)

  const navigate = useNavigate()

  const { classByStudentList, pagination } = useClassesByStudent(params)

  function handleCardClick(value: ClassPayload) {
    navigate(`/hoc-sinh/lop-hoc/${value.id}`)
  }

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue)
  }

  function handlePageChange(e: any, newPage: number) {
    setParams((params) => ({
      ...params,
      page: newPage - 1,
    }))
  }
  function handleStatusChange(e: any) {
    setParams((params) => ({
      ...params,
      status: e.target.value,
    }))
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Box>
          <SearchField />
        </Box>
        <Box paddingLeft={1} marginTop={'3px'}>
          <SelectCustom
            onChange={handleStatusChange}
            optionList={optionList}
            currentValue={params.status}
          />
        </Box>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          {TabList.map((item) => (
            <Tab label={item.label} {...a11yProps(item.id)} />
          ))}
        </Tabs>
      </Box>
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
