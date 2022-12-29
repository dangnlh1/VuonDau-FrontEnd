import { Action } from '@/models/common'
import { Button, Stack } from '@mui/material'

interface ForumBarProps {
  actions: Action[]
  onActionClick: (item: Action) => void
}
const url = '/hoc-sinh/dien-dan'
const resourceValue = '/mon-hoc'

export default function ForumBar({ actions, onActionClick }: ForumBarProps) {
  function handleActionClick(item: Action) {
    onActionClick(item)
  }
  return (
    <Stack direction={'row'} justifyContent="flex-end" spacing={1}>
      {actions.map((item: Action, index: number) => {
        const isSelected =
          location.pathname.includes(item.value) ||
          (location.pathname === url && item.value === resourceValue)
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
