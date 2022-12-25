import { More, MoreHoriz, MoreVert } from '@mui/icons-material'
import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const imageUrlList = [
  'https://www.gstatic.com/classroom/themes/img_code.jpg',
  'https://www.gstatic.com/classroom/themes/img_backtoschool.jpg',
  'https://www.gstatic.com/classroom/themes/img_graduation.jpg',
]

export interface ForumRoomCardProps {
  forumName: string
  className: string
  classCode: string
  subjectName: string
}

export function ForumRoomCard({
  forumName,
  className,
  classCode,
  subjectName,
}: ForumRoomCardProps) {
  return (
    <Stack
      boxShadow={3}
      sx={{
        height: '100%',
        borderRadius: 2,
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[10],
        },
      }}
    >
      <Box
        sx={{
          py: 4,
          px: 3,
          flexGrow: 1,
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">{classCode}</Typography>

            <Typography variant="h5" fontWeight={700}>
              {forumName}
            </Typography>

            <Typography variant="body1">{className}</Typography>

            <Typography variant="body1">{subjectName}</Typography>
          </Box>

          <IconButton edge="end">
            <MoreVert />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  )
}
