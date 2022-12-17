import { classApi } from '@/api/classApi'
import ClassroomLayout from '@/features/Classroom/classroomComponent/ClassroomLayout'
import { ClassPayload } from '@/models/class'
import { IndeterminateCheckBox } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ClassroomDetail() {
  const { classId } = useParams()
  const [classDetail, setClassDetail] = useState<ClassPayload>()
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

  useEffect(() => {
    getClassDetail()
  }, [])
  console.log('class', classDetail)
  if (!classDetail) return null
  return <ClassroomLayout classDetail={classDetail} />
}
