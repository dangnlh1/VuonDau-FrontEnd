import { classApi } from '@/api/classApi'
import { revenueApi } from '@/api/revenueApi'
import { RevenueRequest } from '@/models/revenues'
import { useQuery } from 'react-query'

export function useRevenue(params: RevenueRequest) {
  const queryKey = ['/revenue']
  const { data, isLoading, error, refetch } = useQuery(queryKey, () =>
    revenueApi.searchTuitionFee(params)
  )

  return {
    isLoading,
    error,
    revenues: data,
    refetch,
  }
}
