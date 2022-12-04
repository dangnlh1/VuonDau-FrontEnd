/**
 * @app VuonDau
 * @author phutruongck
 */

import {createSelector, Selector} from 'reselect';
import {GlobalState} from '../types';
import {ModelState, initState} from './models';

export const rootSelector: Selector<GlobalState, ModelState> = (
  state: GlobalState,
) => {
  return state['class'];
};

// [Class API] Create Class
export const createClass = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.createClass || initState.createClass;
  });

// [Class API] Get All Class
export const allClass = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.allClass || initState.allClass;
  });

// [Class API] Get Class Detail
export const classDetail = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.classDetail || initState.classDetail;
  });
