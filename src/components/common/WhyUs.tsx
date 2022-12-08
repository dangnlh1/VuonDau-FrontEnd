import { alpha, Box, Button, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

export interface WhyUsPayload {
  label: string
  icon: ReactNode
}

export interface WhyUsProps {
  whyUsList?: WhyUsPayload[]
}

export function WhyUs({ whyUsList }: WhyUsProps) {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ mx: -2 }}>
      {Array.isArray(whyUsList) &&
        whyUsList.length > 0 &&
        whyUsList.map((item, idx) => (
          <Box key={idx} sx={{ width: { xs: '100%', md: 1 / 3, height: '100%' } }}>
            <Box sx={{ p: 2 }}>
              <Box
                boxShadow={3}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  bgcolor: (theme) => alpha(theme.palette.common.black, 0.1),

                  '&:hover': {
                    boxShadow: (theme) => theme.shadows[10],
                  },
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
