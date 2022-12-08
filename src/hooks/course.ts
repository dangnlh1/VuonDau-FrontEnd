import { courseApi } from '@/api/courseApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery, useQueryClient } from 'react-query'

export function useCourse(params: FilterParams) {
  const queryKey = ['/course', params]
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(queryKey, () => courseApi.getAll(params))

  return {
    isLoading,
    error,
    courseList: data?.data?.items,
    pagination: {
      page: data?.data?.currentPage,
      size: data?.data?.pageSize,
      totalPages: data?.data?.totalPages,
      total: data?.data?.totalItems,
    } as Pagination,
  }
}
