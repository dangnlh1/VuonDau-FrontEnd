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
