/**
 * @app VuonDau
 * @author phutruongck
 */

import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useMemoriedSelector, useRouter} from '@/hooks';
import {STATUS_CODES} from '@/common/constants';
import {WithLayout} from '@/layout';
import {
  selectors as classSelectors,
  actions as classActions,
  models as classModels,
} from '@/ducks/class';
import {IParams} from './init-data';
import {AppPage} from './app';

interface Props {}

const ClassPage: React.FC<Props> = React.memo(() => {
  const dispatch = useDispatch();
  const {
    params: {classId},
  } = useRouter<IParams>();

  const classDetailResponse: classModels.ClassDetailResponse =
    useMemoriedSelector(classSelectors.classDetail).response;

  const getClassDetailRequest = useCallback(
    (request: classModels.ClassDetailRequest) =>
      dispatch(classActions.classDetail.request(request)),
    [dispatch],
  );

  const resetClassDetail = useCallback(
    (request: classModels.ClassDetailResponse) =>
      dispatch(classActions.classDetail.success(request)),
    [dispatch],
  );

  useLayoutEffect(() => {
    getClassDetailRequest({
      id: classId,
    });

    return () => {
      resetClassDetail(classModels.initState.classDetail.response);
    };
  }, [classId]);

  const title = useMemo(() => {
    if (classDetailResponse.status === STATUS_CODES.OK) {
      if (classDetailResponse.data.code) {
        return classDetailResponse.data.code;
      }
    }
    return '';
  }, [classDetailResponse]);

  return (
    <WithLayout pageTitle={title}>
      <AppPage />
    </WithLayout>
  );
});

export default ClassPage;
