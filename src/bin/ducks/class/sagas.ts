/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {CLASS} from '@/services/teacher/class/api';
import * as actions from './actions';
import * as models from './models';

// [Class API] Create Class
export function* createClass(
  action: ReturnType<typeof actions.createClass.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CreateClassResponse> = yield call(
      axiosWithoutToken().post,
      `${CLASS.CREATE}/1`,
      {
        ...action.payload,
      },
    );

    yield put(actions.createClass.success(response.data));
  } catch (error: any) {
    yield put(actions.createClass.failure(error));
  }
}

// [Class API] Get All Class
export function* allClass(
  action: ReturnType<typeof actions.allClass.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.AllClassResponse> = yield call(
      axiosWithoutToken().get,
      `${CLASS.GET_ALL}`,
      {
        params: {
          status: action.payload.status || undefined,
          q: action.payload.q || undefined,
        },
      },
    );

    yield put(actions.allClass.success(response.data));
  } catch (error: any) {
    yield put(actions.allClass.failure(error));
  }
}

// [Class API] Get Class Detail
export function* classDetail(
  action: ReturnType<typeof actions.classDetail.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.ClassDetailResponse> = yield call(
      axiosWithoutToken().get,
      `${CLASS.CREATE}/${action.payload.id}/class-detail`,
    );

    yield put(actions.classDetail.success(response.data));
  } catch (error: any) {
    yield put(actions.classDetail.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.classDetail.request), classDetail);
  yield takeLatest(getType(actions.createClass.request), createClass);
  yield takeLatest(getType(actions.allClass.request), allClass);
}
