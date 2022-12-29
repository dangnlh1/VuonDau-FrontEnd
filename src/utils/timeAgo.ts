import TimeAgo from 'javascript-time-ago'

// English.
import vi from 'javascript-time-ago/locale/vi'

TimeAgo.addDefaultLocale(vi)

const timeAgo = new TimeAgo('vi')

export function getTimeAgo(time: string) {
  if (!time) return ''
  const tmpDate = new Date(time)
  console.log(tmpDate, time)

  return timeAgo.format(tmpDate)
}
