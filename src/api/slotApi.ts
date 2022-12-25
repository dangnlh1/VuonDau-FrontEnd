import { Slot } from '@/models/slot'
import axiosClient from './axiosClient'

const url = '/slot'

export const slotApi = {
  getAll(): Promise<Slot[]> {
    return axiosClient.get(`${url}`)
  },
}
