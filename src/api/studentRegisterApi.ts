import { StudentRegisterPayload } from '@/models/studentRegister'
import axiosClient from './axiosClient'

export const studentRegisterApi = {
  post(params: StudentRegisterPayload): Promise<any> {
    return axiosClient.post('/students/account', params)
  },
}
