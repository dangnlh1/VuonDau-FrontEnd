/**
 * @app VuonDau
 * @author phutruongck
 */

import { Link } from 'react-router-dom'
import React from 'react'
import { TEACHER_URL_PAGE } from '@/router/teacher/navigation'
import { dateTimeToShow, DATE_TIME_FORMAT } from '@/bin/common/function/date-time'
import { IClass } from '@custom-type'
import './styles.scss'
import { AiFillClockCircle } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'

interface Props {
  className?: string
  data: IClass
}

const ClassItemComponent: React.FC<Props> = React.memo(({ data, className }) => {
  return (
    <Link
      className={`class__item__container ${className}`}
      to={`${TEACHER_URL_PAGE.CLASS.CHILD.DETAIL.ROOT}/${data.id}`}
    >
      <div className="class__item__detail__container">
        <div className="class__item__information__container">
          <div className="class__item__name">{data?.name}</div>
          <div className="class__item__number__student">
            <FaUserFriends
              size={16}
              style={{
                marginRight: 10,
              }}
            />
            {data?.numberStudent}/{data?.maxNumberStudent}
          </div>
          <div className="class__item__dateTime">
            <div className="class__item__dateTime__heading">
              <AiFillClockCircle
                style={{
                  marginRight: 10,
                }}
                size={16}
              />
              {dateTimeToShow(data.startDate, DATE_TIME_FORMAT.DATE_FORMAT)} -{' '}
              {dateTimeToShow(data.endDate, DATE_TIME_FORMAT.DATE_FORMAT)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
})

ClassItemComponent.displayName = 'ClassItemComponent'
export { ClassItemComponent }
