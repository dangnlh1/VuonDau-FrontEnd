/**
 * @app VietDangDental
 * @author TruongTV
 */

export interface DefaultValues {
  trainingSchoolName: string;
  teachingProvince: string;
  currentAddress: string;
  fullName: string;
  domicile: string;
  birthDay: Date;
  majors: string;
  gender: string;
  email: string;
  phone: string;
  voice: string;
  level: string;
}

export const initDefaultValues: DefaultValues = {
  trainingSchoolName: '',
  teachingProvince: '',
  birthDay: new Date(),
  currentAddress: '',
  fullName: '',
  domicile: '',
  majors: '',
  gender: '',
  email: '',
  phone: '',
  voice: '',
  level: '',
};
