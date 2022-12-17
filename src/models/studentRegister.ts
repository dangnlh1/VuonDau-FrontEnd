export interface StudentRegisterPayload {
  account: {
    username: string
    password: string
  }
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  genderCode: string
}

export interface StudentRegisterData {
  username: string
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
}
