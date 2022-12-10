import { BannerPayload } from '@/models/banner'
import axiosClient from './axiosClient'

interface BannerResponse {
  status: string
  data: BannerPayload[]
}

export const bannerApi = {
  getAll(): Promise<BannerResponse> {
    return axiosClient.get('/pano/panos')
  },
}
