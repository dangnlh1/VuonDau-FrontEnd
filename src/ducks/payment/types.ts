/**
 * @app VuonDau
 * @author phutruongck
 */

// [Payment API] Payment
export const PAYMENT_REQUEST = 'payment/paymentRequest' as const;
export const PAYMENT_SUCCESS = 'payment/paymentSuccess' as const;
export const PAYMENT_FAILURE = 'payment/paymentFailure' as const;

export type Types =
  | typeof PAYMENT_REQUEST
  | typeof PAYMENT_SUCCESS
  | typeof PAYMENT_FAILURE;
