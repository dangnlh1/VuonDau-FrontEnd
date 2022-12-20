import { FilterParams, ListResponse } from '@/models/common'
import { CoursePayload, CreateNewCourseFormPayload } from '@/models/course'

import axiosClient from './axiosClient'
const url = `/forums`

export const forumApi = {
  getAll(params?: FilterParams): Promise<ListResponse<CoursePayload>> {
    return axiosClient.get(`${url}/class-type`, { params })
  },
}
