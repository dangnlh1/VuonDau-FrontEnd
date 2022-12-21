import React from 'react'

import { useTimetable } from '@/hooks/timetable'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

interface Props {
  id: string | undefined
}
export default function ClassroomSchedule({ id }: Props) {
  if (!id) return null

  const { data } = useTimetable(id)
  const displayData = data || []
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'date',
      headerName: 'Ngày điểm danh',
      width: 150,
      editable: true,
    },
    {
      field: 'slotNumber',
      headerName: 'Thứ tự',
      width: 150,
      editable: true,
    },
  ]

  return (
    <Box sx={{ width: '100%' }} paddingTop={2}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Điểm danh
      </Typography>
      <DataGrid
        rows={displayData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}
