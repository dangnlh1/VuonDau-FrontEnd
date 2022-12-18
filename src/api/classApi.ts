import { ResourcePayload } from './../models/class'
import { FilterParams, ListResponse } from '@/models/common'
import { ClassPayload, Resource } from '@/models/class'
import axiosClient from './axiosClient'

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

  getClassResource(id: string): Promise<ResourcePayload> {
    return axiosClient.get(`${url}/${id}/resource`)
  },
  getClassTeacher(id: string): Promise<ResourcePayload> {
    return axiosClient.get(`${url}/${id}/teacher`)
  },
  getClassTimetable(id: string): Promise<ResourcePayload> {
    return axiosClient.get(`${url}/${id}/timetable`)
  },
}
