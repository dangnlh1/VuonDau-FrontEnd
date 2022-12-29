import { RevenuePayload, RevenueRequest } from './../models/revenues'
import axiosClient from './axiosClient'
const url = '/revenues'
export const revenueApi = {
  searchTuitionFee(data: RevenueRequest): Promise<RevenuePayload[]> {
    return axiosClient.get(`${url}/student/search-tuition-fee`, { data })
  },
}
