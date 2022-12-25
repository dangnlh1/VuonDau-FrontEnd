import { AboutCourse } from '@/components/common/AboutCourse'
import { CourseContent } from '@/components/common/CourseContent'
import { BannerPayload, DetailBanner } from '@/components/common/DetailBanner'
import { SideDetailBanner } from '@/components/common/SideDetailBanner'
import { useClass } from '@/hooks/class'
import { usePaymentClass } from '@/hooks/paymentClass'
import { Resource } from '@/models/class'
import { PaymentPayload } from '@/models/payment'
import { openWindow } from '@/utils/window'
import { Box, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export function HomeDetail() {
  const { courseId } = useParams()
  const [bannerData, setBannerData] = useState<BannerPayload>()
  const [resourceList, setResourceList] = useState<Resource[]>()

  const { data } = useClass(parseInt(courseId as string))
  const defaultImage = 'https://img-c.udemycdn.com/course/240x135/658286_99b2_2.jpg'
  const { paymentClass } = usePaymentClass()

  async function handleBuyCourse() {
    try {
      if (courseId && data?.finalPrice) {
        const userName = localStorage.getItem('session')
        const params: PaymentPayload = {
          classId: parseInt(courseId),
          amount: `${data?.finalPrice}`,
          ordertype: '250000',
          vnp_OrderInfo: `Chuyển khoản tiền học phí lớp học ${data.name}`,
          sessionId: `${userName}`,
        }
        console.log('param payment', params)

        const response = await paymentClass.mutateAsync(params)
        openWindow(response.paymentUrl)
      } else {
        toast.error('Lỗi không có FinalPrice')
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

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
              onBuyClick={handleBuyCourse}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
