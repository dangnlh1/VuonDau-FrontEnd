import dayjs from 'dayjs'

export function dateFormatting(date: string, format = 'DD/MM/YYYY') {
  if (!date) return

  return dayjs(date).format(format)
}

export function timeFormatting(date: string, format = 'HH:mm:ss') {
  if (!date) return

  return dayjs(date).format(format)
}
