import { Box, Container, Typography } from '@mui/material'
import { RegisterForm } from './components/RegisterForm'

export function TeacherRegister() {
  return (
    <Box>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Đăng ký giảng dạy trên Vườn Dâu
          </Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <RegisterForm />
        </Box>
      </Container>
    </Box>
  )
}
