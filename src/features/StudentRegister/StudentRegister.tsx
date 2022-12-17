import { studentRegisterApi } from '@/api/studentRegisterApi'
import { useCity } from '@/hooks/city'
import { useSubject } from '@/hooks/subject'
import { useTeacherRegister } from '@/hooks/teacherRegister'
import { SelectOption } from '@/models/option'
import { StudentRegisterPayload } from '@/models/studentRegister'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormDataPayload, RegisterForm } from './components/RegisterForm'

export function StudentRegister() {
  const navigate = useNavigate()

  async function handleFormSubmit(formValues: FormDataPayload) {
    if (formValues.password == formValues.passwordConfirmation) {
      const formData: StudentRegisterPayload = {
        account: {
          username: formValues.username,
          password: formValues.password,
        },
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: formValues.phone,
        genderCode: formValues.gender,
      }
      studentRegisterApi
        .post(formData)
        .then((response) => {
          if (response.error_message) {
            toast.error('Đăng kí không thành công!')
          } else {
            toast.success('Đăng ký thành công!')
          }
        })
        .catch((error) => {
          toast.error('Đăng kí không thành công!')
        })
    } else {
      toast.error('Password không trùng khớp!')
    }
  }

  return (
    <Box>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Đăng ký học trên Vườn Dâu
          </Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <RegisterForm onFormSubmit={handleFormSubmit} />
        </Box>
      </Container>
    </Box>
  )
}

export default StudentRegister
