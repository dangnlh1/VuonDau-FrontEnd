import React from 'react'
import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import { useClassTeacher } from '@/hooks/teacher'
interface Props {
  id: string | undefined
}
export default function ClassroomTeacher({ id }: Props) {
  if (!id) return null
  const { data } = useClassTeacher(id)
  return (
    <Grid container>
      <Grid xs={3}>
        <Card>
          <Box
            component="img"
            sx={{
              height: undefined,
              aspectRatio: 1,
              width: '100%',
            }}
            alt="The house from the offer."
            src="http://unblast.com/wp-content/uploads/2020/09/Male-Teacher-Illustration.jpg"
          ></Box>
        </Card>
      </Grid>
      <Grid xs={9}>
        <Stack paddingLeft={2}>
          <Typography variant="body1" fontWeight="800">
            ID
          </Typography>
          <Typography variant="body2">{`${data?.teacher.id}`}</Typography>
          <Typography variant="body1" fontWeight="800">
            Tên giáo viên
          </Typography>
          <Typography variant="body2">{`${data?.teacher.firstName} ${data?.teacher.lastName}`}</Typography>
          <Typography variant="body1" fontWeight="800">
            Số điện thoại
          </Typography>
          <Typography variant="body2">{`${data?.teacher.phoneNumber}`}</Typography>
          <Typography variant="body1" fontWeight="800">
            Giới tính
          </Typography>
          <Typography variant="body2">{`${data?.teacher.genderResponse} `}</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
