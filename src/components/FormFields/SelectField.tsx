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
      <FormControl fullWidth margin="normal" size="small" error={invalid}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value || ''}
          label={label}
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
