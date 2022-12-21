import { useStudentRegister } from '@/hooks/studentRegister'
import { StudentRegisterPayload } from '@/models/studentRegister'
import { Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormDataPayload, RegisterForm } from './components/RegisterForm'

export function StudentRegister() {
  const { registerStudent } = useStudentRegister()
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
      const response = await registerStudent.mutateAsync(formData)
      if (response) {
        toast.success('Đăng kí thành công')
        navigate('/')
        return
      }
      toast.error('Đăng kí không thành công')
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
