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

  const { question, voteQuestion, refetch } = useQuestion(questionId + '')
  const { createComment } = useComment()

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
        await refetch()
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
        await voteQuestion.mutateAsync({ data })
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

  async function handleUpVoteQuestion() {
    await handleVoteQuestion(true)
  }

  async function handleDownVoteQuestion() {
    await handleVoteQuestion(false)
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
        onUpVoteQuestion={handleUpVoteQuestion}
        onDownVoteQuestion={handleDownVoteQuestion}
        onRefresh={refetch}
      />
    </Stack>
  )
}
