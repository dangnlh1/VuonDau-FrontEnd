/**
 * @app VietDangDental
 * @author TruongTV
 */

export interface DefaultValues {
  maxNumberStudent: number;
  numberStudent: number;
  subjectId: string;
  startDate: Date;
  endDate: Date;
  level: string;
  name: string;
  code: string;
}

export const initDefaultValues: DefaultValues = {
  startDate: new Date(),
  maxNumberStudent: 0,
  endDate: new Date(),
  numberStudent: 0,
  subjectId: '',
  level: '',
  name: '',
  code: '',
};
