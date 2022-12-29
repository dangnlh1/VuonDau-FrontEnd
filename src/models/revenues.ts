export interface RevenueRequest {
  classIds: number[]
  teacherIds: number[]
  dateFrom: string | undefined
  dateTo: string | undefined
}
export interface RevenuePayload {
  classId: number
  revenue: number
  payDate: string
  orderInfo: string
  transactionNo: string
  success: boolean
}

export interface EstimatesSalaryForTeacherPayload {
  estimatesSalaryOneMonthForTeacher: number
  estimatesSalaryManyMonthForTeacher: number
  estimatesSalaryOneMonthForSystem: number
  estimatesSalaryManyMonthForSystem: number
}

export interface EstimatesSalaryForTeacherResponse {
  status: string
  data: EstimatesSalaryForTeacherPayload[]
}

export interface EstimatesSalaryForTeacherParams {
  priceEachStudent: number
  numberStudent: number
  numberMonth: number
}
