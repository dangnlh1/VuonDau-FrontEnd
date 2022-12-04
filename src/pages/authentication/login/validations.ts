/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email không được để trống!'),
  password: Yup.string().required('Mật khẩu không được để trống!'),
});
