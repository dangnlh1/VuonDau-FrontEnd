import { Resource } from '@/models/class'
import axiosClient from './axiosClient'
const url = '/exercises'
export const exercisesApi = {
  getAllByStudent(classId: number): Promise<Resource[]> {
    return axiosClient.get(`${url}/${classId}/student`)
  },
}
