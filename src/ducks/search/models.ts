/**
 * @app VuonDau
 * @author phutruongck
 */

import {initPaginateCommon} from '@/common/constants';
import {ResponseState} from '@custom-type';
import {
  // [Search API] Search Course
  CourseResponse as ApiCourseResponse,
  CourseRequest as ApiCourseRequest,
} from '@/services/search/models';

// [Search API] Search Course
export type SearchCourseResponse = ApiCourseResponse;
export type SearchCourseRequest = ApiCourseRequest;
export const initSearchCourseResponse: SearchCourseResponse = {
  status: '',
  data: initPaginateCommon,
};

export type ModelState = {
  // [Search API] Search Course
  searchCourse: ResponseState<SearchCourseResponse>;
};

export const initState: ModelState = {
  // [Search API] Search Course
  searchCourse: {
    response: initSearchCourseResponse,
    isLoading: false,
  },
};

declare module '../types' {
  export interface GlobalState {
    search: ModelState;
  }
}
