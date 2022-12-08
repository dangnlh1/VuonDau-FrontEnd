/**
 * @app VuonDau
 * @author phutruongck
 */

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Button, ButtonToolbar } from 'rsuite'
import { useDispatch } from 'react-redux'
import React, { useCallback, useContext, useEffect, useState, useMemo, useRef } from 'react'
import { FormInput, FormProvider, useForm } from '@/components/react-hook-form'
import { showToast } from '@/bin/common/function/toast'
import { STATUS_CODES } from '@/bin/common/constants'
import { IClass, SlotDow } from '@custom-type'
import { useMemoriedSelector } from '@/bin/hooks'
import {
  selectors as timeTableSelectors,
  actions as timeTableActions,
  models as timeTableModels,
} from '@/ducks/time-table'
import {
  selectors as classSelectors,
  actions as classActions,
  models as classModels,
} from '@/ducks/class'
import { DefaultValues, initDefaultValues } from './init-data'
import { AddSlotModal, AddSlotRef } from './slot'
import { ClassItemComponent } from './class-item'
import { validationSchema } from './validations'
import { SlotItemComponent } from './item'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch()

  const addSlotRef = useRef<AddSlotRef>()

  const [slotDow, setSlotDow] = useState<SlotDow[]>([])
  const [classSelected, setClassSelected] = useState<number>(0)

  const allClassResponse: classModels.AllClassResponse = useMemoriedSelector(
    classSelectors.allClass
  ).response

  const createTimeTableResponse: timeTableModels.CreateTimeTableResponse = useMemoriedSelector(
    timeTableSelectors.createTimeTable
  ).response

  const createTimeTableRequest = useCallback(
    (request: timeTableModels.CreateTimeTableRequest) =>
      dispatch(timeTableActions.createTimeTable.request(request)),
    [dispatch]
  )

  const resetCreateTimeTable = useCallback(
    (request: timeTableModels.CreateTimeTableResponse) =>
      dispatch(timeTableActions.createTimeTable.success(request)),
    [dispatch]
  )

  const getAllClassRequest = useCallback(
    (request: classModels.AllClassRequest) => dispatch(classActions.allClass.request(request)),
    [dispatch]
  )

  const resetAllClass = useCallback(
    (request: classModels.AllClassResponse) => dispatch(classActions.allClass.success(request)),
    [dispatch]
  )

  const getDayOfWeekRequest = useCallback(
    (request: timeTableModels.DayOfWeekRequest) =>
      dispatch(timeTableActions.dayOfWeek.request(request)),
    [dispatch]
  )

  const getSlotRequest = useCallback(
    (request: timeTableModels.SlotRequest) => dispatch(timeTableActions.slot.request(request)),
    [dispatch]
  )

  useEffect(() => {
    getAllClassRequest({})
    return () => {
      resetAllClass(classModels.initState.allClass.response)
    }
  }, [])

  const classData = useMemo(() => {
    if (allClassResponse.status === STATUS_CODES.OK) {
      if (allClassResponse.data && Array.isArray(allClassResponse.data)) {
        const { data } = allClassResponse
        return data
      }
    }
    return []
  }, [allClassResponse])

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  })

  useEffect(() => {
    getDayOfWeekRequest({})
    getSlotRequest({})
  }, [])

  useEffect(() => {
    if (createTimeTableResponse.status) {
      if (createTimeTableResponse.status === STATUS_CODES.OK) {
        showToast({
          message: 'Tạo thành công!',
          type: 'success',
        })
      } else {
        showToast({
          message: createTimeTableResponse.error_message,
          type: 'error',
        })
      }
      resetCreateTimeTable(timeTableModels.initState.createTimeTable.response)
    }
  }, [createTimeTableResponse])

  const handleOnSubmit = (values: DefaultValues) => {
    if (slotDow.length > 0) {
      createTimeTableRequest({
        archetypeCode: values.archetypeCode,
        archetypeName: values.archetypeName,
        classId: classSelected,
        slotDow,
      })
    } else {
      showToast({
        message: 'Vui lòng thêm slot!',
        type: 'eror',
      })
    }
  }

  const handleOnAddSlot = () => {
    addSlotRef.current?.onOpen()
  }

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)
    return (
      <div className="time__table__scroll__arrow">
        <IoIosArrowBack
          onClick={() => scrollPrev()}
          color="#9b59b6"
          size={25}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    )
  }

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)
    return (
      <div className="time__table__scroll__arrow">
        <IoIosArrowForward
          onClick={() => scrollNext()}
          color="#9b59b6"
          size={25}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    )
  }

  const renderItem = () => {
    if (slotDow && slotDow.length > 0) {
      return slotDow.map((item: SlotDow, index: number) => (
        <SlotItemComponent setSlotDow={setSlotDow} data={item} key={index} />
      ))
    }
    return []
  }

  const renderClassItem = () => {
    if (classData && classData.length > 0) {
      return classData.map((item: IClass, index: number) => (
        <ClassItemComponent
          setClassSelected={setClassSelected}
          classSelected={classSelected}
          className="class__item"
          data={item}
          key={index}
        />
      ))
    }
    return []
  }

  return (
    <React.Fragment>
      <AddSlotModal setSlotDow={setSlotDow} ref={addSlotRef} />
      <div className="teacher__create__time__table__page__container">
        <FormProvider {...methods}>
          <FormInput name="archetypeName" label="Tên" required />
          <FormInput name="archetypeCode" label="Mã" isMarginTop required />
          <div className="teacher__list__content">
            <div className="teacher__list__heading">Danh sách lớp học</div>
            {classData.length > 0 ? (
              <div className="time__table__scroll__section">
                <ScrollMenu
                  scrollContainerClassName="time__table__scroll__container"
                  wrapperClassName="time__table__scroll__wrapper"
                  transitionBehavior="smooth"
                  RightArrow={RightArrow}
                  LeftArrow={LeftArrow}
                >
                  {renderClassItem()}
                </ScrollMenu>
              </div>
            ) : undefined}
          </div>
          {slotDow.length > 0 ? (
            <div className="time__table__scroll__section">
              <ScrollMenu
                scrollContainerClassName="time__table__scroll__container"
                wrapperClassName="time__table__scroll__wrapper"
                transitionBehavior="smooth"
                RightArrow={RightArrow}
                LeftArrow={LeftArrow}
              >
                {renderItem()}
              </ScrollMenu>
            </div>
          ) : undefined}
          <ButtonToolbar
            style={{
              marginTop: 20,
            }}
          >
            <Button onClick={methods.handleSubmit(handleOnSubmit)} appearance="primary">
              Đăng ký
            </Button>
            <Button appearance="default" onClick={handleOnAddSlot}>
              Thêm slot
            </Button>
          </ButtonToolbar>
        </FormProvider>
      </div>
    </React.Fragment>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
