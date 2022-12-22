import { useClasses } from '@/hooks/classes'
import { AddEditClassFormPayload } from '@/models/class'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddEditClassForm } from '../components/AddEditClassForm'

const pageTitle = 'Tạo lớp Mới'
export interface CreateClassProps {}

export function CreateClass() {
  const [params, setParams] = useState({
    page: 0,
    size: 12,
  })

  const navigate = useNavigate()

  const { createClassByTeacherRequest } = useClasses(params)

  async function handleAddEditClassSubmit(formValues: AddEditClassFormPayload) {
    const data: AddEditClassFormPayload = {
      ...formValues,
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),
    }
    try {
      await createClassByTeacherRequest.mutateAsync(data).then((response) => {
        if (response) {
          toast.success('Tạo lớp học thành công')
          navigate('/giao-vien/quan-ly-lop/tao-khoa-hoc-moi')
          return
        }

        toast.error('Tạo lớp học không thành công')
      })
    } catch (error) {
      console.log('error: ', error)
      toast.error(`${error} hoặc mã code đã bị trùng!` as string)
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <AddEditClassForm onSubmit={handleAddEditClassSubmit} />
    </Stack>
  )
}
