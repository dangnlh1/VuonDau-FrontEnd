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

// [Class API] Create Class
export const createClass = produce(
  (
    draft: Draft<ResponseState<models.CreateClassResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.createClass.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.createClass.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.createClass.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.createClass.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.createClass,
);

// [Class API] Get All Class
export const allClass = produce(
  (draft: Draft<ResponseState<models.AllClassResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.allClass.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.allClass.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.allClass.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.allClass.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.allClass,
);

// [Class API] Get Class Detail
export const classDetail = produce(
  (
    draft: Draft<ResponseState<models.ClassDetailResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.classDetail.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.classDetail.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.classDetail.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.classDetail.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.classDetail,
);

const reducers = combineReducers({
  createClass,
  classDetail,
  allClass,
});

export default reducers;
