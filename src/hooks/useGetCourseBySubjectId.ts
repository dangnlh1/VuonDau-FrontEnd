import { courseApi } from '@/api/courseApi'
import { useQuery } from 'react-query'

export function useGetCourseBySubjectId(subjectId: number) {
  const queryKey = ['/getCourseBySubjectId']
  const { data, isLoading, error, refetch } = useQuery(queryKey, () =>
    courseApi.getAllCourseBySubjectId(subjectId)
  )

  return {
    data: data?.items,
    isLoading,
    error,
    refetch,
  }
}
