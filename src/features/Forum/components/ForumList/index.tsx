import { ClassRoomCard } from '@/components/common/ClassRoomCard'
import { ForumRoomCard } from '@/features/Forum/components/ForumRoomCard'
import { ForumPayload } from '@/models/forum'
import { Box, Stack } from '@mui/material'

export interface ForumListProps {
  forumList?: ForumPayload[]
  onCardClick?: (row: any) => void
}

export function ForumList({ forumList, onCardClick }: ForumListProps) {
  console.log(forumList)

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
      {Array.isArray(forumList) &&
        forumList.length > 0 &&
        forumList.map((item, idx) => (
          <Box
            key={idx}
            sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3, lg: 1 / 4 }, height: 'auto' }}
            onClick={() => onCardClick?.(item)}
          >
            <Box sx={{ p: 2, height: '100%' }}>
              <ForumRoomCard
                forumName={item.name}
                className={item.className}
                classCode={item.classCode}
                subjectName={item.subjectName}
              />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
