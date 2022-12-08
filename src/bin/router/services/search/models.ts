/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonRequest, CourseItem, CommonResponsePaginate} from '@custom-type';

export type CourseResponse = CommonResponsePaginate<CourseItem>;
export type CourseRequest = CommonRequest<{}>;
