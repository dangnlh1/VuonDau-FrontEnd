import { Pagination } from '../models/common';
import { FilterParams } from '@/models/common'
import { forumApi } from '@/api/forumApi'
import { useQuery } from 'react-query'

export default function useForums(params: FilterParams) {
  const queryKey = ['/forums']
  const { data, isLoading, error } = useQuery(queryKey, () => forumApi.getForums(params))

  return {
    isLoading,
    error,
    forumList: data?.items,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
  }
}
