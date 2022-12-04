/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {AUTHENTICATION} from '@/services/authentication/api';
import * as actions from './actions';
import * as models from './models';

// [Authentication API] Student Register
export function* studentRegister(
  action: ReturnType<typeof actions.studentRegister.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.StudentRegisterResponse> = yield call(
      axiosWithoutToken().post,
      AUTHENTICATION.STUDENT_REGISTER,
      {
        phoneNumber: action.payload.phoneNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        account: action.payload.account,
        email: action.payload.email,
        name: action.payload.name,
      },
    );

    yield put(actions.studentRegister.success(response.data));
  } catch (error: any) {
    yield put(actions.studentRegister.failure(error));
  }
}

// [Authentication API] Teacher Register
export function* teacherRegister(
  action: ReturnType<typeof actions.teacherRegister.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.TeacherRegisterResponse> = yield call(
      axiosWithoutToken().post,
      AUTHENTICATION.REGISTER_TUTOR,
      {
        fullName: action.payload.fullName,
        birthDay: action.payload.fullName,
        email: action.payload.email,
        phone: action.payload.phone,
        gender: action.payload.gender,
        domicile: action.payload.domicile,
        voice: action.payload.voice,
        teachingProvince: action.payload.teachingProvince,
        currentAddress: action.payload.currentAddress,
        idCard: action.payload.idCard || undefined,
        trainingSchoolName: action.payload.trainingSchoolName,
        majors: action.payload.majors,
        level: action.payload.level,
      },
    );

    yield put(actions.teacherRegister.success(response.data));
  } catch (error: any) {
    yield put(actions.teacherRegister.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.teacherRegister.request), teacherRegister);
  yield takeLatest(getType(actions.studentRegister.request), studentRegister);
}
