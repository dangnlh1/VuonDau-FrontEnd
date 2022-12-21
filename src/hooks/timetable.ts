import { classApi } from '@/api/classApi'
import { useQuery } from 'react-query'

export function useTimetable(id: string) {
  const queryKey = ['/timetable', id]
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassTimetable(id))

  return {
    isLoading,
    error,
    data,
  }
}
