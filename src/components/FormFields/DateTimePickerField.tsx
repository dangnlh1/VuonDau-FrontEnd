import { Box, InputLabel, TextField } from '@mui/material'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { Control, useController } from 'react-hook-form'

export interface DateTimePickerFieldProps {
  name: string
  control: Control<any>
  label?: string
  withTime?: boolean
  onChange?: (date: string) => void
}

export function DateTimePickerField({
  name,
  control,
  label,
  withTime = false,
  onChange,
}: DateTimePickerFieldProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  const Component = withTime ? DateTimePicker : DatePicker
  const format = withTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'

  return (
    <Box>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>
      <Component
        value={value}
        onChange={(date) => {
          onChange?.(date)
          controllerOnChange(date)
        }}
        inputFormat={format}
        renderInput={(params: any) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            onBlur={onBlur}
            error={invalid}
            helperText={error?.message}
          />
        )}
      />
    </Box>
  )
}
