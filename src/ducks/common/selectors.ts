/**
 * @app VuonDau
 * @author phutruongck
 */

import {createSelector, Selector} from 'reselect';
import {GlobalState} from '../types';
import {ModelState, initCommonState} from './models';

export const rootSelector: Selector<GlobalState, ModelState> = (
  state: GlobalState,
) => {
  return state['common'];
};

// [Common API] Get All Course
export const allCourse = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.allCourse || initCommonState.allCourse;
  });
