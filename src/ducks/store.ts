/**
 * @app VuonDau
 * @author phutruongck
 */

import {applyMiddleware, createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {resetState} from './producers';
import reducers from './reducers';
import rootSaga from './sagas';

const appReducer = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
  const draft = resetState(state, action);
  return appReducer(draft, action);
};

const configureStore = (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers: Array<any> = [sagaMiddleware];
  const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25});
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...enhancers)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export type RootReducer = typeof reducers;
export default configureStore;
