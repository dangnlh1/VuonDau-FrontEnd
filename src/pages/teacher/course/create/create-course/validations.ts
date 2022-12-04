/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên khoá học không được để trống!'),
  code: Yup.string().required('Mã khoá học không được để trống!'),
  description: Yup.string().required('Mô tả khoá học không được để trống!'),
  title: Yup.string().required('Tiêu đề khoá học không được để trống!'),
  subjectId: Yup.string().required('Môn học chưa được chọn!').nullable(),
});
