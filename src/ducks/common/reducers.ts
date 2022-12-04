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

// [Common API] Get All Course
export const allCourse = produce(
  (draft: Draft<ResponseState<models.CourseResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.allCourse.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.allCourse.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.allCourse.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initCommonState.allCourse.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initCommonState.allCourse,
);

const reducers = combineReducers({
  allCourse,
});

export default reducers;
