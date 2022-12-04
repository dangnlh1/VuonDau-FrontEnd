/**
 * @app VuonDau
 * @author phutruongck
 */

import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {
  selectors as commonSelectors,
  actions as commonActions,
  models as commonModels,
} from '@/ducks/common';
import {
  selectors as subjectSelectors,
  actions as subjectActions,
  models as subjectModels,
} from '@/ducks/subject';
import {useMemoriedSelector} from './use-memoried-selector';
import {useCookies} from './use-cookies';

export const useCommon = () => {
  const {userData} = useCookies();
  const dispatch = useDispatch();

  const getAllCourse = useCallback(
    (request: commonModels.CourseRequest) =>
      dispatch(commonActions.allCourse.request(request)),
    [dispatch],
  );

  const getListSubject = useCallback(
    (request: subjectModels.SubjectRequest) =>
      dispatch(subjectActions.listSubject.request(request)),
    [dispatch],
  );

  const allCourseResponse: commonModels.CourseResponse = useMemoriedSelector(
    commonSelectors.allCourse,
  ).response;

  const subjectResponse: subjectModels.SubjectResponse = useMemoriedSelector(
    subjectSelectors.listSubject,
  ).response;

  return {
    allCourseResponse,
    subjectResponse,
    getListSubject,
    getAllCourse,
    userData,
  };
};
