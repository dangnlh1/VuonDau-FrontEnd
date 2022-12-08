/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {COMMON} from '@/services/common/api';
import * as actions from './actions';
import * as models from './models';

// [Common API] Get All Course
export function* allCourse(
  action: ReturnType<typeof actions.allCourse.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CourseResponse> = yield call(
      axiosWithoutToken().get,
      COMMON.GET_ALL_COURSE,
      {
        params: {
          size: action.payload.size || process.env.PAGE_SIZE,
          q: action.payload.q || undefined,
          page: action.payload.page || 0,
        },
      },
    );

    yield put(actions.allCourse.success(response.data));
  } catch (error: any) {
    yield put(actions.allCourse.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.allCourse.request), allCourse);
}
