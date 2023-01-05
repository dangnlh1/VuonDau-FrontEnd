import { Box, FormControl, InputLabel, TextField, TextFieldProps } from '@mui/material'
import { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  label?: string
  InputProps?: any
  multiline?: boolean
  rows?: number
  maxRows?: number
  onChange?: (value: any) => void
}

export function InputField({
  name,
  control,
  label,
  multiline = false,
  rows = 5,

  InputProps,
  InputLabelProps,
  onChange,
  inputProps,

  ...otherTextFieldProps
}: InputFieldProps & TextFieldProps) {
  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  function handleChange(e: any) {
    controllerOnChange(e)
    onChange?.(e.target.value)
  }

  return (
    <Box>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>
      <TextField
        fullWidth
        size="small"
        value={value || ''}
        onChange={handleChange}
        onBlur={onBlur}
        inputRef={ref}
        variant="outlined"
        error={invalid}
        multiline={multiline}
        rows={rows}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        helperText={error?.message}
        inputProps={inputProps}
        {...otherTextFieldProps}
      />
    </Box>
  )
}
