import { DayOfWeekPayload } from '@/models/timetable'
import dayjs, { Dayjs } from 'dayjs'

export function dateFormatting(date: string, format = 'DD/MM/YYYY') {
  if (!date) return

  return dayjs(date).format(format)
}

export function getCurrentDayOfWeek(day: Dayjs) {
  if (!day) return []
  const currentDate = new Date(day.toISOString())
  const first = currentDate.getDate() - currentDate.getDay() + 1
  const tmpFirstDay = new Date(currentDate.setDate(first)).toUTCString()
  const firstDay = dayjs(tmpFirstDay)
  const result: DayOfWeekPayload[] = [
    { name: 'Thứ Hai', day: firstDay },
    { name: 'Thứ Ba', day: firstDay.add(1, 'day') },
    { name: 'Thứ Tư', day: firstDay.add(2, 'day') },
    { name: 'Thứ Năm', day: firstDay.add(3, 'day') },
    { name: 'Thứ Sáu', day: firstDay.add(4, 'day') },
  ]
  return result
}
