import { Subject } from '@/models/subject'
import { Box, Button, Stack } from '@mui/material'

export interface subjectListProps {
  subjectList?: Subject[]
}

export function SubjectList({ subjectList }: subjectListProps) {
  return (
    <Stack direction="row" spacing={2}>
      {subjectList?.map((item, idx) => (
        <Box key={idx}>
          <Button variant="outlined" color="primary" size="large">
            {item.name}
          </Button>
        </Box>
      ))}
    </Stack>
  )
}
