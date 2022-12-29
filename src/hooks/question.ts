import { VoteCommentRequestPayload } from '@/models/comments'
import { questionApi } from '@/api/questionApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function useQuestion(id: string) {
  const queryKey = ['/question']
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery(queryKey, () => questionApi.get(id))

  const voteQuestion = useMutation(
    (payload: { data: VoteCommentRequestPayload }) => questionApi.voteQuestion(payload.data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )
  return {
    question: data,
    refetch,
    isLoading,
    error,
    voteQuestion,
  }
}
