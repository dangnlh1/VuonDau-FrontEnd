/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useCallback, useEffect, useMemo } from 'react'
import { Button, ButtonToolbar } from 'rsuite'
import { useDispatch } from 'react-redux'
import { FormInput, FormProvider, useForm } from '@/components/react-hook-form'
import { useCommon, useMemoriedSelector, useRouter } from '@/bin/hooks'
import { Dropdown } from '@/components/react-hook-form/dropdown'
import { TEACHER_URL_PAGE } from '@/router/teacher/navigation'
import { showToast } from '@/bin/common/function/toast'
import { STATUS_CODES } from '@/bin/common/constants'
import { convertResponseToDropdown, convertResponseData } from '@/bin/common/function'
import {
  selectors as courseSelectors,
  actions as courseActions,
  models as courseModels,
} from '@/ducks/course'
import { DefaultValues, initDefaultValues } from './init-data'
import { validationSchema } from './validations'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const { subjectResponse } = useCommon()
  const dispatch = useDispatch()
  const { history } = useRouter()

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
        history.push(TEACHER_URL_PAGE.COURSE.CHILD.LIST.PATH)
      } else {
        showToast({
          message: createCourseResponse.error_message,
          type: 'error',
        })
      }
      resetCreateCourse(courseModels.initState.createCourse.response)
    }
  }, [createCourseResponse])

  const subjectDropdown = useMemo(() => {
    if (subjectResponse.status === STATUS_CODES.OK) {
      const data = subjectResponse.data
      let dropdown: any[] = []
      if (data && Array.isArray(data)) {
        const res = convertResponseData(data, ['id', 'name'])
        dropdown = convertResponseToDropdown({ data: res })
      }
      return dropdown
    }
    return []
  }, [subjectResponse])

  const handleOnSubmit = (values: DefaultValues) => {
    createCourseRequest({
      description: values.description,
      subjectId: values.subjectId,
      title: values.title,
      code: values.code,
      name: values.name,
      teacherIds: [1],
    })
  }

  return (
    <div className="teacher__create__class__container">
      <FormProvider {...methods}>
        <Dropdown items={subjectDropdown} name="subjectId" label="Môn học" isMarginTop required />
        <FormInput name="title" label="Tiêu đề khoá học" isMarginTop required />
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
})

AppPage.displayName = 'AppPage'
export { AppPage }
