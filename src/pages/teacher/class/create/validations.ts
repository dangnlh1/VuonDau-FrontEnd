/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên lớp không được để trống!'),
  code: Yup.string().required('Mã lớp không được để trống!'),
  subjectId: Yup.string().required('Môn học chưa được chọn!').nullable(),
  numberStudent: Yup.number().test(
    'numberStudent',
    'Số lượng học sinh phải lớn hơn 0!',
    (value) => {
      return value > 0;
    },
  ),
  maxNumberStudent: Yup.number().test(
    'maxNumberStudent',
    'Giới hạn số lượng học sinh phải lớn hơn 0!',
    (value) => {
      return value > 0;
    },
  ),
  startDate: Yup.string()
    .required('Thời gian bắt đầu không được để trống!')
    .nullable(),
  endDate: Yup.string()
    .required('Thời gian kết thúc không được để trống!')
    .nullable(),
});
