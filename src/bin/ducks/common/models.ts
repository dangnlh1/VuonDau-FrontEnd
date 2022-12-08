/**
 * @app VuonDau
 * @author phutruongck
 */

import { initPaginateCommon } from '@/bin/common/constants'
import { ResponseState } from '@custom-type'
import {
  // [Common API] Get All Course
  CourseResponse as ApiCourseResponse,
  CourseRequest as ApiCourseRequest,
} from '@/services/common/models'

// [Common API] Get All Course
export type CourseResponse = ApiCourseResponse
export type CourseRequest = ApiCourseRequest
export const initCourseResponse: CourseResponse = {
  status: '',
  data: initPaginateCommon,
}

export type ModelState = {
  // [Common API] Get All Course
  allCourse: ResponseState<CourseResponse>
}

export const initCommonState: ModelState = {
  // [Common API] Get All Course
  allCourse: {
    response: initCourseResponse,
    isLoading: false,
  },
}

declare module '../types' {
  export interface GlobalState {
    common: ModelState
  }
}
