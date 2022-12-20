export interface Slot {
  id: number
  date: string
  slotNumber: number
  archetypeCode: string
  archetypeCName: string
  slotCode: string
  slotName: string
  startTime: string
  endTime: string
  dayOfWeekName: string
  dayOfWeekCode: string
}
export interface PaymentSlot {
  id: number
  date: string
  slotNumber: number
  clazz: string
  archetypeTime: {
    id: number
    archetype: {
      id: number
      name: string
      code: string
      createdByTeacherId: number
      archetypeTimes: [string]
    }
    dayOfWeek: {
      id: number
      name: string
      code: 'MONDAY'
      archetypeTimes: [string]
    }
    slot: {
      id: number
      name: string
      code: 'SLOT1'
      startTime: string
      endTime: string
      archetypeTimes: [string]
    }
    timeTables: [string]
  }
  archetypeTimes: [
    {
      id: number
      archetype: {
        id: number
        name: string
        code: string
        createdByTeacherId: number
        archetypeTimes: [string]
      }
      dayOfWeek: {
        id: number
        name: string
        code: 'MONDAY'
        archetypeTimes: [string]
      }
      slot: {
        id: number
        name: string
        code: 'SLOT1'
        startTime: string
        endTime: string
        archetypeTimes: [string]
      }
      timeTables: [string]
    }
  ]
  attendances: [
    {
      id: number
      timeTable: string
      present: true
    }
  ]
}
