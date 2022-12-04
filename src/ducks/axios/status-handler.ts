/**
 * @app VuonDau
 * @author phutruongck
 */

import {STATUS_ERROR} from '@/common/constants';
import {IAxiosError} from 'custom-type';
import {AxiosError} from '.';
import {store} from '../../index';
import {setStatusError} from '../status-error/actions';

/**
 * Handle response error
 * @returns  Rejected
 */
export const statusHandler = () => (err: AxiosError<IAxiosError>) => {
  if (err.response?.status) {
    if (+err.response?.status === 401) {
      store.dispatch(
        setStatusError({
          statusCode: 403,
          response: {
            error_message:
              'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!',
            status: 'FAILED',
          },
        }),
      );

      return Promise.reject(err);
    }

    return Promise.reject(err);
  } else if (err.code) {
    store.dispatch(
      setStatusError({
        statusCode: STATUS_ERROR[err.code].statusCode,
        response: {
          error_message: STATUS_ERROR[err.code].error_message,
          status: STATUS_ERROR[err.code].status,
        },
      }),
    );
  }

  return Promise.reject(err);
};
