import { RolePayload } from './role'

export interface InfoPayload {
  active: boolean
  avatar: string
  birthday: string
  email: string
  firstName: string
  gender: string
  id: number
  introduce: null
  lastName: string
  phoneNumber: string
  role: RolePayload
  username: string
}
