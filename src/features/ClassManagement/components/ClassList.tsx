import { ClassRoomCard } from '@/components/common/ClassRoomCard'
import { ClassPayload } from '@/models/class'
import { Box, Stack } from '@mui/material'

export interface ClassListProps {
  classList?: ClassPayload[]
  onCardClick?: (row: any) => void
}

export function ClassList({ classList, onCardClick }: ClassListProps) {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
      {Array.isArray(classList) &&
        classList.length > 0 &&
        classList.map((item, idx) => (
          <Box
            key={idx}
            sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3, lg: 1 / 4 }, height: 'auto' }}
            onClick={() => onCardClick?.(item)}
          >
            <Box sx={{ p: 2, height: '100%' }}>
              <ClassRoomCard
                name={item.name}
                yearOfCourse={`Niên khóa: ${new Date(item.startDate).getFullYear()} - ${new Date(
                  item.endDate
                ).getFullYear()}`}
                classSize={`Sỉ số: ${item.numberStudent || 0}`}
              />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
