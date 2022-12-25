import { slotApi } from '@/api/slotApi'
import { useQuery } from 'react-query'

export function useSlot() {
  const queryKey = ['slots']

  const { data, isLoading, error } = useQuery(queryKey, () => slotApi.getAll())

  return {
    slotList: data,
    isLoading,
    error,
  }
}
