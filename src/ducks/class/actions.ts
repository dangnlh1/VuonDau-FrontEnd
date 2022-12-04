/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Class API] Create Class
export const createClass = createAsyncAction(
  types.CREATE_CLASS_REQUEST,
  types.CREATE_CLASS_SUCCESS,
  types.CREATE_CLASS_FAILURE,
)<
  models.CreateClassRequest,
  models.CreateClassResponse,
  AxiosError<IAxiosError>
>();

// [Class API] Get All Class
export const allClass = createAsyncAction(
  types.GET_ALL_CLASS_REQUEST,
  types.GET_ALL_CLASS_SUCCESS,
  types.GET_ALL_CLASS_FAILURE,
)<models.AllClassRequest, models.AllClassResponse, AxiosError<IAxiosError>>();

// [Class API] Get Class Detail
export const classDetail = createAsyncAction(
  types.GET_CLASS_DETAIL_REQUEST,
  types.GET_CLASS_DETAIL_SUCCESS,
  types.GET_CLASS_DETAIL_FAILURE,
)<
  models.ClassDetailRequest,
  models.ClassDetailResponse,
  AxiosError<IAxiosError>
>();
