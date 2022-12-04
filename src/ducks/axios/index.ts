/**
 * @app VuonDau
 * @author phutruongck
 */

import baseAxios, {AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';
import {actions} from '@/ducks/utils/loading';
import {store} from '../../index';
import {fieldDataBlankToUndefinedHandler} from './field-data-blank-to-undefined-handler';
import {statusHandler} from './status-handler';

declare module 'axios' {
  interface AxiosRequestConfig {
    requestIds?: string[];
  }
}

export const loadingHandler = () => {
  const addRequestId = (config: AxiosRequestConfig) => {
    const requestId = config.url || '';
    config.requestIds = config.requestIds || [];
    config.requestIds.push(requestId);
    store.dispatch(actions.addRequestId(requestId));
    return config;
  };

  const deleteRequestId = (res: AxiosResponse) => {
    if (res.config.requestIds) {
      for (const requestId of res.config.requestIds) {
        store.dispatch(actions.deleteRequestId(requestId));
      }
    }
    res.config.requestIds = [];
  };

  const deleteSuccess = (res: AxiosResponse) => {
    deleteRequestId(res);
    return res;
  };

  const failure = (res: AxiosResponse) => {
    deleteRequestId(res);
    return Promise.reject(res);
  };

  return {addRequestId, deleteSuccess, failure};
};

// For common config
const _baseAxios = baseAxios.create({});

const axios = (isLoading: boolean = true) => {
  _baseAxios.defaults.baseURL = process.env.SERVER_URL;
  _baseAxios.defaults.headers.post['Content-Type'] = 'application/json';
  _baseAxios.defaults.headers.post['Accept-Language'] = 'vi';
  _baseAxios.defaults.headers.post['Accept'] = 'application/json';
  _baseAxios.defaults.timeout = process.env.TIMEOUT ? +process.env.TIMEOUT : 10;

  _baseAxios.interceptors.request.use(fieldDataBlankToUndefinedHandler());
  if (isLoading) {
    _baseAxios.interceptors.request.use(
      loadingHandler().addRequestId,
      undefined,
    );
  }

  _baseAxios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
  _baseAxios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  _baseAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  _baseAxios.defaults.headers.common['Accept-Language'] = 'vi';

  _baseAxios.interceptors.response.use(undefined, statusHandler());
  if (isLoading) {
    _baseAxios.interceptors.response.use(
      loadingHandler().deleteSuccess,
      loadingHandler().failure,
    );
  }

  return _baseAxios;
};

const __baseAxios = baseAxios.create({});
const axiosWithoutToken = (isLoading: boolean = false) => {
  __baseAxios.defaults.baseURL = process.env.SERVER_URL;
  __baseAxios.defaults.headers.post['Content-Type'] = 'application/json';
  __baseAxios.defaults.headers.post['Accept'] = 'application/json';
  __baseAxios.defaults.headers.post['Accept-Language'] = 'vi';
  __baseAxios.defaults.timeout = process.env.TIMEOUT
    ? +process.env.TIMEOUT
    : 10;
  __baseAxios.interceptors.request.use(fieldDataBlankToUndefinedHandler());
  if (isLoading) {
    __baseAxios.interceptors.request.use(
      loadingHandler().addRequestId,
      undefined,
    );
  }

  __baseAxios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
  __baseAxios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  __baseAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  __baseAxios.defaults.headers.common['Accept-Language'] = 'vi';
  __baseAxios.interceptors.response.use(undefined, statusHandler());

  if (isLoading) {
    __baseAxios.interceptors.response.use(
      loadingHandler().deleteSuccess,
      loadingHandler().failure,
    );
  }

  return __baseAxios;
};

export default axios;
export {axiosWithoutToken, baseAxios};
export type {AxiosResponse, AxiosError};
