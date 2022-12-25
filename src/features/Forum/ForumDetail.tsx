import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForumDetail() {
  const { forumId } = useParams()
  console.log('forum detail', forumId)
  toast.success(forumId)

  return (
    <Stack>
      <Typography>{forumId}</Typography>
    </Stack>
  )
}
