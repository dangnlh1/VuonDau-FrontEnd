/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Common API] Get All Course
export const allCourse = createAsyncAction(
  types.GET_ALL_COURSE_REQUEST,
  types.GET_ALL_COURSE_SUCCESS,
  types.GET_ALL_COURSE_FAILURE,
)<models.CourseRequest, models.CourseResponse, AxiosError<IAxiosError>>();
