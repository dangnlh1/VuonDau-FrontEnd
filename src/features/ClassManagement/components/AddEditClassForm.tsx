import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { classLevelOptionList } from '@/constants/info'
import { useGetEstimatesSalaryForTeacher } from '@/hooks/getEstimatesSalaryForTeacher'
import { AddEditClassFormPayload } from '@/models/class'
import { CoursePayload } from '@/models/course'
import { OptionPayload } from '@/models/option'
import { Subject } from '@/models/subject'
import { formatCurrency } from '@/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const classTypeOptionList: OptionPayload[] = [
  {
    label: 'Dạy 1 & 1',
    value: 'ONE',
  },
  {
    label: 'Dạy nhiều học sinh',
    value: 'MANY',
  },
]

const schema = yup.object({
  name: yup.string().required('Vui lòng tên lớp học!'),
  code: yup.string().required('Vui lòng nhập mã lớp học!'),
  classLevel: yup.string().required('Vui lòng chọn lớp'),
  classType: yup.string().required('Vui lòng chọn loại lớp học!'),
  startDate: yup.string().required('Vui lòng chọn ngày bắt đầu!'),
  endDate: yup.string().required('Vui lòng chọn ngày kết thúc!'),

  minNumberStudent: yup.number().min(1).required('Vui lòng nhập số học sinh tối thiều!'),
  maxNumberStudent: yup.number().min(1).required('Vui lòng nhập số học sinh tối đa!'),
})

export interface CreateNewClassProps {
  courseList?: CoursePayload[]
  subjectList?: Subject[]
  onSubmit?: (formValue: AddEditClassFormPayload) => void
  onSubjectChange?: (value: number) => void
}

interface FormData extends AddEditClassFormPayload {
  subjectId: string
}

export function AddEditClassForm({
  subjectList,
  courseList,
  onSubmit,
  onSubjectChange,
}: CreateNewClassProps) {
  const [isClassTypeDisable, setIsClassTypeDisable] = useState(false)
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [maxNumberStudent, setMaxNumberStudent] = useState(0)
  const [getEstimatesSalaryForTeacherParams, setGetEstimatesSalaryForTeacherParams] = useState({
    priceEachStudent: 0,
    numberStudent: 0,
    numberMonth: 0,
  })

  const { data, refetch } = useGetEstimatesSalaryForTeacher(getEstimatesSalaryForTeacherParams)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      name: '',
      code: '',
      startDate: '',
      endDate: '',
      classLevel: '',
      classType: '',
      minNumberStudent: 0,
      maxNumberStudent: 0,
      courseId: '',
      subjectId: '',
      eachStudentPayPrice: 0,
    },

    resolver: yupResolver(schema),
  })

  const howManyMonth = Math.ceil((endDate - startDate) / (60 * 60 * 24 * 1000) / 30)

  useEffect(() => {
    setGetEstimatesSalaryForTeacherParams({
      priceEachStudent: unitPrice,
      numberStudent: maxNumberStudent,
      numberMonth: howManyMonth,
    })

    refetch()
  }, [unitPrice, howManyMonth, maxNumberStudent])

  function handleFormSubmit(formValues: FormData) {
    const data: AddEditClassFormPayload = {
      name: formValues.name,
      code: formValues.code,
      startDate: new Date(formValues.startDate).toISOString(),
      endDate: new Date(formValues.endDate).toISOString(),

      classLevel: formValues.classLevel,
      classType: formValues.classType,

      minNumberStudent: formValues.minNumberStudent,
      maxNumberStudent: formValues.maxNumberStudent,
      courseId: formValues.courseId,
      eachStudentPayPrice: formValues.eachStudentPayPrice,
    }

    onSubmit?.(data)
  }

  function handleStartDateChange(date: any) {
    const timeTemple = new Date(date.$d).getTime()
    setStartDate(timeTemple)
  }

  function handleEndDateChange(date: any) {
    const timeTemple = new Date(date.$d).getTime()
    setEndDate(timeTemple)
  }

  function handleMaxNumberStudentChange(value: any) {
    setMaxNumberStudent(value)
  }

  function handleUnitPriceChange(value: any) {
    setUnitPrice(value)
  }

  function handleClassTypeChange(value: number | string) {
    if (value === 'ONE') {
      setValue('minNumberStudent', 1)
      setValue('maxNumberStudent', 1)
      setMaxNumberStudent(1)
      setIsClassTypeDisable(true)

      return
    }

    setIsClassTypeDisable(false)
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate spacing={2}>
      <Box>
        <InputField name="name" control={control} label="Tên lớp" />
      </Box>

      <Box>
        <InputField name="code" control={control} label="Mã lớp học" />
      </Box>

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <SelectField
            name="classLevel"
            control={control}
            label="Lớp"
            optionList={classLevelOptionList}
          />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <SelectField
            name="classType"
            control={control}
            label="Loại lớp học"
            optionList={classTypeOptionList}
            onOptionChange={handleClassTypeChange}
          />
        </Box>
      </Stack>

      <Box>
        <InputField
          name="minNumberStudent"
          control={control}
          label="Số học sinh tối thiểu"
          type="number"
          disabled={isClassTypeDisable}
        />
      </Box>

      <Box>
        <InputField
          name="maxNumberStudent"
          control={control}
          label="Số học sinh tối đa"
          type="number"
          disabled={isClassTypeDisable}
          onChange={handleMaxNumberStudentChange}
        />
      </Box>

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <DateTimePickerField
            control={control}
            name="startDate"
            label="Ngày bắt đầu"
            onChange={(date: any) => handleStartDateChange?.(date)}
          />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <DateTimePickerField
            control={control}
            name="endDate"
            label="Ngày kết thúc"
            onChange={(date: any) => handleEndDateChange?.(date)}
          />
        </Box>
      </Stack>

      <Box>
        <InputField
          name="eachStudentPayPrice"
          control={control}
          label="Giá tiền"
          type="number"
          onChange={handleUnitPriceChange}
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
          onOptionChange={(value) => onSubjectChange?.(value)}
        />
      </Box>

      {Array.isArray(courseList) && courseList.length > 0 && (
        <Box>
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

      <Box>
        <Typography variant="body1" fontStyle="italic">
          <b>Ước tính lương/tháng:</b>{' '}
          {formatCurrency(data?.estimatesSalaryOneMonthForTeacher || 0)}
        </Typography>

        <Typography variant="body1" fontStyle="italic">
          <b>Ước tính lương/{howManyMonth} tháng:</b>{' '}
          {formatCurrency(data?.estimatesSalaryManyMonthForTeacher || 0)}
        </Typography>
      </Box>

      <Divider />

      <Stack width="100%" spacing={1}>
        <Button fullWidth variant="contained" type="submit">
          Lưu lớp học và tiếp theo
        </Button>
      </Stack>
    </Stack>
  )
}
