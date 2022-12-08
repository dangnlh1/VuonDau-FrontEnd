/**
 * @app VuonDau
 * @author phutruongck
 */

import {
  CommonResponsePaginate,
  CommonResponse,
  CommonRequest,
  CourseDetail,
} from '@custom-type';

export type CourseResponse = CommonResponse<CourseDetail>;
export type CourseRequest = CommonRequest<{
  courseId?: number | string;
}>;

export type CreateCourseResponse = CommonResponse<boolean>;
export type CreateCourseRequest = CommonRequest<{
  teacherIds: number[];
  description: string;
  subjectId: number;
  title: string;
  name: string;
  code: string;
}>;

export type CourseSubjectResponse = CommonResponsePaginate<CourseDetail>;
export type CourseSubjectRequest = CommonRequest<{
  subjectId: number;
}>;

export type CourseSubjectListResponse = CommonResponse<CourseDetail[]>;
export type CourseSubjectListRequest = CommonRequest<{
  subjectId: number;
}>;
