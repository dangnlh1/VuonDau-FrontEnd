import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

export function HomeDetail() {
  const { courseId } = useParams()
  return (
    <Box>
      <Box>courseId: {courseId}</Box>
    </Box>
  )
}
