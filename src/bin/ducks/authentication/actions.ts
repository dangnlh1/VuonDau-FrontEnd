/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Authentication API] Student Register
export const studentRegister = createAsyncAction(
  types.STUDENT_REGISTER_REQUEST,
  types.STUDENT_REGISTER_SUCCESS,
  types.STUDENT_REGISTER_FAILURE,
)<
  models.StudentRegisterRequest,
  models.StudentRegisterResponse,
  AxiosError<IAxiosError>
>();

// [Authentication API] Teacher Register
export const teacherRegister = createAsyncAction(
  types.TEACHER_REGISTER_REQUEST,
  types.TEACHER_REGISTER_SUCCESS,
  types.TEACHER_REGISTER_FAILURE,
)<
  models.TeacherRegisterRequest,
  models.TeacherRegisterResponse,
  AxiosError<IAxiosError>
>();
