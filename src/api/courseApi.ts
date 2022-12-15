import { FilterParams, ListResponse } from '@/models/common'
import { CoursePayload } from '@/models/course'

import axiosClient from './axiosClient'

export const courseApi = {
  getAll(params: FilterParams): Promise<ListResponse<CoursePayload>> {
    return axiosClient.get('/courses/get-all-course', { params })
  },

  get(id: number): Promise<CoursePayload> {
    return axiosClient.get(`/courses/${id}`)
  },
}
