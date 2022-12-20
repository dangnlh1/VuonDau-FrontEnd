import { classApi } from '@/api/classApi'
import { ClassPayload } from '@/models/class'
import { IndeterminateCheckBox } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Action } from '@/models/common'
import ClassroomResource from '@/features/Classroom/classroomComponent/ClassroomResource'
import ClassroomTeacher from '@/features/Classroom/classroomComponent/ClassroomTeacher'
import ClassroomSchedule from '@/features/Classroom/classroomComponent/ClassroomSchedule'

const actionList: Action[] = [
  { label: 'Bài tập (Bài Học)', value: '/tai-nguyen', variant: 'outlined' },
  { label: 'Giáo viên', value: '/giao-vien-cua-lop', variant: 'outlined' },
  { label: 'Điểm danh/ Thời Khóa Biểu', value: '/diem-danh', variant: 'outlined' },
]

export default function ClassroomDetail() {
  const [classDetail, setClassDetail] = useState<ClassPayload>()
  const [selectedAction, setSelectedAction] = useState<Action>(actionList[0])
  const { classId } = useParams()

  let actionPage = null
  switch (selectedAction) {
    case actionList[0]:
      actionPage = <ClassroomResource id={classId} />
      break
    case actionList[1]:
      actionPage = <ClassroomTeacher id={classId} />
      break
    default:
      actionPage = <ClassroomSchedule id={classId} />
      break
  }
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
  function handleClickAction(value: Action) {
    setSelectedAction(value)
  }

  useEffect(() => {
    getClassDetail()
  }, [])
  console.log('class', classDetail)
  if (!classDetail) return null
  return (
    <Stack>
      <Stack direction={'row'} justifyContent="flex-end" spacing={1}>
        {actionList.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleClickAction(item)}
            variant={selectedAction === item ? 'contained' : 'outlined'}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      <Stack>{actionPage}</Stack>
    </Stack>
  )
}
