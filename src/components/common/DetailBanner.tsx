import { formatCurrency } from '@/utils/common'
import { dateFormatting } from '@/utils/dateFormating'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { Box, Button, Chip, Container, Stack, SxProps, Theme, Typography } from '@mui/material'
import { RatingCustom } from './RatingCustom'
export interface BannerPayload {
  title?: string
  imageUrl?: string
  description?: string
  status?: string
  rating?: number
  teacher?: string
  updatedAt?: number | string
  major?: string
  finalPrice: number
  unitPrice: number
}

export interface DetailBannerProps {
  data?: BannerPayload
  sx?: SxProps<Theme>
}

export function DetailBanner({ sx, data }: DetailBannerProps) {
  return (
    <Box sx={{ ...sx, bgcolor: 'black', color: 'white' }}>
      <Container>
        <Stack direction="row" flexWrap="wrap" sx={{ py: 5, mx: -2 }}>
          <Box sx={{ width: { xs: '100%', lg: 'calc(100% - 362px)' }, order: { xs: 1, lg: 0 } }}>
            <Stack spacing={2} sx={{ p: 2 }}>
              <Typography variant="h3" fontWeight={700}>
                {data?.title}
              </Typography>

              <Typography variant="h6">{data?.description}</Typography>

              <Stack direction="row" spacing={2}>
                {data?.status && (
                  <Box>
                    <Chip
                      label={data?.status}
                      sx={{ color: 'white', borderRadius: 1, bgcolor: 'primary.light' }}
                    />
                  </Box>
                )}

                <RatingCustom rating={data?.rating || 0} sx={{ color: 'white' }} />
              </Stack>

              <Typography
                variant="body1"
                component="a"
                sx={{
                  '& strong': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                  },
                }}
              >
                Giáo viên: <strong>{data?.teacher}</strong>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  alignItems: 'center',

                  '& strong': { ml: 1 },
                }}
              >
                <NewReleasesIcon sx={{ mr: 1 }} />
                Ngày update: <strong>{dateFormatting(data?.updatedAt as string)}</strong>
              </Typography>

              <Stack spacing={2} sx={{ display: { xs: 'flex', lg: 'none' } }}>
                <Typography variant="body1" sx={{ textDecorationLine: 'line-through' }}>
                  Giá: {formatCurrency(data?.unitPrice || 0)}
                </Typography>

                <Typography variant="h6" fontStyle="italic">
                  Chỉ còn: {formatCurrency(data?.finalPrice || 0)}
                </Typography>

                <Box>
                  <Button variant="outlined">Mua ngay</Button>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', lg: 362 },
              order: { xs: 0, lg: 1 },
            }}
          >
            <Box sx={{ p: 2, display: { lg: 'none' } }}>
              <Box
                boxShadow={3}
                borderRadius={2}
                width="100%"
                height="100%"
                component="img"
                alt="course"
                src={data?.imageUrl}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
