import { timeTableApi } from '@/api/timeTableApi'
import { CreateTimeTableRequest } from '@/models/timeTable'

import { useMutation, useQueryClient } from 'react-query'

export function useTimeTable() {
  const queryKey = ['/timetable']
  const queryClient = useQueryClient()

  const createTimeTable = useMutation(
    (formData: CreateTimeTableRequest) => timeTableApi.create(formData),

    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )
  return { createTimeTable }
}
