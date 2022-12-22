import { InputField } from '@/components/FormFields/InputField'
import { CoursePayload, CreateNewCourseFormPayload } from '@/models/course'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { SelectField } from '@/components/FormFields/SelectField'
import { Subject } from '@/models/subject'

export interface CreateNewCourseProps {
  subjectId?: number
  subjectList?: Subject[]
  courseList?: CoursePayload[]

  onCancelClick?: () => void
  onSubmit?: (formValues: CreateNewCourseFormPayload) => void
  onSubjectChange?: (value: number) => void
}

const schema = yup.object({
  name: yup.string().required('Vui lòng tên khóa học!'),
  title: yup.string().required('Vui lòng tiêu đề khóa học!'),
  code: yup.number().min(0).required('Vui lòng nhập mã khóa học!'),
})

export function CreateNewCourseForm({
  subjectId,
  subjectList,
  courseList,
  onSubmit,
  onCancelClick,
  onSubjectChange,
}: CreateNewCourseProps) {
  const [showCreateNewCourse, setShowCreateNewCourse] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      title: '',
      description: '',
      code: '',
      subjectId: subjectId || '',
    },
    resolver: yupResolver(schema),
  })

  function handleFormSubmit(formValues: CreateNewCourseFormPayload) {
    onSubmit?.(formValues)
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} spacing={2}>
      <Box>
        <SelectField
          name="subjectId"
          control={control}
          label="Môn học"
          optionList={
            (Array.isArray(subjectList) &&
              subjectList.map((item) => ({
                label: item.name,
                value: item.id,
              }))) ||
            []
          }
          onOptionChange={(value: number) => onSubjectChange?.(value)}
        />
      </Box>

      {subjectId && (
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {Array.isArray(courseList) && courseList.length > 0 && (
            <Box width="50%">
              <SelectField
                fullWidth
                name="courseId"
                control={control}
                label="Khóa học"
                optionList={courseList.map((item) => ({
                  label: item.name as string,
                  value: item.id as number,
                }))}
              />
            </Box>
          )}
        </Stack>
      )}

      <Divider />

      <Typography variant="h6">Tạo khóa học mới</Typography>

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
      </Stack>
    </Stack>
  )
}
