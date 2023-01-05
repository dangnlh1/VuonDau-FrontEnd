import { classApi } from '@/api/classApi'
import { ClassStatus } from '@/models/class'
import { useQuery } from 'react-query'

export function useClassesByStudentNoPaging(status: ClassStatus) {
  const queryKey = ['/classesByStudentNoPaging', status]

  const { data, isLoading, error } = useQuery(queryKey, () =>
    classApi.getClassesByAccountNoPaging(status)
  )

  return {
    classes: data,
    isLoading,
    error,
  }
}
