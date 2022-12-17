import ClassroomAttendance from '@/features/Classroom/classroomComponent/ClassroomAttendance'
import ClassroomInformation from '@/features/Classroom/classroomComponent/ClassroomInformation'
import ClassroomResource from '@/features/Classroom/classroomComponent/ClassroomResource'
import ClassroomSchedule from '@/features/Classroom/classroomComponent/ClassroomSchedule'
import ClassroomTeacher from '@/features/Classroom/classroomComponent/ClassroomTeacher'
import { ClassPayload } from '@/models/class'
import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
interface Props {
  classDetail: ClassPayload
}
export default function ClassroomLayout(props: Props) {
  const { classDetail } = props
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {classDetail && (
            <Stack
              style={{
                background: ' linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
                borderRadius: 5,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <ClassroomInformation classDetail={classDetail} />
            </Stack>
          )}
          {classDetail.teacher && (
            <Stack>
              <Typography variant="h6">Thông tin giáo viên</Typography>
              <ClassroomTeacher teacher={classDetail.teacher} />
            </Stack>
          )}
          {classDetail.timeTable && (
            <Stack>
              <Typography variant="h6">Lịch Học</Typography>
              <ClassroomSchedule timetable={classDetail.timeTable} />
            </Stack>
          )}

          {!classDetail.attendance && (
            <Stack>
              <Typography variant="h6">Điểm danh lớp học</Typography>
              <ClassroomAttendance />
            </Stack>
          )}
        </Grid>
        <Grid item xs={4}>
          {classDetail.resources && (
            <Stack>
              <Typography variant="h6">Tài Nguyên Môn Học</Typography>
              <ClassroomResource resources={classDetail.resources} />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Stack>
  )
}
