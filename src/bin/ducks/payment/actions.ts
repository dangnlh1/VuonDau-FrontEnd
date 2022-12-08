/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Payment API] Payment
export const payment = createAsyncAction(
  types.PAYMENT_REQUEST,
  types.PAYMENT_SUCCESS,
  types.PAYMENT_FAILURE,
)<models.PaymentRequest, models.PaymentResponse, AxiosError<IAxiosError>>();
