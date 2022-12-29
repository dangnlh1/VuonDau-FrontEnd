import { PaymentPayload, PaymentResponse } from '@/models/payment'
import axiosClient from './axiosClient'

const url = `/payment`

export const paymentApi = {
  paymentClass(payload: PaymentPayload): Promise<PaymentResponse> {
    return axiosClient.post(`${url}/`, payload)
  },

  //TODO: add payment history api
}
