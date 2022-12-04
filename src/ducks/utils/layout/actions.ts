/**
 * @app VuonDau
 * @author phutruongck
 */

import {createAction} from 'typesafe-actions';
import {ILayoutType} from '@custom-type';
import * as types from './types';

export const setCollapse = createAction(
  types.SET_COLLAPSE,
  (action) => (request: boolean) => action(request),
);

export const setPageTitle = createAction(
  types.SET_PAGE_TITLE,
  (action) => (request: string) => action(request),
);

export const setPageLoading = createAction(
  types.SET_PAGE_LOADING,
  (action) => (request: boolean) => action(request),
);

export const setLayoutType = createAction(
  types.SET_LAYOUT_TYPE,
  (action) => (request: ILayoutType) => action(request),
);

export const setPermission = createAction(
  types.SET_PERMISSION,
  (action) => (request: string[]) => action(request),
);
