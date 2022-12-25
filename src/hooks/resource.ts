import { classApi } from '@/api/classApi'
import { useQuery } from 'react-query'

export function useResource(id: string) {
  const queryKey = ['/resource', id]
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassResource(id))

  return {
    isLoading,
    error,
    resource: data?.resources,
  }
}
