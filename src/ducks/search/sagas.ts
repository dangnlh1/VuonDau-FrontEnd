/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {SEARCH} from '@/services/search/api';
import * as actions from './actions';
import * as models from './models';

// [Search API] Search Course
export function* searchCourse(
  action: ReturnType<typeof actions.searchCourse.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.SearchCourseResponse> = yield call(
      axiosWithoutToken().get,
      `${SEARCH}`,
      {
        params: {
          page: action.payload.page || undefined,
          q: action.payload.q || undefined,
          size: process.env.PAGE_SIZE,
        },
      },
    );

    yield put(actions.searchCourse.success(response.data));
  } catch (error: any) {
    yield put(actions.searchCourse.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.searchCourse.request), searchCourse);
}
