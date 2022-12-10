import { BannerPayload } from '@/models/banner'
import axiosClient from './axiosClient'

export const bannerApi = {
  getAll(): Promise<BannerPayload[]> {
    return axiosClient.get('/pano/panos')
  },
}
