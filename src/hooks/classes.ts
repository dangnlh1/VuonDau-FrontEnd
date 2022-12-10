import { classApi } from '@/api/classApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery, useQueryClient } from 'react-query'

export function useClasses(params: FilterParams) {
  const queryKey = ['/classes', params]
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getAll(params))

  return {
    isLoading,
    error,
    classList: data?.items,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
  }
}
