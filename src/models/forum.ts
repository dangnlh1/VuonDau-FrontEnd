import { ClassPayload } from './class';
import { Question } from "@/models/questions"
import { Subject } from "@/models/subject"

export interface ForumPayload {
  id: number,
  name: string,
  code: string,
  type: string,
  subjectName: string,
  subjectCode: string,
  className: string,
  classCode: string
}
export interface ForumLesson {
  id: number,
  lessonName: string,
  questions: Question[]
}
export interface ForumDetail {
  id: number,
  name: string,
  code: string,
  type: string,
  subject: Subject,
  forumLessonDtos?: ForumLesson[],
  getaClass: ClassPayload,
  questions?: Question[],
}