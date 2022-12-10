import { Rating, Stack, Typography } from '@mui/material'

export interface RatingCustomProps {
  rating?: number
}

export function RatingCustom({ rating }: RatingCustomProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="h6" color="text.secondary">
        {rating}
      </Typography>{' '}
      <Rating value={rating} precision={0.5} name="read-only" readOnly />
    </Stack>
  )
}
