/**
 * @app VuonDau
 * @author phutruongck
 */

import {CommonResponse, CommonRequest} from '@custom-type';

export type StudentRegisterResponse = CommonResponse<{
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}>;
export type StudentRegisterRequest = CommonRequest<{
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  account: {
    username: string;
    password: string;
  };
}>;

export type TeacherRegisterResponse = CommonResponse<boolean>;
export type TeacherRegisterRequest = CommonRequest<{
  trainingSchoolName: string;
  teachingProvince: string;
  currentAddress: string;
  fullName: string;
  birthDay: string;
  domicile: string;
  idCard?: string;
  gender: string;
  majors: string;
  email: string;
  phone: string;
  voice: string;
  level: string;
}>;
