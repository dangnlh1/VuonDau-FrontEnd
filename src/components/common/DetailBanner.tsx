import { Box, Chip, Container, Rating, Stack, Typography } from '@mui/material'
import { RatingCustom } from './RatingCustom'

export interface BannerPayload {
  title?: string
  description?: string
  status?: string
  rating?: number
  teacher?: string
  updatedAt?: number | string
  major?: string
}

export interface DetailBannerProps {
  data?: BannerPayload
}

export function DetailBanner({ data }: DetailBannerProps) {
  return (
    <Box>
      <Container>
        <Stack direction="row">
          <Box>
            <Stack spacing={2}>
              <Typography variant="h2">{data?.title}</Typography>
              <Typography variant="h6">{data?.description}</Typography>

              <Stack>
                <Chip label={data?.status} /> <RatingCustom rating={4.5} />
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Box></Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
