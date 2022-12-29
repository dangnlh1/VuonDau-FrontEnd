import { ClassPayload } from './class'
import { Question } from '@/models/questions'
import { Subject } from '@/models/subject'

export interface ForumPayload {
  id: number
  name: string
  code: string
  type: 'SUBJECT' | 'CLASS'
  subjectName: string
  subjectId: number
  subjectCode: string
  className: string
  classCode: string
  classId: number
}
export interface ForumLesson {
  id: number
  lessonName: string
  questions: Question[]
}
export interface ForumDetail {
  id: number
  name: string
  code: string
  type: 'SUBJECT' | 'CLASS'
  subject: Subject
  forumLessonDtos?: ForumLesson[]
  getaClass: ClassPayload
  questions?: Question[]
}
