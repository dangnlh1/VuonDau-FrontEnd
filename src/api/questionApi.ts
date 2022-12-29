import { VoteCommentRequestPayload } from '@/models/comments'
import { Question } from '@/models/questions'
import axiosClient from './axiosClient'
const url = '/questions'
export const questionApi = {
  get(questionId: string): Promise<Question> {
    return axiosClient.get(`${url}/${questionId}`)
  },
  voteQuestion(data: VoteCommentRequestPayload): Promise<any> {
    return axiosClient.post(`${url}/vote`, data)
  },
}
