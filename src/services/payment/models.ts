/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonResponse, CommonRequest} from '@custom-type';

export type PaymentResponse = CommonResponse<{
  code: string;
  message: string;
  paymentUrl: string;
}>;
export type PaymentRequest = CommonRequest<{
  vnp_OrderInfo?: string;
  ordertype?: string;
  amount?: string;
  txt_billing_mobile?: string;
  txt_billing_email?: string;
  txt_billing_fullname?: string;
  txt_inv_addr1?: string;
  txt_bill_city?: string;
  txt_bill_country?: string;
  txt_inv_mobile?: string;
  txt_inv_email?: string;
  txt_inv_customer?: string;
  txt_inv_taxcode?: string;
  cbo_inv_type?: string;
  classId: number;
}>;
