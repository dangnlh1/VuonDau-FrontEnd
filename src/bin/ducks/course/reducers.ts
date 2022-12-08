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

// [Course API] Get Course Detail
export const courseDetail = produce(
  (
    draft: Draft<ResponseState<models.CourseDetailResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.courseDetail.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.courseDetail.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.courseDetail.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.courseDetail.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.courseDetail,
);

// [Course API] Create Course
export const createCourse = produce(
  (
    draft: Draft<ResponseState<models.CreateCourseResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.createCourse.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.createCourse.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.createCourse.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.createCourse.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.createCourse,
);

// [Course API] Get Course Subject
export const courseSubject = produce(
  (
    draft: Draft<ResponseState<models.CourseSubjectResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.courseSubject.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.courseSubject.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.courseSubject.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.courseSubject.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.courseSubject,
);

// [Course API] Get Course Subject List
export const courseSubjectList = produce(
  (
    draft: Draft<ResponseState<models.CourseSubjectListResponse>>,
    action: Actions,
  ) => {
    switch (action.type) {
      case getType(actions.courseSubjectList.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.courseSubjectList.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.courseSubjectList.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.courseSubjectList.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.courseSubjectList,
);

const reducers = combineReducers({
  courseSubjectList,
  courseSubject,
  createCourse,
  courseDetail,
});

export default reducers;
