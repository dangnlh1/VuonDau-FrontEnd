import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VoteButton from '@/features/Forum/components/button/VoteButton'
import ReplyButton from '@/features/Forum/components/button/ReplyButton'
import { Comment, CommentRequestPayload } from '@/models/comments'
import EditorInput from '@/components/common/EditorInput'
import { useParams } from 'react-router-dom'
import { useComment } from '@/hooks/comment'
import { toast } from 'react-toastify'

interface QuestionCommentProps {
  comment: Comment
}

export default function QuestionComment({ comment }: QuestionCommentProps) {
  if (!comment) return null
  const { questionId } = useParams()

  const { id, user, content, voteNumber, userState, subComments } = comment

  const [isReply, setReply] = useState(false)
  const { createComment } = useComment()

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
        const response = await createComment.mutateAsync({ data })
        toast.success('Thêm câu trả lời thành công.')
        handleReply()
      }
    } catch (error: any) {
      toast.error('Không thể trả lời câu hỏi.', error.message)
    }
  }

  function handleUpVote() {
    //TODO: add upVote function
  }

  function handleDownVote() {
    //TODO: add downVote function
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
                <Typography sx={{ fontSize: 12, paddingLeft: 1 }}>3 phút trước.</Typography>
              </Stack>
              <div dangerouslySetInnerHTML={{ __html: content }} />
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
                {voteNumber.upvoteNumber && (
                  <VoteButton
                    value={voteNumber.upvoteNumber}
                    variant="up"
                    onSelected={handleUpVote}
                    status={userState}
                  />
                )}
                {voteNumber.downvoteNumber && (
                  <VoteButton
                    value={voteNumber.downvoteNumber}
                    variant="down"
                    onSelected={handleDownVote}
                    status={userState}
                  />
                )}
                <ReplyButton label={'Phản hồi'} onClick={handleReply} />
              </Stack>
              {isReply && (
                <Stack flexGrow={1}>
                  <EditorInput onCancel={handleReply} onComment={handleComment} />
                </Stack>
              )}
              {subComments &&
                subComments.length > 0 &&
                subComments.map((item, index) => <QuestionComment key={index} comment={item} />)}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
