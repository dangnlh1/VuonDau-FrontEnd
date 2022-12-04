/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  archetypeName: Yup.string().required('Tên không được để trống!'),
  archetypeCode: Yup.string().required('Mã không được để trống!'),
});
