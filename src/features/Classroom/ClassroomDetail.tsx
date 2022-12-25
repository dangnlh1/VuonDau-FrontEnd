import { classApi } from '@/api/classApi'
import { ClassPayload } from '@/models/class'
import { IndeterminateCheckBox } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Action } from '@/models/common'
import ClassroomResource from '@/features/Classroom/classroomComponent/ClassroomResource'
import ClassroomTeacher from '@/features/Classroom/classroomComponent/ClassroomTeacher'
import ClassroomSchedule from '@/features/Classroom/classroomComponent/ClassroomSchedule'
import ClassroomTimetable from '@/features/Classroom/classroomComponent/ClassroomTimetable'

const actionList: Action[] = [
  { label: 'Bài tập (Bài Học)', value: '/tai-nguyen', variant: 'outlined' },
  { label: 'Giáo viên', value: '/giao-vien', variant: 'outlined' },
  { label: 'Điểm danh/ Thời Khóa Biểu', value: '/diem-danh', variant: 'outlined' },
]

export default function ClassroomDetail() {
  const [classDetail, setClassDetail] = useState<ClassPayload>()
  const [selectedAction, setSelectedAction] = useState<Action>(actionList[0])
  const { classId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  async function getClassDetail() {
    try {
      if (classId) {
        const response = await classApi.get(parseInt(classId))
        if (response) {
          setClassDetail(response)
        }
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  function handleClickAction(item: Action) {
    navigate(`/hoc-sinh/lop-hoc/${classId}` + item.value)
    setSelectedAction(item)
  }

  useEffect(() => {
    getClassDetail()
  }, [])
  if (!classDetail) return null
  return (
    <Stack>
      <Stack direction={'row'} justifyContent="flex-end" spacing={1}>
        {actionList.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleClickAction(item)}
            variant={
              location.pathname === `/hoc-sinh/lop-hoc/${classId}` + item.value
                ? 'outlined'
                : 'contained'
            }
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  )
}
