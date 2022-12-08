/**
 * @app VietDangDental
 * @author TruongTV
 */

import * as Yup from 'yup'
import { isNumeric } from '@/bin/common/function/validations'

export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Tên đăng nhập không được để trống!').nullable(),
  password: Yup.string().required('Mật khẩu không được để trống!').nullable(),
  firstName: Yup.string().required('Họ và tên lót không được để trống!').nullable(),
  lastName: Yup.string().required('Tên không được để trống!').nullable(),
  email: Yup.string().required('Email không được để trống!').nullable(),
  phone: Yup.string()
    .test('phone', 'Vui lòng nhập số!', (value) => {
      return !!value && isNumeric(value)
    })
    .nullable(),
})
