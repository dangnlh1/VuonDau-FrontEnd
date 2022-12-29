import { classApi } from '@/api/classApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery } from 'react-query'

export function useGetClassByAccount(params: FilterParams) {
  const queryKey = ['/getClassByAccount', params]

  const { data, error, isLoading } = useQuery(queryKey, () => classApi.getAllClassByAccount(params))

  return {
    classByAccountList: data?.items,
    pagination: {
      page: data?.currentPage,
      limit: data?.pageSize,
      totalPage: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
    error,
    isLoading,
  }
}
