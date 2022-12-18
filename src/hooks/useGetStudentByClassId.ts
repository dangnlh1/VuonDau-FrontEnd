import { classApi } from '@/api/classApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery } from 'react-query'

export function useGetStudentByClassId(params: FilterParams, classId: number) {
  const queryKey = 'getStudentByClassId'
  const { data, error, isLoading } = useQuery(queryKey, () =>
    classApi.useGetStudentByClassId(params, classId)
  )
  return {
    data: data?.items,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
    error,
    isLoading,
  }
}
