import { Banner } from '@/components/common/Banner'
import { CourseData } from '@/components/common/CourseCard'
import { WhyUs, WhyUsPayload } from '@/components/common/WhyUs'
import { useBanner } from '@/hooks/banner'
import { useClasses } from '@/hooks/classes'
import { FilterParams } from '@/models/common'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ScheduleIcon from '@mui/icons-material/Schedule'
import StarIcon from '@mui/icons-material/Star'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from '../components/CourseList'
import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.jpg'
import banner3 from '@/assets/images/banner3.jpg'
import { useSubject } from '@/hooks/subject'
import { SubjectList } from '../components/SubjectList'

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

const currentBannerList = [banner1, banner2, banner3]

const classStatus = 'NEW'

export function HomePage() {
  const [newCourseList, setNewCourseList] = useState<CourseData[]>([])
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 4,
  })

  const navigate = useNavigate()

  const { classList } = useClasses(classStatus, params)
  const { bannerList } = useBanner()
  const { subjectList } = useSubject()

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
        <Box sx={{ my: 3 }}>
          <Banner bannerList={currentBannerList} />
        </Box>

        <Box sx={{ my: 3 }}>
          <WhyUs whyUsList={whyUsList} />
        </Box>

        <Box sx={{ my: 3 }}>
          <SubjectList subjectList={subjectList || []} />
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Best seller
          </Typography>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Khóa học đề xuất
          </Typography>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>
      </Container>
    </Box>
  )
}
