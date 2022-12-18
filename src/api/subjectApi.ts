import { ListResponse } from '@/models/common'
import { Subject } from '@/models/subject'
import axiosClient from './axiosClient'
const url = '/subjects'
export const subjectApi = {
  getAll(): Promise<ListResponse<Subject>> {
    return axiosClient.get(`${url}`)
  },

  getAllByTeacher(): Promise<Subject[]> {
    return axiosClient.get(`${url}/teacher/subjects`)
  },
}
