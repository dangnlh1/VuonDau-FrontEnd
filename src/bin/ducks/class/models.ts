/**
 * @app VuonDau
 * @author phutruongck
 */

import { initClassDetail } from '@/bin/common/constants'
import { ResponseState } from '@custom-type'
import {
  // [Class API] Create Class
  CreateClassResponse as ApiCreateClassResponse,
  CreateClassRequest as ApiCreateClassRequest,

  // [Class API] Get All Class
  AllClassResponse as ApiAllClassResponse,
  AllClassRequest as ApiAllClassRequest,

  // [Class API] Get Class Detail
  ClassDetailResponse as ApiClassDetailResponse,
  ClassDetailRequest as ApiClassDetailRequest,
} from '@/services/teacher/class/models'

// [Class API] Create Class
export type CreateClassResponse = ApiCreateClassResponse
export type CreateClassRequest = ApiCreateClassRequest
export const initCreateClassResponse: CreateClassResponse = {
  status: '',
  data: false,
}

// [Class API] Get All Class
export type AllClassResponse = ApiAllClassResponse
export type AllClassRequest = ApiAllClassRequest
export const initAllClassResponse: AllClassResponse = {
  status: '',
  data: [],
}

// [Class API] Get Class Detail
export type ClassDetailResponse = ApiClassDetailResponse
export type ClassDetailRequest = ApiClassDetailRequest
export const initClassDetailResponse: ClassDetailResponse = {
  status: '',
  data: initClassDetail,
}

export type ModelState = {
  // [Class API] Create Class
  createClass: ResponseState<CreateClassResponse>

  // [Class API] Get All Class
  allClass: ResponseState<AllClassResponse>

  // [Class API] Get Class Detail
  classDetail: ResponseState<ClassDetailResponse>
}

export const initState: ModelState = {
  // [Class API] Create Class
  createClass: {
    response: initCreateClassResponse,
    isLoading: false,
  },

  // [Class API] Get All Class
  allClass: {
    response: initAllClassResponse,
    isLoading: false,
  },

  // [Class API] Get Class Detail
  classDetail: {
    response: initClassDetailResponse,
    isLoading: false,
  },
}

declare module '../types' {
  export interface GlobalState {
    class: ModelState
  }
}
