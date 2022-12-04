/**
 * @app VuonDau
 * @author phutruongck
 */

// [Course API] Get Course Detail
export const GET_COURSE_DETAIL_REQUEST =
  'course/getCourseDetailRequest' as const;
export const GET_COURSE_DETAIL_SUCCESS =
  'course/getCourseDetailSuccess' as const;
export const GET_COURSE_DETAIL_FAILURE =
  'course/getCourseDetailFailure' as const;

// [Course API] Create Course
export const CREATE_COURSE_REQUEST = 'course/createCourseRequest' as const;
export const CREATE_COURSE_SUCCESS = 'course/createCourseSuccess' as const;
export const CREATE_COURSE_FAILURE = 'course/createCourseFailure' as const;

// [Course API] Get Course Subject
export const GET_COURSE_SUBJECT_REQUEST =
  'course/getCourseSubjectRequest' as const;
export const GET_COURSE_SUBJECT_SUCCESS =
  'course/getCourseSubjectSuccess' as const;
export const GET_COURSE_SUBJECT_FAILURE =
  'course/getCourseSubjectFailure' as const;

// [Course API] Get Course Subject List
export const GET_COURSE_SUBJECT_LIST_REQUEST =
  'course/getCourseSubjectListRequest' as const;
export const GET_COURSE_SUBJECT_LIST_SUCCESS =
  'course/getCourseSubjectListSuccess' as const;
export const GET_COURSE_SUBJECT_LIST_FAILURE =
  'course/getCourseSubjectListFailure' as const;

export type Types =
  | typeof GET_COURSE_DETAIL_REQUEST
  | typeof GET_COURSE_DETAIL_SUCCESS
  | typeof GET_COURSE_DETAIL_FAILURE
  | typeof CREATE_COURSE_REQUEST
  | typeof CREATE_COURSE_SUCCESS
  | typeof CREATE_COURSE_FAILURE
  | typeof GET_COURSE_SUBJECT_REQUEST
  | typeof GET_COURSE_SUBJECT_SUCCESS
  | typeof GET_COURSE_SUBJECT_FAILURE
  | typeof GET_COURSE_SUBJECT_LIST_REQUEST
  | typeof GET_COURSE_SUBJECT_LIST_SUCCESS
  | typeof GET_COURSE_SUBJECT_LIST_FAILURE;
