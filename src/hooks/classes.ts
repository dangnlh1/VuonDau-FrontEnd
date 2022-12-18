import { classApi } from '@/api/classApi'
import { AddEditClassFormPayload } from '@/models/class'
import { FilterParams, Pagination } from '@/models/common'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function useClasses(params: FilterParams) {
  const queryKey = ['/classes', params]
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(queryKey, () => classApi.getAll(params))

  const createClassByTeacherRequest = useMutation(
    (data: AddEditClassFormPayload) => classApi.createClassByTeacherRequest(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  return {
    isLoading,
    error,
    classList: data?.items,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
    createClassByTeacherRequest,
  }
}
