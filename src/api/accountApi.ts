import { InfoPayload } from '@/models/info'
import axiosClient from './axiosClient'

const url = `/accounts`

export const accountApi = {
  getAccountDetailAfterLogin(): Promise<InfoPayload> {
    return axiosClient.get(`${url}/detail`)
  },
}
