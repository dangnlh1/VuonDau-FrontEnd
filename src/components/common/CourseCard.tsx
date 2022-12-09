import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { alpha, Box, Button, CardActionArea, Chip, Rating, Stack } from '@mui/material'
import { truncateText } from '@/utils/common'

export interface CourseData {
  imageUrl?: string
  title?: string
  name?: string
  type?: string
  subject?: string
  number?: string
  teacher?: string
  price?: string
  maxCount?: string
}

export interface CourseCardProps {
  course?: CourseData
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        '&:hover': {
          '& img': {
            transform: 'scale(1.5)',
            transition: 0.3,
          },
        },
      }}
    >
      <Box height={140} overflow="hidden">
        <Box
          component="img"
          width="100%"
          height="100%"
          sx={{ transform: 'scale(1)', transition: 0.3 }}
          src="https://th.bing.com/th/id/R.fe1c5e6b5189a15df9db50007cb28844?rik=LXneEJwopxj8Cw&riu=http%3a%2f%2fhuongnghiep24h.com%2fmedias%2fimg%2fnews_vi%2fYear_2013%2fMonth_11%2fDay_22%2fnganh-toan-hoc.jpg&ehk=hMheVeY4r9DB3qtArtS%2fHf7fnVpZYEZ5RQ4N7%2b0EYBI%3d&risl=&pid=ImgRaw&r=0"
          alt="green iguana"
        />
      </Box>

      <Stack sx={{ py: 2 }} spacing={1}>
        <Typography gutterBottom variant="h6" sx={{ m: 0 }}>
          {truncateText(course?.name, 25)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Giáo viên: {course?.teacher}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" color="text.secondary">
            4.5
          </Typography>{' '}
          <Rating value={4.5} precision={0.5} name="read-only" readOnly />
        </Stack>

        <Box>
          <Chip label={course?.subject} color="primary" sx={{ borderRadius: 1 }} />
        </Box>
      </Stack>
    </Box>
  )
}
