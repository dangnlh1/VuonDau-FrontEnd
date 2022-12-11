import { BannerPayload } from '@/models/banner'
import { ListResponse } from '@/models/common'
import axiosClient from './axiosClient'

export const bannerApi = {
  getAll(): Promise<ListResponse<BannerPayload>> {
    return axiosClient.get('/pano/panos')
  },
}
