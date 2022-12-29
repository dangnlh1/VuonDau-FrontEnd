import { CommentRequestPayload, VoteCommentRequestPayload } from '@/models/comments'
import { useMutation, useQueryClient } from 'react-query'
import { commentApi } from '@/api/commentApi'

export function useComment() {
  const queryKey = ['/comments']
  const queryClient = useQueryClient()

  const createComment = useMutation(
    (payload: { data: CommentRequestPayload }) => commentApi.createComment(payload.data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )
  const voteComment = useMutation(
    (payload: { data: VoteCommentRequestPayload }) => commentApi.voteComment(payload.data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )
  const deleteComment = useMutation(
    (payload: { id: number }) => commentApi.deleteComment(payload.id),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )
  const editComment = useMutation(
    (payload: { id: number; data: CommentRequestPayload }) =>
      commentApi.editComment(payload.id),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  return {
    createComment,
    voteComment,
    deleteComment,
    editComment,
  }
}
