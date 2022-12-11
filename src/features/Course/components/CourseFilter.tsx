import { SearchField } from '@/components/FormFields/SearchField'
import { SortField } from '@/components/FormFields/SortField'
import { sortByDateList } from '@/constants/sort'
import { FilterParams } from '@/models/common'
import { Box, Stack } from '@mui/material'

export interface CourseFilterProps {
  params?: FilterParams
  onFilterChange?: (param: FilterParams) => void
}

export function CourseFilter({ params, onFilterChange }: CourseFilterProps) {
  function handleSearchChange(value?: string) {
    //
  }

  function handleSortChange(value?: string) {
    //
  }

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Box sx={{ with: { xs: '100%', sm: 300 } }}>
        <SearchField onSearchChange={handleSearchChange} />
      </Box>

      <Box sx={{ with: { xs: '100%', sm: 200, minWidth: 200 } }}>
        <SortField actionKey="Sort by" onChange={handleSortChange} optionList={sortByDateList} />
      </Box>
    </Stack>
  )
}
