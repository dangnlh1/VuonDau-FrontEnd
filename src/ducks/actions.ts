/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAction} from 'typesafe-actions';
import * as types from './types';

export const resetState = createAction(
  types.RESET_STATE,
  (resolve) => (stateKey: string) => resolve(stateKey),
);

export const resetAllState = createAction(
  types.RESET_ALL_STATE,
  (resolve) => (whiteList: string[]) => resolve(whiteList),
);

export const resetTransactionState = createAction(
  types.RESET_TRANSACTION_STATE,
  (resolve) => () => resolve(),
);
