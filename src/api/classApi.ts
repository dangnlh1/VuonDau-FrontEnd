import { FilterParams, ListResponse } from '@/models/common'
import { AddEditClassFormPayload, ClassPayload } from '@/models/class'
import axiosClient from './axiosClient'
import { StudentPayload } from '@/models/student'
import { CreateCoursePayload } from '@/models/course'

const url = '/class'

export const classApi = {
  getAll(params: FilterParams): Promise<ListResponse<ClassPayload>> {
    return axiosClient.get(url, { params })
  },

  get(id: number): Promise<ClassPayload> {
    return axiosClient.get(`${url}/${id}/class-detail`)
  },

  getAllClassByTeacher(params: FilterParams): Promise<ListResponse<ClassPayload>> {
    return axiosClient.get(`${url}/account`, { params })
  },

  createClassByTeacherRequest(data: AddEditClassFormPayload): Promise<any> {
    return axiosClient.post(`${url}/teacher-request-create-class`, data)
  },

  createClassSubjectCourse(id: number, payload: CreateCoursePayload): Promise<any> {
    return axiosClient.post(`${url}/${id}/teacher-request-create-class-subject-course`, payload)
  },

  useGetStudentByClassId(
    params: FilterParams,
    classId: number
  ): Promise<ListResponse<StudentPayload>> {
    return axiosClient.get(`${url}/${classId}/students`, { params })
  },
}
