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

// [Time Table API] Get All Day Of Week
export const dayOfWeek = produce(
  (draft: Draft<ResponseState<models.DayOfWeekResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.dayOfWeek.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.dayOfWeek.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.dayOfWeek.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.dayOfWeek.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.dayOfWeek,
);

// [Time Table API] Get All Slot
export const slot = produce(
  (draft: Draft<ResponseState<models.SlotResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.slot.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.slot.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.slot.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.slot.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.slot,
);

// [Time Table API] Create Time Table
export const createTimeTable = produce(
  (
    draft: Draft<ResponseState<models.CreateTimeTableResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.createTimeTable.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.createTimeTable.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.createTimeTable.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.createTimeTable.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.createTimeTable,
);

const reducers = combineReducers({
  createTimeTable,
  dayOfWeek,
  slot,
});

export default reducers;
