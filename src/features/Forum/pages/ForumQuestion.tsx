import Question from '@/features/Forum/components/Question'
import { useComment } from '@/hooks/comment'
import { useQuestion } from '@/hooks/question'
import { CommentRequestPayload, VoteCommentRequestPayload } from '@/models/comments'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const pageTitle = 'Câu hỏi'

export default function ForumQuestion() {
  const [open, setOpen] = useState(false)

  const { questionId } = useParams()

  const { question } = useQuestion(questionId + '')
  const { createComment, voteComment } = useComment()

  console.log(question)

  if (!question) return null

  async function handleAnswerQuestion(content: string, parentCommentId?: number) {
    try {
      if (questionId) {
        const data: CommentRequestPayload = {
          content,
          questionId: parseInt(questionId),
        }
        if (parentCommentId) data.parentCommentId = parentCommentId
        await createComment.mutateAsync({ data })
        toast.success('Thêm câu trả lời thành công.')
      }
    } catch (error: any) {
      toast.error('Không thể trả lời câu hỏi.', error.message)
    }
  }
  async function handleVoteQuestion(vote: boolean, commentId?: number) {
    try {
      if (questionId) {
        const data: VoteCommentRequestPayload = {
          vote,
          questionId: parseInt(questionId),
        }
        if (commentId) data.commentId = commentId
        await voteComment.mutateAsync({ data })
      }
    } catch (error: any) {}
  }

  function handleTriggerDialog() {
    setOpen(!open)
  }

  async function handleComment(content: string) {
    await handleAnswerQuestion(content)
    setOpen(!open)
  }

  async function handleUpVote(commentId?: number) {
    if (commentId) {
      await handleVoteQuestion(true, commentId)
    } else {
      await handleVoteQuestion(true)
    }
  }

  async function handleDownVote(commentId?: number) {
    if (commentId) {
      await handleVoteQuestion(false, commentId)
    } else {
      await handleVoteQuestion(false)
    }
  }

  return (
    <Stack sx={{ paddingY: 2 }}>
      <Typography variant="h5" fontWeight={700}>
        {pageTitle}
      </Typography>

      <Question
        question={question}
        open={open}
        onOpenDialog={handleTriggerDialog}
        onComment={handleComment}
        onUpVote={handleUpVote}
        onDownVote={handleDownVote}
      />
    </Stack>
  )
}
