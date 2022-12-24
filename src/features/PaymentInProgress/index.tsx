import { closeWindow } from '@/utils/window'
import { Button, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function PaymentInProgress() {
  return (
    <Stack alignItems={'center'}>
      <Typography variant="h5">Thanh toán của bạn đã được xử lí . </Typography>
      <Typography variant="body1">Vui lòng tắt trình duyệt. </Typography>
      <Button onClick={closeWindow}>Close</Button>
    </Stack>
  )
}
