import { InfoPayload } from './info';
import { Subject } from '@/models/subject';
export interface Question {
    id: number,
    content: string,
    user: InfoPayload,
    subject: Subject,
    upvoteNumber: number,
    downVoteNumber: number,
    closed: boolean
}