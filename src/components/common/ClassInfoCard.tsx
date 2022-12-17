import { Box, IconButton, Stack, Typography } from '@mui/material'
import { More } from '@mui/icons-material'

export interface ClassInfoCardProps {
  title?: string
}

export function ClassInfoCard({ title }: ClassInfoCardProps) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
        <IconButton>
          <More />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body1">{title}</Typography>
      </Stack>
    </Stack>
  )
}
