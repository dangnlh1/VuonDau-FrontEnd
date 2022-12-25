import { DayOfWeek } from '@/models/dayOfWeek'
import axiosClient from './axiosClient'

const url = '/dayofweek'

export const dayOfWeekApi = {
  getAll(): Promise<DayOfWeek[]> {
    return axiosClient.get(`${url}`)
  },
}
