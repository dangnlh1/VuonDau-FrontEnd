export interface AttendanceSlot {
  id: number
  date: string
  slotNumber: number
  archetypeCode: string
  archetypeName: string
  slotCode: string
  slotName: string
  startTime: string
  endTime: string
  timeTableId: number
  dowName: string
  dowCode: string
  present: boolean | null
}
export interface AttendanceRequest {
  accountId: number
  classId: number
  attendance: AttendanceSlot[]
}
