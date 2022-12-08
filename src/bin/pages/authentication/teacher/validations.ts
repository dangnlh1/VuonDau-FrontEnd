/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup'
import { isNumeric } from '@/bin/common/function/validations'

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email không được để trống!').nullable(),
  phone: Yup.string()
    .test('phone', 'Vui lòng nhập số!', (value) => {
      return !!value && isNumeric(value)
    })
    .nullable(),
})
