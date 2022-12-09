import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { alpha, Box, Stack } from '@mui/material'
import { BannerPayload } from '@/models/banner'

export interface BannerProps {
  bannerList?: BannerPayload[]
}

export function Banner({ bannerList }: BannerProps) {
  const pagination = {
    clickable: true,
  }

  return (
    <Box boxShadow={2} sx={{ borderRadius: '4px', overflow: 'hidden' }}>
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
              <Box sx={{ position: 'relative', height: 0, paddingTop: '45%' }}>
                <Box
                  boxShadow={3}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    height: '100%',
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
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  )
}
