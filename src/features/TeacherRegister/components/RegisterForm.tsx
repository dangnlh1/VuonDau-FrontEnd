import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { dateFormatting } from '@/utils/dateFormating'
import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface FormValues {
  full_name?: string
  birthday?: string
  email?: string
  phone?: string
}

export interface RegisterFormProps {}

const schema = yup.object({
  city: yup.string().required('Vui lòng nhập họ và tên!'),
  full_name: yup.string().required('Vui lòng nhập họ và tên!'),
  birthday: yup.string().required('Vui lòng nhập ngày sinh'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
  phone: yup.string().required('Vui lòng nhập số điện thoại!'),
})

export function RegisterForm({}: RegisterFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      city: '',
      full_name: '',
      birthday: '',
      email: '',
      phone: '',
    },

    resolver: yupResolver(schema),
  })

  function handleFormSubmit(formValues: FormValues) {
    const data = {
      ...formValues,
      birthday: dateFormatting(formValues.birthday as string),
    }
    console.log({ data })
    //
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <InputField control={control} name="city" label="Thành phố" />
      <InputField control={control} name="full_name" label="Họ & tên" />
      <DateTimePickerField control={control} name="birthday" label="Ngày sinh" />
      <InputField control={control} name="email" label="Email" type="email" />
      <InputField control={control} name="phone" label="Số điện thoại" type="phone" />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  )
}
