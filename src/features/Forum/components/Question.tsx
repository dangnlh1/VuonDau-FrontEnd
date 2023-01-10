import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'

import VoteButton from '@/features/Forum/components/button/VoteButton'
import ReplyButton from '@/features/Forum/components/button/ReplyButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import QuestionComment from '@/features/Forum/components/QuestionComment'
import EditorInput from '@/components/common/EditorInput'
import { Question } from '@/models/questions'
import { getTimeAgo } from '@/utils/timeAgo'
import { InfoPayload } from '@/models/info'
interface QuestionProps {
  user: InfoPayload
  question: Question
  open: boolean
  onOpenDialog: () => void
  onComment: (content: string, parentCommentId?: number) => void
  onUpVoteQuestion: () => void
  onDownVoteQuestion: () => void
  onRefresh: () => void
}

const closedQuestion = 'Câu hỏi đã bị khóa bình luận.'

export default function Question(props: QuestionProps) {
  const {
    user,
    question,
    open,
    onComment,
    onOpenDialog,
    onDownVoteQuestion,
    onUpVoteQuestion,
    onRefresh,
  } = props

  const timeAgo = getTimeAgo(question.created)

  function handleCloseQuestion() {}

  return (
    <Stack>
      <Stack paddingTop={2} sx={{ background: '#fff', paddingY: 2, paddingX: 2, marginTop: 1 }}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <AccountCircleIcon fontSize="large" />
          <Stack sx={{ paddingLeft: 2 }}>
            <Typography
              sx={{ fontSize: 15, fontWeight: 'bold' }}
            >{`${question.user.firstName} ${question.user.lastName}`}</Typography>
            <Typography sx={{ fontSize: 12 }}>{timeAgo}</Typography>
          </Stack>
        </Stack>
        <Stack padding={1}>
          <Stack>
            <Typography sx={{ fontWeight: 'bold' }}>{question.title}</Typography>
          </Stack>
          <Stack>
            <div
              style={{ fontSize: '25px' }}
              dangerouslySetInnerHTML={{ __html: question.content }}
            />
          </Stack>
          <Stack sx={{ flexDirection: 'row' }}>
            <VoteButton
              value={question.voteNumberReponse.upvoteNumber}
              status={question.userState}
              onSelected={onUpVoteQuestion}
              variant="up"
            />
            <VoteButton
              value={question.voteNumberReponse.downvoteNumber}
              status={question.userState}
              onSelected={onDownVoteQuestion}
              variant="down"
            />
            <ReplyButton label={'Trả lời'} onClick={onOpenDialog} />
            {user && user.id === question.user.id && (
              <ReplyButton label={'Trả lời'} onClick={onOpenDialog} />
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ background: '#fff', marginTop: 2 }}>
        <Stack sx={{ marginX: 2, paddingY: 2 }}>
          {question.comments.length > 0 ? (
            <Typography variant="h6">{`Tổng ${question.comments.length} câu trả lời.`}</Typography>
          ) : (
            <Typography variant="h6">Chưa có câu trả lời</Typography>
          )}
        </Stack>
        {question.comments &&
          question.comments.length > 0 &&
          question.comments.map((item, index) => (
            <QuestionComment currentUser={user} key={index} comment={item} onRefresh={onRefresh} />
          ))}
      </Stack>
      <Dialog open={open} onClose={onOpenDialog}>
        <DialogTitle>Trả lời câu hỏi</DialogTitle>
        <DialogContent>
          <DialogContentText paddingY={2}>
            <div
              style={{ fontSize: '25px' }}
              dangerouslySetInnerHTML={{ __html: question.title }}
            />
          </DialogContentText>
          <EditorInput onCancel={onOpenDialog} onComment={onComment} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}
