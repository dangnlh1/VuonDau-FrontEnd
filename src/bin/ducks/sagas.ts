/**
 * @app VuonDau
 * @author phutruongck
 */

import {all, fork} from 'redux-saga/effects';
import {loadSagas} from './loader';

export default function* rootSaga() {
  yield all(loadSagas().map(fork));
}
