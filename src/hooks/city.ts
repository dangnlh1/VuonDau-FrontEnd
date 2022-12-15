import { accountDetailApi } from '@/api/accountDetailApi'
import { useQuery } from 'react-query'

export function useCity() {
  const queryKey = ['/city']
  const { data, isLoading, error } = useQuery(queryKey, () => accountDetailApi.getCityAll())

  return {
    isLoading,
    error,
    cityList: data,
  }
}
