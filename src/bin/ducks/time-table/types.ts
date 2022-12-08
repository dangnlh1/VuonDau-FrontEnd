/**
 * @app VuonDau
 * @author phutruongck
 */

// [Time Table API] Get All Day Of Week
export const GET_ALL_DAY_OF_WEEK_REQUEST =
  'timeTable/getAllDayOfWeekRequest' as const;
export const GET_ALL_DAY_OF_WEEK_SUCCESS =
  'timeTable/getAllDayOfWeekSuccess' as const;
export const GET_ALL_DAY_OF_WEEK_FAILURE =
  'timeTable/getAllDayOfWeekFailure' as const;

// [Time Table API] Get All Slot
export const GET_ALL_SLOT_REQUEST = 'timeTable/getAllSlotRequest' as const;
export const GET_ALL_SLOT_SUCCESS = 'timeTable/getAllSlotSuccess' as const;
export const GET_ALL_SLOT_FAILURE = 'timeTable/getAllSlotFailure' as const;

// [Time Table API] Create Time Table
export const CREATE_TIME_TABLE_REQUEST =
  'timeTable/createTimeTableRequest' as const;
export const CREATE_TIME_TABLE_SUCCESS =
  'timeTable/createTimeTableSuccess' as const;
export const CREATE_TIME_TABLE_FAILURE =
  'timeTable/createTimeTableFailure' as const;

export type Types =
  | typeof GET_ALL_DAY_OF_WEEK_REQUEST
  | typeof GET_ALL_DAY_OF_WEEK_SUCCESS
  | typeof GET_ALL_DAY_OF_WEEK_FAILURE
  | typeof GET_ALL_SLOT_REQUEST
  | typeof GET_ALL_SLOT_SUCCESS
  | typeof GET_ALL_SLOT_FAILURE
  | typeof CREATE_TIME_TABLE_REQUEST
  | typeof CREATE_TIME_TABLE_SUCCESS
  | typeof CREATE_TIME_TABLE_FAILURE;
