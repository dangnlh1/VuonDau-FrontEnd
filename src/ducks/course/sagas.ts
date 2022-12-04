/**
 * @app VuonDau
 * @author phutruongck
 */

import {put, call, takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import axios, {AxiosResponse, axiosWithoutToken} from '@/ducks/axios';
import {COURSE} from '@/services/course/api';
import * as actions from './actions';
import * as models from './models';

// [Course API] Get Course Detail
export function* courseDetail(
  action: ReturnType<typeof actions.courseDetail.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CourseDetailResponse> = yield call(
      axiosWithoutToken().get,
      `${COURSE.DETAIL}/${action.payload.courseId}`,
    );

    yield put(actions.courseDetail.success(response.data));
  } catch (error: any) {
    yield put(actions.courseDetail.failure(error));
  }
}

// [Course API] Create Course
export function* createCourse(
  action: ReturnType<typeof actions.createCourse.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CreateCourseResponse> = yield call(
      axiosWithoutToken().post,
      `${COURSE.CREATE_COURSE}`,
      {
        description: action.payload.description,
        teacherIds: action.payload.teacherIds,
        subjectId: +action.payload.subjectId,
        title: action.payload.title,
        name: action.payload.name,
        code: action.payload.code,
      },
    );

    yield put(actions.createCourse.success(response.data));
  } catch (error: any) {
    yield put(actions.createCourse.failure(error));
  }
}

// [Course API] Get Course Subject
export function* courseSubject(
  action: ReturnType<typeof actions.courseSubject.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CourseSubjectResponse> = yield call(
      axiosWithoutToken().get,
      `${COURSE.DETAIL}/${action.payload.subjectId}/subject`,
    );

    yield put(actions.courseSubject.success(response.data));
  } catch (error: any) {
    yield put(actions.courseSubject.failure(error));
  }
}

// [Course API] Get Course Subject List
export function* courseSubjectList(
  action: ReturnType<typeof actions.courseSubjectList.request>,
): SagaIterator {
  try {
    const response: AxiosResponse<models.CourseSubjectListResponse> =
      yield call(
        axiosWithoutToken().get,
        `${COURSE.DETAIL}/${action.payload.subjectId}/courses-subject`,
      );

    yield put(actions.courseSubjectList.success(response.data));
  } catch (error: any) {
    yield put(actions.courseSubjectList.failure(error));
  }
}

export default function* () {
  yield takeLatest(getType(actions.courseSubject.request), courseSubject);
  yield takeLatest(getType(actions.createCourse.request), createCourse);
  yield takeLatest(getType(actions.courseDetail.request), courseDetail);
  yield takeLatest(
    getType(actions.courseSubjectList.request),
    courseSubjectList,
  );
}
