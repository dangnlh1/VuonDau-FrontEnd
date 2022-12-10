import { Box, Chip, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { RatingCustom } from './RatingCustom'
const defaultImage =
  'https://th.bing.com/th/id/R.fe1c5e6b5189a15df9db50007cb28844?rik=LXneEJwopxj8Cw&riu=http%3a%2f%2fhuongnghiep24h.com%2fmedias%2fimg%2fnews_vi%2fYear_2013%2fMonth_11%2fDay_22%2fnganh-toan-hoc.jpg&ehk=hMheVeY4r9DB3qtArtS%2fHf7fnVpZYEZ5RQ4N7%2b0EYBI%3d&risl=&pid=ImgRaw&r=0'
export interface CourseData {
  id: number
  imageUrl?: string
  title?: string
  name?: string
  type?: string
  subject?: string
  number?: string
  teacher?: string
  price?: number
  maxCount?: string
  updateAt?: string
  startAt?: string
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
      <Box height={140} overflow="hidden" boxShadow={3} borderRadius={1}>
        <Box
          component="img"
          width="100%"
          height="100%"
          sx={{ transform: 'scale(1)', transition: 0.3 }}
          src={course?.imageUrl || defaultImage} //will be change
          alt="green iguana"
        />
      </Box>

      <Stack sx={{ py: 2 }} spacing={0.5}>
        <Typography gutterBottom variant="h6" fontWeight={500} sx={{ m: 0 }}>
          {course?.name}
        </Typography>

        <Typography gutterBottom variant="body1" sx={{ m: 0 }}>
          {course?.title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Giáo viên: <strong>{course?.teacher}</strong>
        </Typography>

        <RatingCustom rating={4.5} />

        {course?.subject && (
          <Box>
            <Chip label={course?.subject} color="primary" sx={{ borderRadius: 1 }} />
          </Box>
        )}
      </Stack>
    </Box>
  )
}
