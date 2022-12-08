/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse} from '@/ducks/axios';
import {PAYMENT} from '@/services/payment/api';
import * as actions from './actions';
import * as models from './models';

// [Payment API] Payment
export function* payment(
  action: ReturnType<typeof actions.payment.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.PaymentResponse> = yield call(
      axios().post,
      PAYMENT.PAYMENT,
      {
        vnp_OrderInfo: 'Thanh toán khoá học',
        ordertype: '25000',
        amount: '15000',
        // txt_billing_mobile: 'string',
        // txt_billing_email: 'string',
        // txt_billing_fullname: 'string',
        // txt_inv_addr1: 'string',
        // txt_bill_city: 'string',
        // txt_bill_country: 'string',
        // txt_inv_mobile: 'string',
        // txt_inv_email: 'string',
        // txt_inv_customer: 'string',
        // txt_inv_taxcode: 'string',
        // cbo_inv_type: 'string',
        classId: action.payload.classId,
      },
    );

    yield put(actions.payment.success(response.data));
  } catch (error: any) {
    yield put(actions.payment.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.payment.request), payment);
}
