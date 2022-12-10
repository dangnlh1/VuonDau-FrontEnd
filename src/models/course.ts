export interface Subject {
  id: number
  code: string
  name: string
  courseIds: number[]
}

export interface CoursePayload {
  id: number
  active?: boolean
  code?: string
  clazz?: string
  grade?: string
  name?: string
  image?: string
  courseTitle?: string
  courseName?: string
  teacherName?: string
  subject?: Subject
  totalClass?: number
  description?: string
  title?: string
  unitPrice?: string
  teacherCourse: any
}
