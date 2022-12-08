/**
 * @app VietDangDental
 * @author TruongTV
 */

export interface DefaultValues {
  firstName: string;
  username: string;
  password: string;
  lastName: string;
  email: string;
  phone: string;
}

export const initDefaultValues: DefaultValues = {
  firstName: '',
  lastName: '',
  password: '',
  username: '',
  email: '',
  phone: '',
};
