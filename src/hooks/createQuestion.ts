import { questionApi } from '@/api/questionApi'
import { QuestionRequest } from '@/models/questions'
import { useMutation, useQueryClient } from 'react-query'

export function useCreateQuestion() {
  const queryKey = ['/createQuestion']
  const queryClient = useQueryClient()

  const createQuestion = useMutation((data: QuestionRequest) => questionApi.post(data), {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  })

  return {
    createQuestion,
  }
}
