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
interface QuestionProps {
  question: Question
  open: boolean
  onOpenDialog: () => void
  onComment: (content: string, parentCommentId?: number) => void
  onUpVote: (commentId?: number) => void
  onDownVote: (commentId?: number) => void
}

const closedQuestion = 'Câu hỏi đã bị khóa bình luận.'

export default function Question(props: QuestionProps) {
  const { question, open, onComment, onDownVote, onOpenDialog, onUpVote } = props

  return (
    <Stack>
      <Stack paddingTop={2} sx={{ background: '#fff', paddingY: 2, paddingX: 2, marginTop: 1 }}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <AccountCircleIcon fontSize="large" />
          <Stack sx={{ paddingLeft: 2 }}>
            <Typography
              sx={{ fontSize: 15, fontWeight: 'bold' }}
            >{`${question.user.firstName} ${question.user.lastName}`}</Typography>
            <Typography sx={{ fontSize: 12 }}>3 phút trước.</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack sx={{ padding: 1 }}>
            <Typography variant="body1">{question.content}</Typography>
          </Stack>
          <Stack sx={{ flexDirection: 'row' }}>
            <VoteButton
              value={question.voteNumberReponse.upvoteNumber}
              status={question.userState}
              onSelected={onUpVote}
              variant="up"
            />
            <VoteButton
              value={question.voteNumberReponse.downvoteNumber}
              status={question.userState}
              onSelected={onDownVote}
              variant="down"
            />
            <ReplyButton label={'Trả lời'} onClick={onOpenDialog} />
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
          question.comments.map((item, index) => <QuestionComment key={index} comment={item} />)}
      </Stack>
      <Dialog open={open} onClose={onOpenDialog}>
        <DialogTitle>Trả lời câu hỏi</DialogTitle>
        <DialogContent>
          <DialogContentText paddingY={2}>{question.content}</DialogContentText>
          <EditorInput onCancel={onOpenDialog} onComment={onComment} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}
