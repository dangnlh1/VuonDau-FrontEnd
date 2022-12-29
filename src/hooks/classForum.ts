import { classApi } from '@/api/classApi'
import { FilterParams } from '@/models/common'
import { forumApi } from '@/api/forumApi'
import { useQuery } from 'react-query'

export default function useClassForum(classId: string) {
  const queryKey = ['/classForum']
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassForum(classId))

  return {
    isLoading,
    error,
    data,
  }
}
