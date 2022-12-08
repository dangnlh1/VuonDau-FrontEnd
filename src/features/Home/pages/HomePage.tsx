import { Box, Container } from '@mui/material'
import { Banner } from '@/components/common/Banner'
import { WhyUs, WhyUsPayload } from '@/components/common/WhyUs'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StarIcon from '@mui/icons-material/Star'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { useState } from 'react'
import { FilterParams } from '@/models/common'
import { useCourse } from '@/hooks/course'

const whyUsList: WhyUsPayload[] = [
  {
    label: 'Learn in-demand skills with over 213,000 video courses',
    icon: <PlayArrowIcon fontSize="large" />,
  },
  {
    label: 'Choose courses taught by real-world experts',
    icon: <StarIcon fontSize="large" />,
  },
  {
    label: 'Learn at your own pace, with lifetime access on mobile and desktop',
    icon: <ScheduleIcon fontSize="large" />,
  },
]

export function HomePage() {
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 10,
  })

  const { courseList, pagination } = useCourse(params)

  console.log('courseList: ', courseList)
  console.log('pagination: ', pagination)

  return (
    <Box>
      <Container>
        <Box sx={{ my: 2 }}>
          <Banner />
        </Box>

        <Box sx={{ my: 2 }}>
          <WhyUs whyUsList={whyUsList} />
        </Box>
      </Container>
    </Box>
  )
}
