import { studentAccountApi } from '../api/studentRegisterApi'
import { StudentRegisterPayload } from '../models/studentRegister'
import { useMutation, useQueryClient } from 'react-query'

export function useStudentRegister() {
  const queryKey = ['/studentRegister']
  const queryClient = useQueryClient()

  const registerStudent = useMutation(
    (data: StudentRegisterPayload) => studentAccountApi.registerStudent(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  

  return {
    registerStudent,
  }
}
