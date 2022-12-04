/**
 * @app VuonDau
 * @author phutruongck
 */

import {
  CommonResponsePaginate,
  CommonResponse,
  CommonRequest,
  CourseItem,
} from '@custom-type';

export type CommonModelResponse = CommonResponse<{
  id: string;
  name: string;
}>;
export type CommonModelRequest = CommonRequest<{}>;

export type CourseResponse = CommonResponsePaginate<CourseItem>;
export type CourseRequest = CommonRequest<{}>;
