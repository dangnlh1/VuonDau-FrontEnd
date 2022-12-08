/**
 * @app VuonDau
 * @author phutruongck
 */

import {useSelector} from 'react-redux';
import {OutputSelector} from 'reselect';
import {useMemo} from 'react';
import {GlobalState} from '../ducks/types';

export const useMemoriedSelector = <
  SelectorReturnType extends unknown,
  ResultFuncType extends unknown,
>(
  selector: () => OutputSelector<
    GlobalState,
    SelectorReturnType,
    ResultFuncType
  >,
): SelectorReturnType => {
  const memoriedSelector: any = useMemo(selector, []);

  return useSelector((state: GlobalState) => memoriedSelector(state));
};
