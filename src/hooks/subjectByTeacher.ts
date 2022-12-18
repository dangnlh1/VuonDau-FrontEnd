import { subjectApi } from '@/api/subjectApi'
import { useQuery } from 'react-query'

export function useSubjectByTeacher() {
  const queryKey = ['/subjectByTeacher']
  const { data, isLoading, error, refetch } = useQuery(queryKey, () => subjectApi.getAllByTeacher())
  return {
    subjectByTeacherList: data,
    isLoading,
    error,
    refetch,
  }
}
