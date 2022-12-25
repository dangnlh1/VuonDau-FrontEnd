import { Subject } from './subject'

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

export interface CreateNewCoursePayload {
  name: string
  title: string
  description: string
  code: string
  subjectId: string | number
}

export interface CreateCoursePayload {
  subjectId: string | number
  courseId: string | number
}
