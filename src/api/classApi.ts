import { AttendanceRequest } from '@/models/timetables'
import { ClassStatus, ResourcePayload, TeacherPayload } from '@/models/class'
import { FilterParams, ListResponse } from '@/models/common'
import { AddEditClassFormPayload, ClassPayload, Resource } from '@/models/class'
import axiosClient from './axiosClient'
import { StudentPayload } from '@/models/student'
import { CreateCoursePayload } from '@/models/course'

const url = '/class'

export const classApi = {
  getAll(classStatus: ClassStatus, params?: FilterParams): Promise<ListResponse<ClassPayload>> {
    return axiosClient.get(`${url}/for-user`, { params: { ...params, classStatus } })
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

  getClassResource(id: string): Promise<ResourcePayload> {
    return axiosClient.get(`${url}/${id}/resource`)
  },

  getClassTeacher(id: string): Promise<TeacherPayload> {
    return axiosClient.get(`${url}/${id}/teacher`)
  },

  getClassAttendance(id: string): Promise<AttendanceRequest> {
    return axiosClient.get(`${url}/${id}/attendance`)
  },
}
