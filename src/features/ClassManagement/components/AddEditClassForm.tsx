import { DateTimePickerField } from '@/components/FormFields/DateTimePickerField'
import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { classLevelOptionList } from '@/constants/info'
import { AddEditClassFormPayload } from '@/models/class'
import { OptionPayload } from '@/models/option'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Divider, Stack } from '@mui/material'
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
  classData?: AddEditClassFormPayload

  onSubmit?: (formValue: AddEditClassFormPayload) => void
  onSubjectChange?: (value: number) => void
  onCancelClick?: () => void
  onCreateNewCourse?: () => void
}

export function AddEditClassForm({ onSubmit, onCancelClick }: CreateNewClassProps) {
  const {
    control,
    handleSubmit,
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
      unitPrice: 0,
    },

    resolver: yupResolver(schema),
  })

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
          />
        </Box>
      </Stack>

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

      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box sx={{ width: 1 / 2 }}>
          <DateTimePickerField control={control} name="startDate" label="Ngày bắt đầu" />
        </Box>

        <Box sx={{ width: 1 / 2 }}>
          <DateTimePickerField control={control} name="endDate" label="Ngày kết thúc" />
        </Box>
      </Stack>

      <Box>
        <InputField name="unitPrice" control={control} label="Giá tiền" type="number" />
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
