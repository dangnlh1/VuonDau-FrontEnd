import { Stack } from '@mui/material'
import React from 'react'
import { Resource } from '@/models/class'

interface Props {
  resources: Resource
}
export default function ClassroomResource(props: Props) {
  const { resources } = props
  return (
    <Stack
      style={{ marginTop: 5, marginBottom: 5, background: '#fff', borderRadius: 5, padding: 20 }}
    >
      Resource
    </Stack>
  )
}
