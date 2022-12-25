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

export interface SelectFieldProps {
  label?: string
  currentValue?: string | number
  optionList?: OptionPayload[]
  onChange?: (e: any) => void
  isError?: boolean
  errorMessage?: string
}

export function SelectCustom({
  label,
  isError,
  optionList,
  currentValue,
  errorMessage,
  onChange,
  ...otherSelectProps
}: SelectFieldProps & SelectProps) {
  return (
    <React.Fragment>
      <InputLabel sx={{ fontWeight: 900, fontSize: 14 }}>{label}</InputLabel>
      <FormControl fullWidth size="small" error={isError}>
        <Select value={currentValue || ''} onChange={onChange} {...otherSelectProps}>
          {optionList?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </React.Fragment>
  )
}
