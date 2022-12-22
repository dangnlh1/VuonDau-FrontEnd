import { CoursePayload } from './course'
import { RolePayload } from './role'
import { StudentPayload } from './student'

export interface ClassType {
  id: number
  code: string
  name: string
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
  role: RolePayload
  avatar: string
  active: true
  gender: string
  genderResponse: GenderResponse
}

export interface Module {
  id: number
  name: string
  type: string
  url: string
}

export interface Resource {
  id: number
  name?: string
  modules?: Module[]
}

export interface ClassPayload {
  id: number
  name: string
  code: string
  status: string
  classType: ClassType
  startDate: string
  endDate: string
  numberStudent: number
  maxNumberStudent: number
  minNumberStudent: number
  course: CoursePayload
  unitPrice: number
  finalPrice: number
  teacher: Teacher
  resources: Resource
  students: StudentPayload[]
  level: string
}

export type ClassLevel = 'TEN' | 'ELEVENT' | 'TWELFTH'
export type TypeOfClass = 'MANY' | 'ONE'

export interface AddEditClassFormPayload {
  name: string
  code: string
  level?: string

  classLevel: string
  classType: string

  startDate: string
  endDate: string
  minNumberStudent: number
  maxNumberStudent: number
  unitPrice: number
}
