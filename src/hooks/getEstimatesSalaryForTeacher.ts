import { revenueApi } from '@/api/revenueApi'
import { EstimatesSalaryForTeacherParams } from '@/models/revenues'
import { useQuery } from 'react-query'

export function useGetEstimatesSalaryForTeacher(params: EstimatesSalaryForTeacherParams) {
  const queryKey = ['getEstimatesSalaryForTeacher']

  const { data, error, isLoading, refetch } = useQuery(queryKey, () =>
    revenueApi.getEstimatesSalaryForTeacher(params)
  )

  return {
    data: data && data?.length > 0 ? data[0] : null,
    error,
    isLoading,
    refetch,
  }
}
