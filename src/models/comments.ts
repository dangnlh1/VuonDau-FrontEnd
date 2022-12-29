import { VoteProps } from './questions'
import { InfoPayload } from './info'

export interface Comment {
  id: number
  content: string
  voteNumber: VoteProps
  parentComment: string
  subComments: Comment[]
  user: InfoPayload
  userState: number
  created: string
  lastModified: string
}

export interface CommentRequestPayload {
  content: string
  questionId: number
  parentCommentId?: number
}
export interface VoteCommentRequestPayload {
  vote: boolean
  questionId: number
  commentId?: number
}
