/**
 * @app VuonDau
 * @author phutruongck
 */

import {ActionType, getType} from 'typesafe-actions';
import {combineReducers} from 'redux';
import produce, {Draft} from 'immer';
import {ResponseState} from '@custom-type';
import * as actions from './actions';
import * as models from './models';

type Actions = ActionType<typeof actions>;

// [Payment API] Payment
export const payment = produce(
  (draft: Draft<ResponseState<models.PaymentResponse>>, action: Actions) => {
    switch (action.type) {
      case getType(actions.payment.request):
        draft.isLoading = true;
        return draft;

      case getType(actions.payment.success):
        draft.response = {...action.payload};
        draft.isLoading = false;
        return draft;

      case getType(actions.payment.failure):
        const {response} = action.payload;
        if (response && response.hasOwnProperty('data') && response.data) {
          draft.response.error_message = response.data.error_message;
          draft.response.status = response.data.status;
        }
        draft.response.data = models.initState.payment.response.data;
        draft.isLoading = false;
        return draft;

      default:
        return draft;
    }
  },
  models.initState.payment,
);

const reducers = combineReducers({
  payment,
});

export default reducers;
