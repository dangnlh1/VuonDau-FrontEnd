import { City } from '@/models/common'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import axiosClient from './axiosClient'

const url = `/account-detail`

export interface UploadRegisterProfileImagePayload {
  formData: FormData
  id: number
}

export const accountDetailApi = {
  registerTutor(payload: TeacherRegisterPayload): Promise<number> {
    return axiosClient.post(`${url}/register-tutor`, payload)
  },

  getCityAll(): Promise<City[]> {
    return axiosClient.get(`${url}/provinces`)
  },

  uploadRegisterProfileImage(data: UploadRegisterProfileImagePayload): Promise<any> {
    return axiosClient.post(`${url}/${data.id}/image-register-profile`, data.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
