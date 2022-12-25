import { courseApi } from '@/api/courseApi'
import { FilterParams, Pagination } from '@/models/common'
import { CreateNewCoursePayload } from '@/models/course'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function useCourse(params: FilterParams) {
  const queryKey = ['/course', params]
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery(queryKey, () => courseApi.getAll(params))

  const createNewCourse = useMutation(
    (data: CreateNewCoursePayload) => courseApi.createNewCourse(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  return {
    isLoading,
    error,
    courseList: data?.items,
    createNewCourse,
    pagination: {
      page: data?.currentPage,
      size: data?.pageSize,
      totalPages: data?.totalPages,
      total: data?.totalItems,
    } as Pagination,
  }
}
