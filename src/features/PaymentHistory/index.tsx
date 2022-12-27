import { Stack, Typography } from '@mui/material'
import React from 'react'

const title = 'Lịch Sử Giao Dịch'

export default function PaymentHistory() {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1">Bạn chưa thực hiện giao dịch nào.</Typography>
    </Stack>
  )
}
