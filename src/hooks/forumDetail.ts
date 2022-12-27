import { FilterParams } from '@/models/common'
import { forumApi } from '@/api/forumApi'
import { useQuery } from 'react-query'

export default function useForumDetail(params: FilterParams) {
  const queryKey = ['/forums']
  const { data, isLoading, error } = useQuery(queryKey, () => forumApi.getAll(params))
  console.log('data', data);

  return {
    isLoading,
    error,
    forum: data?.items,
  }
}
