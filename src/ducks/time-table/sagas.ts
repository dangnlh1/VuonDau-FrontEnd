/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {TIME_TABLE} from '@/services/time-table/api';
import * as actions from './actions';
import * as models from './models';

// [Time Table API] Get All Day Of Week
export function* dayOfWeek(): SagaIterator {
  try {
    const response: AxiosResponse<models.DayOfWeekResponse> = yield call(
      axiosWithoutToken().get,
      TIME_TABLE.DAY_OF_WEEK,
    );

    yield put(actions.dayOfWeek.success(response.data));
  } catch (error: any) {
    yield put(actions.dayOfWeek.failure(error));
  }
}

// [Time Table API] Get All Slot
export function* slot(): SagaIterator {
  try {
    const response: AxiosResponse<models.SlotResponse> = yield call(
      axiosWithoutToken().get,
      TIME_TABLE.SLOT,
    );

    yield put(actions.slot.success(response.data));
  } catch (error: any) {
    yield put(actions.slot.failure(error));
  }
}

// [Time Table API] Create Time Table
export function* createTimeTable(
  action: ReturnType<typeof actions.createTimeTable.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CreateTimeTableResponse> = yield call(
      axios().post,
      `${TIME_TABLE.CREATE_TIME_TABLE}/${action.payload.classId}`,
      {
        archetypeName: action.payload.archetypeName,
        archetypeCode: action.payload.archetypeCode,
        slotDow: action.payload.slotDow,
      },
    );

    yield put(actions.createTimeTable.success(response.data));
  } catch (error: any) {
    yield put(actions.createTimeTable.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.createTimeTable.request), createTimeTable);
  yield takeLatest(getType(actions.dayOfWeek.request), dayOfWeek);
  yield takeLatest(getType(actions.slot.request), slot);
}
