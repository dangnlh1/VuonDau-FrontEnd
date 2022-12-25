import { FilterParams, ListResponse } from '@/models/common'
import { ForumPayload } from '@/models/forum'

import axiosClient from './axiosClient'
const url = `/forums`

export const forumApi = {
  getAll(params: FilterParams): Promise<ListResponse<ForumPayload>> {
    return axiosClient.get(`${url}/class-type`, { params })
  },
}
