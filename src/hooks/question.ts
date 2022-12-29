import { CommentRequestPayload } from '@/models/comments'
import { questionApi } from '@/api/questionApi'
import { subjectApi } from '@/api/subjectApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { commentApi } from '@/api/commentApi'

export function useQuestion(id: string) {
  const queryKey = ['/question']
  const { data, isLoading, error } = useQuery(queryKey, () => questionApi.get(id))

  return {
    question: data,
    isLoading,
    error,
  }
}
