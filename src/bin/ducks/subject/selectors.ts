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
  return state['subject'];
};

// [Subject API] Get List Subject
export const listSubject = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.listSubject || initState.listSubject;
  });
