import { classApi } from '@/api/classApi'
import { useQuery } from 'react-query'

export function useAttendance(id: string) {
  const queryKey = ['/attendance', id]
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassAttendance(id))

  return {
    isLoading,
    error,
    data: data?.attendance,
  }
}
