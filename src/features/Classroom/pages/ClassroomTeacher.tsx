import React from 'react'
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material'
import { useClassTeacher } from '@/hooks/teacher'
import { useParams } from 'react-router-dom'
import { dateFormatting } from '@/utils/dateFormatting'

export default function ClassroomTeacher() {
  const id = useParams().classId
  if (!id) return null
  const { data } = useClassTeacher(id)
  if (!data) return <Stack>Không có dữ liệu về gia sư</Stack>
  const noImageTeacher = 'https://banffventureforum.com/wp-content/uploads/2019/08/No-Image.png'
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Giáo viên
      </Typography>
      <Stack direction="row">
        <Stack sx={{ width: '20%' }}>
          <Box component={'img'} alt="image" src={data.avatar ? data.avatar : noImageTeacher} />
        </Stack>
        <Stack paddingLeft={2} flexGrow={1}>
          <Stack paddingY={2}>
            <Typography variant="h3">{`${data.firstName} ${data.lastName}`}</Typography>
          </Stack>
          <Divider />
          <Stack paddingY={1}>
            <Typography sx={{ fontSize: 20 }}>Email</Typography>
            <Typography variant="body1">{data.email}</Typography>
          </Stack>
          <Stack paddingY={1}>
            <Typography sx={{ fontSize: 20 }}>Ngày Sinh</Typography>
            <Typography variant="body1">{dateFormatting(data.birthday)}</Typography>
          </Stack>
          <Stack paddingY={1}>
            <Typography sx={{ fontSize: 20 }}>Số điện thoại</Typography>
            <Typography variant="body1">{data.phoneNumber}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
