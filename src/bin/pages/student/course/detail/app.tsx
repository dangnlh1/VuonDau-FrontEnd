/**
 * @app VuonDau
 * @author phutruongck
 */

import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import React, { useMemo } from 'react'
import { CourseDetail, IClass, IResource, TeacherCourse } from '@custom-type'
import { initCourseDetail, STATUS_CODES } from '@/bin/common/constants'
import { NextRelativeIcon } from '@/components/scroll/action/next'
import { PrevRelativeIcon } from '@/components/scroll/action/prev'
import { formatMoney } from '@/bin/common/function'
import { useMemoriedSelector } from '@/bin/hooks'
import { selectors as courseSelectors, models as courseModels } from '@/ducks/course'
import { ClassItemComponent } from './class-item'
import { ResourceItem } from './resource'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = () => {
  const courseDetailResponse: courseModels.CourseDetailResponse = useMemoriedSelector(
    courseSelectors.courseDetail
  ).response

  const courseDetail = useMemo((): CourseDetail => {
    if (courseDetailResponse.status === STATUS_CODES.OK) {
      return courseDetailResponse.data
    }
    return initCourseDetail
  }, [courseDetailResponse])

  const renderAuthor = useMemo(() => {
    return (
      courseDetail.teacherCourse &&
      courseDetail.teacherCourse.map((i: TeacherCourse, index: number) => {
        if (index < courseDetail.teacherCourse.length - 1) {
          return (
            (
              <a href="" className="teacher__link">
                {i.teacherName}
              </a>
            ) + ', '
          )
        } else {
          return (
            <a href="" className="teacher__link">
              {i.teacherName}
            </a>
          )
        }
      })
    )
  }, [courseDetail])

  const renderLessonContent = useMemo(() => {
    if (courseDetail.resources && courseDetail.resources.length > 0) {
      const { resources } = courseDetail
      if (resources && Array.isArray(resources) && resources.length > 0) {
        const clone = [...resources]
        clone.shift()
        return clone.map((i: IResource, index: number) => {
          return <ResourceItem item={i} key={index} />
        })
      }
    }
    return undefined
  }, [courseDetail])

  const classData = useMemo((): IClass[] => {
    if (courseDetail.resources && courseDetail.resources.length > 0) {
      const { clazz } = courseDetail
      if (clazz && Array.isArray(clazz) && clazz.length > 0) {
        return clazz
      }
    }
    return []
  }, [courseDetail])

  const renderClassItem = () => {
    if (classData && classData.length > 0) {
      return classData.map((item: IClass, index: number) => (
        <ClassItemComponent className="class__item" data={item} key={index} />
      ))
    }
    return []
  }

  return (
    <div className="course__detail__section">
      <div className="course__detail__summary">
        <div className="course__detail__wrapper">
          <div className="course__detail__container">
            <div className="course__detail__information__container">
              <div className="course__detail__heading">{courseDetail.name}</div>
              <div className="course__detail__summary__description">{courseDetail.title}</div>
              <div className="course__detail__author">Giáo viên: {renderAuthor}</div>
              <div className="course__detail__subject__container">
                <div className="course__detail__subject__heading">
                  {courseDetail?.subject?.name}
                </div>
              </div>
            </div>
            {/* <div className="course__detail__cart">
              <div className="course__detail__thumbnail">
                <img
                  src={courseDetail.image || process.env.DEFAULT_THUMBNAIL}
                />
              </div>
              <div className="course__detail__cart__container">
                <div className="course__detail__price__container">
                  <div className="course__detail__price">
                    {formatMoney({
                      text: courseDetail.unitPrice,
                      prefix: 'vnđ',
                    })}
                  </div>
                  <div className="course__detail__price__discount">
                    {formatMoney({
                      text: courseDetail.unitPrice,
                      prefix: 'vnđ',
                    })}
                  </div>
                </div>
                <div className="course__detail__button">
                  <div className="course__detail__add__to__cart">
                    Thêm vào giỏ hàng
                  </div>
                  <div className="course__detail__add__to__cart__outline">
                    Mua ngay
                  </div>
                </div>
              </div>
              <div className="course__detail__cart__description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
                pariatur assumenda quidem repudiandae nihil doloremque nam
                labore cupiditate autem velit commodi ullam quas aperiam
                consequatur ipsum corporis voluptates, vitae explicabo?
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="course__detail__class__container">
        <div className="course__detail__class__heading">Danh sách lớp học</div>
        <div className="course__detail__class__content">
          <ScrollMenu
            scrollContainerClassName="course__detail__class__scroll__item"
            wrapperClassName="course__detail__class__scroll__container"
            RightArrow={NextRelativeIcon}
            LeftArrow={PrevRelativeIcon}
            transitionBehavior="smooth"
          >
            {renderClassItem()}
          </ScrollMenu>
        </div>
      </div>
      <div className="course__detail__lesson__container">
        <div className="course__detail__lesson__heading">Danh sách bài học</div>
        <div className="course__detail__lesson__content">{renderLessonContent}</div>
      </div>
      <div className="course__detail__description">
        <div className="course__detail__description__wrapper">
          <div className="course__detail__description__title">What you'll learn</div>
          <div className="course__detail__description__heading">{courseDetail.description}</div>
        </div>
      </div>
    </div>
  )
}

AppPage.displayName = 'AppPage'
export { AppPage }
