import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.jpg'
import banner3 from '@/assets/images/banner3.jpg'
import { Banner } from '@/components/common/Banner'
import { CourseData } from '@/components/common/CourseCard'
import { a11yProps } from '@/components/common/TabPanel'
import { WhyUs, WhyUsPayload } from '@/components/common/WhyUs'
import { useClasses } from '@/hooks/classes'
import { useSubject } from '@/hooks/subject'
import { ClassStatus } from '@/models/class'
import { FilterParams } from '@/models/common'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ScheduleIcon from '@mui/icons-material/Schedule'
import StarIcon from '@mui/icons-material/Star'
import { Box, Container, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from '../components/CourseList'
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

const classStatus: ClassStatus = 'NEW'
const currentBannerList = [banner1, banner2, banner3]

export function HomePage() {
  const [tab, setTab] = useState(0)
  const [subjectId, setSubjectId] = useState<number>()
  const [newCourseList, setNewCourseList] = useState<CourseData[]>([])
  const [newCourseOneInOneList, setNewCourseOneInOneList] = useState<CourseData[]>([])
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 4,
    classStatus: 'NEW',
  })

  const navigate = useNavigate()

  const { classList } = useClasses(params)
  const { classList: courseOneInOneList } = useClasses({
    page: 0,
    size: 4,
    classType: 'ONE',
  })
  const { subjectList } = useSubject()

  useEffect(() => {
    if (Array.isArray(subjectList) && subjectList.length > 0) {
      const subject = subjectList[0]
      setParams((params) => ({
        ...params,
        subject: subject.id,
      }))
    }
  }, [subjectList])

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

  useEffect(() => {
    if (Array.isArray(courseOneInOneList) && courseOneInOneList.length > 0) {
      const newCourseList: CourseData[] = courseOneInOneList.map((item) => ({
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

      setNewCourseOneInOneList(newCourseList)
      return
    }

    setNewCourseOneInOneList([])
  }, [classList])

  function handleCardClick(courseId: number) {
    navigate(`/trang-chu/${courseId}`)
  }

  function handleTabChange(e: any, value: number) {
    setTab(value)

    if (Array.isArray(subjectList) && subjectList.length > 0) {
      const subject = subjectList[value]

      setParams((params) => ({
        ...params,
        subject: subject.id,
      }))
    }
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
          <Box>
            <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
              {Array.isArray(subjectList) &&
                subjectList.length > 0 &&
                subjectList.map((item, idx) => (
                  <Tab key={idx} label={item.name} {...a11yProps(idx)} />
                ))}
            </Tabs>
          </Box>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Khóa học dạy kèm 1 & 1
          </Typography>
          <CourseList courseList={newCourseOneInOneList} onCardClick={handleCardClick} />
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Các khóa học nổi bật
          </Typography>
          <SubjectList subjectList={subjectList || []} />
        </Box>
      </Container>
    </Box>
  )
}
