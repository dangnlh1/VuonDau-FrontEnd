import { classApi } from '@/api/classApi'
import { useQuery } from 'react-query'

export function useClassTeacher(id: string) {
  const queryKey = ['/teacher', id]
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassTeacher(id))

  return {
    isLoading,
    error,
    data,
  }
}
