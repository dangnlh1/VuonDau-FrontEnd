import { CourseCard, CourseData } from '@/components/common/CourseCard'
import { Box, Stack } from '@mui/material'

export interface CourseListProps {
  courseList?: CourseData[]
}

export function CourseList({ courseList }: CourseListProps) {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
      {Array.isArray(courseList) &&
        courseList.length > 0 &&
        courseList.map((course, idx) => (
          <Box key={idx} sx={{ width: { xs: '100%', sm: 1 / 2, md: 1 / 3, lg: 1 / 4 } }}>
            <Box sx={{ p: 2 }}>
              <CourseCard course={course} />
            </Box>
          </Box>
        ))}
    </Stack>
  )
}
