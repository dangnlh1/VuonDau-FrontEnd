import { DayOfWeek } from '@/models/dayOfWeek'
import { Slot } from '@/models/slot'
import { string } from 'yup'

export interface ScheduleCell {
  dowCode: string
  name: string
  time: string
  date: string
  isStudied: boolean
  isPresent: boolean
}

export interface ScheduleRow {
  id: number
  name: string
  code: string
  time: string
  dowArray: ScheduleCell[]
}

export function getTableRows(
  dow: DayOfWeek[] | undefined,
  slots: Slot[] | undefined
): ScheduleRow[] | undefined {
  if (!dow || !slots) return undefined
  const dowArray: ScheduleCell[] = getDowsArray(dow)
  const slotsArray: ScheduleRow[] = getSlotsArray(slots, dowArray)
  return slotsArray
}

function getDowsArray(dows: DayOfWeek[]) {
  const result: ScheduleCell[] = dows.map((dow) => ({
    dowCode: dow.code,
    date: '',
    isPresent: false,
    isStudied: false,
    name: '',
    time: '',
  }))
  return result
}

function getSlotsArray(slots: Slot[], dowArray: ScheduleCell[]) {
  const result: ScheduleRow[] = slots.map((slot) => ({
    id: slot.id,
    name: slot.name,
    code: slot.code,
    time: `${slot.startTime} - ${slot.endTime}`,
    dowArray,
  }))
  return result
}
