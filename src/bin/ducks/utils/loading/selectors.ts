/**
 * @app VuonDau
 * @author phutruongck
 */

import {createSelector, Selector} from 'reselect';
import {GlobalState} from '../../types';
import {UtilsState} from './models';

export const loadingSelector: Selector<GlobalState, UtilsState> = (
  state: GlobalState,
) => state['utils/loading'];

export const getLoadingIsEnabled = () =>
  createSelector(loadingSelector, (state: UtilsState) => {
    return state.loading && state.loading.loadingItems.length > 0;
  });
