import { FilterParams, ListResponse } from '@/models/common'
import { Course } from '@/models/course'
import axiosClient from './axiosClient'

export const courseApi = {
  getAll(params: FilterParams): Promise<ListResponse<Course>> {
    return axiosClient.get('/courses/get-all-course', { params })
  },

  get(id: number): Promise<ListResponse<Course>> {
    return axiosClient.get(`/courses/${id}`)
  },
}
