/**
 * @app VuonDau
 * @author phutruongck
 */

// [Class API] Create Class
export const CREATE_CLASS_REQUEST = 'class/createClassRequest' as const;
export const CREATE_CLASS_SUCCESS = 'class/createClassSuccess' as const;
export const CREATE_CLASS_FAILURE = 'class/createClassFailure' as const;

// [Class API] Get All Class
export const GET_ALL_CLASS_REQUEST = 'class/getAllClassRequest' as const;
export const GET_ALL_CLASS_SUCCESS = 'class/getAllClassSuccess' as const;
export const GET_ALL_CLASS_FAILURE = 'class/getAllClassFailure' as const;

// [Class API] Get Class Detail
export const GET_CLASS_DETAIL_REQUEST = 'class/getClassDetailRequest' as const;
export const GET_CLASS_DETAIL_SUCCESS = 'class/getClassDetailSuccess' as const;
export const GET_CLASS_DETAIL_FAILURE = 'class/getClassDetailFailure' as const;

export type Types =
  | typeof CREATE_CLASS_REQUEST
  | typeof CREATE_CLASS_SUCCESS
  | typeof CREATE_CLASS_FAILURE
  | typeof GET_ALL_CLASS_REQUEST
  | typeof GET_ALL_CLASS_SUCCESS
  | typeof GET_ALL_CLASS_FAILURE
  | typeof GET_CLASS_DETAIL_REQUEST
  | typeof GET_CLASS_DETAIL_SUCCESS
  | typeof GET_CLASS_DETAIL_FAILURE;
