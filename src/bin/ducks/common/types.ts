/**
 * @app VuonDau
 * @author phutruongck
 */

// [Common API] Get All Course
export const GET_ALL_COURSE_REQUEST = 'common/getAllCourseRequest' as const;
export const GET_ALL_COURSE_SUCCESS = 'common/getAllCourseSuccess' as const;
export const GET_ALL_COURSE_FAILURE = 'common/getAllCourseFailure' as const;

export type Types =
  | typeof GET_ALL_COURSE_REQUEST
  | typeof GET_ALL_COURSE_SUCCESS
  | typeof GET_ALL_COURSE_FAILURE;
