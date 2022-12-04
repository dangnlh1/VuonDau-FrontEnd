/**
 * @app VuonDau
 * @author phutruongck
 */

import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {actions as actionsApiResponse} from '@/ducks/status-error';
import {actions as layoutActions} from '@/ducks/utils/layout';
import {StatusErrorType} from '@/ducks/status-error/models';
import * as actionsRoot from '@/ducks/actions';
import {ILayoutType} from '@custom-type';

export const useGlobalAction = () => {
  const dispatch = useDispatch();

  const setStatusError = useCallback(
    (request: StatusErrorType) =>
      dispatch(actionsApiResponse.setStatusError(request)),
    [dispatch],
  );

  const setCollapse = useCallback(
    (request: boolean) => dispatch(layoutActions.setCollapse(request)),
    [dispatch],
  );

  const setPageTitle = useCallback(
    (request: string) => dispatch(layoutActions.setPageTitle(request)),
    [dispatch],
  );

  const setPageLoading = useCallback(
    (request: boolean) => dispatch(layoutActions.setPageLoading(request)),
    [dispatch],
  );

  const setLayoutType = useCallback(
    (request: ILayoutType) => dispatch(layoutActions.setLayoutType(request)),
    [dispatch],
  );

  const resetState = useCallback(
    (key: string) => dispatch(actionsRoot.resetState(key)),
    [dispatch],
  );

  const resetAllState = useCallback(
    (whiteList: string[]) => dispatch(actionsRoot.resetAllState(whiteList)),
    [dispatch],
  );

  return {
    setStatusError,
    setPageLoading,
    setLayoutType,
    resetAllState,
    setPageTitle,
    setCollapse,
    resetState,
  };
};
