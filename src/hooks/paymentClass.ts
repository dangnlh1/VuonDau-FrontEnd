import { accountDetailApi, UploadRegisterProfileImagePayload } from '@/api/accountDetailApi'
import { paymentApi } from '@/api/paymentApi'
import { PaymentPayload } from '@/models/payment'
import { useMutation, useQueryClient } from 'react-query'

export function usePaymentClass() {
  const queryKey = ['/payment']
  const queryClient = useQueryClient()

  const paymentClass = useMutation((data: PaymentPayload) => paymentApi.paymentClass(data), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  })

  return {
    paymentClass,
  }
}
