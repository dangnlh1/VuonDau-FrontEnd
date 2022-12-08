/**
 * @app VuonDau
 * @author phutruongck
 */

import {ResponseState} from '@custom-type';
import {
  // [Payment API] Payment
  PaymentResponse as ApiPaymentResponse,
  PaymentRequest as ApiPaymentRequest,
} from '@/services/payment/models';

// [Payment API] Payment
export type PaymentResponse = ApiPaymentResponse;
export type PaymentRequest = ApiPaymentRequest;
export const initPaymentResponse: PaymentResponse = {
  status: '',
  data: {
    code: '',
    message: '',
    paymentUrl: '',
  },
};

export type ModelState = {
  // [Payment API] Payment
  payment: ResponseState<PaymentResponse>;
};

export const initState: ModelState = {
  // [Payment API] Payment
  payment: {
    response: initPaymentResponse,
    isLoading: false,
  },
};

declare module '../types' {
  export interface GlobalState {
    payment: ModelState;
  }
}
