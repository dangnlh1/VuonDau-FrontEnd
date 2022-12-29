import { classApi } from '@/api/classApi'
import { ClassStatus } from '@/models/class'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery, useQueryClient } from 'react-query'

export function useClassesByStudent(status: ClassStatus, params: FilterParams) {
  const queryKey = ['/classesByTeacher', params]
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(queryKey, () =>
    classApi.getAllClassByTeacher(status, params)
  )

  return {
    isLoading,
    error,
    classByStudentList: data?.items,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
  }
}
