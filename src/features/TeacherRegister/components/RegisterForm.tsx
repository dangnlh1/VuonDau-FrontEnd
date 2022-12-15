import { CheckboxField } from '@/components/FormFields/CheckboxField'
import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { UploadCardImage } from '@/components/FormFields/UploadCardImageField'
import { classLevelList, genderList, voiceList } from '@/constants/info'
import { SelectOption } from '@/models/option'
import { TeacherRegisterPayload, UploadFile } from '@/models/teacherRegister'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormHelperText, IconButton, InputAdornment, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const helperText = 'Lưu ý: Sử dụng email và mật khẩu này để đăng nhập!.'
const certificationCardHelperText = 'Upload bằng cấp là trường bắt buộc!'
const idCardHelperText = 'Upload CMND/CCCD là trường bắt buộc!'
const avatarHelperText = 'Upload ảnh đại diện là trường bắt buộc!'

export interface FormDataPayload extends TeacherRegisterPayload {
  uploadFile?: UploadFile[]
}
export interface RegisterFormProps {
  subjectList?: SelectOption[]
  cityList?: SelectOption[]
  onFormSubmit?: (formValues: FormDataPayload) => void
}

const schema = yup.object({
  lastName: yup.string().required('Vui lòng nhập họ!'),
  firstName: yup.string().required('Vui lòng nhập tên!'),
  birthDay: yup.string().required('Vui lòng nhập ngày sinh'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
  phone: yup.string().required('Vui lòng nhập số điện thoại!'),

  domicile: yup.string().required('Vui lòng nhập ngày địa chỉ thường trú!'),
  currentAddress: yup.string().required('Vui lòng nhập ngày địa chỉ nơi ở hiện tại!'),
  idCard: yup.string().required('Vui lòng nhập CMND/CCCD!'),
  trainingSchoolName: yup.string().required('Vui lòng nhập trường đào tạo!'),
  majors: yup.string().required('Vui lòng nhập chuyên ngành!'),
  level: yup.string().required('Vui lòng nhập trình độ của bạn!'),

  password: yup.string().when('id', {
    is: (x: number) => !Boolean(x),
    then: yup.string().required('Vui lòng nhập mật khẩu.'),
  }),
  passwordConfirmation: yup.string().when('id', {
    is: (x: number) => !Boolean(x),
    then: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu.')
      .oneOf([yup.ref('password'), null], 'Nhập lại mật khẩu không trùng.'),
  }),

  subjects: yup.array().required('Vui lòng chọn các môn học!'),
  classLevels: yup.array().required('Vui lòng chọn trình độ giảng dạy!'),
})

export function RegisterForm({ cityList, subjectList, onFormSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [avatarFile, setAvatarFile] = useState<File>()
  const [certificationCardFile, setCertificationCardFile] = useState<File>()
  const [idCardFile, setIdCardFile] = useState<File>()

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDay: '',
      email: '',
      password: '',
      passwordConfirmation: '',

      phone: '',
      gender: 'MALE',

      domicile: '',
      voice: 'Miền Nam',
      teachingProvince: 'Thành phố Hồ Chí Minh',
      currentAddress: '',
      idCard: '',

      trainingSchoolName: '',
      majors: '',
      level: '',

      subjects: [] as number[],
      classLevels: [] as number[],
      uploadFile: [] as UploadFile[],
    },

    resolver: yupResolver(schema),
  })
  const invalid = !isDirty || !isValid || !avatarFile || !certificationCardFile || !idCardFile

  useEffect(() => {
    if (!invalid && idCardFile) {
      setValue('uploadFile', [
        {
          resourceType: 'CCCD',
          file: idCardFile,
        },
        {
          resourceType: 'DEGREE',
          file: certificationCardFile,
        },
        {
          resourceType: 'CARTPHOTO',
          file: avatarFile,
        },
      ])
    }
  }, [invalid, certificationCardFile, avatarFile, idCardFile])

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  function handleFormSubmit(formValues: FormDataPayload) {
    const formData: FormDataPayload = {
      ...formValues,
      birthDay: new Date(formValues.birthDay).toISOString(),
    }

    onFormSubmit?.(formData)
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <InputField control={control} name="lastName" label="Họ" />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <InputField control={control} name="firstName" label="Tên" />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <DateTimePickerField control={control} name="birthDay" label="Ngày sinh" />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <SelectField control={control} name="gender" label="Giới tính" optionList={genderList} />
        </Box>
      </Stack>

      <InputField control={control} name="email" label="Email" type="email" />

      <InputField
        control={control}
        type={showPassword ? 'text' : 'password'}
        name="password"
        label="Mật khẩu"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <InputField
        control={control}
        type={showPassword ? 'text' : 'password'}
        name="passwordConfirmation"
        label="Nhập lại mật khẩu"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormHelperText>{helperText}</FormHelperText>

      <InputField control={control} name="phone" label="Số điện thoại" />
      <InputField control={control} name="domicile" label="Địa chỉ thường trú" />
      <InputField control={control} name="currentAddress" label="Nơi ở hiện nay" />
      <InputField control={control} name="idCard" label="CMND / CCCD" />

      <InputField control={control} name="level" label="Trình độ" />
      <InputField control={control} name="majors" label="Chuyên ngành" />
      <InputField control={control} name="trainingSchoolName" label="Trường đào tạo" />

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <SelectField
            control={control}
            name="teachingProvince"
            label="Tỉnh/TP giảng dạy"
            optionList={cityList}
          />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <SelectField control={control} name="voice" label="Giọng nói" optionList={voiceList} />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <CheckboxField
            control={control}
            name="subjects"
            label="Môn học"
            optionList={subjectList || []}
          />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <CheckboxField
            control={control}
            name="classLevels"
            label="Lớp"
            optionList={classLevelList}
          />
        </Box>
      </Stack>

      <Stack direction="row" flexWrap="wrap" alignItems="flex-start" sx={{ mx: -1 }}>
        <Box sx={{ width: { xs: '100%', sm: 1 / 3, md: 1 / 3 } }}>
          <Box sx={{ p: 1 }}>
            <UploadCardImage
              width={'100%'}
              height={200}
              name="id-card"
              label="Ảnh CMND/CCCD"
              onChange={(file) => {
                // onUploadIdCard?.(file)
                setIdCardFile(file)
              }}
            />

            {!idCardFile && <FormHelperText error={!idCardFile}>{idCardHelperText}</FormHelperText>}
          </Box>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 1 / 3, md: 1 / 3 } }}>
          <Box sx={{ p: 1 }}>
            <UploadCardImage
              width={'100%'}
              height={200}
              name="certification"
              label="Ảnh chứng nhận/ bằng tốt nghiệp"
              onChange={(file) => {
                setCertificationCardFile(file)
              }}
            />
            {!certificationCardFile && (
              <FormHelperText error={!certificationCardFile}>
                {certificationCardHelperText}
              </FormHelperText>
            )}
          </Box>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 1 / 3, md: 1 / 3 } }}>
          <Box sx={{ p: 1 }}>
            <UploadCardImage
              width={'100%'}
              height={200}
              name="avatar"
              label="Ảnh đại diện"
              onChange={(file) => {
                // onUploadAvatar?.(file)
                setAvatarFile(file)
              }}
            />
            {!avatarFile && <FormHelperText error={!avatarFile}>{avatarHelperText}</FormHelperText>}
          </Box>
        </Box>
      </Stack>

      <Button type="submit" variant="contained">
        Đăng ký
      </Button>
    </Stack>
  )
}
