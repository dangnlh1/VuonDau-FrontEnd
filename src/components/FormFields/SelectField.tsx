import { OptionPayload } from '@/models/option'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'
import React from 'react'
import { Control, useController } from 'react-hook-form'

export interface SelectFieldProps {
  name: string
  control: Control<any>
  label?: string
  optionList?: OptionPayload[]
  onOptionChange?: (value: any) => void
}

export function SelectField({
  name,
  control,
  label,
  optionList,
  onOptionChange,
  defaultValue,
  ...otherSelectProps
}: SelectFieldProps & SelectProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  function handleChange(e: any) {
    onChange(e)
    onOptionChange?.(e.target.value)
  }
  console.log('defaultValue', defaultValue)

  return (
    <React.Fragment>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>
      <FormControl fullWidth size="small" error={invalid}>
        <Select
          value={value || defaultValue}
          name={name}
          onChange={handleChange}
          onBlur={onBlur}
          inputRef={ref}
          {...otherSelectProps}
        >
          {optionList?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </React.Fragment>
  )
}
