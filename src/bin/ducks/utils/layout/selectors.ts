/**
 * @app VuonDau
 * @author phutruongck
 */

import {createSelector, Selector} from 'reselect';
import {GlobalState} from '../../types';
import {initLayoutState, LayoutState} from './models';

export const layoutSelector: Selector<GlobalState, LayoutState> = (
  state: GlobalState,
) => state['utils/layout'];

export const getCollapse = () =>
  createSelector(layoutSelector, (state: LayoutState) => {
    return state.layout.collapse || initLayoutState.layout.collapse;
  });

export const getPageTitle = () =>
  createSelector(layoutSelector, (state: LayoutState) => {
    return state.layout.pageTitle || initLayoutState.layout.pageTitle;
  });

export const getPageLoading = () =>
  createSelector(layoutSelector, (state: LayoutState) => {
    return state.layout.pageLoading || initLayoutState.layout.pageLoading;
  });

export const getLayoutType = () =>
  createSelector(layoutSelector, (state: LayoutState) => {
    return state.layout.layoutType || initLayoutState.layout.layoutType;
  });

export const getPermission = () =>
  createSelector(layoutSelector, (state: LayoutState) => {
    return state.layout.permission || initLayoutState.layout.permission;
  });
