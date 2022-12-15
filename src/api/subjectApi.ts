import { ListResponse } from '@/models/common'
import { Subject } from '@/models/subject'
import axiosClient from './axiosClient'

export const subjectApi = {
  getAll(): Promise<ListResponse<Subject>> {
    return axiosClient.get('/subjects')
  },
}
