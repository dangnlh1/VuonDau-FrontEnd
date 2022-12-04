/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  slotNumber: Yup.number().test(
    'slotNumber',
    'Số lượng phải lớn hơn 0!',
    (value) => {
      return value > 0;
    },
  ),
  slotId: Yup.string().required('Slot không được để trống!'),
  dayOfWeekId: Yup.string().required('Ngày không được để trống!'),
});
