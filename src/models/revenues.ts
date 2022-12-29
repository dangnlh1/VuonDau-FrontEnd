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
