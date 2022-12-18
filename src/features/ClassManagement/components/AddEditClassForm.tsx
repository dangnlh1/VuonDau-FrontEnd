import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { AddEditClassFormPayload } from '@/models/class'
import { CoursePayload } from '@/models/course'
import { OptionPayload } from '@/models/option'
import { Subject } from '@/models/subject'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const classTypeOptionList: OptionPayload[] = [
  {
    label: 'ONE',
    value: 'ONE',
  },
  {
    label: 'MANY',
    value: 'MANY',
  },
]

const schema = yup.object({
  name: yup.string().required('Vui lòng tên lớp học!'),
  code: yup.number().min(0).required('Vui lòng nhập mã lớp học!'),
  classType: yup.string().required('Vui lòng chọn loại lớp học!'),

  minNumberStudent: yup.number().min(0).required('Vui lòng nhập số học sinh tối thiều!'),
  maxNumberStudent: yup.number().min(0).required('Vui lòng nhập số học sinh tối đa!'),
  subjectId: yup.number().min(0).required('Vui lòng chọn môn học!'),
  courseId: yup.number().required('Vui lòng chọn khóa học!'),
})

export interface CreateNewClassProps {
  classData?: AddEditClassFormPayload
  subjectList?: Subject[]
  courseList?: CoursePayload[]
  subjectId?: number
  courseId?: number

  onSubmit?: (formValue: AddEditClassFormPayload) => void
  onSubjectChange?: (value: number) => void
  onCancelClick?: () => void
  onCreateNewCourse?: () => void
}

export function AddEditClassForm({
  subjectList,
  courseList,
  subjectId,
  courseId,

  onSubmit,
  onCancelClick,
  onSubjectChange,
  onCreateNewCourse,
}: CreateNewClassProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      code: '',
      level: '',
      classType: '',
      minNumberStudent: 0,
      maxNumberStudent: 0,
      subjectId: subjectId || 0,
      courseId: courseId || 0,
    },

    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (courseId) {
      setValue('courseId', courseId)
    }
  }, [courseId])

  function handleFormSubmit(formValue: AddEditClassFormPayload) {
    onSubmit?.(formValue)
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate spacing={2}>
      <Box>
        <InputField name="name" control={control} label="Tên lớp" />
      </Box>

      <Box>
        <InputField name="code" control={control} label="Mã lớp học" />
      </Box>

      <Box>
        <SelectField
          name="classType"
          control={control}
          label="Loại lớp học"
          optionList={classTypeOptionList}
        />
      </Box>

      <Box>
        <InputField
          name="minNumberStudent"
          control={control}
          label="Số học sinh tối thiểu"
          type="number"
        />
      </Box>

      <Box>
        <InputField
          name="maxNumberStudent"
          control={control}
          label="Số học sinh tối đa"
          type="number"
        />
      </Box>

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

          <Box sx={{ pt: '18px' }} flexGrow={1}>
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              sx={{ height: 40 }}
              onClick={() => onCreateNewCourse?.()}
            >
              Tạo khóa học mới
            </Button>
          </Box>
        </Stack>
      )}

      <Divider />

      <Stack width="100%" spacing={1}>
        <Button fullWidth variant="contained" type="submit">
          Tạo lớp học
        </Button>

        <Button fullWidth variant="outlined" onClick={() => onCancelClick?.()}>
          Hủy
        </Button>
      </Stack>
    </Stack>
  )
}
