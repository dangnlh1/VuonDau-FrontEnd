import { bannerApi } from '@/api/bannerApi'
import { FilterParams, Pagination } from '@/models/common'
import { useQuery, useQueryClient } from 'react-query'

export function useBanner() {
  const queryKey = ['/banners']
  const { data, isLoading, error } = useQuery(queryKey, () => bannerApi.getAll())

  return {
    isLoading,
    error,
    bannerList: data,
  }
}
