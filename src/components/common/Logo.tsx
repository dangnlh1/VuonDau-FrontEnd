import { Box, Stack, Typography } from '@mui/material'
import logo from '@/assets/images/favicon.png'

export function Logo() {
  return <Box component="img" alt="logo" src={logo} height={45} width={45} />
}

export function FullLogo() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Logo />

      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/trang-chu"
        sx={{
          fontWeight: 700,
          fontFamily: 'monospace',
          textDecoration: 'none',
        }}
      >
        VƯỜN DÂU
      </Typography>
    </Stack>
  )
}
