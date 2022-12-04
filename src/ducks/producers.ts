/**
 * @app VuonDau
 * @author phutruongck
 */

import {ActionType, getType} from 'typesafe-actions';
import produce, {Draft} from 'immer';
import {clone} from 'ramda';
import _ from 'lodash';
import * as actions from './actions';
import reducers from './reducers';

export const resetState = produce(
  (draft: Draft<any>, action: ActionType<typeof actions>) => {
    if (action.type === getType(actions.resetState)) {
      draft[action.payload] = undefined;
    } else if (action.type === getType(actions.resetAllState)) {
      const reducersObj = clone(reducers);
      for (const reducer in reducersObj) {
        if (_.isArray(action.payload)) {
          if (!action.payload.includes(reducer)) {
            draft[reducer] = undefined;
          }
        }
      }
    } else if (action.type === getType(actions.resetTransactionState)) {
      Object.keys(draft)
        .filter((key) => /^[a-z]{2}\//.test(key))
        .forEach((key) => {
          draft[key] = undefined;
        });
    }
    return draft;
  },
);
