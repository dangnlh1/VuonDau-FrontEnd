import { City } from '@/models/common'
import { PaymentPayload, PaymentResponse } from '@/models/payment'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import axiosClient from './axiosClient'

const url = `/payment`

export const paymentApi = {
  paymentClass(payload: PaymentPayload): Promise<PaymentResponse> {
    return axiosClient.post(`${url}/`, payload)
  },
}
