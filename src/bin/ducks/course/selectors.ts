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
  return state['course'];
};

// [Course API] Get Course Detail
export const courseDetail = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.courseDetail || initState.courseDetail;
  });

// [Course API] Create Course
export const createCourse = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.createCourse || initState.createCourse;
  });

// [Course API] Get Course Subject
export const courseSubject = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.courseSubject || initState.courseSubject;
  });

// [Course API] Get Course Subject List
export const courseSubjectList = () =>
  createSelector(rootSelector, (state: ModelState) => {
    return state.courseSubjectList || initState.courseSubjectList;
  });
