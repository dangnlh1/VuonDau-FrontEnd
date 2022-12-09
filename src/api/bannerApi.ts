import { BannerPayload } from '@/models/banner'
import { ListResponse } from '@/models/common'
import { Course } from '@/models/course'
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
