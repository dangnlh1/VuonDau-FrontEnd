import { InfoPayload } from './info'
import { Subject } from '@/models/subject'
import { Comment } from '@/models/comments'
import { StringifyOptions } from 'querystring'

export interface Question {
  id: number
  title: string
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

export interface QuestionRequest {
  content: string
  title: string
  forumId: number
  forumLessonId?: number
}
