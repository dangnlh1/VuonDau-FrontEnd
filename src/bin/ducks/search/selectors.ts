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
  return state['search'];
};

// [Search API] Search Course
export const searchCourse = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.searchCourse || initState.searchCourse;
  });
