import { SelectOption } from '@/models/option'
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
  optionList?: SelectOption[]
}

export function SelectField({
  name,
  control,
  label,
  optionList,
  ...otherSelectProps
}: SelectFieldProps & SelectProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <React.Fragment>
      <InputLabel sx={{ fontWeight: 'bold', fontSize: 13 }}>{label}</InputLabel>
      <FormControl fullWidth size="small" error={invalid}>
        <Select
          value={value || ''}
          name={name}
          onChange={onChange}
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
