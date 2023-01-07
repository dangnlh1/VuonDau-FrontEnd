import { FilterParams, ListResponse } from '@/models/common'
import { ForumPayload } from '@/models/forum'

import axiosClient from './axiosClient'
const url = `/forums`

export const forumApi = {
  getForums(params: FilterParams): Promise<ListResponse<ForumPayload>> {
    return axiosClient.get(url, { params })
  },
  getForum(id: string): Promise<ForumPayload> {
    return axiosClient.get(`${url}/${id}`)
  },
  synchronizeLesson(classId: any): Promise<any> {
    return axiosClient.get(`${url}/synchronize-lesson`, { params: { classId } })
  },
}
