import { bannerApi } from '@/api/bannerApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery, useQueryClient } from 'react-query'

export function useBanner(params?: FilterParams) {
  const queryKey = ['/banners']
  const { data, isLoading, error } = useQuery(queryKey, () => bannerApi.getAll(params))

  return {
    isLoading,
    error,
    bannerList: data?.items,
  }
}
