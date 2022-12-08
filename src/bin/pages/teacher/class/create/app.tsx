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
import { FormInputNumber } from '@/components/react-hook-form/input-number'
import { InputDateTime } from '@/components/react-hook-form/datetime'
import { Dropdown } from '@/components/react-hook-form/dropdown'
import { useCommon, useMemoriedSelector } from '@/bin/hooks'
import { showToast } from '@/bin/common/function/toast'
import { STATUS_CODES } from '@/bin/common/constants'
import { CourseDetail } from '@custom-type'
import { convertResponseToDropdown, convertResponseData } from '@/bin/common/function'
import {
  selectors as courseSelectors,
  actions as courseActions,
  models as courseModels,
} from '@/ducks/course'
import {
  selectors as classSelectors,
  actions as classActions,
  models as classModels,
} from '@/ducks/class'
import { CreateCourseModal, CreateCourseRef } from './create-course'
import { DefaultValues, initDefaultValues } from './init-data'
import { validationSchema } from './validations'
import { CourseItemComponent } from './item'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const { subjectResponse } = useCommon()
  const dispatch = useDispatch()

  const createCourseModal = useRef<CreateCourseRef>()

  const [courseDropdown, setCourseDropdown] = useState<CourseDetail[]>([])
  const [currentSubject, setCurrentSubject] = useState<string>('')
  const [courseSelected, setCourseSelected] = useState<number>(0)

  const createClassResponse: classModels.CreateClassResponse = useMemoriedSelector(
    classSelectors.createClass
  ).response

  const courseSubjectListResponse: courseModels.CourseSubjectListResponse = useMemoriedSelector(
    courseSelectors.courseSubjectList
  ).response

  const createCourseResponse: courseModels.CreateCourseResponse = useMemoriedSelector(
    courseSelectors.createCourse
  ).response

  const createClassRequest = useCallback(
    (request: classModels.CreateClassRequest) =>
      dispatch(classActions.createClass.request(request)),
    [dispatch]
  )

  const courseSubjectListRequest = useCallback(
    (request: courseModels.CourseSubjectListRequest) =>
      dispatch(courseActions.courseSubjectList.request(request)),
    [dispatch]
  )

  const resetCreateClass = useCallback(
    (request: classModels.CreateClassResponse) =>
      dispatch(classActions.createClass.success(request)),
    [dispatch]
  )

  const methods = useForm<DefaultValues>({
    defaultValues: initDefaultValues,
    validationSchema,
  })

  useEffect(() => {
    return () => {
      methods.reset(initDefaultValues)
      setCourseDropdown([])
      setCurrentSubject('')
    }
  }, [])

  useEffect(() => {
    if (createClassResponse.status) {
      if (createClassResponse.status === STATUS_CODES.OK) {
        showToast({
          message: 'Đăng ký thành công!',
          type: 'success',
        })
      } else {
        showToast({
          message: createClassResponse.error_message,
          type: 'error',
        })
      }
      resetCreateClass(classModels.initState.createClass.response)
    }
  }, [createClassResponse])

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

  useEffect(() => {
    if (courseSubjectListResponse.status === STATUS_CODES.OK) {
      if (courseSubjectListResponse.data && Array.isArray(courseSubjectListResponse.data)) {
        const { data } = courseSubjectListResponse
        setCourseDropdown(data)
      }
    } else {
      setCourseDropdown([])
    }
  }, [courseSubjectListResponse])

  useEffect(() => {
    if (createCourseResponse.status === STATUS_CODES.OK) {
      courseSubjectListRequest({
        subjectId: +currentSubject,
      })
    }
  }, [createCourseResponse])

  const handleOnSubmit = (values: DefaultValues) => {
    if (courseSelected) {
      createClassRequest({
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        maxNumberStudent: values.maxNumberStudent,
        numberStudent: values.numberStudent,
        subjectId: +values.subjectId,
        courseId: courseSelected,
        name: values.name,
        code: values.code,
      })
    } else {
      showToast({
        message: 'Vui lòng chọn khoá học!',
        type: 'info',
      })
    }
  }

  const handleOnCreateCourse = () => {
    const subjectId = methods.getValues('subjectId')
    if (subjectId) {
      createCourseModal.current?.onOpen(subjectId)
    } else {
      showToast({
        message: 'Vui lòng chọn môn học!',
        type: 'info',
      })
    }
  }

  const handleOnChangeSubject = (value: string) => {
    if (value) {
      courseSubjectListRequest({
        subjectId: +value,
      })
      setCurrentSubject(value)
    } else {
      setCourseDropdown([])
      setCurrentSubject('')
    }
  }

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)
    return (
      <div className="checkbox__combo__scroll__arrow">
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
      <div className="checkbox__combo__scroll__arrow">
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
    if (courseDropdown && courseDropdown.length > 0) {
      return courseDropdown.map((item: CourseDetail, index: number) => (
        <CourseItemComponent
          setCourseSelected={setCourseSelected}
          className="course__subject__item"
          courseSelected={courseSelected}
          data={item}
          key={index}
        />
      ))
    }
    return []
  }

  return (
    <React.Fragment>
      <CreateCourseModal ref={createCourseModal} />
      <div className="teacher__create__class__container">
        <FormProvider {...methods}>
          <FormInput name="name" label="Tên lớp" required />
          <FormInput name="code" label="Mã lớp" isMarginTop required />
          <FormInputNumber label="Số lượng học sinh" name="numberStudent" isMarginTop required />
          <FormInputNumber
            label="Giới hạn số lượng học sinh"
            name="maxNumberStudent"
            isMarginTop
            required
          />
          <InputDateTime label="Thời gian bắt đầu" name="startDate" isMarginTop required />
          <InputDateTime label="Thời gian kết thúc" name="endDate" isMarginTop required />
          <Dropdown
            onChangeDropdown={handleOnChangeSubject}
            items={subjectDropdown}
            name="subjectId"
            label="Môn học"
            isMarginTop
            required
          />
          {courseDropdown.length > 0 ? (
            <div className="course__subject__container">
              <ScrollMenu
                scrollContainerClassName="course__subject__scroll__item"
                wrapperClassName="course__subject__scroll__container"
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
            <Button appearance="default" onClick={handleOnCreateCourse}>
              Tạo khoá học
            </Button>
          </ButtonToolbar>
        </FormProvider>
      </div>
    </React.Fragment>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
