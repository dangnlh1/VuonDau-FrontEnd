/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useImperativeHandle, useRef, useMemo } from 'react'
import { Button, ButtonToolbar } from 'rsuite'
import { Modal, ModalRef } from '@/components/modal'
import { STATUS_CODES } from '@/bin/common/constants'
import { useMemoriedSelector } from '@/bin/hooks'
import { FormInputNumber, FormProvider, Dropdown, useForm } from '@/components/react-hook-form'
import { SlotDow } from '@custom-type'
import { selectors as timeTableSelectors, models as timeTableModels } from '@/ducks/time-table'
import { convertResponseToDropdown, convertResponseData, random } from '@/bin/common/function'
import { DefaultValues, initDefaultValues } from './init-data'
import { validationSchema } from './validations'
import './styles.scss'

interface Props {
  setSlotDow: Function
}

export interface AddSlotRef {
  onClose: Function
  onOpen: Function
}

const AddSlotModal = React.forwardRef(({ setSlotDow }: Props, ref) => {
  const modalRef = useRef<ModalRef>()
  const currentItem = useRef<any>()

  const dayOfWeekResponse: timeTableModels.DayOfWeekResponse = useMemoriedSelector(
    timeTableSelectors.dayOfWeek
  ).response

  const slotResponse: timeTableModels.SlotResponse = useMemoriedSelector(
    timeTableSelectors.slot
  ).response

  const slotDropdown = useMemo(() => {
    if (slotResponse.status === STATUS_CODES.OK) {
      const data = slotResponse.data
      let dropdown: any[] = []
      if (data && Array.isArray(data)) {
        const mapData = data.map((i) => ({
          id: i.id,
          name: `${i.name}, ${i.startTime} - ${i.endTime}`,
        }))
        const res = convertResponseData(mapData, ['id', 'name'])
        dropdown = convertResponseToDropdown({ data: res })
      }
      return dropdown
    }
    return []
  }, [slotResponse])

  const dayOfWeekDropdown = useMemo(() => {
    if (dayOfWeekResponse.status === STATUS_CODES.OK) {
      const data = dayOfWeekResponse.data
      let dropdown: any[] = []
      if (data && Array.isArray(data)) {
        const res = convertResponseData(data, ['id', 'name'])
        dropdown = convertResponseToDropdown({ data: res })
      }
      return dropdown
    }
    return []
  }, [dayOfWeekResponse])

  useImperativeHandle(
    ref,
    () => ({
      onOpen(i?: any) {
        handleOnOpen(i)
      },
      onClose() {
        handleOnClose()
      },
    }),
    []
  )

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  })

  const handleOnOpen = (i: any) => {
    modalRef.current!.onOpen()
    currentItem.current = i
  }

  const handleOnClose = () => {
    modalRef.current!.onClose()
  }

  const onClose = () => {
    methods.reset(initDefaultValues)
  }

  const handleOnSubmit = (values: DefaultValues) => {
    setSlotDow((prev: SlotDow[]) => [
      ...prev,
      {
        dayOfWeekId: values.dayOfWeekId,
        slotNumber: values.slotNumber,
        slotId: values.slotId,
        id: random(),
      },
    ])
    handleOnClose()
  }

  const renderBody = () => (
    <div className="teacher__create__course__container">
      <FormProvider {...methods}>
        <FormInputNumber name="slotNumber" label="Số lượng học sinh" required />
        <Dropdown items={slotDropdown} name="slotId" label="Slot" isMarginTop required />
        <Dropdown
          items={dayOfWeekDropdown}
          name="dayOfWeekId"
          label="Chọn thứ"
          isMarginTop
          required
        />
        <ButtonToolbar
          style={{
            marginTop: 20,
          }}
        >
          <Button onClick={methods.handleSubmit(handleOnSubmit)} appearance="primary">
            Thêm Slot
          </Button>
        </ButtonToolbar>
      </FormProvider>
    </div>
  )

  return <Modal body={renderBody} onClose={onClose} title="Thêm Slot" ref={modalRef} size="lg" />
})

AddSlotModal.displayName = 'AddSlotModal'
export { AddSlotModal }
