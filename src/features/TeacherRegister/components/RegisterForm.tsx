import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { cityList, genderList, voiceList } from '@/constants/info'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import { dateFormatting } from '@/utils/dateFormating'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormHelperText, IconButton, InputAdornment, Stack } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const helperText = 'Lưu ý: Sử dụng email và mật khẩu này để đăng nhập!.'
export interface RegisterFormProps {
  onFormSubmit?: (formValues: TeacherRegisterPayload) => void
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
})

export function RegisterForm({ onFormSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDay: '',
      email: '',
      phone: '',
      gender: 'MALE',
      domicile: '',
      voice: 'mien-nam',
      teachingProvince: 'ho-chi-minh',
      currentAddress: '',
      idCard: '',
      trainingSchoolName: '',
      majors: '',
      level: '',
      password: '',
      passwordConfirmation: '',
    },

    resolver: yupResolver(schema),
  })

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  function handleFormSubmit(formValues: TeacherRegisterPayload) {
    const data = {
      ...formValues,
      birthday: dateFormatting(formValues.birthDay as string),
    }
    console.log({ data })
    onFormSubmit?.(formValues)
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

      <FormHelperText sx={{ color: red[500] }}>{helperText}</FormHelperText>

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

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  )
}
