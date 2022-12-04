/**
 * @app VuonDau
 * @author phutruongck
 */

import {ResponseState} from '@custom-type';
import {
  // [Subject API] Get List Subject
  SubjectResponse as ApiSubjectResponse,
  SubjectRequest as ApiSubjectRequest,
} from '@/services/teacher/subject/models';

// [Subject API] Get List Subject
export type SubjectResponse = ApiSubjectResponse;
export type SubjectRequest = ApiSubjectRequest;
export const initSubjectResponse: SubjectResponse = {
  status: '',
  data: [],
};

export type ModelState = {
  // [Subject API] Get List Subject
  listSubject: ResponseState<SubjectResponse>;
};

export const initState: ModelState = {
  // [Subject API] Get List Subject
  listSubject: {
    response: initSubjectResponse,
    isLoading: false,
  },
};

declare module '../types' {
  export interface GlobalState {
    subject: ModelState;
  }
}
