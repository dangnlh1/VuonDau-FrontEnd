import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { dateFormatting } from '@/utils/dateFormating'
import { Box, Button } from '@mui/material'
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
  full_name: yup.string().required('Vui lòng nhập họ và tên!'),
  birthday: yup.string().required('Vui lòng nhập ngày sinh'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email!'),
  phone: yup.string().required('Vui lòng nhập số điện thoại!'),
})

export function RegisterForm({}: RegisterFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
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
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <InputField control={control} name="full_name" label="Họ & tên" />
      <DateTimePickerField control={control} name="birthday" label="Ngày sinh" />
      <InputField control={control} name="email" label="Email" type="email" />
      <InputField control={control} name="phone" label="Số điện thoại" type="phone" />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  )
}
