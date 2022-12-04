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

// [Authentication API] Student Register
export const studentRegister = produce(
  (
    draft: Draft<ResponseState<models.StudentRegisterResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.studentRegister.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.studentRegister.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.studentRegister.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.studentRegister.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.studentRegister,
);

// [Authentication API] Teacher Register
export const teacherRegister = produce(
  (
    draft: Draft<ResponseState<models.TeacherRegisterResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.teacherRegister.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.teacherRegister.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.teacherRegister.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.teacherRegister.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.teacherRegister,
);

const reducers = combineReducers({
  teacherRegister,
  studentRegister,
});

export default reducers;
