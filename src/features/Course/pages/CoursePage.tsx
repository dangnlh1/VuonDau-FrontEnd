import { CourseData } from '@/components/common/CourseCard'
import { useClasses } from '@/hooks/classes'
import { FilterParams } from '@/models/common'
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseFilter } from '../components/CourseFilter'
import { CourseList } from '../components/CourseList'

const pageTitle = 'Khóa học'

export function CoursePage() {
  const [newCourseList, setNewCourseList] = useState<CourseData[]>([])
  const [params, setParams] = useState<FilterParams>({
    page: 0,
    size: 10,
  })

  const navigate = useNavigate()

  const { classList, pagination } = useClasses(params)

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

  function handlePageChange(event: any, nextPage: number) {
    setParams((params) => ({
      ...params,
      page: nextPage - 1,
    }))
  }

  function handleCardClick(courseId: number) {
    navigate(`/khoa-hoc/${courseId}`)
  }

  return (
    <Box>
      <Container>
        <Typography variant="h3" fontWeight="bold" sx={{ my: 3 }}>
          {pageTitle}
        </Typography>

        <CourseFilter />

        <Box>
          <CourseList courseList={newCourseList} onCardClick={handleCardClick} />
        </Box>

        <Stack spacing={2} alignItems="center">
          <Pagination
            count={pagination?.totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Box>
  )
}
