import { InputField } from '@/components/FormFields/InputField'
import { SelectField } from '@/components/FormFields/SelectField'
import { DayOfWeek } from '@/models/dayOfWeek'
import { Slot } from '@/models/slot'
import { CreateTimeTablePayload, SlotDow } from '@/models/timetables'
import { Box, Button, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateSlotDow } from './CreateSlotDow'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface CreateTimeTableData extends CreateTimeTablePayload {
  numberSlot?: string | number
}

const numberSlotOptionList = [
  {
    label: '2 ngày/tuần',
    value: 2,
  },
  {
    label: '3 ngày/tuần',
    value: 3,
  },
]

const schema = yup.object({
  archetypeName: yup.string().required('Vui lòng chọn môn học!'),
  archetypeCode: yup.string().required('Vui lòng chọn khóa học!'),
  numberSlot: yup.string().required('Vui lòng chọn khóa học!'),
})

export interface CreateTimeTableFormProps {
  slotList?: Slot[]
  dayList?: DayOfWeek[]
  onSubmit?: (formValues: CreateTimeTableData) => void
}

export function CreateTimeTableForm({ slotList, dayList, onSubmit }: CreateTimeTableFormProps) {
  const [slotInWeek, setSlotInWeek] = useState(2)

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      archetypeName: '',
      archetypeCode: '',
      numberSlot: slotInWeek,
      slotDow: [] as SlotDow[],
    },
    resolver: yupResolver(schema),
  })

  function handleSlotDowChange(slotDow: SlotDow[]) {
    setValue('slotDow', slotDow)
  }

  function handleNumberSlotChange(value: number) {
    setSlotInWeek(value)
  }

  function handleFormSubmit(formValue: CreateTimeTableData) {
    onSubmit?.(formValue)
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} spacing={2}>
      <Box>
        <InputField control={control} name="archetypeName" label="Tên thời khóa biểu" />
      </Box>

      <Box>
        <InputField control={control} name="archetypeCode" label="Mã" />
      </Box>

      <Box>
        <SelectField
          control={control}
          name="numberSlot"
          optionList={numberSlotOptionList}
          label="Số ngày trong tuần"
          onOptionChange={handleNumberSlotChange}
        />
      </Box>

      {slotInWeek && Array.isArray(slotList) && Array.isArray(dayList) && (
        <Box>
          <CreateSlotDow
            slotInWeek={slotInWeek}
            slotList={slotList}
            dayList={dayList}
            onSlotDowChange={handleSlotDowChange}
          />
        </Box>
      )}

      <Button variant="contained" type="submit">
        Tạo thời khóa biểu
      </Button>
    </Stack>
  )
}
