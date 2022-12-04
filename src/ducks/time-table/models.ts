/**
 * @app VuonDau
 * @author phutruongck
 */

import {ResponseState} from '@custom-type';
import {
  // [Time Table API] Get All Day Of Week
  DayOfWeekResponse as ApiDayOfWeekResponse,
  DayOfWeekRequest as ApiDayOfWeekRequest,

  // [Time Table API] Get All Slot
  SlotResponse as ApiSlotResponse,
  SlotRequest as ApiSlotRequest,

  // [Time Table API] Create Time Table
  CreateTimeTableResponse as ApiCreateTimeTableResponse,
  CreateTimeTableRequest as ApiCreateTimeTableRequest,
} from '@/services/time-table/models';

// [Time Table API] Get All Day Of Week
export type DayOfWeekResponse = ApiDayOfWeekResponse;
export type DayOfWeekRequest = ApiDayOfWeekRequest;
export const initDayOfWeekResponse: DayOfWeekResponse = {
  status: '',
  data: [],
};

// [Time Table API] Get All Slot
export type SlotResponse = ApiSlotResponse;
export type SlotRequest = ApiSlotRequest;
export const initSlotResponse: SlotResponse = {
  status: '',
  data: [],
};

// [Time Table API] Create Time Table
export type CreateTimeTableResponse = ApiCreateTimeTableResponse;
export type CreateTimeTableRequest = ApiCreateTimeTableRequest;
export const initCreateTimeTableResponse: CreateTimeTableResponse = {
  status: '',
  data: 0,
};

export type ModelState = {
  // [Time Table API] Get All Day Of Week
  dayOfWeek: ResponseState<DayOfWeekResponse>;

  // [Time Table API] Get All Slot
  slot: ResponseState<SlotResponse>;

  // [Time Table API] Create Time Table
  createTimeTable: ResponseState<CreateTimeTableResponse>;
};

export const initState: ModelState = {
  // [Time Table API] Get All Day Of Week
  dayOfWeek: {
    response: initDayOfWeekResponse,
    isLoading: false,
  },

  // [Time Table API] Get All Slot
  slot: {
    response: initSlotResponse,
    isLoading: false,
  },

  // [Time Table API] Create Time Table
  createTimeTable: {
    response: initCreateTimeTableResponse,
    isLoading: false,
  },
};

declare module '../types' {
  export interface GlobalState {
    timeTable: ModelState;
  }
}
