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
}

export function InputField({
  name,
  control,
  label,
  multiline = false,
  rows = 5,

  InputProps,
  InputLabelProps,
  inputProps,

  ...otherTextFieldProps
}: InputFieldProps & TextFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <Box>
      <InputLabel sx={{ fontWeight: 'bold', fontSize: 13 }}>{label}</InputLabel>
      <TextField
        fullWidth
        size="small"
        value={value || ''}
        onChange={onChange}
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
