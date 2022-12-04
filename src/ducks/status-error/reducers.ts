/**
 * @app VuonDau
 * @author phutruongck
 */

import {ActionType, getType} from 'typesafe-actions';
import {combineReducers} from 'redux';
import produce, {Draft} from 'immer';
import * as actions from './actions';
import * as models from './models';

type Actions = ActionType<typeof actions>;

export const statusError = produce(
  (draft: Draft<models.StatusErrorType>, action: Actions) => {
    switch (action.type) {
      case getType(actions.setStatusError):
        draft = action.payload;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.statusError,
);

const reducers = combineReducers({
  statusError,
});

export default reducers;
