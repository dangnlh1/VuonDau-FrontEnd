import { Stack, Typography } from '@mui/material'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

export interface GoBackProps {
  title?: string
  onClick?: () => void
}

export function GoBack({ title = 'Quay lại', onClick }: GoBackProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ cursor: 'pointer' }}
      onClick={() => onClick?.()}
    >
      <ArrowBackOutlinedIcon fontSize="small" />
      <Typography variant="body1" fontStyle="italic">
        {title}
      </Typography>
    </Stack>
  )
}
