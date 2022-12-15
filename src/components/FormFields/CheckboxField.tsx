import { SelectOption } from '@/models/option'
import { Box, FormHelperText, InputLabel } from '@mui/material'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import * as React from 'react'
import { Control, useController } from 'react-hook-form'

export interface CheckboxFieldProps extends CheckboxProps {
  name: string
  control: Control<any>
  label?: string
  optionList: SelectOption[]
  disabled?: boolean
}

export function CheckboxField({ name, control, label, optionList, ...props }: CheckboxFieldProps) {
  const {
    field: { onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })
  const [checkedList, setCheckedList] = React.useState<number[]>([])

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked

    optionList.map((item, idx) => {
      if (idx !== index) return

      if (checked) {
        setCheckedList((checkedList) => checkedList.concat(item.value as number))
        return
      }

      setCheckedList((checkedList) => checkedList.filter((checked) => checked !== item.value))
    })
  }

  React.useEffect(() => {
    onChange(checkedList)
  }, [checkedList])

  return (
    <Box>
      <InputLabel sx={{ fontWeight: 'bold', fontSize: 13 }}>{label}</InputLabel>

      {Array.isArray(optionList) &&
        optionList.length > 0 &&
        optionList.map((item, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                value={item.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e)}
              />
            }
            label={item.label}
          />
        ))}

      <FormHelperText error={invalid}>{error?.message}</FormHelperText>
    </Box>
  )
}
