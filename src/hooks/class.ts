import { classApi } from '@/api/classApi'
import { ClassPayload } from '@/models/class'
import { useQuery } from 'react-query'

export function useClass(id: number) {
  const queryKey = ['/class', id]
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.get(id))

  return {
    isLoading,
    error,
    data,
  }
}
