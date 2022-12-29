import { LessonListProps } from '@/features/Forum/components/LessonList'
import { ForumLesson } from '@/models/forum'
import { More, MoreHoriz, MoreVert } from '@mui/icons-material'
import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const imageUrlList = [
  'https://www.gstatic.com/classroom/themes/img_code.jpg',
  'https://www.gstatic.com/classroom/themes/img_backtoschool.jpg',
  'https://www.gstatic.com/classroom/themes/img_graduation.jpg',
]

export interface LessonRoomCardProps {
  lessons: ForumLesson
}

export function LessonRoomCard({ lessons }: LessonRoomCardProps) {
  const { id, lessonName, questions } = lessons
  return (
    <Stack
      sx={{
        height: '100%',
        background: '#fff',
        borderRadius: 1,
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[3],
        },
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 3,
          flexGrow: 1,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{lessonName}</Typography>
          </Box>

          <IconButton edge="end">
            <MoreVert />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  )
}
