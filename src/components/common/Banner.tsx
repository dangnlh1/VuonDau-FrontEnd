import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { alpha, Box, Stack } from '@mui/material'
import banner1 from '@/assets/images/banner1.png'
import banner2 from '@/assets/images/banner2.jpg'
import { BannerPayload } from '@/models/banner'

export interface BannerProps {
  bannerList?: BannerPayload[]
}

export function Banner({ bannerList }: BannerProps) {
  const pagination = {
    clickable: true,
  }

  return (
    <Box boxShadow={2} sx={{ borderRadius: '4px', overflow: 'hidden', height: 400 }}>
      <Swiper
        pagination={pagination}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {Array.isArray(bannerList) &&
          bannerList.length > 0 &&
          bannerList.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Box
                boxShadow={3}
                sx={{
                  height: 400,
                  width: '100%',

                  backgroundImage: `url(${item.linkUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Stack
                  sx={{
                    height: '100%',
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.1),
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}
