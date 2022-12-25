import { Dayjs } from 'dayjs';
export interface SlotDow {
  slotNumber?: number | string
  slotId?: number | string
  dayOfWeekId?: number | string
}

export interface CreateTimeTablePayload {
  archetypeName: string
  archetypeCode: string
  slotDow: SlotDow[]
}

export interface CreateTimeTableRequest {
  classId: number
  numberSlot: number
  formData: CreateTimeTablePayload
}

type DayType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'

export interface AttendanceSlot {
  id: number,
  date: string,
  slotNumber: number,
  archetypeCode: string,
  archetypeName: string,
  slotCode: string,
  slotName: string,
  startTime: string,
  endTime: string,
  timeTableId: number,
  dowName: string,
  dowCode: DayType,
  present: boolean,
}
export interface FirstRowProps {
  name: string
  time: string
}

export interface DayOfWeekPayload {
  name: string
  day: Dayjs
}
export interface TimetableRow {
  firstRow: FirstRowProps
  MONDAY: AttendanceSlot | undefined
  TUESDAY: AttendanceSlot | undefined
  WEDNESDAY: AttendanceSlot | undefined
  THURSDAY: AttendanceSlot | undefined
  FRIDAY: AttendanceSlot | undefined
}