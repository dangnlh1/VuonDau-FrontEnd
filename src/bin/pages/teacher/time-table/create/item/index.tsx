/**
 * @app VuonDau
 * @author phutruongck
 */

import { BsFillCalendarWeekFill, BsTable } from 'react-icons/bs'
import { AiFillClockCircle, AiFillDelete } from 'react-icons/ai'
import { BiCalendarEdit } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import React, { useMemo, useRef } from 'react'
import { initDayOfWeek, initSlot, STATUS_CODES } from '@/bin/common/constants'
import { useMemoriedSelector } from '@/bin/hooks'
import { SlotDow } from '@custom-type'
import { selectors as timeTableSelectors, models as timeTableModels } from '@/ducks/time-table'
import { UpdateSlotModal, UpdateSlotRef } from '../update-slot'
import './styles.scss'

interface Props {
  setSlotDow: Function
  data: SlotDow
}

const SlotItemComponent: React.FC<Props> = React.memo(({ data, setSlotDow }) => {
  const updateSlotRef = useRef<UpdateSlotRef>()

  const dayOfWeekResponse: timeTableModels.DayOfWeekResponse = useMemoriedSelector(
    timeTableSelectors.dayOfWeek
  ).response

  const slotResponse: timeTableModels.SlotResponse = useMemoriedSelector(
    timeTableSelectors.slot
  ).response

  const slotData = useMemo(() => {
    if (slotResponse.status === STATUS_CODES.OK) {
      if (slotResponse.data && Array.isArray(slotResponse.data)) {
        const find = slotResponse.data.find((i) => +i.id === +data.slotId)
        if (find?.code) {
          return find
        }
      }
    }
    return initSlot
  }, [slotResponse])

  const dayOfWeekData = useMemo(() => {
    if (dayOfWeekResponse.status === STATUS_CODES.OK) {
      if (dayOfWeekResponse.data && Array.isArray(dayOfWeekResponse.data)) {
        const find = dayOfWeekResponse.data.find((i) => +i.id === +data.dayOfWeekId)
        if (find?.code) {
          return find
        }
      }
    }
    return initDayOfWeek
  }, [dayOfWeekResponse])

  const handleOnRemove = () => {
    setSlotDow((prev: SlotDow[]) => prev.filter((i) => i.id !== data.id))
  }

  const handleOnUpdate = () => {
    updateSlotRef.current?.onOpen(data)
  }

  return (
    <React.Fragment>
      <UpdateSlotModal ref={updateSlotRef} setSlotDow={setSlotDow} />
      <div className="time__table__item__container">
        <div className="time__table__item__information__container">
          <div className="time__table__item__content">
            <BsTable
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            {slotData.name}
          </div>
          <div className="time__table__item__content">
            <FaUserFriends
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            {data.slotNumber}
          </div>
          <div className="time__table__item__content">
            <BsFillCalendarWeekFill
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            {dayOfWeekData?.name}
          </div>
          <div className="time__table__item__content">
            <AiFillClockCircle
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            {slotData?.startTime} - {slotData.endTime}
          </div>
        </div>
        <div className="time__table__item__action">
          <div className="time__table__item__delete" onClick={handleOnRemove}>
            <AiFillDelete
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            Xoá
          </div>
          <div className="time__table__item__delete" onClick={handleOnUpdate}>
            <BiCalendarEdit
              size={16}
              style={{
                marginRight: 5,
              }}
            />
            Sửa
          </div>
        </div>
      </div>
    </React.Fragment>
  )
})

SlotItemComponent.displayName = 'SlotItemComponent'
export { SlotItemComponent }
