/**
 * @app VuonDau
 * @author phutruongck
 */

import {lazy} from 'react';
import {IAppRoute, INavigation} from '@custom-type';
import {LAYOUT_TYPE} from '@/common/constants';

export const ADMIN_ROOT_URL = {
  ACCOUNT_DETAIL: '/admin/account-detail',
  STATISTICS: '/admin/statistics',
  CMS_MOBILE: '/admin/cms-mobile',
  DOCUMENT: '/admin/document',
  CATEGORY: '/admin/category',
  ORDER: '/admin/order',
  USER: '/admin/user',
};

export const ADMIN_URL_PAGE = {
  // User Route
  ACCOUNT_DETAIL: {
    PATH: ADMIN_ROOT_URL.ACCOUNT_DETAIL,
    TITLE: 'Thông tin tài khoản',
  },
};

export const adminRoutes: IAppRoute[] = [
  // Account Detail
  {
    component: lazy(() => import('@/pages/admin/home')),
    path: ADMIN_URL_PAGE.ACCOUNT_DETAIL.PATH,
    type: LAYOUT_TYPE.ADMIN,
    exact: true,
  },
];

export const navigation: INavigation[] = [];
