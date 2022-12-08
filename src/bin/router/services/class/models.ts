/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonResponse, CommonRequest, ClassDetail} from '@custom-type';

export type ClassResponse = CommonResponse<ClassDetail>;
export type ClassRequest = CommonRequest<{
  classId?: number | string;
}>;
