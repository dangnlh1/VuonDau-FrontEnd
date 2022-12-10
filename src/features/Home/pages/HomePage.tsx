import { Box, Container } from '@mui/material'
import { Banner } from '@/components/common/Banner'
import { WhyUs, WhyUsPayload } from '@/components/common/WhyUs'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StarIcon from '@mui/icons-material/Star'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { useEffect, useState } from 'react'
import { FilterParams } from '@/models/common'
import { useCourse } from '@/hooks/course'
import { CourseList } from '../components/CourseList'
import { title } from 'process'
import { CourseData } from '@/components/common/CourseCard'
import { useBanner } from '@/hooks/banner'
import { useNavigate } from 'react-router-dom'
import { Course } from '@/models/course'

const whyUsList: WhyUsPayload[] = [
  {
    label: 'Học các kỹ năng theo yêu cầu với nhiều khóa học video',
    icon: <PlayArrowIcon fontSize="large" />,
  },
  {
    label: 'Các khóa học được giảng dạy bởi các chuyên gia hàng đầu',
    icon: <StarIcon fontSize="large" />,
  },
  {
    label: 'Học tập trên thiết bị di động hoặc laptop mọi lúc, mọi nơi',
    icon: <ScheduleIcon fontSize="large" />,
  },
]

export function HomePage() {
  const [newCourseList, setNewCourseList] = useState<CourseData[]>([])
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 10,
  })

  const navigate = useNavigate()

  const { courseList, pagination } = useCourse(params)
  const { bannerList } = useBanner()

  useEffect(() => {
    if (Array.isArray(courseList) && courseList.length > 0) {
      const newCourseList: CourseData[] = courseList.map((item) => ({
        id: item.id,
        title: item.courseTitle,
        name: item.courseName,
        teacher: item.teacherName || 'Hoàng Minh',
        subject: item.subject.name,
      }))

      setNewCourseList(newCourseList)
      return
    }

    setNewCourseList([])
  }, [courseList])

  function handleCardClick(courseId: number) {
    navigate(`/trang-chu/${courseId}`)
  }

  return (
    <Box>
      <Container>
        <Box sx={{ my: 2 }}>
          <Banner bannerList={bannerList} />
        </Box>

        <Box sx={{ my: 2 }}>
          <WhyUs whyUsList={whyUsList} />
        </Box>

        <Box sx={{ my: 2 }}>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>
      </Container>
    </Box>
  )
}
