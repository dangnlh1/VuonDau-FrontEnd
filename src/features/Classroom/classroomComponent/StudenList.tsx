import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import { ClassPayload } from '@/models/class'
import { Pagination } from '@/models/common'
import { StudentPayload } from '@/models/student'
import { dateFormatting } from '@/utils/dateFormating'
import { Delete, Edit } from '@mui/icons-material'
import { Avatar, IconButton, Stack } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'

export interface StudentListProps {
  studentList?: StudentPayload[]
  pagination?: Pagination
  isLoading?: boolean
  onEditClick?: (params: StudentPayload) => void
  onRemoveClick?: (id: number) => void
  onRowClick?: (row: any) => void
}

export function StudentList({
  studentList,
  pagination,
  isLoading,
  onEditClick,
  onRemoveClick,
  onRowClick,
}: StudentListProps) {
  const data = studentList?.map((item, idx) => ({
    ...item,
    idx: idx,
  }))

  const columns: GridColDef<StudentPayload>[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 50,
      align: 'center',
      renderCell: ({ row }) => {
        return <Avatar alt="avatar" src={row.avatar} />
      },
    },
    {
      field: 'idx',
      headerName: 'STT',
      width: 50,
      align: 'center',
    },
    {
      field: 'fullname',
      headerName: 'Tên và tên',
      flex: 1,
      minWidth: 200,
      valueGetter: ({ row }) => {
        return `${row.lastName} ${row.firstName} `
      },
    },
    {
      field: 'birthday',
      headerName: 'Ngày sinh',
      flex: 1,
      minWidth: 100,
      valueGetter: ({ row }) => {
        return `${dateFormatting(row.birthday)}`
      },
    },

    {
      field: 'id',
      headerName: 'Số báo danh',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone',
      flex: 1,
      minWidth: 300,
    },

    {
      field: 'actions',
      type: 'actions',
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onEditClick?.(row)}>
            <Edit />
          </IconButton>

          <IconButton onClick={() => onRemoveClick?.(row.id)}>
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ]

  return (
    <DataGrid
      components={{
        LoadingOverlay: DataGridLoadingOverlay,
      }}
      loading={isLoading}
      rows={data || []}
      columns={columns}
      pagination
      paginationMode="server"
      rowCount={pagination?.total || 10}
      pageSize={pagination?.size || 10}
      page={(pagination?.page || 1) - 1}
      // onPageChange={onPageChange}
      onRowClick={onRowClick}
      disableColumnMenu
      autoHeight
    />
  )
}
