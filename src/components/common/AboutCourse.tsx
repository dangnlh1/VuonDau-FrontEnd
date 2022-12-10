import { Resource } from '@/models/class'
import CheckIcon from '@mui/icons-material/Check'
import { Stack, Typography } from '@mui/material'

export interface AboutCourseProps {
  resourceList?: Resource[]
  title?: string
}

export function AboutCourse({ resourceList, title }: AboutCourseProps) {
  return (
    <Stack spacing={2} sx={{ p: 5, border: '1px solid black' }}>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>

      {Array.isArray(resourceList) &&
        resourceList.length > 0 &&
        resourceList.map((item, idx) => (
          <Stack spacing={1} direction="row" alignItems="center" key={idx}>
            <CheckIcon />
            <Typography variant="body1">{item.name}</Typography>
          </Stack>
        ))}
    </Stack>
  )
}
