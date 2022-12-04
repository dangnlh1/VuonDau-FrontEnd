/**
 * @app VuonDau
 * @author phutruongck
 */

import {createSelector, Selector} from 'reselect';
import {GlobalState} from '../types';
import {StatusErrorState, initState} from './models';

export const rootSelector: Selector<GlobalState, StatusErrorState> = (
  state: GlobalState,
) => state['statusError'];

export const statusError = () =>
  createSelector(rootSelector, (state: StatusErrorState) => {
    return state.statusError || initState.statusError;
  });
