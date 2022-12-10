import { Stack, Typography } from '@mui/material'

export function NotFound() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h6">404 | Page not found</Typography>
    </Stack>
  )
}
