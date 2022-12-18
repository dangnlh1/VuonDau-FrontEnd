import { useCity } from '@/hooks/city'
import { useSubject } from '@/hooks/subject'
import { useTeacherRegister } from '@/hooks/teacherRegister'
import { OptionPayload } from '@/models/option'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormDataPayload, RegisterForm } from '../components/RegisterForm'

const pageTitle = 'Đăng ký giảng dạy trên Vườn Dâu'

export function TeacherRegister() {
  const [subjectOptionList, setSubjectOptionList] = useState<OptionPayload[]>([])
  const [cityOptionList, setCityOptionList] = useState<OptionPayload[]>([])

  const navigate = useNavigate()

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

  async function handleFormSubmit(formValues: FormDataPayload) {
    const formData: TeacherRegisterPayload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDay: new Date(formValues.birthDay).toISOString(),
      email: formValues.email,
      password: formValues.password,
      passwordConfirmation: formValues.passwordConfirmation,

      phone: formValues.phone,
      gender: formValues.gender,
      domicile: formValues.domicile,
      voice: formValues.voice,
      teachingProvince: formValues.teachingProvince,
      currentAddress: formValues.currentAddress,
      idCard: formValues.idCard,

      trainingSchoolName: formValues.trainingSchoolName,
      majors: formValues.majors,
      level: formValues.level,
      classLevels: formValues.classLevels,
      subjects: formValues.subjects,
    }

    const uploadFile = formValues?.uploadFile

    await registerTutor
      .mutateAsync(formData)
      .then(async (resId) => {
        if (resId && uploadFile) {
          const id = resId

          const idCardFormData = new FormData()
          idCardFormData.append('resourceType', uploadFile[0].resourceType)
          idCardFormData.append('file', uploadFile[0].file)

          const degreeFormData = new FormData()
          degreeFormData.append('resourceType', uploadFile[1].resourceType)
          degreeFormData.append('file', uploadFile[1].file)

          const avatarFormData = new FormData()
          avatarFormData.append('resourceType', uploadFile[2].resourceType)
          avatarFormData.append('file', uploadFile[2].file)

          try {
            const idCardResponse = await uploadProfileImage.mutateAsync({
              id: id,
              formData: idCardFormData,
            })

            const degreeResponse = await uploadProfileImage.mutateAsync({
              id: id,
              formData: degreeFormData,
            })

            const avatarResponse = await uploadProfileImage.mutateAsync({
              id: id,
              formData: avatarFormData,
            })

            if (idCardResponse && degreeResponse && avatarResponse) {
              toast.success('Đăng ký thành công!')

              navigate('/')
              return
            }

            toast.error('Đăng ký không thành công!')
          } catch (error) {
            console.log(error)
            toast.error('Đăng ký không thành công!')
          }
        }
      })
      .catch((error) => {
        console.log('error', error)
        toast.error(error.err_message)
      })
  }

  return (
    <Box>
      <Container>
        <Box sx={{ my: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            {pageTitle}
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

export default TeacherRegister
