/**
 * @app VuonDau
 * @author phutruongck
 */

import {lazy} from 'react';
import {LAYOUT_TYPE} from '@/common/constants';
import {IAppRoute} from '@custom-type';

export const URL_PAGE = {
  TIME_TABLE: '/teacher/time-table',
  REGISTER: '/teacher/register',
  COURSE: '/teacher/courses',
  SEARCH: '/teacher/search',
  LOGIN: '/teacher/login',
  CLASS: '/teacher/class',
  HOME: '/teacher/home',
};

export const TEACHER_URL_PAGE = {
  HOME: {
    PATH: URL_PAGE.HOME,
    TITLE: 'Giáo viên',
  },
  COURSE: {
    PATH: URL_PAGE.COURSE,
    TITLE: 'Khoá học',
    CHILD: {
      LIST: {
        PATH: URL_PAGE.COURSE + '/list',
        TITLE: 'Quản lý khoá học',
      },
      CREATE: {
        PATH: URL_PAGE.COURSE + '/create',
        TITLE: 'Đăng ký khoá học',
      },
      DETAIL: {
        PATH: URL_PAGE.COURSE + '/detail/:id?',
        ROOT: URL_PAGE.COURSE + '/detail',
        TITLE: 'Chi tiết khoá học',
      },
    },
  },
  CLASS: {
    PATH: URL_PAGE.CLASS,
    TITLE: 'Lớp học',
    CHILD: {
      LIST: {
        PATH: URL_PAGE.CLASS + '/list',
        TITLE: 'Quản lý lớp học',
      },
      CREATE: {
        PATH: URL_PAGE.CLASS + '/create',
        TITLE: 'Đăng ký lớp học',
      },
      DETAIL: {
        PATH: URL_PAGE.CLASS + '/detail/:id?',
        ROOT: URL_PAGE.CLASS + '/detail',
        TITLE: 'Chi tiết lớp học',
      },
    },
  },
  TIME_TABLE: {
    PATH: URL_PAGE.TIME_TABLE,
    TITLE: 'Thời khoá biểu',
    CHILD: {
      LIST: {
        PATH: URL_PAGE.TIME_TABLE + '/list',
        TITLE: 'Thời khoá biểu',
      },
      CREATE: {
        PATH: URL_PAGE.TIME_TABLE + '/create',
        TITLE: 'Đăng ký thời khoá biểu',
      },
      DETAIL: {
        PATH: URL_PAGE.TIME_TABLE + '/detail/:id?',
        ROOT: URL_PAGE.TIME_TABLE + '/detail',
        TITLE: 'Chi tiết thời khoá biểu',
      },
    },
  },
};

export const teacherPublicRoutes: IAppRoute[] = [
  {
    component: lazy(() => import('@/pages/teacher/home')),
    path: TEACHER_URL_PAGE.HOME.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },

  // Course
  {
    component: lazy(() => import('@/pages/teacher/course/create')),
    path: TEACHER_URL_PAGE.COURSE.CHILD.CREATE.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },
  {
    component: lazy(() => import('@/pages/teacher/course/list')),
    path: TEACHER_URL_PAGE.COURSE.CHILD.LIST.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },
  {
    component: lazy(() => import('@/pages/teacher/course/detail')),
    path: TEACHER_URL_PAGE.COURSE.CHILD.DETAIL.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },

  // Class
  {
    component: lazy(() => import('@/pages/teacher/class/create')),
    path: TEACHER_URL_PAGE.CLASS.CHILD.CREATE.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },
  {
    component: lazy(() => import('@/pages/teacher/class/list')),
    path: TEACHER_URL_PAGE.CLASS.CHILD.LIST.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },
  {
    component: lazy(() => import('@/pages/teacher/class/detail')),
    path: TEACHER_URL_PAGE.CLASS.CHILD.DETAIL.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },

  // Time Table
  {
    component: lazy(() => import('@/pages/teacher/time-table/create')),
    path: TEACHER_URL_PAGE.TIME_TABLE.CHILD.CREATE.PATH,
    type: LAYOUT_TYPE.TEACHER,
    exact: true,
  },
];
