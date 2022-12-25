import { InputField } from '@/components/FormFields/InputField'
import { CreateNewCoursePayload } from '@/models/course'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface CreateNewCourseFormProps {
  subjectId: number | string
  onClose?: () => void
  onSubmit?: (formValues: CreateNewCoursePayload) => void
}

const schema = yup.object({
  name: yup.string().required('Vui lòng tên khóa học!'),
  title: yup.string().required('Vui lòng tiêu đề khóa học!'),
  code: yup.number().min(0).required('Vui lòng nhập mã khóa học!'),
})

export function CreateNewCourseForm({ subjectId, onClose, onSubmit }: CreateNewCourseFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      title: '',
      description: '',
      code: '',
      subjectId: subjectId,
    },
    resolver: yupResolver(schema),
  })

  function handleFormSubmit(formValues: CreateNewCoursePayload) {
    onSubmit?.(formValues)
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} spacing={2}>
      <Box>
        <InputField name="name" control={control} label="Tên khóa học" />
      </Box>

      <Box>
        <InputField name="title" control={control} label="Tiêu đề khóa học" />
      </Box>

      <Box>
        <InputField name="code" control={control} label="Mã khóa học" />
      </Box>

      <Box>
        <InputField name="description" control={control} label="Nội dung" rows={5} multiline />
      </Box>

      <Divider />

      <Stack width="100%" spacing={2}>
        <Button fullWidth variant="contained" type="submit">
          Tạo khóa học mới
        </Button>

        <Button fullWidth variant="outlined" onClick={() => onClose?.()}>
          Hủy
        </Button>
      </Stack>
    </Stack>
  )
}
