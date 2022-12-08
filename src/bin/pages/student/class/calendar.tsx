/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useCallback, useMemo } from 'react'
import vi from 'date-fns/locale/vi'
import { Calendar } from 'rsuite'
import moment from 'moment'
import { dayOfWeeks, initClassDetail, STATUS_CODES } from '@/bin/common/constants'
import { useMemoriedSelector } from '@/bin/hooks'
import { ITimeTableCustom, IArchetypeTime, ClassDetail, ITimeTable } from '@custom-type'
import { selectors as classSelectors, models as classModels } from '@/ducks/class'

interface Props {}

const CalendarComponent: React.FC<Props> = React.memo(() => {
  const classDetailResponse: classModels.ClassDetailResponse = useMemoriedSelector(
    classSelectors.classDetail
  ).response

  const classDetail = useMemo((): ClassDetail => {
    if (classDetailResponse.status === STATUS_CODES.OK) {
      if (classDetailResponse.data) {
        return classDetailResponse.data
      }
    }
    return initClassDetail
  }, [classDetailResponse])

  const timeTable = useMemo((): ITimeTable[] => {
    if (classDetail.timeTable && classDetail.timeTable.length > 0) {
      const { timeTable } = classDetail
      if (timeTable && Array.isArray(timeTable) && timeTable.length > 0) {
        return timeTable
      }
    }
    return []
  }, [classDetail])

  const startDate = useMemo((): string => {
    if (classDetail.startDate) {
      const { startDate } = classDetail
      return startDate
    }
    return ''
  }, [classDetail])

  const endDate = useMemo((): string => {
    if (classDetail.endDate) {
      const { endDate } = classDetail
      return endDate
    }
    return ''
  }, [classDetail])

  const calTimeTable = useCallback(
    (dayOfWeek: string, archetypeTime: IArchetypeTime): ITimeTableCustom[] => {
      const result: ITimeTableCustom[] = []
      const _sDate = moment(startDate)
      const _eDate = moment(endDate)
      const day = dayOfWeek
      const current = _sDate.clone()
      while (current.day(7 + day).isBefore(_eDate)) {
        result.push({
          day: current.clone().format('DD/MM/YYYY'),
          archetypeTime,
        })
      }
      return result
    },
    [startDate, endDate]
  )

  const timeToCalendar = useMemo((): ITimeTableCustom[] => {
    let result: ITimeTableCustom[] = []
    if (timeTable.length > 0) {
      timeTable.forEach((i) => {
        const dayOfWeek = dayOfWeeks[i.archetypeTime.dayOfWeek.code]
        const rs = calTimeTable(dayOfWeek, i.archetypeTime)
        result = [...result, ...rs]
      })
    }
    return result
  }, [timeTable, startDate, endDate])

  const renderCell = (date: Date) => {
    const _timeToCalendar: ITimeTableCustom[] = timeToCalendar
    const _date = moment(date).format('DD/MM/YYYY')
    const result = _timeToCalendar.find((i: ITimeTableCustom) => i.day === _date)
    if (result?.day) {
      return (
        <div className="calendar__item__container">
          <div className="calendar__item__content">
            <div className="calendar__item__slot__name">{result.archetypeTime.archetype.name}</div>
            <div className="calendar__item__time">
              {result.archetypeTime.slot.startTime}&nbsp;-&nbsp;
              {result.archetypeTime.slot.endTime}
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Calendar
      bordered
      renderCell={renderCell}
      locale={{
        dateLocale: vi,
        today: 'Hôm nay',
        hours: 'Giờ',
        sunday: 'Chủ nhật',
        monday: 'Thứ 2',
        tuesday: 'Thứ 3',
        wednesday: 'Thứ 4',
        thursday: 'Thứ 5',
        friday: 'Thứ 6',
        saturday: 'Thứ 7',
        minutes: 'Phút',
        seconds: 'Giây',
        yesterday: 'Hôm qua',
        formattedMonthPattern: 'MMM yyyy',
        formattedDayPattern: 'dd MMM yyyy',
        ok: 'OK',
      }}
    />
  )
})

CalendarComponent.displayName = 'CalendarComponent'
export { CalendarComponent }
