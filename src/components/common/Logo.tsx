import { Box, Stack, Typography } from '@mui/material'
import logo from '@/assets/images/logo.jpg'
import mobileLogo from '@/assets/images/xs-logo.jpg'

export function FullLogo() {
  return (
    <Stack direction="row" alignItems="center" width={150}>
      <Box component="img" alt="logo" src={logo} width="100%" />
    </Stack>
  )
}

export function MobileLogo() {
  return (
    <Stack direction="row" alignItems="center" width={64}>
      <Box component="img" alt="logo" src={mobileLogo} width="100%" />
    </Stack>
  )
}
