import { City } from '@/models/common'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import axiosClient from './axiosClient'

export interface UploadRegisterProfileImagePayload {
  formData: FormData
  id: number
}

export const accountDetailApi = {
  registerTutor(payload: TeacherRegisterPayload) {
    return axiosClient.post('/account-detail/register-tutor', payload)
  },

  getCityAll(): Promise<City[]> {
    return axiosClient.get('/account-detail/provinces')
  },

  uploadRegisterProfileImage(data: UploadRegisterProfileImagePayload): Promise<any> {
    return axiosClient.post(`/account-detail/${data.id}/image-register-profile`, data.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
