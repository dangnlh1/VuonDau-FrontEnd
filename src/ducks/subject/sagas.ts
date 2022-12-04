/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {SUBJECT} from '@/services/teacher/subject/api';
import * as actions from './actions';
import * as models from './models';

// [Subject API] Get List Subject
export function* listSubject(): SagaIterator {
  try {
    const response: AxiosResponse<models.SubjectResponse> = yield call(
      axiosWithoutToken().get,
      `${SUBJECT.LIST_SUBJECT}`,
    );

    yield put(actions.listSubject.success(response.data));
  } catch (error: any) {
    yield put(actions.listSubject.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.listSubject.request), listSubject);
}
