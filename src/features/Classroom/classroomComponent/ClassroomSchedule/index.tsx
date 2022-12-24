import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import ClassroomTimetable from '@/features/Classroom/classroomComponent/ClassroomTimetable'

export default function ClassroomSchedule() {
  const id = useParams().classId
  if (!id) return null

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'date',
      headerName: 'Ngày điểm danh',
      width: 500,
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
      <ClassroomTimetable id={id} />
    </Box>
  )
}
