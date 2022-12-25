import { InfoPayload } from '@/models/info'
import { ClassPayload } from '@/models/class'
import { StudentPayload } from '@/models/student'

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