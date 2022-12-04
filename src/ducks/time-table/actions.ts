/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAsyncAction} from 'typesafe-actions';
import {IAxiosError} from '@custom-type';
import {AxiosError} from '../axios';
import * as models from './models';
import * as types from './types';

// [Time Table API] Get All Day Of Week
export const dayOfWeek = createAsyncAction(
  types.GET_ALL_DAY_OF_WEEK_REQUEST,
  types.GET_ALL_DAY_OF_WEEK_SUCCESS,
  types.GET_ALL_DAY_OF_WEEK_FAILURE,
)<models.DayOfWeekRequest, models.DayOfWeekResponse, AxiosError<IAxiosError>>();

// [Time Table API] Get All Slot
export const slot = createAsyncAction(
  types.GET_ALL_SLOT_REQUEST,
  types.GET_ALL_SLOT_SUCCESS,
  types.GET_ALL_SLOT_FAILURE,
)<models.SlotRequest, models.SlotResponse, AxiosError<IAxiosError>>();

// [Time Table API] Create Time Table
export const createTimeTable = createAsyncAction(
  types.CREATE_TIME_TABLE_REQUEST,
  types.CREATE_TIME_TABLE_SUCCESS,
  types.CREATE_TIME_TABLE_FAILURE,
)<
  models.CreateTimeTableRequest,
  models.CreateTimeTableResponse,
  AxiosError<IAxiosError>
>();
