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
  return state['payment'];
};

// [Payment API] Payment
export const payment = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.payment || initState.payment;
  });
