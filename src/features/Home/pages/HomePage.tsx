import { Banner } from '@/components/common/Banner'
import { CourseData } from '@/components/common/CourseCard'
import { WhyUs, WhyUsPayload } from '@/components/common/WhyUs'
import { useBanner } from '@/hooks/banner'
import { useClasses } from '@/hooks/classes'
import { ClassStatus } from '@/models/class'
import { FilterParams } from '@/models/common'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ScheduleIcon from '@mui/icons-material/Schedule'
import StarIcon from '@mui/icons-material/Star'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from '../components/CourseList'

const whyUsList: WhyUsPayload[] = [
  {
    label: 'Học các kỹ năng theo yêu cầu với nhiều khóa học video.',
    icon: <PlayArrowIcon fontSize="large" />,
  },
  {
    label: 'Các khóa học được giảng dạy bởi các chuyên gia hàng đầu.',
    icon: <StarIcon fontSize="large" />,
  },
  {
    label: 'Học tập trên thiết bị di động hoặc laptop mọi lúc, mọi nơi.',
    icon: <ScheduleIcon fontSize="large" />,
  },
]

const classStatus: ClassStatus = 'NEW'

export function HomePage() {
  const [newCourseList, setNewCourseList] = useState<CourseData[]>([])
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 4,
    classStatus,
  })

  const navigate = useNavigate()

  const { classList } = useClasses(params)
  const { bannerList } = useBanner()

  useEffect(() => {
    if (Array.isArray(classList) && classList.length > 0) {
      const newCourseList: CourseData[] = classList.map((item) => ({
        id: item.id,
        name: item?.name,
        title: item?.course?.courseName,
        teacher: `${item?.teacher?.firstName || ''} ${item?.teacher?.lastName || ''}`,
        subject: item?.course?.subject?.name,
        imageUrl: item?.course?.image,
        unitPrice: item.unitPrice,
        finalPrice: item.finalPrice,
        studentMaxNumber: item.maxNumberStudent,
      }))

      setNewCourseList(newCourseList)
      return
    }

    setNewCourseList([])
  }, [classList])

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
          <Typography variant="h5" fontWeight={700}>
            Best seller
          </Typography>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            Khóa học đề xuất
          </Typography>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>
      </Container>
    </Box>
  )
}
