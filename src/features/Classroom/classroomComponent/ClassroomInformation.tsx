import { ClassPayload } from '@/models/class'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  classDetail: ClassPayload
}
export default function ClassroomInformation(props: Props) {
  const { classDetail } = props
  const defaultImage =
    'https://th.bing.com/th/id/R.fe1c5e6b5189a15df9db50007cb28844?rik=LXneEJwopxj8Cw&riu=http%3a%2f%2fhuongnghiep24h.com%2fmedias%2fimg%2fnews_vi%2fYear_2013%2fMonth_11%2fDay_22%2fnganh-toan-hoc.jpg&ehk=hMheVeY4r9DB3qtArtS%2fHf7fnVpZYEZ5RQ4N7%2b0EYBI%3d&risl=&pid=ImgRaw&r=0'

  return (
    <Stack alignItems={'center'}>
      <Grid container>
        <Grid xs={4}>
          <Box height={'100%'} overflow="hidden" boxShadow={3} borderRadius={1}>
            <Box
              component="img"
              width="100%"
              height="100%"
              sx={{ transform: 'scale(1)', transition: 0.3 }}
              src={defaultImage} //will be change
              alt="green iguana"
            />
          </Box>
        </Grid>
        <Grid xs={8} paddingLeft={5}>
          <Typography variant="h3" color={'white'}>
            {classDetail.name}
          </Typography>
          <Box
            marginY={2}
            style={{
              borderRadius: 5,
              padding: 10,
              background: 'cyan',
              alignSelf: 'center',
              maxWidth: '50%',
            }}
          >
            <Typography variant="body1" textAlign={'center'} fontSize={20} color={'#000'}>
              {classDetail.course.subject?.name}
            </Typography>
          </Box>
          <Stack>
            <Typography variant="body1" fontSize={20} color={'#eee'}>
              {classDetail.course.name}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}
