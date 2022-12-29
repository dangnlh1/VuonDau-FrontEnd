import { InfoPayload } from './info'
import { Subject } from '@/models/subject'
import { Comment } from '@/models/comments'

export interface Question {
  id: number
  content: string
  user: InfoPayload
  subject: Subject
  voteNumberReponse: VoteProps
  comments: Comment[]
  userState: number
  created: string
  lastModified: string
  closed: boolean
}
export interface QuestionRow {
  id: number
  content: string
  user: string
  subject: string
}

export interface VoteProps {
  upvoteNumber: 0
  downvoteNumber: 0
}
