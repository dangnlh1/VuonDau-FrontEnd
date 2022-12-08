/**
 * @app VuonDau
 * @author phutruongck
 */

import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaDiscourse } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { lazy } from 'react'
import { IAppRoute, INavigation } from '@custom-type'
import { LAYOUT_TYPE } from '@/bin/common/constants'
import { TEACHER_URL_PAGE } from '../teacher/navigation'

export const URL_PAGE = {
  TEACHER_REGISTER: '/teacher-register',
  REGISTER: '/register',
  COURSE: '/courses',
  SEARCH: '/search',
  LOGIN: '/login',
  CLASS: '/class',
  HOME: '/home',
}

export const STUDENT_URL_PAGE = {
  HOME: {
    PATH: URL_PAGE.HOME,
    TITLE: 'Trang chủ',
  },
  SEARCH: {
    PATH: URL_PAGE.SEARCH,
    TITLE: 'Tìm kiếm',
  },
  LOGIN: {
    PATH: URL_PAGE.LOGIN,
    TITLE: 'Đăng nhập',
  },
  REGISTER: {
    PATH: URL_PAGE.REGISTER,
    TITLE: 'Đăng ký',
  },
  TEACHER_REGISTER: {
    PATH: URL_PAGE.TEACHER_REGISTER,
    TITLE: `Giảng dạy trên ${process.env.REACT_APP_TITLE}`,
  },
  CLASS: {
    PATH: URL_PAGE.CLASS,
    TITLE: 'Lớp học',
    CHILD: {
      DETAIL: {
        ROOT: URL_PAGE.CLASS + '/detail',
        PATH: URL_PAGE.CLASS + '/detail/:classId?',
        TITLE: 'Chi tiết lớp học',
      },
    },
  },
  COURSE: {
    PATH: URL_PAGE.COURSE,
    TITLE: 'Khoá học',
    CHILD: {
      DETAIL: {
        ROOT: URL_PAGE.COURSE + '/detail',
        PATH: URL_PAGE.COURSE + '/detail/:courseId?',
        TITLE: 'Chi tiết khoá học',
      },
    },
  },
}

export const studentPublicRoutes: IAppRoute[] = [
  {
    component: lazy(() => import('@/bin/pages/authentication/login')),
    path: STUDENT_URL_PAGE.LOGIN.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/authentication/register')),
    path: STUDENT_URL_PAGE.REGISTER.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/authentication/teacher')),
    path: STUDENT_URL_PAGE.TEACHER_REGISTER.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/student/home')),
    path: STUDENT_URL_PAGE.HOME.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/student/course/list')),
    path: STUDENT_URL_PAGE.COURSE.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/student/course/detail')),
    path: STUDENT_URL_PAGE.COURSE.CHILD.DETAIL.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/student/class')),
    path: STUDENT_URL_PAGE.CLASS.CHILD.DETAIL.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
  {
    component: lazy(() => import('@/bin/pages/student/search')),
    path: STUDENT_URL_PAGE.SEARCH.PATH,
    type: LAYOUT_TYPE.STUDENT,
    exact: true,
  },
]

export const studentPrivateRoues: IAppRoute[] = []

export const studentNavigation: INavigation[] = [
  {
    path: STUDENT_URL_PAGE.HOME.PATH,
    title: STUDENT_URL_PAGE.HOME.TITLE,
    icon: <FiHome />,
  },
  {
    path: STUDENT_URL_PAGE.COURSE.PATH,
    title: STUDENT_URL_PAGE.COURSE.TITLE,
    icon: <FaDiscourse />,
  },
  // {
  //   path: TEACHER_URL_PAGE.HOME.PATH,
  //   title: TEACHER_URL_PAGE.HOME.TITLE,
  //   icon: <FaChalkboardTeacher />,
  // },
]
