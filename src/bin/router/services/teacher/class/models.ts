/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonResponse, CommonRequest, IClass, ClassDetail} from '@custom-type';

export type CreateClassResponse = CommonResponse<boolean>;
export type CreateClassRequest = CommonRequest<{
  maxNumberStudent: number;
  numberStudent: number;
  subjectId: number;
  startDate: string;
  courseId: number;
  endDate: string;
  name: string;
  code: string;
}>;

export type AllClassResponse = CommonResponse<IClass[]>;
export type AllClassRequest = CommonRequest<{
  status?: string;
}>;

export type ClassDetailResponse = CommonResponse<ClassDetail>;
export type ClassDetailRequest = CommonRequest<{
  id: number | string;
}>;
