import { subjectApi } from '@/api/subjectApi'
import { forumApi } from '@/api/forumApi'
import { useQuery } from 'react-query'

export default function useSubjectForum(id: string) {
  const queryKey = ['/forum']
  const { data, isLoading, error } = useQuery(queryKey, () => subjectApi.getForum(id))

  return {
    isLoading,
    error,
    data,
  }
}
