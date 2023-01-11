import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import debounce from 'lodash/debounce'
import React from 'react'

export interface SearchFieldProps {
  placeholder?: string
  onSearchChange?: (value: string) => void
}

export function SearchField({ placeholder = 'Tìm kiếm...', onSearchChange }: SearchFieldProps) {
  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value)
  }, 600)

  return (
    <TextField
      sx={{
        mr: 1,
        width: '100%',
        minWidth: '300px',
      }}
      size="small"
      placeholder={placeholder}
      onChange={handleSearchChange}
      InputProps={{
        'aria-label': 'search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
