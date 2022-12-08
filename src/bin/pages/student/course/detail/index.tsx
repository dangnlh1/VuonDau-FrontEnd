/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useMemoriedSelector, useRouter } from '@/bin/hooks'
import { STATUS_CODES } from '@/bin/common/constants'
import { WithLayout } from '@/layout'
import {
  selectors as courseSelectors,
  actions as courseActions,
  models as courseModels,
} from '@/ducks/course'
import { IParams } from './init-data'
import { AppPage } from './app'

interface Props {}

const CourseDetailPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch()
  const {
    params: { courseId },
  } = useRouter<IParams>()

  const courseDetailResponse: courseModels.CourseDetailResponse = useMemoriedSelector(
    courseSelectors.courseDetail
  ).response

  const getCourseDetailRequest = useCallback(
    (request: courseModels.CourseDetailRequest) =>
      dispatch(courseActions.courseDetail.request(request)),
    [dispatch]
  )

  const resetCourseDetail = useCallback(
    (request: courseModels.CourseDetailResponse) =>
      dispatch(courseActions.courseDetail.success(request)),
    [dispatch]
  )

  useLayoutEffect(() => {
    getCourseDetailRequest({
      courseId,
    })

    return () => {
      resetCourseDetail(courseModels.initState.courseDetail.response)
    }
  }, [courseId])

  const title = useMemo(() => {
    if (courseDetailResponse.status === STATUS_CODES.OK) {
      if (courseDetailResponse.data.name) {
        return courseDetailResponse.data.name
      }
    }
    return ''
  }, [courseDetailResponse])

  return (
    <WithLayout pageTitle={title}>
      <AppPage />
    </WithLayout>
  )
})

export default CourseDetailPage
