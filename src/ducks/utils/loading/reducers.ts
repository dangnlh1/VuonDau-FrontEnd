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

export const loading = produce(
  (draft: Draft<models.LoadingType>, action: Actions) => {
    switch (action.type) {
      case getType(actions.addRequestId):
        draft.loadingItems.push(action.payload);
        return draft;
      case getType(actions.deleteRequestId):
        draft.loadingItems = draft.loadingItems.filter(
          (id) => id !== action.payload,
        );
        return draft;
      default:
        return draft;
    }
  },
  models.initUtilsState.loading,
);

const reducers = combineReducers({
  loading,
});

export default reducers;
