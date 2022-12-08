/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonResponse, CommonRequest, ISubject} from '@custom-type';

export type SubjectResponse = CommonResponse<ISubject[]>;
export type SubjectRequest = CommonRequest<{}>;
