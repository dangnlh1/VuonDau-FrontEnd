import { CreateTimeTableRequest } from '@/models/timeTable'
import axiosClient from './axiosClient'

const url = '/timetable'
export const timeTableApi = {
  create(data: CreateTimeTableRequest): Promise<any> {
    return axiosClient.post(`${url}/${data.classId}`, data.formData, {
      params: { numberSlot: data.numberSlot },
    })
  },
}