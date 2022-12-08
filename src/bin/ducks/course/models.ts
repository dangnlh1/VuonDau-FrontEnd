/**
 * @app VuonDau
 * @author phutruongck
 */

import { initCourseDetail, initPaginateCommon } from '@/bin/common/constants'
import { ResponseState } from '@custom-type'
import {
  // [Course API] Get Course Detail
  CourseResponse as ApiCourseResponse,
  CourseRequest as ApiCourseRequest,

  // [Course API] Create Course
  CreateCourseResponse as ApiCreateCourseResponse,
  CreateCourseRequest as ApiCreateCourseRequest,

  // [Course API] Get Course Subject
  CourseSubjectResponse as ApiCourseSubjectResponse,
  CourseSubjectRequest as ApiCourseSubjectRequest,

  // [Course API] Get Course Subject List
  CourseSubjectListResponse as ApiCourseSubjectListResponse,
  CourseSubjectListRequest as ApiCourseSubjectListRequest,
} from '@/services/course/models'

// [Course API] Get Course Detail
export type CourseDetailResponse = ApiCourseResponse
export type CourseDetailRequest = ApiCourseRequest
export const initCourseDetailResponse: CourseDetailResponse = {
  status: '',
  data: initCourseDetail,
}

// [Course API] Create Course
export type CreateCourseResponse = ApiCreateCourseResponse
export type CreateCourseRequest = ApiCreateCourseRequest
export const initCreateCourseResponse: CreateCourseResponse = {
  status: '',
  data: false,
}

// [Course API] Get Course Subject
export type CourseSubjectResponse = ApiCourseSubjectResponse
export type CourseSubjectRequest = ApiCourseSubjectRequest
export const initCourseSubjectResponse: CourseSubjectResponse = {
  status: '',
  data: initPaginateCommon,
}

// [Course API] Get Course Subject List
export type CourseSubjectListResponse = ApiCourseSubjectListResponse
export type CourseSubjectListRequest = ApiCourseSubjectListRequest
export const initCourseSubjectListResponse: CourseSubjectListResponse = {
  status: '',
  data: [],
}

export type ModelState = {
  // [Course API] Get Course Detail
  courseDetail: ResponseState<CourseDetailResponse>

  // [Course API] Create Course
  createCourse: ResponseState<CreateCourseResponse>

  // [Course API] Get Course Subject
  courseSubject: ResponseState<CourseSubjectResponse>

  // [Course API] Get Course Subject List
  courseSubjectList: ResponseState<CourseSubjectListResponse>
}

export const initState: ModelState = {
  // [Course API] Get Course Detail
  courseDetail: {
    response: initCourseDetailResponse,
    isLoading: false,
  },

  // [Course API] Create Course
  createCourse: {
    response: initCreateCourseResponse,
    isLoading: false,
  },

  // [Course API] Get Course Subject
  courseSubject: {
    response: initCourseSubjectResponse,
    isLoading: false,
  },

  // [Course API] Get Course Subject List
  courseSubjectList: {
    response: initCourseSubjectListResponse,
    isLoading: false,
  },
}

declare module '../types' {
  export interface GlobalState {
    course: ModelState
  }
}
