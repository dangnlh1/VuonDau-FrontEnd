/**
 * @app VuonDau
 * @author phutruongck
 */

import {ActionType, getType} from 'typesafe-actions';
import {combineReducers} from 'redux';
import produce, {Draft} from 'immer';
import {ResponseState} from '@custom-type';
import * as actions from './actions';
import * as models from './models';

type Actions = ActionType<typeof actions>;

// [Subject API] Get List Subject
export const listSubject = produce(
  (draft: Draft<ResponseState<models.SubjectResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.listSubject.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.listSubject.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.listSubject.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.listSubject.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.listSubject,
);

const reducers = combineReducers({
  listSubject,
});

export default reducers;
