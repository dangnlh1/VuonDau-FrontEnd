import { LayoutType } from './common'
import { Course } from './course'

export interface ClassType {
  id: number
  code: string
  name: string
}

export interface Role {
  id: number
  name: string
  code: LayoutType
}

export interface GenderResponse {
  code: string
  name: string
}

export interface Teacher {
  id: number
  username: string
  firstName: string
  lastName: string
  birthday: string
  email: string
  phoneNumber: string
  role: Role
  avatar: string
  active: true
  gender: string
  genderResponse: GenderResponse
}

export interface ClassPayload {
  id: number
  name: string
  code: string
  status: string //'NEW'
  classType: ClassType
  startDate: string
  endDate: string
  numberStudent: number
  maxNumberStudent: number
  course: Course
  unitPrice: number
  finalPrice: number
  teacher: Teacher
}
