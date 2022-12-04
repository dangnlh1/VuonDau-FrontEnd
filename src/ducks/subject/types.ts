/**
 * @app VuonDau
 * @author phutruongck
 */

// [Subject API] Get List Subject
export const GET_LIST_SUBJECT_REQUEST =
  'subject/getListSubjectRequest' as const;
export const GET_LIST_SUBJECT_SUCCESS =
  'subject/getListSubjectSuccess' as const;
export const GET_LIST_SUBJECT_FAILURE =
  'subject/getListSubjectFailure' as const;

export type Types =
  | typeof GET_LIST_SUBJECT_REQUEST
  | typeof GET_LIST_SUBJECT_SUCCESS
  | typeof GET_LIST_SUBJECT_FAILURE;
