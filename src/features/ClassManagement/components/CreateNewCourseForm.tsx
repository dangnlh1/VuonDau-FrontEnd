import { InputField } from '@/components/FormFields/InputField'
import { CreateNewCourseFormPayload } from '@/models/course'
import { Box, Button, Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

export interface CreateNewCourseProps {
  subjectId: number
  onCancelClick?: () => void
  onSubmit?: (formValues: CreateNewCourseFormPayload) => void
}

const schema = yup.object({
  name: yup.string().required('Vui lòng tên khóa học!'),
  title: yup.string().required('Vui lòng tiêu đề khóa học!'),
  code: yup.number().min(0).required('Vui lòng nhập mã khóa học!'),
})

export function CreateNewCourseForm({ subjectId, onSubmit, onCancelClick }: CreateNewCourseProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      title: '',
      description: '',
      code: '',
      subjectId: subjectId,
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('subjectId', subjectId)
  }, [subjectId])

  function handleFormSubmit(formValues: CreateNewCourseFormPayload) {
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

      <Stack width="100%" spacing={1}>
        <Button fullWidth variant="contained" type="submit">
          Tạo khóa học
        </Button>

        <Button fullWidth variant="outlined" onClick={() => onCancelClick?.()}>
          Hủy
        </Button>
      </Stack>
    </Stack>
  )
}
