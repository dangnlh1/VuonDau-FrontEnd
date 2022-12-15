import { SelectOption } from '@/models/option'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

export interface SortProps {
  optionList?: SelectOption[]
  label?: string
  hideOptionAll?: boolean
  defaultValue?: string
  defaultLabel?: string
  actionKey?: string
  onChange?: (value?: string) => void
}

export function SortField({
  label,
  hideOptionAll,
  defaultValue = 'All',
  optionList,
  actionKey,
  onChange,
}: SortProps) {
  const [value, setValue] = useState(defaultValue)
  const [selectedLabel, setSelectedLabel] = useState(defaultValue)

  function handleChange(e: SelectChangeEvent) {
    const option = optionList?.find((item) => item.value === e.target.value)
    setValue(e.target.value)
    setSelectedLabel((option?.label as string) || defaultValue)

    const value = e.target.value === defaultValue ? '' : e.target.value
    onChange?.(value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        renderValue={() => (
          <Box component="span">
            {actionKey && actionKey + ': '} {selectedLabel}
          </Box>
        )}
      >
        {!hideOptionAll && <MenuItem value={defaultValue}>{defaultValue}</MenuItem>}
        {optionList?.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
