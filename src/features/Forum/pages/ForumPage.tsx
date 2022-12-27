import ForumBar from '@/features/Forum/components/ForumBar'
import { Action } from '@/models/common'
import { Box, Stack } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'

const actionList: Action[] = [
  { label: 'Môn Học', value: '/mon-hoc' },
  { label: 'Lớp Học', value: '/lop-hoc' },
]

export default function ForumPage() {
  const navigate = useNavigate()

  function handleActionClick(item: Action) {
    navigate(`/hoc-sinh/dien-dan${item.value}`)
  }

  return (
    <Stack>
      <ForumBar actions={actionList} onActionClick={handleActionClick} />
      <Box sx={{ flexGrow: 1, height: 500 }}>
        <Outlet />
      </Box>
    </Stack>
  )
}
