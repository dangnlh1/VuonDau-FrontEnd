/**
 * @app VuonDau
 * @author phutruongck
 */

import {AxiosRequestConfig} from 'axios';
import _ from 'lodash';

const isObjectOrArray = (obj: any) => {
  return obj !== null && typeof obj === 'object';
};
const isJsonContentType = (headers: any) => {
  return (
    headers &&
    headers['Content-Type'] &&
    (headers['Content-Type'] as string).indexOf('application/json') > -1
  );
};

/**
 * Convert all blank fields in object/array to `undefined` recursively.
 * @param obj - Input object/array
 * @returns Converted object/array
 */
const convertBlankFieldToUndefined = (obj: any) => {
  if (!isObjectOrArray(obj)) return obj;
  const clonedObj = _.clone(obj);
  for (const key in clonedObj) {
    if (clonedObj[key] === '') {
      clonedObj[key] = undefined;
    } else if (isObjectOrArray(clonedObj[key])) {
      clonedObj[key] = convertBlankFieldToUndefined(clonedObj[key]);
    }
  }
  return clonedObj;
};

/**
 * Convert all blank fields in request data to 'undefined' before dispatching request.
 *
 * @returns AxiosRequestConfig
 */
export const blankDataFieldToUndefinedHandler =
  () => (config: AxiosRequestConfig) => {
    if (isJsonContentType(config.headers) && config.data !== undefined) {
      config.data = convertBlankFieldToUndefined(config.data);
    }
    return config;
  };
