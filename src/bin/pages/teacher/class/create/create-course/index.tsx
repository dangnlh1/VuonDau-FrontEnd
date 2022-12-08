/**
 * @app VuonDau
 * @author phutruongck
 */

import { Button, ButtonToolbar } from 'rsuite'
import { useDispatch } from 'react-redux'
import React, { useImperativeHandle, useCallback, useEffect, useRef } from 'react'
import { FormProvider, FormInput, useForm } from '@/components/react-hook-form'
import { Modal, ModalRef } from '@/components/modal'
import { showToast } from '@/bin/common/function/toast'
import { STATUS_CODES } from '@/bin/common/constants'
import { useMemoriedSelector } from '@/bin/hooks'
import {
  selectors as courseSelectors,
  actions as courseActions,
  models as courseModels,
} from '@/ducks/course'
import { DefaultValues, initDefaultValues } from './init-data'
import { validationSchema } from './validations'
import './styles.scss'

interface Props {}

export interface CreateCourseRef {
  onClose: Function
  onOpen: Function
}

const CreateCourseModal = React.forwardRef(({}: Props, ref) => {
  const dispatch = useDispatch()

  const modalRef = useRef<ModalRef>()
  const currentItem = useRef<any>()

  const createCourseResponse: courseModels.CreateCourseResponse = useMemoriedSelector(
    courseSelectors.createCourse
  ).response

  const createCourseRequest = useCallback(
    (request: courseModels.CreateCourseRequest) =>
      dispatch(courseActions.createCourse.request(request)),
    [dispatch]
  )

  const resetCreateCourse = useCallback(
    (request: courseModels.CreateCourseResponse) =>
      dispatch(courseActions.createCourse.success(request)),
    [dispatch]
  )

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

  useEffect(() => {
    if (createCourseResponse.status) {
      if (createCourseResponse.status === STATUS_CODES.OK) {
        showToast({
          message: 'Tạo khoá học thành công!',
          type: 'success',
        })
        handleOnClose()
      } else {
        showToast({
          message: createCourseResponse.error_message,
          type: 'error',
        })
      }
      resetCreateCourse(courseModels.initState.createCourse.response)
    }
  }, [createCourseResponse])

  const handleOnOpen = (i: any) => {
    modalRef.current!.onOpen()
    currentItem.current = i
  }

  const handleOnClose = () => {
    modalRef.current!.onClose()
  }

  const onClose = () => {
    resetCreateCourse(courseModels.initState.createCourse.response)
    methods.reset(initDefaultValues)
  }

  const handleOnSubmit = (values: DefaultValues) => {
    createCourseRequest({
      description: values.description,
      subjectId: currentItem.current,
      title: values.title,
      code: values.code,
      name: values.name,
      teacherIds: [1],
    })
  }

  const renderBody = () => (
    <div className="teacher__create__course__container">
      <FormProvider {...methods}>
        <FormInput name="title" label="Tiêu đề khoá học" required />
        <FormInput name="name" label="Tên khoá học" isMarginTop required />
        <FormInput name="code" label="Mã khoá học" isMarginTop required />
        <FormInput
          label="Mô tả khoá học"
          name="description"
          type="textarea"
          isMarginTop
          required
          row={5}
        />
        <ButtonToolbar
          style={{
            marginTop: 20,
          }}
        >
          <Button onClick={methods.handleSubmit(handleOnSubmit)} appearance="primary">
            Tạo khoá học
          </Button>
        </ButtonToolbar>
      </FormProvider>
    </div>
  )

  return <Modal title="Tạo khoá học" body={renderBody} onClose={onClose} ref={modalRef} size="lg" />
})

CreateCourseModal.displayName = 'CreateCourseModal'
export { CreateCourseModal }
