import { Rating, Stack, SxProps, Theme, Typography } from '@mui/material'

export interface RatingCustomProps {
  sx?: SxProps<Theme>
  rating?: number
}

export function RatingCustom({ sx, rating }: RatingCustomProps) {
  return (
    <Stack sx={sx} direction="row" alignItems="center" spacing={1}>
      <Typography variant="h6">{rating}</Typography>{' '}
      <Rating value={rating} precision={0.5} name="read-only" readOnly />
    </Stack>
  )
}
