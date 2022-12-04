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

// [Search API] Search Course
export const searchCourse = produce(
  (
    draft: Draft<ResponseState<models.SearchCourseResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.searchCourse.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.searchCourse.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.searchCourse.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.searchCourse.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.searchCourse,
);

const reducers = combineReducers({
  searchCourse,
});

export default reducers;
