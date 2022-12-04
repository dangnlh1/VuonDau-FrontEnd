/**
 * @app VuonDau
 * @author phutruongck
 */

import {ActionType, getType} from 'typesafe-actions';
import {combineReducers} from 'redux';
import produce, {Draft} from 'immer';
import * as actions from './actions';
import * as models from './models';

type Actions = ActionType<typeof actions>;

export const layout = produce(
  (draft: Draft<models.ILayoutModal>, action: Actions) => {
    switch (action.type) {
      case getType(actions.setCollapse):
        draft.collapse = action.payload;
        return draft;
      case getType(actions.setPageTitle):
        draft.pageTitle = action.payload;
        return draft;
      case getType(actions.setPageLoading):
        draft.pageLoading = action.payload;
        return draft;
      case getType(actions.setLayoutType):
        draft.layoutType = action.payload;
        return draft;
      case getType(actions.setPermission):
        draft.permission = action.payload;
        return draft;
      default:
        return draft;
    }
  },
  models.initLayoutState.layout,
);

const reducers = combineReducers({
  layout,
});

export default reducers;
