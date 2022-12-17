import { accountApi } from '@/api/accountApi'
import { useQuery } from 'react-query'

export function useGetAccountDetailAfterLogin() {
  const queryKey = ['/account-detail-after-login']
  const { data, isLoading, error, refetch } = useQuery(queryKey, () =>
    accountApi.getAccountDetailAfterLogin()
  )

  return {
    isLoading,
    error,
    data,
    refetch,
  }
}
