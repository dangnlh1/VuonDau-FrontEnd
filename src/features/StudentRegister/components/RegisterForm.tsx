import { CheckboxField } from '@/components/FormFields/CheckboxField'
import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { classLevelList, genderList } from '@/constants/info'
import { OptionPayload } from '@/models/option'
import { StudentRegisterData } from '@/models/studentRegister'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormHelperText, IconButton, InputAdornment, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const helperText = 'Lưu ý: Sử dụng email và mật khẩu này để đăng nhập!.'
const certificationCardHelperText = 'Upload bằng cấp là trường bắt buộc!'
const idCardHelperText = 'Upload CMND/CCCD là trường bắt buộc!'
const avatarHelperText = 'Upload ảnh đại diện là trường bắt buộc!'

export interface FormDataPayload extends StudentRegisterData {}
export interface RegisterFormProps {
  subjectList?: OptionPayload[]
  cityList?: OptionPayload[]
  onFormSubmit?: (formValues: FormDataPayload) => void
}

const schema = yup.object({
  lastName: yup.string().required('Vui lòng nhập họ!'),
  firstName: yup.string().required('Vui lòng nhập tên!'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
  phone: yup.string().required('Vui lòng nhập số điện thoại!'),

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
})

export function RegisterForm({ onFormSubmit, subjectList, cityList }: RegisterFormProps) {
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
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      birthDay: '',
      email: '',
      phone: '',
      gender: '',
      currentAddress: '',
      classLevel: 1,
      subjects: [],
      schoolName: '',
    },

    resolver: yupResolver(schema),
  })
  const invalid = !isDirty || !isValid || !avatarFile || !certificationCardFile || !idCardFile

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  function handleFormSubmit(formValues: FormDataPayload) {
    onFormSubmit?.(formValues)
  }

  function handleError(e: any) {
    toast.error(e.message)
  }

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit, handleError)}
      noValidate
    >
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
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 }}>
          <SelectField
            control={control}
            name="teachingProvince"
            label="Tỉnh/TP giảng dạy"
            optionList={cityList}
          />
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
      <Button type="submit" variant="contained">
        Đăng ký
      </Button>
    </Stack>
  )
}
