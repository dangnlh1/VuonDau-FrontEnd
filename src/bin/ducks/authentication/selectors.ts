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
  return state['authentication'];
};

// [Authentication API] Student Register
export const studentRegister = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.studentRegister || initState.studentRegister;
  });

// [Authentication API] Teacher Register
export const teacherRegister = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.teacherRegister || initState.teacherRegister;
  });
