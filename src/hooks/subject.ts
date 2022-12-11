import { subjectApi } from '@/api/subjectApi'
import { useQuery } from 'react-query'

export function useSubject() {
  const queryKey = ['/subjects']
  const { data, isLoading, error } = useQuery(queryKey, () => subjectApi.getAll())

  return {
    subjectList: data?.items,
    isLoading,
    error,
  }
}
