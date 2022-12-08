/**
 * @app VietDangDental
 * @author TruongTV
 */

export interface DefaultValues {
  description: string;
  subjectId: number;
  title: string;
  name: string;
  code: string;
}

export const initDefaultValues: DefaultValues = {
  description: '',
  subjectId: 0,
  title: '',
  code: '',
  name: '',
};
