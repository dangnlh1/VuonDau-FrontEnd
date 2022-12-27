import { FilterParams, ListResponse } from '@/models/common'
import { ForumPayload } from '@/models/forum'

import axiosClient from './axiosClient'
const url = `/forums`

export const forumApi = {
  getForums(params: FilterParams, forumType: string): Promise<ListResponse<ForumPayload>> {
    return axiosClient.get(url, { params: { ...params, forumType } })
  },
  getForum(id: string): Promise<ForumPayload> {
    return axiosClient.get(`${url}/${id}`)
  },
}
