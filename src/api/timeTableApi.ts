import { AttendanceRequest } from './../models/timetables'
import { CreateTimeTableRequest } from '@/models/timetables'
import axiosClient from './axiosClient'

const url = '/timetable'
export const timeTableApi = {
  create(data: CreateTimeTableRequest): Promise<any> {
    return axiosClient.post(`${url}/${data.classId}`, data.formData, {
      params: { numberSlot: data.numberSlot },
    })
  },
  getUser(): Promise<AttendanceRequest[]> {
    return axiosClient.get(`${url}/classes`)
  },
}
