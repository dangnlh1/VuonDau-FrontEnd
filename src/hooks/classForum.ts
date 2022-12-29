import { classApi } from '@/api/classApi'
import { forumApi } from '@/api/forumApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export default function useClassForum(classId: string) {
  const queryKey = ['/classForum']
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getClassForum(classId))

  const syncLesson = useMutation(
    (payload: { id: number }) => forumApi.synchronizeLesson(payload.id),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  return {
    isLoading,
    error,
    data,
    syncLesson,
  }
}
