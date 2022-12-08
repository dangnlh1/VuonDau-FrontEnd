/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Subject API] Get List Subject
export const listSubject = createAsyncAction(
  types.GET_LIST_SUBJECT_REQUEST,
  types.GET_LIST_SUBJECT_SUCCESS,
  types.GET_LIST_SUBJECT_FAILURE,
)<models.SubjectRequest, models.SubjectResponse, AxiosError<IAxiosError>>();
