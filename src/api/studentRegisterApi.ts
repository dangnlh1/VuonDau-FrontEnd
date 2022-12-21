import { StudentRegisterPayload } from '@/models/studentRegister'
import axiosClient from './axiosClient'

export const studentAccountApi = {
  registerStudent(params: StudentRegisterPayload): Promise<any> {
    return axiosClient.post('/students/account', params)
  },

  getStudentClass(id:number): Promise<any>{
    return axiosClient.get('')
  }

}
