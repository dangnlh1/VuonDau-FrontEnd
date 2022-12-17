import { DataGridLoadingOverlay } from '@/components/common/DataGridLoadingOverlay'
import { ClassPayload } from '@/models/class'
import { Pagination } from '@/models/common'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export interface ClassListProps {
  classList?: ClassPayload[]
  pagination?: Pagination
  isLoading?: boolean
  onPageChange?: (page: number) => void
  onRowClick?: (row: any) => void
}

export function ClassList({
  classList,
  pagination,
  isLoading,
  onRowClick,
  onPageChange,
}: ClassListProps) {
  const columns: GridColDef<ClassPayload>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Lớp',
      flex: 1,
    },
    {
      field: 'numberStudent',
      headerName: 'Sĩ số lớp',
      flex: 1,
    },
    {
      field: '',
      headerName: 'Năm học',
      flex: 1,
      valueGetter: ({ row }) => {
        const startYear = new Date(row.startDate).getFullYear()
        const endYear = new Date(row.endDate).getFullYear()

        return `${startYear} - ${endYear}`
      },
    },
  ]

  return (
    <DataGrid
      components={{
        LoadingOverlay: DataGridLoadingOverlay,
      }}
      loading={isLoading}
      rows={classList || []}
      columns={columns}
      pagination
      paginationMode="server"
      rowCount={pagination?.total || 10}
      pageSize={pagination?.size || 10}
      page={(pagination?.page || 1) - 1}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      disableColumnMenu
      autoHeight
    />
  )
}
