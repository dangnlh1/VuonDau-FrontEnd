export interface Subject {
  id: number
  code: string
  name: string
  courseIds: number[]
}

export interface Course {
  id: number
  image: string
  courseTitle: string
  courseName: string
  teacherName: string
  subject: Subject
  totalClass: number
}
