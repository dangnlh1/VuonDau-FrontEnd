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
  return state['timeTable'];
};

// [Time Table API] Get All Day Of Week
export const dayOfWeek = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.dayOfWeek || initState.dayOfWeek;
  });

// [Time Table API] Get All Slot
export const slot = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.slot || initState.slot;
  });

// [Time Table API] Create Time Table
export const createTimeTable = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.createTimeTable || initState.createTimeTable;
  });
