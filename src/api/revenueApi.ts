import {
  EstimatesSalaryForTeacherParams,
  EstimatesSalaryForTeacherPayload,
  RevenuePayload,
  RevenueRequest,
} from '@/models/revenues'
import axiosClient from './axiosClient'
const url = '/revenue'
export const revenueApi = {
  searchTuitionFee(data: RevenueRequest): Promise<RevenuePayload[]> {
    return axiosClient.get(`${url}/student/search-tuition-fee`, { data })
  },

  getEstimatesSalaryForTeacher(
    params: EstimatesSalaryForTeacherParams
  ): Promise<EstimatesSalaryForTeacherPayload[]> {
    return axiosClient.get(`${url}/estimates-salary-for-teacher`, { params })
  },
}
