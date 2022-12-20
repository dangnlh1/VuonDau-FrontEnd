import useForum from '@/hooks/forum'
import { FilterParams } from '@/models/common'
import { Forum } from '@/models/forum'
import { Card, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export default function Forum() {
  const filter: FilterParams = {
    page: 1,
    size: 10,
  }

  const { error, forumList, isLoading } = useForum(filter)
  console.log('forumlist', forumList, error)

  return (
    <Stack direction={'row'} flexWrap={'wrap'}>
      {forumList?.map((item, index) => (
        <Card>Hello</Card>
      ))}
    </Stack>
  )
}
