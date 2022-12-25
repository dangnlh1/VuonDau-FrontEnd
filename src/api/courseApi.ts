import { FilterParams, ListResponse } from '@/models/common'
import { CoursePayload, CreateNewCoursePayload } from '@/models/course'

import axiosClient from './axiosClient'
const url = `/courses`

export const courseApi = {
  getAll(params: FilterParams): Promise<ListResponse<CoursePayload>> {
    return axiosClient.get(`${url}/get-all-course`, { params })
  },

  get(id: number): Promise<CoursePayload> {
    return axiosClient.get(`${url}/${id}`)
  },

  getAllCourseBySubjectId(subjectId: number): Promise<ListResponse<CoursePayload>> {
    return axiosClient.get(`${url}/${subjectId}/subject`)
  },

  createNewCourse(data: CreateNewCoursePayload): Promise<any> {
    return axiosClient.post(`${url}/create-course`, data)
  },
}
