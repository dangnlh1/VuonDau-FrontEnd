import { CommentRequestPayload, VoteCommentRequestPayload } from '@/models/comments'
import axiosClient from './axiosClient'
const url = '/comments'
export const commentApi = {
  createComment(data: CommentRequestPayload): Promise<any> {
    return axiosClient.post(url, data)
  },
  voteComment(data: VoteCommentRequestPayload): Promise<any> {
    return axiosClient.post(`${url}/vote`, data)
  },
  deleteComment(id: number): Promise<any> {
    return axiosClient.delete(`${url}/${id}`)
  },
  editComment(id: number): Promise<any> {
    return axiosClient.put(`${url}/${id}`)
  },
}
