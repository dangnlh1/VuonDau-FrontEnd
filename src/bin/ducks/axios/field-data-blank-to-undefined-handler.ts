/**
 * @app VuonDau
 * @author phutruongck
 */

import {AxiosRequestConfig} from 'axios';
import {clone} from 'ramda';

const isObjectOrArray = (obj: any) => {
  return obj !== null && typeof obj === 'object';
};

export const convertFieldBlankToUndefined = (obj: any) => {
  if (!isObjectOrArray(obj)) {
    return obj;
  }

  const cloneObj = clone(obj);

  for (const key in cloneObj) {
    if (cloneObj[key] === '') {
      cloneObj[key] = undefined;
    } else if (isObjectOrArray(cloneObj[key])) {
      cloneObj[key] = convertFieldBlankToUndefined(cloneObj[key]);
    }
  }

  return cloneObj;
};

/**
 * Convert all blank fields in request data to 'undefined' before dispatching request
 * @returns AxiosRequestConfig
 */
export const fieldDataBlankToUndefinedHandler =
  () => (config: AxiosRequestConfig) => {
    if (config.data !== undefined) {
      config.data = convertFieldBlankToUndefined(config.data);
    }

    return config;
  };
