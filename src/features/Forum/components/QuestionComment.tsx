import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VoteButton from '@/features/Forum/components/button/VoteButton'
import ReplyButton from '@/features/Forum/components/button/ReplyButton'
import { Comment, CommentRequestPayload, VoteCommentRequestPayload } from '@/models/comments'
import EditorInput from '@/components/common/EditorInput'
import { useParams } from 'react-router-dom'
import { useComment } from '@/hooks/comment'
import { toast } from 'react-toastify'
import { getTimeAgo } from '@/utils/timeAgo'
import DeleteButton from '@/features/Forum/components/button/CustomButton'

interface QuestionCommentProps {
  comment: Comment
  onRefresh: () => void
}

export default function QuestionComment({ comment, onRefresh }: QuestionCommentProps) {
  if (!comment) return null
  const { questionId } = useParams()

  const { id, user, content, voteNumber, userState, subComments, created } = comment

  const timeAgo = getTimeAgo(created)

  const [isReply, setReply] = useState(false)
  const [isShowComment, setShowComment] = useState(false)
  const { createComment, voteComment, deleteComment, editComment } = useComment()

  function handleReply() {
    setReply(!isReply)
  }

  async function handleComment(content: string) {
    try {
      if (questionId) {
        const data: CommentRequestPayload = {
          content,
          questionId: parseInt(questionId),
          parentCommentId: id,
        }
        await createComment.mutateAsync({ data })
        toast.success('Thêm câu trả lời thành công.')
        handleReply()
      }
    } catch (error: any) {
      toast.error('Không thể trả lời câu hỏi.', error.message)
    }
    await onRefresh()
  }
  async function handleDelete() {
    try {
      if (id) {
        await deleteComment.mutateAsync({ id })
        toast.success('Thêm câu trả lời thành công.')
        handleReply()
      }
    } catch (error: any) {
      toast.error('Không thể xóa câu hỏi.', error.message)
    }
    await onRefresh()
  }
  async function handleEdit() {
    try {
      if (id && questionId) {
        const data: CommentRequestPayload = {
          content,
          questionId: parseInt(questionId),
          parentCommentId: id,
        }
        await editComment.mutateAsync({ id, data })
        toast.success('Thêm câu trả lời thành công.')
        handleReply()
      }
    } catch (error: any) {
      toast.error('Không thể sửa câu hỏi.', error.message)
    }
    await onRefresh()
  }

  function handleShowComment() {
    setShowComment(!isShowComment)
  }

  async function handleVoteComment(vote: boolean, commentId: number) {
    try {
      if (questionId) {
        const data: VoteCommentRequestPayload = {
          vote,
          questionId: parseInt(questionId),
          commentId,
        }
        await voteComment.mutateAsync({ data })
      }
    } catch (error: any) {}
  }

  async function handleUpVoteComment() {
    await handleVoteComment(true, id)
    await onRefresh()
  }

  async function handleDownVoteComment() {
    await handleVoteComment(false, id)
    await onRefresh()
  }

  return (
    <Stack padding={1}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}></Stack>
      <Stack sx={{ borderRadius: 2, background: '#fff' }}>
        <Stack>
          <Stack direction={'row'}>
            <Stack sx={{ width: '3%', alignItems: 'center' }}>
              <AccountCircleIcon fontSize="large" />
            </Stack>
            <Stack sx={{ paddingLeft: 1 }}>
              <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: 'bold' }}
                >{`${user.firstName} ${user.lastName}`}</Typography>
                <Typography sx={{ fontSize: 12, paddingLeft: 1 }}>{timeAgo}</Typography>
              </Stack>
              <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: content }} />
            </Stack>
          </Stack>
          <Stack direction={'row'} sx={{ width: '100%', height: '100%' }}>
            <Stack
              sx={{
                width: '3%',
                alignItems: 'center',
                color: '#000',
              }}
            >
              <Box sx={{ background: 'grey', width: '1px', height: '100%' }} />
            </Stack>
            <Stack flexGrow={1}>
              <Stack direction={'row'}>
                <VoteButton
                  value={voteNumber.upvoteNumber}
                  variant="up"
                  onSelected={handleUpVoteComment}
                  status={userState}
                />
                <VoteButton
                  value={voteNumber.downvoteNumber}
                  variant="down"
                  onSelected={handleDownVoteComment}
                  status={userState}
                />
                <ReplyButton label={'Phản hồi'} onClick={handleReply} />
                <DeleteButton label={'Xóa'} onClick={handleDelete} />
                <DeleteButton label={'Sửa'} onClick={handleEdit} />
              </Stack>
              {isReply && (
                <Stack flexGrow={1}>
                  <EditorInput onCancel={handleReply} onComment={handleComment} />
                </Stack>
              )}
              {Array.isArray(subComments) && subComments.length > 0 && !isShowComment && (
                <Stack sx={{ alignItems: 'flex-start' }}>
                  <Button
                    sx={{
                      marginLeft: 1,
                      fontSize: '10px',
                    }}
                    onClick={handleShowComment}
                    variant="outlined"
                  >
                    {`Xem thêm ${subComments.length} bình luận.`}
                  </Button>
                </Stack>
              )}
              {Array.isArray(subComments) &&
                subComments.length > 0 &&
                isShowComment &&
                subComments.map((item, index) => (
                  <QuestionComment key={index} comment={item} onRefresh={onRefresh} />
                ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
