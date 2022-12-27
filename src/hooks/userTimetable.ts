import { timeTableApi } from '@/api/timeTableApi'
import { classApi } from '@/api/classApi'
import { useQuery } from 'react-query'

export function useUserTimetable() {
  const queryKey = ['/userTimetable']
  const { data, isLoading, error } = useQuery(queryKey, () => timeTableApi.getUser())

  return {
    isLoading,
    error,
    data: data?.attendance,
  }
}
