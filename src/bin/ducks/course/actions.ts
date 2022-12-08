/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Course API] Get Course Detail
export const courseDetail = createAsyncAction(
  types.GET_COURSE_DETAIL_REQUEST,
  types.GET_COURSE_DETAIL_SUCCESS,
  types.GET_COURSE_DETAIL_FAILURE,
)<
  models.CourseDetailRequest,
  models.CourseDetailResponse,
  AxiosError<IAxiosError>
>();

// [Course API] Create Course
export const createCourse = createAsyncAction(
  types.CREATE_COURSE_REQUEST,
  types.CREATE_COURSE_SUCCESS,
  types.CREATE_COURSE_FAILURE,
)<
  models.CreateCourseRequest,
  models.CreateCourseResponse,
  AxiosError<IAxiosError>
>();

// [Course API] Get Course Subject
export const courseSubject = createAsyncAction(
  types.GET_COURSE_SUBJECT_REQUEST,
  types.GET_COURSE_SUBJECT_SUCCESS,
  types.GET_COURSE_SUBJECT_FAILURE,
)<
  models.CourseSubjectRequest,
  models.CourseSubjectResponse,
  AxiosError<IAxiosError>
>();

// [Course API] Get Course Subject List
export const courseSubjectList = createAsyncAction(
  types.GET_COURSE_SUBJECT_LIST_REQUEST,
  types.GET_COURSE_SUBJECT_LIST_SUCCESS,
  types.GET_COURSE_SUBJECT_LIST_FAILURE,
)<
  models.CourseSubjectListRequest,
  models.CourseSubjectListResponse,
  AxiosError<IAxiosError>
>();
