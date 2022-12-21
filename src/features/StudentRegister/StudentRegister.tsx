import { useCity } from '@/hooks/city'
import { useStudentRegister } from '@/hooks/studentRegister'
import { useSubject } from '@/hooks/subject'
import { OptionPayload } from '@/models/option'
import { StudentRegisterPayload } from '@/models/studentRegister'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormDataPayload, RegisterForm } from './components/RegisterForm'

export function StudentRegister() {
  const [subjectOptionList, setSubjectOptionList] = useState<OptionPayload[]>([])
  const [cityOptionList, setCityOptionList] = useState<OptionPayload[]>([])
  const navigate = useNavigate()

  const { registerStudent } = useStudentRegister()
  const { subjectList } = useSubject()
  const { cityList } = useCity()

  useEffect(() => {
    if (Array.isArray(subjectList) && subjectList.length > 0) {
      const newSubjectOptionList = subjectList.map((item) => ({
        label: item.name,
        value: item.id,
      }))

      setSubjectOptionList(newSubjectOptionList)
    }
  }, [subjectList])

  useEffect(() => {
    if (Array.isArray(cityList) && cityList.length > 0) {
      const newCityOptionList = cityList.map((item) => ({
        label: item.name,
        value: item.name,
      }))

      setCityOptionList(newCityOptionList)
    }
  }, [cityList])

  async function handleFormSubmit(formValues: FormDataPayload) {
    try {
      if (formValues.password == formValues.passwordConfirmation) {
        const formData: StudentRegisterPayload = {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          birthDay: new Date(formValues.birthDay).toISOString(),
          email: formValues.email,
          password: formValues.password,

          phone: formValues.phone,
          gender: formValues.gender,

          classLevel: formValues.classLevel,
          subjects: formValues.subjects,
          currentAddress: formValues.currentAddress,
          schoolName: formValues.schoolName,
        }
        const response = await registerStudent.mutateAsync(formData)
        if (response.status !== 'FAILED') {
          toast.success('Đăng kí thành công')
          navigate('/')
          return
        } else {
          toast.error('Đăng kí không thành công:' + response.error_message)
        }
      } else {
        toast.error('Password không trùng khớp!')
      }
    } catch (error) {
      toast.error('Đăng kí không thành công')
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
          <RegisterForm
            subjectList={subjectOptionList}
            cityList={cityOptionList}
            onFormSubmit={handleFormSubmit}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default StudentRegister
