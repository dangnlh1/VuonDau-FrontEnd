/**
 * @app VuonDau
 * @author phutruongck
 */

import React, { useCallback, useEffect, useState } from 'react'
import { CourseItemComponent } from '@/bin/course'
import { Pagination } from '@/components/pagination'
import { STATUS_CODES } from '@/bin/common/constants'
import { CourseItem } from '@custom-type'
import { useCommon } from '@/bin/hooks'
import './styles.scss'

interface Props {}

const AppPage: React.FC<Props> = React.memo(() => {
  const { allCourseResponse, getAllCourse } = useCommon()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(1)
  const [data, setData] = useState<any[]>([])

  const onReset = useCallback(() => {
    const { items } = allCourseResponse.data
    if (items && Array.isArray(items)) {
      return items
    }
    return []
  }, [allCourseResponse])

  useEffect(() => {
    getAllCourse({})
  }, [])

  useEffect(() => {
    if (allCourseResponse.status === STATUS_CODES.OK) {
      const total = allCourseResponse.data.totalItems
      let dropdown: any[] = onReset()
      setTotal(total || 1)
      setData(dropdown)
    } else {
      setData([])
      setTotal(1)
    }
  }, [allCourseResponse])

  const renderItem = () => {
    if (data && data.length > 0) {
      return data.map((item: CourseItem, index: number) => (
        <CourseItemComponent className="list__course__item__container" data={item} key={index} />
      ))
    }
    return []
  }

  const handleOnPageChange = (page: number) => {
    const curPage = page - 1
    setCurrentPage(page)
    getAllCourse({
      page: curPage,
    })
  }

  return (
    <div className="list__course__section">
      <div className="list__course__container">{renderItem()}</div>
      <div className="list__course__paginate">
        <Pagination onPageChange={handleOnPageChange} defaultCurrent={currentPage} total={total} />
      </div>
    </div>
  )
})

AppPage.displayName = 'AppPage'
export { AppPage }
