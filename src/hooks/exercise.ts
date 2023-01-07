import { exercisesApi } from '@/api/exerciseApi'
import { useQuery } from 'react-query'

export default function useExerciseByStudent(classId: number) {
  const queryKey = 'exercise'
  const { data, error, isLoading } = useQuery(queryKey, () => exercisesApi.getAllByStudent(classId))
  return {
    exercise: data,
    error,
    isLoading,
  }
}
