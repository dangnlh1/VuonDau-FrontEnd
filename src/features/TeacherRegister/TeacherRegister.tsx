import { useCity } from '@/hooks/city'
import { useSubject } from '@/hooks/subject'
import { useTeacherRegister } from '@/hooks/teacherRegister'
import { SelectOption } from '@/models/option'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { RegisterForm } from './components/RegisterForm'

export function TeacherRegister() {
  const [subjectOptionList, setSubjectOptionList] = useState<SelectOption[]>([])
  const [cityOptionList, setCityOptionList] = useState<SelectOption[]>([])
  const [selectAvatarFile, setSelectAvatarFile] = useState<File>()
  const [selectIdCardFile, setSelectIdCardFile] = useState<File>()
  const [selectCertificationCardFile, setSelectCertificationCardFile] = useState<File>()

  const { subjectList } = useSubject()
  const { cityList } = useCity()
  const { registerTutor, uploadProfileImage } = useTeacherRegister()

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

  async function handleFormSubmit(formValues: TeacherRegisterPayload) {
    await registerTutor.mutateAsync(formValues).then((response) => {
      if (response) {
        console.log(response)
      }
    })
  }

  return (
    <Box>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Đăng ký giảng dạy trên Vườn Dâu
          </Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <RegisterForm
            subjectList={subjectOptionList}
            cityList={cityOptionList}
            onFormSubmit={handleFormSubmit}
            onUploadCertificationCard={(file) => setSelectCertificationCardFile(file)}
            onUploadAvatar={(file) => setSelectAvatarFile(file)}
            onUploadIdCard={(file) => setSelectIdCardFile(file)}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default TeacherRegister
