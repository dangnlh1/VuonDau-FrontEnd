import { ForumRoomCard } from '@/features/Forum/components/ForumRoomCard'
import { LessonRoomCard } from '@/features/Forum/components/LessonRoomCard'
import { Action } from '@/models/common'
import { ForumLesson, ForumPayload } from '@/models/forum'
import { Box, Stack } from '@mui/material'

export interface LessonListProps {
  lessonList?: ForumLesson[]
  onCardClick?: (row: any) => void
}

export function LessonList({ lessonList, onCardClick }: LessonListProps) {
  return (
    <Stack flexWrap="wrap" sx={{ mx: -2 }}>
      {Array.isArray(lessonList) &&
        lessonList.length > 0 &&
        lessonList.map((item, idx) => (
          <Box key={idx} sx={{ width: '100%', height: 'auto' }} onClick={() => onCardClick?.(item)}>
            <Box sx={{ p: 1, height: '100%' }}>
              <LessonRoomCard lessons={item} />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
