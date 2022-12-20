import dayjs from 'dayjs'

export function dateFormatting(date: string, format = 'DD/MM/YYYY') {
  if (!date) return

  return dayjs(date).format(format)
}
