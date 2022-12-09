import { FilterParams, ListResponse } from '@/models/common'
import { ClassPayload } from '@/models/class'
import axiosClient from './axiosClient'

export const classApi = {
  getAll(params: FilterParams): Promise<ListResponse<ClassPayload>> {
    return axiosClient.get('/class', { params })
  },

  get(id: number): Promise<ListResponse<ClassPayload>> {
    return axiosClient.get(`/class/${id}/class-detail`)
  },
}
