/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Search API] Search Course
export const searchCourse = createAsyncAction(
  types.SEARCH_COURSE_REQUEST,
  types.SEARCH_COURSE_SUCCESS,
  types.SEARCH_COURSE_FAILURE,
)<
  models.SearchCourseRequest,
  models.SearchCourseResponse,
  AxiosError<IAxiosError>
>();
