/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAction} from 'typesafe-actions';
import {StatusErrorType} from './models';
import * as types from './types';

export const setStatusError = createAction(
  types.SET_STATUS_ERROR,
  (resolve) => (data: StatusErrorType) => resolve(data),
);
