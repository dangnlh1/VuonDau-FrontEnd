import { Stack, Typography } from '@mui/material'

export function NotFound() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight} - 10px)`,
      }}
    >
      <Typography variant="h6">404 | Page not found</Typography>
    </Stack>
  )
}
