import { More, MoreHoriz, MoreVert } from '@mui/icons-material'
import { Box, Card, Divider, IconButton, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const imageUrlList = [
  'https://www.gstatic.com/classroom/themes/img_code.jpg',
  'https://www.gstatic.com/classroom/themes/img_backtoschool.jpg',
  'https://www.gstatic.com/classroom/themes/img_graduation.jpg',
]

export interface ClassRoomCardProps {
  name?: string
  yearOfCourse?: string
  classSize?: string
  actions?: ReactNode
}

export function ClassRoomCard({ name, yearOfCourse, classSize, actions }: ClassRoomCardProps) {
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
            <Typography variant="h5" fontWeight={700}>
              {name}
            </Typography>
            <Typography variant="body1">{yearOfCourse}</Typography>
            <Typography variant="body1">{classSize}</Typography>
          </Box>

          <IconButton edge="end">
            <MoreVert />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  )
}
