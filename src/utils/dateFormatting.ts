import { DayOfWeekPayload } from '@/models/timetables'
import dayjs, { Dayjs } from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'

dayjs.extend(isBetweenPlugin)

export const currentDate: Dayjs = dayjs()

export function dateFormatting(date: string, format = 'DD/MM/YYYY') {
  if (!date) return

  return dayjs(date).format(format)
}

export function checkDayInWeek(value: Dayjs, date: Dayjs) {
  const start = value.startOf('week')
  const end = value.endOf('week')
  const dayIsBetween = date.isBetween(start, end, null, '[]')
  const isFirstDay = date.isSame(start, 'day')
  const isLastDay = date.isSame(end, 'day')
  return {
    dayIsBetween,
    isFirstDay,
    isLastDay,
  }
}
