export interface StudentRegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  birthDay: string
  gender: string
  currentAddress: string
  schoolName: string
  subjects: number[]
  classLevel: number
}

export interface StudentRegisterData {
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
  birthDay: string
  email: string
  phone: string
  gender: string
  currentAddress: string
  classLevel: number
  subjects: number[]
  schoolName: string
}
