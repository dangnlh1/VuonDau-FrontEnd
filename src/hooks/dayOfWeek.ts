import { dayOfWeekApi } from '@/api/dayOfWeekApi'
import { useQuery } from 'react-query'

export function useDayOfWeek() {
  const queryKey = ['day-of-week']
  const { data, isLoading, error } = useQuery(queryKey, () => dayOfWeekApi.getAll())

  return {
    dayList: data,
    isLoading,
    error,
  }
}
