import { SearchField } from '@/components/FormFields/SearchField'
import { SortField } from '@/components/FormFields/SortField'
import { ClassStatus } from '@/models/class'
import { FilterParams } from '@/models/common'
import { OptionPayload } from '@/models/option'
import { Box, Stack } from '@mui/material'

export interface ClassFilterProps {
  params?: FilterParams
  optionList?: OptionPayload[]
  onFilterChange?: (param: FilterParams) => void
}

export function ClassFilter({ params, optionList, onFilterChange }: ClassFilterProps) {
  function handleSearchChange(value: string) {
    onFilterChange?.({
      ...params,
      q: value,
    })
  }

  function handleSortChange(value?: string) {
    onFilterChange?.({
      ...params,
      status: value as ClassStatus,
    })
  }

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Box sx={{ with: { xs: '100%', sm: 300 }, mb: { xs: 2, md: 0 } }}>
        <SearchField onSearchChange={handleSearchChange} />
      </Box>

      <Box sx={{ with: { xs: '100%', sm: 250, minWidth: 250 } }}>
        <SortField onChange={handleSortChange} optionList={optionList} />
      </Box>
    </Stack>
  )
}
