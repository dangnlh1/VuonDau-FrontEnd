import { ClassPayload } from '@/models/class'
import { Stack } from '@mui/material'

export interface ClassListProps {
  classList?: ClassPayload[]
}

export function ClassList({ classList }: ClassListProps) {
  return <Stack></Stack>
}
