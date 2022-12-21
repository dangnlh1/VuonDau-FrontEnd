import { FilterParams } from '@/models/common'
import { forumApi } from '@/api/forumApi'
import { useQuery } from 'react-query'

export default function useForum(params?: FilterParams) {
  const queryKey = ['/forums']
  const { data, isLoading, error } = useQuery(queryKey, () => forumApi.getAll(params))

  return {
    isLoading,
    error,
    forumList: data?.items,
  }
}
