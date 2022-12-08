/**
 * @app VuonDau
 * @author phutruongck
 */

// [Search API] Search Course
export const SEARCH_COURSE_REQUEST = 'search/searchCourseRequest' as const;
export const SEARCH_COURSE_SUCCESS = 'search/searchCourseSuccess' as const;
export const SEARCH_COURSE_FAILURE = 'search/searchCourseFailure' as const;

export type Types =
  | typeof SEARCH_COURSE_REQUEST
  | typeof SEARCH_COURSE_SUCCESS
  | typeof SEARCH_COURSE_FAILURE;
