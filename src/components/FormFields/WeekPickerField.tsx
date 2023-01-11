import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DatePicker } from '@mui/x-date-pickers'
import { checkDayInWeek } from '@/utils/dateFormatting'
import { InputLabel } from '@mui/material'

dayjs.extend(isBetweenPlugin)

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean
  isFirstDay: boolean
  isLastDay: boolean
}

const CustomPickerDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>

interface WeekPickerFieldProps {
  label: string
  value: Dayjs
  onChangeDate: (date: Dayjs | null) => void
}

export default function WeekPickerField({ label, onChangeDate, value }: WeekPickerFieldProps) {
  const renderWeekPickerDay = (
    date: Dayjs,
    selectedDates: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />
    }

    const { dayIsBetween, isFirstDay, isLastDay } = checkDayInWeek(value, date)

    return (
      <CustomPickerDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>
      <DatePicker
        value={value}
        onChange={onChangeDate}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField size="small" sx={{ width: '300px' }} {...params} />}
        inputFormat="Tuần của ngày DD/MM/YYYY"
      />
    </LocalizationProvider>
  )
}
