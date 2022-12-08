/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAction} from 'typesafe-actions';
import * as types from './types';

export const addRequestId = createAction(
  types.ADD_REQUEST_ID,
  (action) => (requestId: string) => action(requestId),
);

export const deleteRequestId = createAction(
  types.DELETE_REQUEST_ID,
  (action) => (requestId: string) => action(requestId),
);
