/**
 * @app VuonDau
 * @author phutruongck
 */

import {ResponseState} from '@custom-type';
import {
  // [Authentication API] Student Register
  StudentRegisterResponse as ApiStudentRegisterResponse,
  StudentRegisterRequest as ApiStudentRegisterRequest,

  // [Authentication API] Teacher Register
  TeacherRegisterResponse as ApiTeacherRegisterResponse,
  TeacherRegisterRequest as ApiTeacherRegisterRequest,
} from '@/services/authentication/models';

// [Authentication API] Student Register
export type StudentRegisterResponse = ApiStudentRegisterResponse;
export type StudentRegisterRequest = ApiStudentRegisterRequest;
export const initStudentRegisterResponse: StudentRegisterResponse = {
  status: '',
  data: {
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    id: 0,
  },
};

// [Authentication API] Teacher Register
export type TeacherRegisterResponse = ApiTeacherRegisterResponse;
export type TeacherRegisterRequest = ApiTeacherRegisterRequest;
export const initTeacherRegisterResponse: TeacherRegisterResponse = {
  status: '',
  data: false,
};

export type ModelState = {
  // [Authentication API] Student Register
  studentRegister: ResponseState<StudentRegisterResponse>;

  // [Authentication API] Teacher Register
  teacherRegister: ResponseState<TeacherRegisterResponse>;
};

export const initState: ModelState = {
  // [Authentication API] Student Register
  studentRegister: {
    response: initStudentRegisterResponse,
    isLoading: false,
  },

  // [Authentication API] Teacher Register
  teacherRegister: {
    response: initTeacherRegisterResponse,
    isLoading: false,
  },
};

declare module '../types' {
  export interface GlobalState {
    authentication: ModelState;
  }
}
