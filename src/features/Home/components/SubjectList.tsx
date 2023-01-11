import { Subject } from '@/models/subject'
import { Box, Button, Stack } from '@mui/material'

export interface subjectListProps {
  subjectList?: Subject[]
}

export function SubjectList({ subjectList }: subjectListProps) {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -1 }}>
      {subjectList?.map((item, idx) => (
        <Box key={idx} sx={{ width: { xs: 1 / 2, sm: 1 / 4, md: 'auto' } }}>
          <Box sx={{ p: 1 }}>
            <Button fullWidth variant="outlined" color="primary" size="large">
              {item.name}
            </Button>
          </Box>
        </Box>
      ))}
    </Stack>
  )
}
