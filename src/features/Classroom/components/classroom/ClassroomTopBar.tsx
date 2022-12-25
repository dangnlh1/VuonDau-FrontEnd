import { Action } from '@/models/common'
import { Button, Stack } from '@mui/material'

interface ClassroomTopBarProps {
  actions: Action[]
  id: string | undefined
  onActionClick: (item: Action) => void
}
const resourceValue = '/tai-nguyen'

export default function ClassroomTopBar({ actions, id, onActionClick }: ClassroomTopBarProps) {
  if (!id) return null

  function handleActionClick(item: Action) {
    onActionClick(item)
  }

  return (
    <Stack direction={'row'} justifyContent="flex-end" spacing={1}>
      {actions.map((item: Action, index: number) => {
        const isSelected =
          location.pathname === `/hoc-sinh/lop-hoc/${id}` + item.value ||
          (location.pathname === `/hoc-sinh/lop-hoc/${id}` && item.value === resourceValue)
        return (
          <Button
            key={index}
            onClick={() => handleActionClick(item)}
            variant={isSelected ? 'outlined' : 'contained'}
          >
            {item.label}
          </Button>
        )
      })}
    </Stack>
  )
}
