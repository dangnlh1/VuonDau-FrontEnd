/**
 * @app VuonDau
 * @author phutruongck
 */

import { FaChalkboardTeacher, FaUserFriends } from 'react-icons/fa'
import React, { useCallback, useEffect, useMemo } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { DATE_TIME_FORMAT, formatDate } from '@/bin/common/function/date-time'
import { initClassDetail, STATUS_CODES } from '@/bin/common/constants'
import { useMemoriedSelector, useRouter } from '@/bin/hooks'
import { ClassDetail, IResource } from '@custom-type'
import { showToast } from '@/bin/common/function/toast'
import { formatMoney } from '@/bin/common/function'
import {
  selectors as paymentSelectors,
  actions as paymentActions,
  models as paymentModels,
} from '@/ducks/payment'
import { selectors as classSelectors, models as classModels } from '@/ducks/class'
import { CalendarComponent } from './calendar'
import { ResourceItem } from './resource'
import { IParams } from './init-data'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch()
  const {
    params: { classId },
  } = useRouter<IParams>()

  const classDetailResponse: classModels.ClassDetailResponse = useMemoriedSelector(
    classSelectors.classDetail
  ).response

  const paymentResponse: paymentModels.PaymentResponse = useMemoriedSelector(
    paymentSelectors.payment
  ).response

  const paymentRequest = useCallback(
    (request: paymentModels.PaymentRequest) => dispatch(paymentActions.payment.request(request)),
    [dispatch]
  )

  const resetPayment = useCallback(
    (request: paymentModels.PaymentResponse) => dispatch(paymentActions.payment.success(request)),
    [dispatch]
  )

  const classDetail = useMemo((): ClassDetail => {
    if (classDetailResponse.status === STATUS_CODES.OK) {
      if (classDetailResponse.data) {
        return classDetailResponse.data
      }
    }
    return initClassDetail
  }, [classDetailResponse])

  useEffect(() => {
    if (paymentResponse.status) {
      if (paymentResponse.status === STATUS_CODES.OK) {
        if (typeof window !== 'undefined') {
          window.location.href = paymentResponse.data.paymentUrl
        }
      } else {
        showToast({
          message: paymentResponse.error_message,
          type: 'error',
        })
      }
      resetPayment(paymentModels.initState.payment.response)
    }
  }, [paymentResponse])

  const resources = useMemo(() => {
    if (classDetail.course.resources && classDetail.course.resources.length > 0) {
      const { resources } = classDetail.course
      if (resources && Array.isArray(resources) && resources.length > 0) {
        const clone = [...resources]
        clone.shift()
        return clone.map((i: IResource, index: number) => {
          return <ResourceItem item={i} key={index} />
        })
      }
    }
    return undefined
  }, [classDetail])

  const handleOnPayment = () => {
    paymentRequest({
      classId: +classId,
    })
  }

  return (
    <div className="class__detail__section">
      <div className="class__detail__heading__section">
        <div className="class__detail__heading__container">
          <div className="class__detail__information">
            <div className="class__detail__className">{classDetail.code}</div>
            <div className="class__detail__subjectName">{classDetail?.course?.subject?.name}</div>
          </div>
          <div className="class__detail__dateTime">
            <AiFillClockCircle
              style={{
                marginRight: 10,
              }}
              size={15}
            />
            {formatDate(classDetail.startDate, DATE_TIME_FORMAT.DATE_FORMAT)} -{' '}
            {formatDate(classDetail.endDate, DATE_TIME_FORMAT.DATE_FORMAT)}
          </div>
          <div className="class__detail__dateTime">
            <FaUserFriends
              style={{
                marginRight: 10,
              }}
              size={15}
            />
            {classDetail.numberStudent} / {classDetail.maxNumberStudent}
          </div>
          <div className="class__detail__dateTime">
            <FaChalkboardTeacher
              style={{
                marginRight: 10,
              }}
              size={15}
            />
            {classDetail.teacher.name}
          </div>
          <div className="class__detail__cart">
            <div className="class__detail__cart__container">
              <div className="class__detail__price__container">
                <div className="class__detail__price">
                  {formatMoney({
                    text: classDetail.finalPrice,
                    prefix: 'vnđ',
                  })}
                </div>
                <div className="class__detail__price__discount">
                  {formatMoney({
                    text: classDetail.finalPrice,
                    prefix: 'vnđ',
                  })}
                </div>
              </div>
              <div className="class__detail__button">
                <div className="class__detail__add__to__cart" onClick={handleOnPayment}>
                  Mua ngay
                </div>
              </div>
            </div>
            <div className="class__detail__cart__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam pariatur assumenda
              quidem repudiandae nihil doloremque nam labore cupiditate autem velit commodi ullam
              quas aperiam consequatur ipsum corporis voluptates, vitae explicabo?
            </div>
          </div>
        </div>
      </div>
      <div className="class__detail__course__detail__lesson__section">
        <div className="class__detail__course__detail__lesson__container">
          <div className="class__detail__course__detail__lesson__heading">Danh sách bài học</div>
          <div className="class__detail__course__detail__lesson__content">{resources}</div>
        </div>
      </div>
      <div className="class__detail__course__detail__lesson__section">
        <div className="class__detail__course__detail__lesson__container">
          <div className="class__detail__course__detail__lesson__heading">Lịch học</div>
          <div className="class__detail__course__detail__lesson__content">
            <CalendarComponent />
          </div>
        </div>
      </div>
    </div>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
