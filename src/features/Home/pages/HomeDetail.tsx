import { AboutCourse } from '@/components/common/AboutCourse'
import { CourseContent } from '@/components/common/CourseContent'
import { BannerPayload, DetailBanner } from '@/components/common/DetailBanner'
import { SideDetailBanner } from '@/components/common/SideDetailBanner'
import { useClass } from '@/hooks/class'
import { Resource } from '@/models/class'
import { Box, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function HomeDetail() {
  const { courseId } = useParams()
  const [bannerData, setBannerData] = useState<BannerPayload>()
  const [resourceList, setResourceList] = useState<Resource[]>()

  const { data } = useClass(parseInt(courseId as string))
  const defaultImage = 'https://img-c.udemycdn.com/course/240x135/658286_99b2_2.jpg'

  useEffect(() => {
    if (data) {
      const bannerData: BannerPayload = {
        title: data.name,
        imageUrl: data.course?.image || defaultImage,
        description: data.course?.description,
        status: data.course?.subject?.name,
        rating: 5,
        teacher: `${data.teacher?.firstName || ''} ${data.teacher?.lastName || ''}`,
        updatedAt: data.endDate,
        major: 'Frontend Development',
        finalPrice: data.finalPrice,
        unitPrice: data.unitPrice,
      }

      setBannerData(bannerData)

      const resourceList = data?.resources
      if (Array.isArray(resourceList) && resourceList.length > 0) {
        setResourceList(resourceList)
      }
    }
  }, [data])

  return (
    <Box>
      <DetailBanner data={bannerData} />

      <Container>
        <Stack direction="row" sx={{ my: 5 }}>
          <Box sx={{ width: { xs: '100%', lg: 'calc(100% - 340px)' } }}>
            <AboutCourse resourceList={resourceList} title="Bạn được học gì trong khóa này?" />
            <Box sx={{ mb: 5 }} />
            <CourseContent resourceList={resourceList} title="Nội dung khóa học" />
          </Box>

          <Box
            sx={{
              position: 'relative',
              top: -300,
              right: 0,

              display: { xs: 'none', lg: 'flex' },

              width: 340,
              ml: 3,
              height: 'auto',
            }}
          >
            <SideDetailBanner
              sx={{ width: 340 }}
              finalPrice={bannerData?.finalPrice}
              unitPrice={bannerData?.unitPrice}
              imageUrl={bannerData?.imageUrl}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
