import { SearchField } from '@/components/FormFields/SearchField'
import { Action } from '@/models/common'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FactCheckIcon from '@mui/icons-material/FactCheck'

const pageTitle = 'Quản lý lớp học'
const actionList: Action[] = [
  {
    label: 'Tạo lớp mới',
    value: 'create-new-class',
    icon: <AddIcon />,
    variant: 'contained',
  },

  {
    label: 'Tạo lớp cho khóa mới',
    value: 'create-new-class-for-new-course',
    icon: <AddIcon />,
    variant: 'contained',
  },

  {
    label: 'Tạo lớp mới',
    value: 'attendance',
    icon: <FactCheckIcon />,
    variant: 'outlined',
  },
]

export interface ClassManagementProps {}

export default function ClassList() {
  return (
    <Stack spacing={3}>
      <Typography variant="h3">{pageTitle}</Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <SearchField />
        </Box>

        <Stack direction="row" spacing={1}>
          {actionList.map((item, idx) => (
            <Button variant={item.variant} key={idx} startIcon={item.icon}>
              {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
