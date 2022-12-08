import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { alpha, Box, Stack } from '@mui/material'
// const banner =
//   'https://cdn.vn.garenanow.com/web/lol-product/home/images/Lan_h3lpm3/10_2022/ra-mat-phu-thuy-header.jpg'
const banner = 'https://i.ibb.co/vYvB8P6/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b-2.jpg'

export function Banner() {
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
        {[...Array(10)].map((item, idx) => (
          <SwiperSlide key={idx}>
            <Box
              boxShadow={3}
              sx={{
                height: 400,
                width: '100%',

                backgroundImage: `url(${banner})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Stack
                sx={{ height: '100%', bgcolor: (theme) => alpha(theme.palette.common.black, 0.1) }}
              ></Stack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
