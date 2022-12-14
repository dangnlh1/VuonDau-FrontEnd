import { accountDetailApi, UploadRegisterProfileImagePayload } from '@/api/accountDetailApi'
import { TeacherRegisterPayload } from '@/models/teacherRegister'
import { useMutation, useQueryClient } from 'react-query'

export function useTeacherRegister() {
  const queryKey = ['/teacherRegister']
  const queryClient = useQueryClient()

  const registerTutor = useMutation(
    (data: TeacherRegisterPayload) => accountDetailApi.registerTutor(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  const uploadProfileImage = useMutation(
    (data: UploadRegisterProfileImagePayload) => accountDetailApi.uploadRegisterProfileImage(data),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  )

  return {
    registerTutor,
    uploadProfileImage,
  }
}
