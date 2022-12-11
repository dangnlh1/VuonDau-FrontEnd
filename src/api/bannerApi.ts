import { BannerPayload } from '@/models/banner'
import { FilterParams, ListResponse } from '@/models/common'
import axiosClient from './axiosClient'

export const bannerApi = {
  getAll(params?: FilterParams): Promise<ListResponse<BannerPayload>> {
    return axiosClient.get('/pano/', { params })
  },
}
