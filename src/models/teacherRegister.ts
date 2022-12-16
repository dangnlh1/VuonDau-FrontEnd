export interface UploadFile {
  resourceType: 'CCCD' | 'DEGREE' | 'CARTPHOTO'
  file: File
}

export interface TeacherRegisterPayload {
  firstName: string
  lastName: string
  birthDay: string
  email: string
  phone: string
  gender: string
  password: string
  username: string
}
