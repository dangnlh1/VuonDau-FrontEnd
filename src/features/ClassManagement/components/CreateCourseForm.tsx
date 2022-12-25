import { SelectField } from '@/components/FormFields/SelectField'
import { CoursePayload, CreateCoursePayload } from '@/models/course'
import { Subject } from '@/models/subject'
import { Box, Button, Divider, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface CreateCourseProps {
  subjectId?: number
  courseId?: number
  subjectList?: Subject[]
  courseList?: CoursePayload[]

  onSubmit?: (formValues: CreateCoursePayload) => void
  onSubjectChange?: (value: number) => void
  onCreateNewCourse?: () => void
}

const schema = yup.object({
  subjectId: yup.string().required('Vui lòng chọn môn học!'),
  courseId: yup.string().required('Vui lòng chọn khóa học!'),
})

export function CreateCourseForm({
  subjectId,
  courseId,
  subjectList,
  courseList,
  onSubmit,
  onSubjectChange,
  onCreateNewCourse,
}: CreateCourseProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      subjectId: subjectId || '',
      courseId: courseId || '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (courseId) {
      setValue('courseId', courseId)
    }
  }, [courseId])

  function handleFormSubmit(formValues: CreateCoursePayload) {
    onSubmit?.({
      courseId: parseInt(formValues.courseId as string),
      subjectId: parseInt(formValues.subjectId as string),
    })
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
        <Box flexGrow={1}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {Array.isArray(courseList) && courseList.length > 0 && (
              <Box width={{ xs: '100%', md: '70%' }}>
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

            <Box
              width={{ xs: '100%', md: courseList && courseList?.length > 0 ? '30%' : '100%' }}
              paddingTop="20px"
            >
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 40 }}
                onClick={() => onCreateNewCourse?.()}
              >
                Tạo khóa học mới
              </Button>
            </Box>
          </Stack>
        </Box>
      )}

      <Divider />

      <Stack width="100%" spacing={1}>
        <Button fullWidth variant="contained" type="submit">
          Lưu khóa học và tiếp theo
        </Button>
      </Stack>
    </Stack>
  )
}
