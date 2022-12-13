export interface UploadFile {
  resourceType: 'CCCD' | 'DEGREE' | 'CARD_PHOTO'
  file: File
}

export interface TeacherRegisterPayload {
  firstName: string
  lastName: string
  birthDay: string
  email: string
  phone: string
  gender: string
  domicile: string
  voice: string
  teachingProvince: string
  currentAddress: string
  idCard: string
  trainingSchoolName: string
  majors: string
  level: string
  password: string
  passwordConfirmation: string
  subjects: number[]
  classLevels: number[]
  // uploadFile: UploadFile[]
  file: any
}
